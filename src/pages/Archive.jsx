import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Lifeline } from '../components/lifeline/lifeline';
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

const ArchiveLifeline = ({ versions }) => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <div className="overflow-hidden">
      <Lifeline
        markers={createArchiveMarkers(versions)}
        birthYear={0}
        title="Portfolio archive timeline"
        mode="auto"
        playIntro={false}
        className="h-[27rem] md:h-[29rem]"
      />
    </div>
  </ThemeProvider>
);

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
      <div className="content-container min-h-[100dvh] pb-32 pt-16 md:pt-24">
        {selectedVersion ? (
          <VersionDetail version={selectedVersion} />
        ) : (
          <>
            <header className="max-w-3xl pb-4 md:pb-6">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                My little Wayback Machine.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty md:text-base" aria-live="polite">
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
              <section aria-label="Archive milestones">
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
