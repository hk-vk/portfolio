"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
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

function LifelinePreviewModal({
  photo,
  onClose,
}: {
  photo: LifelinePhoto
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  if (!photo.previewUrl) return null

  const displayPath = photo.previewUrl
    .replace(/^https?:\/\/[^/]+/, 'hari.works')
    .replace('/archive-builds/', '/archive/')
    .replace(/[?].*$/, '')

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={onClose}
    >
      <div
        className="flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border/60 bg-muted/30 px-3 py-2">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <button
              type="button"
              onClick={onClose}
              className="h-2.5 w-2.5 rounded-full border-0 bg-primary/80 p-0"
              aria-label="Close site preview"
            />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="min-w-0 flex-1 truncate rounded-md border border-border/60 bg-background px-3 py-1 font-mono text-[10px] text-muted-foreground">
            {displayPath}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-1 focus-visible:ring-offset-card"
            aria-label="Close site preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="aspect-[9/16] max-h-[calc(100dvh-8rem)] bg-background sm:aspect-[16/10] sm:max-h-none">
          <iframe
            src={photo.previewUrl}
            title={photo.alt}
            className="archive-preview-frame h-full w-full border-0 bg-background"
          />
        </div>
      </div>
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
            "relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-[oklch(0_0_0_/_0.1)] transition-[transform,box-shadow] duration-200 ease-out dark:ring-[oklch(1_0_0_/_0.1)]",
            photo.previewUrl && "bg-background/80 p-1.5",
            animateIntro && "lifeline-marker-intro",
            "group-hover/photo:scale-[1.03] group-hover/photo:shadow-2xl",
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
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="pointer-events-none block aspect-[16/10] w-full rounded-[0.85rem] object-cover"
              />
              <span
                className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] font-medium tracking-wide text-foreground shadow-sm"
                aria-hidden="true"
              >
                Open preview
              </span>
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
