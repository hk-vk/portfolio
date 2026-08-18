import { useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { motion } from '../lib/motion';
import { Lifeline } from '../components/lifeline/lifeline';
import SEOHead from '../components/SEOHead';
import { archiveVersions, getArchiveVersion } from '../data/archiveVersions';

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
}).format(new Date(`${date}T00:00:00`));

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
      src={version.buildPath}
      title={title || `${version.title} portfolio preview`}
      loading="lazy"
      className="min-h-0 w-full flex-1 bg-background"
    />
  </div>
);

const archiveMarkers = [...archiveVersions].reverse().map((version, index) => ({
  id: version.id,
  year: index,
  age: `0${index + 1}`,
  label: version.date.slice(0, 7),
  events: [[
    { type: 'text', value: `${version.title}. ` },
    { type: 'link', value: 'Open build', href: version.buildPath },
  ]],
}));

const ArchiveLifeline = () => (
  <ThemeProvider attribute="class" disableTransitionOnChange>
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card/40">
      <Lifeline
        markers={archiveMarkers}
        birthYear={0}
        title="Portfolio archive timeline"
        mode="embed"
        className="h-[31rem] md:h-[29rem]"
      />
    </div>
  </ThemeProvider>
);

const ArchiveCard = ({ version, position }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, delay: position * 0.06 }}
    className="grid gap-5 border-t border-border/70 py-8 md:grid-cols-[minmax(0,1.15fr)_minmax(17rem,.85fr)] md:gap-10"
  >
    <Link
      to={`/archive/${version.year}/${version.id}`}
      className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border/60 bg-muted/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={`View ${version.title}`}
    >
      <iframe
        src={version.buildPath}
        title=""
        aria-hidden="true"
        tabIndex="-1"
        loading="lazy"
        className="pointer-events-none absolute left-0 top-0 h-[160%] w-[160%] origin-top-left scale-[.625] bg-background transition-transform duration-500 group-hover:scale-[.64]"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
    </Link>

    <div className="flex flex-col justify-between py-1">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
          <time dateTime={version.date}>{formatDate(version.date)}</time>
          <span>{version.commit}</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{version.title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {version.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {version.highlights.map((highlight) => (
            <span key={highlight} className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4">
        <Link
          to={`/archive/${version.year}/${version.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
        >
          View build
          <Icon icon="tabler:arrow-up-right" className="h-4 w-4" />
        </Link>
        <a
          href={version.buildPath}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Open full site
        </a>
      </div>
    </div>
  </motion.article>
);

const CompareViewer = ({ older, newer }) => {
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
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="compare-heading" className="text-2xl font-bold md:text-3xl">Compare the builds</h2>
          <p className="mt-2 text-sm text-muted-foreground">Drag across the preview to move between the two versions.</p>
        </div>
        <div className="flex gap-4 font-mono text-xs text-muted-foreground">
          <span>{older.year} {older.title}</span>
          <span>{newer.year} {newer.title}</span>
        </div>
      </div>

      <div
        ref={stageRef}
        className="relative aspect-[4/3] touch-none select-none overflow-hidden rounded-xl border border-border bg-card shadow-xl md:aspect-[16/9]"
        onPointerDown={handlePointerDown}
        onPointerMove={(event) => event.currentTarget.hasPointerCapture(event.pointerId) && setPositionFromPointer(event)}
      >
        <iframe src={older.buildPath} title={`${older.title}, older version`} className="absolute inset-0 h-full w-full bg-background" />
        <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <iframe src={newer.buildPath} title={`${newer.title}, newer version`} className="h-full w-full bg-background" />
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
      All archive builds
    </Link>
    <div className="mb-7 mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">{formatDate(version.date)} / {version.commit}</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{version.title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{version.description}</p>
      </div>
      <a href={version.buildPath} target="_blank" rel="noreferrer" className="button-primary inline-flex shrink-0 items-center gap-2 self-start md:self-auto">
        Open full site
        <Icon icon="tabler:arrow-up-right" className="h-4 w-4" />
      </a>
    </div>
    <BrowserFrame version={version} className="aspect-[4/3] md:aspect-[16/10]" />
  </section>
);

const Archive = () => {
  const { year, slug } = useParams();
  const selectedVersion = useMemo(() => getArchiveVersion(year, slug), [year, slug]);
  const newer = archiveVersions[0];
  const older = archiveVersions[archiveVersions.length - 1];

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
            <header className="grid gap-8 pb-14 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end md:pb-20">
              <div>
                <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-primary">Portfolio archive</p>
                <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                  The site before this site.
                </h1>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                A local record of the portfolio as it changed, rebuilt directly from selected Git commits.
              </p>
            </header>

            <section aria-labelledby="archive-rail-heading">
              <div className="mb-5 flex items-end justify-between gap-4">
                <h2 id="archive-rail-heading" className="text-2xl font-bold md:text-3xl">Browse the builds</h2>
                <span className="font-mono text-xs text-muted-foreground">10 milestones</span>
              </div>
              <ArchiveLifeline />
            </section>

            <CompareViewer older={older} newer={newer} />
          </>
        )}
      </div>
    </>
  );
};

export default Archive;
