"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LifelineEventMedia } from "./lifeline-event"
import {
  LifelineLightbox,
  type LifelineLightboxStart,
} from "./lifeline-lightbox"
import type { LifelineMarker, LifelinePhoto } from "./types"

/** Tweak these */
const CARD_WIDTH = 180
/** Matches the events column's pt-6 — cards align with the first event's text. */
const EVENT_TOP = 24
const MAX_TILT_DEG = 6
/**
 * How far along a card the next one in the stack starts — 0.6 leaves
 * a solid margin of every card visible under its neighbor.
 */
const STACK_OVERLAP = 0.6
/**
 * Stacks cascade diagonally: the last card sits level with the event
 * text and each one before it hangs this much lower, so neighbors
 * overlap corner-to-corner instead of side-by-side.
 */
const CASCADE_Y = 170
/** Event text column: max-w-[18rem] plus breathing room. */
const TEXT_ZONE = 288 + 24

const peekClass = (position: string) =>
  cn(
    "absolute z-0 flex h-12 w-[calc(100%-2rem)] max-w-md items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-3 text-sm text-white/85 backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:hidden",
    position,
  )

function PeekThumb({ item }: { item: LifelinePhoto }) {
  return item.src ? (
    <img src={item.src} alt="" className="aspect-[16/10] h-full shrink-0 rounded-md object-cover object-top outline outline-1 -outline-offset-1 outline-white/10" />
  ) : (
    <span className="aspect-[16/10] h-full shrink-0 rounded-md bg-white/10" aria-hidden="true" />
  )
}

const SITE_FRAME_WIDTH = 1200

/** Renders a live site at desktop width, scaled to fit, so it matches the screenshot thumbnails. */
function ScaledSiteFrame({ src, title }: { src: string; title: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / SITE_FRAME_WIDTH))
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className="h-full w-full">
      {scale > 0 && (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
          className="origin-top-left border-0 bg-background"
          style={{ width: SITE_FRAME_WIDTH, height: SITE_FRAME_WIDTH / 1.6, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}

type SlideDirection = "left" | "right" | "up" | "down"

/**
 * One version inside the preview window. The outgoing layer keeps its
 * iframe mounted while it slides away, and the incoming one shows its
 * screenshot (desktop) until the live build has loaded underneath.
 */
function PreviewLayer({
  item,
  phase,
  direction,
  onExited,
}: {
  item: LifelinePhoto
  phase: "enter" | "exit"
  direction: SlideDirection | null
  onExited?: () => void
}) {
  const [loaded, setLoaded] = useState(false)
  const exiting = phase === "exit"

  return (
    <div
      className={cn(
        "absolute inset-0",
        exiting ? `pointer-events-none archive-slide-out-${direction}` : direction && `archive-slide-in-${direction}`,
      )}
      aria-hidden={exiting || undefined}
      onAnimationEnd={(event) => {
        if (exiting && event.target === event.currentTarget) onExited?.()
      }}
    >
      <iframe
        src={item.previewUrl}
        title={item.alt}
        tabIndex={exiting ? -1 : undefined}
        onLoad={() => setLoaded(true)}
        className={cn(
          "archive-preview-frame h-full w-full border-0 bg-background transition-opacity duration-300 ease-out",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
      {item.src && (
        <img
          src={item.src}
          alt=""
          className={cn(
            "pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-top transition-opacity duration-300 ease-out sm:block",
            loaded && "opacity-0",
          )}
        />
      )}
      {!loaded && (
        <span className={cn("pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground", item.src && "sm:hidden")}>
          Loading {item.alt}…
        </span>
      )}
    </div>
  )
}

function LifelinePreviewModal({
  photo,
  onClose,
}: {
  photo: LifelinePhoto
  onClose: () => void
}) {
  const [gallery] = useState<LifelinePhoto[]>(() =>
    Array.from(document.querySelectorAll<HTMLElement>("[data-lifeline-preview-url]"))
      .map((element) => ({
        previewUrl: element.dataset.lifelinePreviewUrl,
        src: element.dataset.lifelinePreviewSrc,
        alt: element.dataset.lifelinePreviewAlt || "Portfolio preview",
      })),
  )
  const [current, setCurrent] = useState(photo)
  const [direction, setDirection] = useState<SlideDirection | null>(null)
  const [leaving, setLeaving] = useState<{ item: LifelinePhoto; direction: SlideDirection } | null>(null)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)
  const didSwipe = useRef(false)
  const index = gallery.findIndex((item) => item.previewUrl === current.previewUrl)
  const previous = index > 0 ? gallery[index - 1] : null
  const next = index >= 0 && index < gallery.length - 1 ? gallery[index + 1] : null

  const show = (item: LifelinePhoto | null, nextDirection: SlideDirection) => {
    if (!item || item.previewUrl === current.previewUrl) return
    setLeaving({ item: current, direction: nextDirection })
    setDirection(nextDirection)
    setCurrent(item)
  }

  const swipeHandlers = (item: LifelinePhoto, direction: "up" | "down") => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (!event.isPrimary || event.button !== 0) return
      didSwipe.current = false
      swipeStart.current = { x: event.clientX, y: event.clientY }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      const start = swipeStart.current
      swipeStart.current = null
      if (!start) return
      const dy = event.clientY - start.y
      const dx = event.clientX - start.x
      if (Math.abs(dy) > Math.abs(dx) && (direction === "up" ? dy < -24 : dy > 24)) {
        didSwipe.current = true
        void show(item, direction)
      }
    },
    onPointerCancel: () => { swipeStart.current = null },
  })

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") show(previous, "right")
      if (event.key === "ArrowRight") show(next, "left")
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose, previous, next])

  if (!current.previewUrl) return null

  const displayPath = current.previewUrl
    .replace(/^https?:\/\/[^/]+/, 'hari.works')
    .replace('/archive-builds/', '/archive/')
    .replace(/[?].*$/, '')

  return createPortal(
    <div
      className="archive-carousel-backdrop fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(event) => { event.stopPropagation(); show(previous, "right") }}
        disabled={!previous}
        aria-label="Previous portfolio version"
        className="group absolute left-3 top-1/2 hidden w-[12vw] -translate-y-1/2 overflow-hidden rounded-xl border border-white/20 bg-card text-left shadow-xl transition hover:-translate-y-1/2 hover:scale-[1.03] disabled:hidden lg:block"
      >
        {previous?.src ? <img src={previous.src} alt="" className="aspect-[16/10] w-full object-cover opacity-60" /> : <div className="pointer-events-none aspect-[16/10] bg-muted opacity-60">{previous?.previewUrl && <ScaledSiteFrame src={previous.previewUrl} title="" />}</div>}
        <span className="flex items-center gap-1 px-3 py-2 text-xs text-foreground"><ChevronLeft className="size-4" />{previous?.alt.replace(/ site preview$/, "")}</span>
      </button>

      {previous && (
        <button
          type="button"
          {...swipeHandlers(previous, "down")}
          style={{ touchAction: "none" }}
          onClick={(event) => { event.stopPropagation(); if (!didSwipe.current || event.detail === 0) void show(previous, "down"); didSwipe.current = false }}
          className={peekClass("top-4")}
          aria-label={`View newer version, ${previous.alt}`}
        >
          <PeekThumb item={previous} />
          <span className="min-w-0 flex-1 truncate text-left">{previous.alt}</span>
          <ChevronLeft className="size-4 shrink-0 rotate-90 text-white/60" aria-hidden="true" />
        </button>
      )}

      <div
        className="archive-carousel-shell relative z-10 flex h-[calc(100dvh-10.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-2rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-border/60 bg-muted/30 px-3 py-2">
          <div className="hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden="true">
            <button
              type="button"
              onClick={onClose}
              className="h-2.5 w-2.5 rounded-full border-0 bg-primary/80 p-0"
              aria-label="Close site preview"
            />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="min-w-0 flex-1 truncate px-3 py-1 text-sm font-medium text-foreground sm:rounded-md sm:border sm:border-border/60 sm:bg-background sm:text-center sm:text-xs">
            {current.alt}
            <span className="ml-2 font-normal tabular-nums text-muted-foreground sm:hidden">{index + 1} of {gallery.length}</span>
            <span className="ml-2 hidden font-mono text-[9px] text-muted-foreground sm:inline">{displayPath}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 sm:h-8 sm:w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-1 focus-visible:ring-offset-card"
            aria-label="Close site preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden bg-background sm:aspect-[16/10] sm:flex-none">
          {leaving && (
            <PreviewLayer
              key={leaving.item.previewUrl}
              item={leaving.item}
              phase="exit"
              direction={leaving.direction}
              onExited={() => setLeaving(null)}
            />
          )}
          <PreviewLayer key={current.previewUrl} item={current} phase="enter" direction={direction} />
        </div>
      </div>

      {next && (
        <button
          type="button"
          {...swipeHandlers(next, "up")}
          style={{ touchAction: "none" }}
          onClick={(event) => { event.stopPropagation(); if (!didSwipe.current || event.detail === 0) void show(next, "up"); didSwipe.current = false }}
          className={peekClass("bottom-4")}
          aria-label={`View older version, ${next.alt}`}
        >
          <PeekThumb item={next} />
          <span className="min-w-0 flex-1 truncate text-left">{next.alt}</span>
          <ChevronRight className="size-4 shrink-0 rotate-90 text-white/60" aria-hidden="true" />
        </button>
      )}

      <button
        type="button"
        onClick={(event) => { event.stopPropagation(); show(next, "left") }}
        disabled={!next}
        aria-label="Next portfolio version"
        className="group absolute right-3 top-1/2 hidden w-[12vw] -translate-y-1/2 overflow-hidden rounded-xl border border-white/20 bg-card text-left shadow-xl transition hover:-translate-y-1/2 hover:scale-[1.03] disabled:hidden lg:block"
      >
        {next?.src ? <img src={next.src} alt="" className="aspect-[16/10] w-full object-cover opacity-60" /> : <div className="pointer-events-none aspect-[16/10] bg-muted opacity-60">{next?.previewUrl && <ScaledSiteFrame src={next.previewUrl} title="" />}</div>}
        <span className="flex items-center justify-end gap-1 px-3 py-2 text-xs text-foreground">{next?.alt.replace(/ site preview$/, "")}<ChevronRight className="size-4" /></span>
      </button>
    </div>,
    document.body,
  )
}

/** A fresh tilt on every visit — rolled once per card mount. */
function randomTilt() {
  return 2 + Math.random() * (MAX_TILT_DEG - 2)
}

/**
 * The interactive photo card, positioning-agnostic: a click or tap expands
 * it into the preview/lightbox. Desktop floats it over the track (absolute +
 * left/top); the vertical layout drops it into normal flow.
 */
export function LifelinePhotoCard({
  photo,
  rotate,
  width,
  className,
  style,
  animateIntro = false,
  introDelay = 0,
  introDuration = 420,
}: {
  photo: LifelinePhoto
  /** Resolved resting tilt, degrees. */
  rotate: number
  width: number
  /** Positioning context from the caller (e.g. "absolute"). */
  className?: string
  style?: CSSProperties
  animateIntro?: boolean
  introDelay?: number
  introDuration?: number
}) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [lightboxStart, setLightboxStart] =
    useState<LifelineLightboxStart | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // The card's real geometry: bounding-box center (rotation preserves
  // it) plus untransformed layout size — never the rotated hull, which
  // is what made the lightbox clone jump on open.
  const measureCard = (): LifelineLightboxStart | null => {
    const el = cardRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    // Recover the rendered scale (hover grows the card 3%) from the
    // rotated hull: for tilt θ, hullWidth = (w·cosθ + h·sinθ)·scale.
    const w0 = el.offsetWidth
    const h0 = el.offsetHeight
    const rad = Math.abs((rotate * Math.PI) / 180)
    const hull = w0 * Math.cos(rad) + h0 * Math.sin(rad)
    const scale = hull > 0 ? rect.width / hull : 1
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      w: w0 * scale,
      h: h0 * scale,
      mediaTime: el.querySelector("video")?.currentTime,
    }
  }

  const openCard = () => {
    if (lightboxStart) return
    if (photo.previewUrl) setPreviewOpen(true)
    else setLightboxStart(measureCard())
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    openCard()
  }

  return (
    <>
      <div
        ref={cardRef}
        data-lifeline-interactive=""
        role="button"
        tabIndex={0}
        aria-label={`Open ${photo.alt}`}
        data-lifeline-preview-url={photo.previewUrl || undefined}
        data-lifeline-preview-src={photo.src || undefined}
        data-lifeline-preview-alt={photo.alt}
        className={cn(
          "group/photo pointer-events-auto cursor-pointer touch-pan-y rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "z-20 hover:z-40",
          lightboxStart && "invisible",
          className,
        )}
        style={
          {
            ...style,
            width,
            transform: `rotate(${rotate}deg)`,
          } as CSSProperties
        }
        onClick={openCard}
        onKeyDown={onKeyDown}
      >
        <div
          className={cn(
            "relative overflow-hidden ring-1 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]",
            photo.previewUrl
              ? "rounded-xl bg-card shadow-md shadow-black/10 ring-border group-hover/photo:-translate-y-1 group-hover/photo:ring-muted-foreground/50 group-focus-visible/photo:ring-muted-foreground/50 motion-reduce:group-hover/photo:translate-y-0"
              : "rounded-2xl shadow-xl ring-[oklch(0_0_0_/_0.1)] group-hover/photo:scale-[1.03] group-hover/photo:shadow-2xl dark:ring-[oklch(1_0_0_/_0.1)]",
            animateIntro && "lifeline-marker-intro",
          )}
          style={
            animateIntro
              ? ({
                  animationDelay: `${introDelay}ms`,
                  "--lifeline-marker-fade-ms": `${introDuration}ms`,
                } as CSSProperties)
              : undefined
          }
        >
          {photo.previewUrl ? (
            <>
              <div className="flex h-6 items-center gap-1 border-b border-border/60 bg-muted/40 px-2.5" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-muted-foreground/30" />
                <span className="size-1.5 rounded-full bg-muted-foreground/30" />
                <span className="size-1.5 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="pointer-events-none aspect-[16/10] w-full overflow-hidden bg-muted/40">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={750}
                    onLoad={(event) => { event.currentTarget.dataset.loaded = "" }}
                    className="block h-full w-full object-cover object-top opacity-0 transition-opacity duration-300 ease-out data-[loaded]:opacity-100"
                  />
                ) : (
                  <ScaledSiteFrame src={photo.previewUrl} title={photo.alt} />
                )}
              </div>
            </>
          ) : (
            <LifelineEventMedia
              media={photo}
              className="pointer-events-none block w-full"
            />
          )}
        </div>
      </div>
      {previewOpen && (
        <LifelinePreviewModal photo={photo} onClose={() => setPreviewOpen(false)} />
      )}
      {lightboxStart && (
        <LifelineLightbox
          photo={photo}
          rotate={rotate}
          start={lightboxStart}
          getHome={measureCard}
          onClosed={() => setLightboxStart(null)}
        />
      )}
    </>
  )
}

function FloatingCard({
  photo,
  stackIndex,
  stackCount,
  x,
  defaultY,
  width,
  animateIntro,
  introDelay,
  introDuration,
}: {
  photo: LifelinePhoto
  stackIndex: number
  stackCount: number
  /** Resolved left position within the track. */
  x: number
  /** Cascade position when the photo has no explicit y. */
  defaultY: number
  width: number
  animateIntro: boolean
  introDelay: number
  introDuration: number
}) {
  const y = photo.y ?? defaultY
  // Rolled once per mount: solo cards flip a coin for direction;
  // neighbors in a stack lean away from each other so the pile reads
  // as scattered.
  const [mountTilt] = useState(() => {
    const sign =
      stackCount > 1
        ? stackIndex % 2 === 0
          ? -1
          : 1
        : Math.random() > 0.5
          ? 1
          : -1
    return sign * randomTilt()
  })

  return (
    <LifelinePhotoCard
      photo={photo}
      rotate={photo.rotate ?? mountTilt}
      width={width}
      className="absolute"
      style={{ left: x, top: `calc(var(--lifeline-rail) + ${y}px)` }}
      animateIntro={animateIntro}
      introDelay={introDelay}
      introDuration={introDuration}
    />
  )
}

/**
 * Always-visible media scattered over the timeline — anchored to their
 * marker's slot, tilted and overlapping like photos in a notebook.
 * Rendered inside the transformed track, so they ride the scroll.
 */
export function LifelineFloatingPhotos({
  markers,
  offsets,
  widths,
  animateIntro = false,
  getIntroDelay,
  getIntroDuration,
}: {
  markers: LifelineMarker[]
  offsets: number[]
  widths: number[]
  animateIntro?: boolean
  getIntroDelay?: (markerIndex: number) => number
  getIntroDuration?: (markerIndex: number) => number
}) {
  const trackEnd =
    offsets.length > 0
      ? offsets[offsets.length - 1] + widths[widths.length - 1]
      : 0

  // Intro sync: a card fades in when the rail tip reaches it, i.e. on
  // the schedule of the marker whose slot its center sits over — which
  // is usually days past its anchor.
  const markerIndexAt = (x: number) => {
    for (let index = offsets.length - 1; index >= 0; index--) {
      if (offsets[index] <= x) return index
    }
    return 0
  }

  return (
    <div className="pointer-events-none absolute inset-0">
      {markers.map((marker, index) => {
        const floatingPhotos = marker.photos?.filter((photo) => !photo.previewUrl) ?? []
        if (!floatingPhotos.length) return null

        // The card's free run: after this day's own text column, up to
        // the start of the next day that has text of its own.
        const zoneStart =
          offsets[index] + (marker.events.length > 0 ? TEXT_ZONE : 0)
        const nextTextIndex = markers.findIndex(
          (candidate, candidateIndex) =>
            candidateIndex > index && candidate.events.length > 0,
        )
        const zoneEnd =
          nextTextIndex === -1 ? trackEnd : offsets[nextTextIndex]

        // Stacks center as a group so a lone card sits in the middle
        // of the gap and a pile spreads evenly around it. Each card
        // starts STACK_OVERLAP of the way along the one beneath it.
        const steps: number[] = []
        let fan = 0
        for (const stacked of floatingPhotos) {
          steps.push(fan)
          fan += (stacked.width ?? CARD_WIDTH) * STACK_OVERLAP
        }
        const photoCount = floatingPhotos.length
        const lastPhoto = floatingPhotos[photoCount - 1]
        const groupWidth =
          steps[steps.length - 1] + (lastPhoto.width ?? CARD_WIDTH)

        return floatingPhotos.map((photo, photoIndex) => {
          const width = photo.width ?? CARD_WIDTH
          // Default home: centered in the text-free run between this
          // day's events and the next day that has text — comfortably
          // away from both columns.
          const x =
            photo.x !== undefined
              ? offsets[index] + photo.x * widths[index]
              : Math.max(
                  zoneStart,
                  zoneStart +
                    (zoneEnd - zoneStart - groupWidth) / 2 +
                    steps[photoIndex],
                )
          const introIndex = markerIndexAt(x + width / 2)
          // The last card of a stack sits level with the event text;
          // earlier cards hang progressively lower — the diagonal.
          const defaultY =
            EVENT_TOP + (photoCount - 1 - photoIndex) * CASCADE_Y

          return (
            <FloatingCard
              key={`${marker.id}-${photoIndex}`}
              photo={photo}
              stackIndex={photoIndex}
              stackCount={photoCount}
              x={x}
              defaultY={defaultY}
              width={width}
              animateIntro={animateIntro}
              introDelay={getIntroDelay?.(introIndex) ?? 0}
              introDuration={getIntroDuration?.(introIndex) ?? 420}
            />
          )
        })
      })}
    </div>
  )
}
