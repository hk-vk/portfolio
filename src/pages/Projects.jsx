import React, { useEffect, useRef, useState } from 'react';
import { motion } from '../lib/motion';
import { Icon } from '@iconify/react';
import { useMotionSafe } from '../utils/useMotionSafe';
import SparkleIllustration from '../components/SparkleIllustration';
import { useSocialPopover } from '../context/SocialPopoverContext';
import SEOHead from '../components/SEOHead';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { posthog } from '../utils/analytics';

const R2_BASE_URL = 'https://pub-cb8a9661c7ce4889b03ae3b69d7df50f.r2.dev';

const projects = [
  {
    id: '01',
    title: 'TXTSKILLS',
    description: 'Convert llms.txt documentation into installable agent skills for Claude Code, Cursor, Windsurf, Copilot, and more.',
    fullDescription: 'txtskills is a developer tool that transforms llms.txt documentation into installable skills for AI agents. It streamlines the workflow from docs ingestion to generated skill output, with a web interface, CLI packaging, and publishing-ready outputs for agent ecosystems.',
    category: 'Web App',
    tags: ['Next.js', 'TypeScript', 'Cloudflare', 'AI Agents', 'CLI'],
    image: 'https://pub-cb8a9661c7ce4889b03ae3b69d7df50f.r2.dev/Screenshot%20from%202026-02-14%2023-14-57.png',
    liveUrl: 'https://txtskills.hari.works/',
    githubUrl: 'https://github.com/hk-vk/txtskills',
    techStack: ['Next.js', 'TypeScript', 'Cloudflare Workers', 'Turborepo', 'pnpm Workspaces'],
    features: ['llms.txt Parsing', 'Skill Generation', 'Install Command Output', 'Web + CLI Workflow', 'Publishing Pipeline'],
    challenges: 'Maintaining reliable conversion quality across different llms.txt structures while keeping generation and publish flow simple for developers.',
    solutions: 'Implemented structured parsing, validation-first generation steps, and a clean web workflow that maps directly to installable skill artifacts.'
  },
  {
    id: '02',
    title: 'Git Talks',
    description: 'Transform any GitHub repository into an immersive audio experience with AI-generated podcast episodes about architecture, design decisions, and code.',
    fullDescription: 'Git Talks turns repositories into listenable technical breakdowns. It analyzes GitHub projects, generates a script around architecture and implementation decisions, and produces a two-host podcast-style audio experience for developers who want to understand codebases faster.',
    category: 'Web App',
    tags: ['AI', 'GitHub', 'Podcast', 'TTS', 'Code Analysis'],
    image: 'https://pub-cb8a9661c7ce4889b03ae3b69d7df50f.r2.dev/199shots_so%20(1).png',
    liveUrl: 'https://gittalks.vercel.app',
    githubUrl: 'https://github.com/hkvk/gittalks',
    techStack: ['Web App', 'Google Gemini', 'Kokoro TTS', 'GitHub Repositories', 'Vercel'],
    features: ['Repository Analysis', 'AI Podcast Script Generation', 'Two-Host Audio Format', 'Popular Repo Discovery', 'Instant Listening Experience'],
    challenges: 'Summarizing unfamiliar codebases into clear audio narratives without losing the important architectural decisions and implementation details.',
    solutions: 'Structured the pipeline around repository analysis, focused script generation, and natural-sounding TTS output so the result stays informative and easy to consume.',
  },
  {
    id: '03',
    title: 'CodexPilot',
    description: 'A fork of Codex CLI for using Codex models through your GitHub Copilot subscription.',
    fullDescription: 'CodexPilot is an independent fork of OpenAI Codex that keeps its own local app state while supporting both OpenAI and GitHub Copilot providers. It adds practical developer workflows like provider switching and resuming upstream Codex sessions from /resume.',
    category: 'Developer Tool',
    tags: ['Rust', 'CLI', 'GitHub Copilot', 'OpenAI', 'Developer Tooling'],
    image: 'https://repository-images.githubusercontent.com/1200509020/64db259f-1b41-4887-b4bc-257f45696fc1',
    githubUrl: 'https://github.com/hk-vk/codexpilot',
    techStack: ['Rust', 'CLI', 'Node.js', 'pnpm Workspaces'],
    features: ['GitHub Copilot Support', 'Provider Switching', 'Separate Local State (~/.codexpilot)', 'Resume Upstream Sessions', 'Independent Fork Identity'],
    challenges: 'Keeping fork behavior and local state isolated from upstream Codex while still enabling useful cross-session resume workflows.',
    solutions: 'Maintained separate runtime/auth/config paths and added explicit resume pathways that surface upstream sessions without inheriting upstream runtime config.'
  },
  {
    id: '04',
    title: 'YEAH - Fake News Detector',
    description: 'This web app integrates text analysis, image recognition, URL examination, and reverse image search to effectively detect fake news.',
    fullDescription: 'A comprehensive fake news detection system that combines multiple AI technologies including natural language processing, computer vision, and web scraping to analyze and verify news content across different media formats.',
    category: 'Web App',
    tags: ['TypeScript', 'React', 'Fake News Detection', 'AI/ML', 'Computer Vision'],
    image: `${R2_BASE_URL}/yeahpreview.png`,
    video: '/projects/videos/yeah-demo.mp4',
    liveUrl: 'https://www.yeahml.live',
    githubUrl: 'https://github.com/hk-vk/yeah',
    techStack: ['TypeScript', 'React', 'Node.js', 'OpenAI API', 'Computer Vision APIs', 'Vercel'],
    features: ['Text Analysis', 'Image Recognition', 'URL Verification', 'Reverse Image Search', 'Real-time Detection'],
    challenges: 'Integrating multiple AI services while maintaining fast response times and handling various media formats.',
    solutions: 'Implemented efficient caching, parallel processing, and progressive enhancement for optimal user experience.'
  },
  {
    id: '05',
    title: 'CommitStoryGen',
    description: 'A web App that generates a storyline based on the commit history of a github repo',
    fullDescription: 'An innovative tool that transforms boring commit histories into engaging narratives, helping developers showcase their project journey in a more compelling way.',
    category: 'Web App',
    tags: ['JavaScript', 'Node.js', 'GitHub API', 'Story Generation', 'Data Visualization'],
    image: 'https://i.ibb.co/3mZDXJPg/image.png',
    video: '/projects/videos/commitstorygen-demo.mp4',
    liveUrl: 'https://commitstorygen.vercel.app/',
    githubUrl: 'https://github.com/hk-vk/commitstorygen',
    techStack: ['JavaScript', 'Node.js', 'GitHub API', 'Chart.js', 'Express', 'Netlify'],
    features: ['GitHub Integration', 'Story Generation', 'Commit Visualization', 'Export Options', 'Timeline View'],
    challenges: 'Processing large repositories efficiently and generating meaningful narratives from technical commit messages.',
    solutions: 'Implemented smart filtering, natural language processing, and progressive loading for better performance.'
  },
  {
    id: '06',
    title: 'PDFx - Offline PDF Toolkit',
    description: 'A fully offline PDF manipulation toolkit with all processing done in your browser',
    fullDescription: 'A privacy-focused PDF manipulation suite that runs entirely in the browser, ensuring your documents never leave your device while providing professional-grade PDF editing capabilities.',
    category: 'Web App',
    tags: ['TypeScript', 'WebAssembly', 'PDF', 'Privacy', 'Offline-First'],
    image: `${R2_BASE_URL}/image.png`,
    video: '/projects/videos/pdfx-demo.mp4',
    liveUrl: 'https://pdfx-8su.pages.dev/',
    githubUrl: 'https://github.com/hk-vk/pdfX',
    techStack: ['TypeScript', 'WebAssembly', 'PDF-lib', 'React', 'Vite', 'Service Workers'],
    features: ['Merge PDFs', 'Split PDFs', 'Compress Files', 'Add Watermarks', 'Extract Pages', 'OCR Support'],
    challenges: 'Implementing complex PDF operations in the browser while maintaining performance and file size limits.',
    solutions: 'Leveraged WebAssembly for heavy computations and implemented chunked processing for large files.'
  },
  {
    id: '07',
    title: 'Cricket Score Widget',
    description: 'An always-on-top Windows desktop application for live cricket scores built with Electron and React',
    fullDescription: 'A simple system tray widget for Windows that displays live cricket scores from Cricbuzz. Features include fetching live match lists, detailed scorecards, match status updates, pinning functionality, light/dark theme toggling, and auto-refresh capabilities.',
    category: 'Desktop App',
    tags: ['Electron', 'React', 'JavaScript', 'Desktop', 'System Tray', 'Windows'],
    image: `${R2_BASE_URL}/Screenshot-2025-07-06-020503.png`,
    video: '/projects/videos/cricket-widget-demo.mp4',
    githubUrl: 'https://github.com/hk-vk/cricket-score-widget',
    techStack: ['Electron', 'React', 'Vite', 'Node.js', 'Cheerio', 'CSS'],
    features: ['Live Cricket Scores', 'System Tray Integration', 'Always-on-Top Window', 'Light/Dark Theme', 'Auto-refresh', 'Draggable Interface'],
    challenges: 'Creating a system tray application with real-time data fetching while maintaining performance and user experience.',
    solutions: 'Implemented efficient data scraping, optimized refresh intervals, and created an intuitive always-on-top interface.'
  },
];

const settle = [0.22, 1, 0.36, 1];
const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring';

const ProjectPreview = ({ project, className = '' }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className={'flex items-center justify-center overflow-hidden bg-muted/30 ' + className}>
      {failed ? (
        <div className="flex flex-col items-center gap-2 p-8 text-center text-muted-foreground">
          <Icon icon="tabler:photo-off" className="size-6" aria-hidden="true" />
          <p className="text-sm">Preview unavailable</p>
        </div>
      ) : (
        <img src={project.image} alt={project.title + ' project preview'} loading="lazy" decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10" />
      )}
    </div>
  );
};

const ProjectLinks = ({ project, source }) => (
  <div className="flex flex-wrap items-center gap-3">
    {[{ url: project.liveUrl, label: 'Visit site', icon: 'tabler:arrow-up-right', type: 'live_demo' },
      { url: project.githubUrl, label: 'Source code', icon: 'tabler:brand-github', type: 'source_code' }]
      .filter((link) => link.url).map((link) => (
        <a key={link.type} href={link.url} target="_blank" rel="noopener noreferrer"
          className={'pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-md text-sm text-foreground/90 underline decoration-border underline-offset-4 hover:decoration-current ' + focusRing}
          onClick={() => posthog?.capture('project_link_clicked', {
            source, link_type: link.type, project_id: project.id, project_title: project.title, link_url: link.url,
          })}>
          <Icon icon={link.icon} className="size-4" aria-hidden="true" />
          {link.label}<span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      ))}
  </div>
);

const ProjectCard = React.memo(({ project, onOpen }) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card">
      <button type="button" onClick={onOpen}
        aria-label={'View ' + project.title + ' project details'}
        aria-haspopup="dialog"
        className="peer absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
        <span className="sr-only">View {project.title} project details</span>
      </button>
      <div className="overflow-hidden transition-transform duration-150 motion-safe:peer-active:scale-[0.96] motion-reduce:transition-none">
        <div className="transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none">
          <ProjectPreview project={project} className="aspect-video" />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-3 pt-4">
        <p className="mb-2 text-xs text-muted-foreground">{project.category}</p>
        <h2 className="text-lg font-semibold leading-tight">{project.title}</h2>
        <p className="mb-3 mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{project.tags.slice(0, 3).join(' · ')}</p>
        <div className="pointer-events-none relative z-20 mt-auto flex flex-wrap items-center justify-between gap-x-3 border-t border-border/50 pt-1">
          <ProjectLinks project={project} source="projects_card" />
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            Details <Icon icon="tabler:arrow-right" className="size-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
});
ProjectCard.displayName = 'ProjectCard';

const ProjectDetails = ({ project, index, count, onClose, onMove, animateProject }) => {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const opened = useRef(false);
  const motionSafe = useMotionSafe() && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && animateProject;
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const wasStopped = lenis?.isStopped;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (!wasStopped) lenis?.start();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [lenis]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    opened.current = true;
  }, [project.id]);

  const close = (method) => {
    posthog?.capture('project_modal_closed', {
      project_id: project.id, project_title: project.title, close_method: method,
    });
    onClose();
  };
  const previous = projects[(index - 1 + count) % count];
  const next = projects[(index + 1) % count];

  return (
    <motion.dialog ref={dialogRef} aria-labelledby="project-detail-title" aria-describedby="project-detail-summary"
      data-lenis-prevent
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden bg-black/60 p-0 text-foreground backdrop:bg-transparent sm:p-5 lg:p-8"
      initial={false}
      onCancel={(event) => { event.preventDefault(); close('escape'); }}
      onClick={(event) => { if (event.target === event.currentTarget) close('backdrop'); }}>
      <motion.div
        className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden bg-background sm:rounded-2xl"
        initial={motionSafe ? { opacity: 0, transform: 'translateY(8px) scale(0.98)' } : false}
        animate={motionSafe ? { opacity: 1, transform: 'translateY(0px) scale(1)' } : { opacity: 1 }}
        transition={{ duration: 0.22, ease: settle }}>
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border/50 px-5 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-8">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{project.category} <span aria-hidden="true">·</span> {index + 1} of {count}</p>
            <h2 id="project-detail-title" className="mt-1 truncate text-lg font-semibold sm:text-xl">{project.title}</h2>
          </div>
          <motion.button type="button" autoFocus aria-label="Close project details" onClick={() => close('close_button')}
            whileTap={motionSafe ? { scale: 0.96 } : undefined} transition={{ duration: 0.15 }}
            className={'grid size-11 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted/60 hover:text-foreground ' + focusRing}>
            <Icon icon="tabler:x" className="size-5" aria-hidden="true" />
          </motion.button>
        </header>
        <div ref={scrollRef} data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <motion.div key={project.id}
            initial={opened.current && motionSafe ? { opacity: 0, transform: 'translateY(8px)' } : false}
            animate={motionSafe ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 1 }}
            transition={{ duration: 0.18, ease: settle }}>
            <div className="grid items-start gap-6 px-5 pt-5 sm:px-8 sm:pt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
              <ProjectPreview key={project.id} project={project} className="order-2 aspect-[16/10] w-full rounded-xl lg:order-1" />
              <div className="order-1 lg:order-2">
                <p id="project-detail-summary" className="mb-3 max-w-[65ch] text-base leading-relaxed text-muted-foreground sm:text-lg">{project.description}</p>
                <ProjectLinks project={project} source="projects_modal" />
                <div className="mt-5 hidden lg:block">
                  <h3 className="mb-3 text-sm font-medium">Built with</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{project.techStack.join(' · ')}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-8 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-8">
              <div className="space-y-7">
                <section>
                  <h3 className="mb-3 text-lg font-semibold">About the project</h3>
                  <p className="max-w-[65ch] text-sm leading-7 text-muted-foreground">{project.fullDescription}</p>
                </section>
                <section>
                  <h3 className="mb-3 text-lg font-semibold">Building it</h3>
                  <p className="max-w-[65ch] text-sm leading-7 text-muted-foreground">{project.challenges}</p>
                  <p className="mt-3 max-w-[65ch] text-sm leading-7 text-muted-foreground">{project.solutions}</p>
                </section>
              </div>
              <div className="space-y-7">
                <section>
                  <h3 className="mb-3 text-lg font-semibold">What it does</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm leading-6">
                        <Icon icon="tabler:check" className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="lg:hidden">
                  <h3 className="mb-3 text-lg font-semibold">Built with</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{project.techStack.join(' · ')}</p>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-border/50 bg-background px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-7">
          <button type="button" onClick={(event) => onMove(-1, event.detail === 0)} disabled={count <= 1}
            aria-label={'Previous project: ' + previous.title}
            className={'flex min-h-11 min-w-0 items-center gap-2 rounded-md px-1 text-sm hover:text-primary ' + focusRing}>
            <Icon icon="tabler:arrow-left" className="size-4 shrink-0" aria-hidden="true" />
            <span><span className="block text-left text-xs text-muted-foreground">Previous</span><span className="hidden max-w-64 truncate sm:block">{previous.title}</span></span>
          </button>
          <button type="button" onClick={(event) => onMove(1, event.detail === 0)} disabled={count <= 1}
            aria-label={'Next project: ' + next.title}
            className={'flex min-h-11 min-w-0 items-center gap-2 rounded-md px-1 text-sm hover:text-primary ' + focusRing}>
            <span><span className="block text-right text-xs text-muted-foreground">Next</span><span className="hidden max-w-64 truncate sm:block">{next.title}</span></span>
            <Icon icon="tabler:arrow-right" className="size-4 shrink-0" aria-hidden="true" />
          </button>
        </footer>
      </motion.div>
    </motion.dialog>
  );
};

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [animateProject, setAnimateProject] = useState(true);
  const { toggleSocialPopover } = useSocialPopover();
  const contactButtonRef = useRef(null);
  const selectedProjectIndex = projects.findIndex((project) => project.id === selectedProjectId);
  const selectedProject = projects[selectedProjectIndex];

  const moveModal = (direction, keyboard = false) => {
    setAnimateProject(!keyboard);
    const nextIndex = (selectedProjectIndex + direction + projects.length) % projects.length;
    posthog?.capture('project_modal_navigated', {
      direction: direction > 0 ? 'next' : 'previous', project_id: selectedProjectId,
    });
    setSelectedProjectId(projects[nextIndex].id);
  };

  return (
    <>
      <SEOHead title="Projects | Harikrishnan V K"
        description="Explore web applications and developer tools built by Harikrishnan V K." url="/projects" />
      <div className="relative overflow-hidden pb-28 pt-10 md:pt-14">
        <div className="content-container">
          <header className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <div className="flex items-center gap-3">
                <SparkleIllustration className="text-primary" size={22} />
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Projects</h1>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Web apps, developer tools, and things I built to solve everyday problems.</p>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={(event) => {
                setAnimateProject(event.detail > 0);
                setSelectedProjectId(project.id);
                posthog?.capture('project_modal_opened', { project_id: project.id, project_title: project.title, category: project.category });
              }} />
            ))}
          </div>
          <section className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold">Have something in mind?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Open to collaborating on useful, thoughtfully built products.</p>
            </div>
            <button ref={contactButtonRef} type="button"
              onClick={() => {
                posthog?.capture('projects_contact_cta_clicked', { cta_label: 'Get in touch' });
                toggleSocialPopover(contactButtonRef);
              }}
              className={'inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-current ' + focusRing}>
              Get in touch <Icon icon="tabler:arrow-up-right" className="size-4" aria-hidden="true" />
            </button>
          </section>
        </div>
      </div>
      {selectedProject && <ProjectDetails project={selectedProject} index={selectedProjectIndex} count={projects.length} animateProject={animateProject}
        onClose={() => setSelectedProjectId(null)} onMove={moveModal} />}
    </>
  );
};

export default Projects;
