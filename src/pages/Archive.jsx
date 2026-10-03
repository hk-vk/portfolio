import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { LifelineDesktop } from '../components/lifeline/lifeline-desktop';
import { LifelineFireworksProvider } from '../components/lifeline/lifeline-fireworks';
import { LifelinePhotoCard } from '../components/lifeline/lifeline-photos';
import { LifelineSketchRail } from '../components/lifeline/lifeline-sketch-rail';
import SEOHead from '../components/SEOHead';
import { fetchArchiveVersions } from '../lib/archive-api';

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`));

const formatTimelineDate = (date) => new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T00:00:00Z`));

const BrowserFrame = ({ version, title, className = '' }) => (
  <div className={`flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm ${className}`}>
    <div className="flex h-9 items-center gap-2 border-b border-border/50 bg-muted/30 px-3">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
        hari.works/archive/{version.year}/{version.id}
      </span>
    </div>
    <iframe
      src={version.buildUrl}
      title={title || `${version.title} portfolio preview`}
      loading="lazy"
      className="min-h-0 w-full flex-1 bg-background"
    />
  </div>
);

const createArchiveMarkers = (versions) => versions.map((version, index) => ({
  id: version.id,
  year: index,
  label: formatTimelineDate(version.date),
  events: [[
    { type: 'text', value: version.title },
  ]],
  photos: [{
    src: version.id === 'live' ? '' : version.previewUrl,
    alt: formatTimelineDate(version.date),
    previewUrl: version.buildUrl,
    width: 340,
    x: 0.5,
    y: 72 + (index % 2) * 20,
    rotate: 0,
  }],
}));

const ArchiveLifeline = ({ versions }) => {
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const carouselRef = useRef(null);
  useEffect(() => {
    const root = carouselRef.current;
    if (!mobile || !root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, intersectionRatio }) => {
        target.style.opacity = intersectionRatio >= 0.8 ? '1' : '0.55';
      });
    }, { root, threshold: [0, 0.8, 1] });
    root.querySelectorAll('[data-archive-slide]').forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [mobile, versions]);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  if (mobile) return (
    <div className="relative h-full pt-6">
      <LifelineSketchRail className="pointer-events-none absolute left-0 top-[3.5rem] h-5 w-full" />
      <div ref={carouselRef} data-lenis-prevent className="flex h-full snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-1 pb-8 [scrollbar-width:none]" style={{ scrollPaddingLeft: 4 }} tabIndex={0} aria-label="Swipe through portfolio versions">
        {createArchiveMarkers(versions).map((marker) => (
          <div key={marker.id} data-archive-slide className="w-[85%] shrink-0 snap-start snap-always transition-opacity duration-150 ease-out motion-reduce:transition-none">
            <p className="text-sm text-muted-foreground">{marker.label}</p>
            <p className="mb-4 mt-8 text-base font-medium">{marker.events[0][0].value}</p>
            <LifelinePhotoCard photo={marker.photos[0]} rotate={0} width={340} className="relative !w-full" />
          </div>
        ))}
        <div className="w-[15%] shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
  return (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <div className="archive-timeline h-full overflow-hidden">
      <LifelineFireworksProvider>
      <LifelineDesktop
        markers={createArchiveMarkers(versions)}
        birthYear={0}
        title="Portfolio archive timeline"
        mode="auto"
        playIntro={false}
        className="h-full"
      />
      </LifelineFireworksProvider>
    </div>
  </ThemeProvider>
  );
};

const VersionDetail = ({ version }) => (
  <section className="pt-8">
    <Link to="/archive" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
      <Icon icon="tabler:arrow-left" className="h-4 w-4" />
      Back to archive
    </Link>
    <div className="mb-7 mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">{formatDate(version.date)}</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{version.title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{version.description}</p>
      </div>
    </div>
    <BrowserFrame version={version} className="aspect-[4/3] md:aspect-[16/10]" />
  </section>
);

const Archive = () => {
  const { year, slug } = useParams();
  const [archiveVersions, setArchiveVersions] = useState([]);
  const [archiveError, setArchiveError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setArchiveError('');
    fetchArchiveVersions(controller.signal)
      .then((versions) => {
        const live = {
          id: 'live',
          year: String(new Date().getFullYear()),
          slug: 'current',
          title: 'Current portfolio',
          commit: 'live',
          date: new Date().toISOString().slice(0, 10),
          description: 'The site you are on right now, always pointing at the live deployment.',
          highlights: ['Live site', 'Always current'],
          buildUrl: `${window.location.origin}/`,
          previewUrl: `${window.location.origin}/`,
        };
        const all = [live, ...versions];
        setArchiveVersions(all);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setArchiveError('The archive is unavailable right now.');
      });
    return () => controller.abort();
  }, [attempt]);

  const selectedVersion = useMemo(
    () => archiveVersions.find((version) => version.year === year && version.id === slug),
    [archiveVersions, year, slug],
  );
  const isLoading = archiveVersions.length === 0 && !archiveError;

  return (
    <>
      <SEOHead
        title="Portfolio Archive | Harikrishnan V K"
        description="Browse and compare earlier versions of Harikrishnan's portfolio."
        url={selectedVersion ? `/archive/${selectedVersion.year}/${selectedVersion.id}` : '/archive'}
      />
      <div className={`content-container min-h-[100dvh] pb-32 pt-16 ${selectedVersion ? 'md:pt-24' : 'flex h-[100dvh] min-h-0 flex-col pb-24 pt-6 md:pt-8'}`}>
        {selectedVersion ? (
          <VersionDetail version={selectedVersion} />
        ) : (
          <>
            <header className="max-w-3xl shrink-0 pb-4 md:max-w-none md:pb-2">
              <h1 className="text-2xl font-bold leading-[1.15] tracking-tight md:text-3xl">
                My little Wayback Machine.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty md:max-w-none" aria-live="polite">
                {archiveError || (isLoading ? 'Winding back the clock…' : 'See how my portfolio has changed over time. Pick a version to look around.')}
              </p>
              {archiveError && (
                <button
                  type="button"
                  onClick={() => setAttempt((value) => value + 1)}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Icon icon="tabler:refresh" className="size-4" aria-hidden="true" />
                  Try again
                </button>
              )}
            </header>

            {isLoading && (
              <div className="mt-10 flex gap-6 overflow-hidden md:ml-24" aria-hidden="true">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="w-full max-w-[21rem] shrink-0 space-y-3">
                    <div className="h-3 w-28 rounded-full bg-muted motion-safe:animate-pulse" />
                    <div className="h-4 w-40 rounded-full bg-muted motion-safe:animate-pulse" />
                    <div className="aspect-[16/11] rounded-xl bg-muted/70 motion-safe:animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !archiveError && (
              <section className="min-h-0 flex-1" aria-label="Archive milestones">
                <ArchiveLifeline versions={archiveVersions} />
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Archive;
