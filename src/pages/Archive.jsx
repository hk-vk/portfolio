import { useEffect, useMemo, useRef, useState } from 'react';
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
      <span className="h-2 w-2 rounded-full bg-primary/70" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
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

const createArchiveMarkers = (versions) => [...versions].reverse().map((version, index) => ({
  id: version.id,
  year: index,
  age: `0${index + 1}`,
  label: formatTimelineDate(version.date),
  events: [[
    { type: 'text', value: `${version.title}.` },
  ]],
  photos: [{
    src: version.previewUrl,
    alt: `${version.title} site preview`,
    previewUrl: version.buildUrl,
    width: 220,
    x: 0.08,
    y: 160,
    rotate: index % 2 === 0 ? -2 : 2,
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
        className="h-[27rem] md:h-[25rem]"
      />
    </div>
  </ThemeProvider>
);

const CompareViewer = ({ older, newer, versions, onOlderChange, onNewerChange }) => {
  const [position, setPosition] = useState(50);
  const stageRef = useRef(null);

  const setPositionFromPointer = (event) => {
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((event.clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  };

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setPositionFromPointer(event);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') setPosition((value) => Math.max(4, value - 2));
    if (event.key === 'ArrowRight') setPosition((value) => Math.min(96, value + 2));
  };

  return (
    <section className="mt-14" aria-labelledby="compare-heading">
      <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="compare-heading" className="text-2xl font-bold md:text-3xl">Compare the versions</h2>
          <p className="mt-2 text-sm text-muted-foreground">Pick two moments, then drag the line to see what changed.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:min-w-[24rem]">
          <label className="min-w-0">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Older</span>
            <select
              value={older.id}
              onChange={(event) => onOlderChange(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {versions.map((version) => (
                <option key={version.id} value={version.id} disabled={version.id === newer.id}>
                  {version.year} / {version.title}
                </option>
              ))}
            </select>
          </label>
          <label className="min-w-0">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Newer</span>
            <select
              value={newer.id}
              onChange={(event) => onNewerChange(event.target.value)}
              className="w-full min-w-0 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {versions.map((version) => (
                <option key={version.id} value={version.id} disabled={version.id === older.id}>
                  {version.year} / {version.title}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative aspect-[4/3] touch-none select-none overflow-hidden rounded-xl border border-border bg-card shadow-xl md:aspect-[16/9]"
        onPointerDown={handlePointerDown}
        onPointerMove={(event) => event.currentTarget.hasPointerCapture(event.pointerId) && setPositionFromPointer(event)}
      >
        <iframe src={older.buildUrl} title={`${older.title}, older version`} className="pointer-events-none absolute inset-0 h-full w-full bg-background" />
        <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <iframe src={newer.buildUrl} title={`${newer.title}, newer version`} className="pointer-events-none h-full w-full bg-background" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,.25)]" style={{ left: `${position}%` }} />
        <button
          type="button"
          role="slider"
          aria-label="Portfolio comparison position"
          aria-valuemin="4"
          aria-valuemax="96"
          aria-valuenow={Math.round(position)}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-background text-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
          style={{ left: `${position}%` }}
        >
          <Icon icon="tabler:arrows-left-right" className="h-5 w-5" />
        </button>
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">Older</span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur">Newer</span>
      </div>
    </section>
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
        <p className="mb-3 font-mono text-xs text-muted-foreground">{formatDate(version.date)} / {version.commit}</p>
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
  const [olderId, setOlderId] = useState('');
  const [newerId, setNewerId] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchArchiveVersions(controller.signal)
      .then((versions) => {
        setArchiveVersions(versions);
        setOlderId((current) => current || versions.at(-1)?.id || '');
        setNewerId((current) => current || versions[0]?.id || '');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setArchiveError('The archive is unavailable right now.');
      });
    return () => controller.abort();
  }, []);

  const selectedVersion = useMemo(
    () => archiveVersions.find((version) => version.year === year && version.id === slug),
    [archiveVersions, year, slug],
  );
  const newer = archiveVersions.find((version) => version.id === newerId) || archiveVersions[0];
  const older = archiveVersions.find((version) => version.id === olderId) || archiveVersions.at(-1);
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
            <header className="max-w-3xl pb-12 md:pb-16">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                How this site took shape.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {archiveError || (isLoading ? 'Loading the archive…' : 'These are the versions that led here. Click any one to open it.')}
              </p>
            </header>

            {!isLoading && !archiveError && (
              <>
                <section aria-label="Archive milestones">
                  <ArchiveLifeline versions={archiveVersions} />
                </section>

                <CompareViewer
                  older={older}
                  newer={newer}
                  versions={archiveVersions}
                  onOlderChange={setOlderId}
                  onNewerChange={setNewerId}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Archive;
