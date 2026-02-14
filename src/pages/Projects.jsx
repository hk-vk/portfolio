import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';
import { useSocialPopover } from '../context/SocialPopoverContext';
import SEOHead from '../components/SEOHead';

const R2_BASE_URL = 'https://pub-cb8a9661c7ce4889b03ae3b69d7df50f.r2.dev';

const projects = [
  {
    id: '01',
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
    id: '02',
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
    id: '03',
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
    id: '04',
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
  }
];

const SectionDivider = () => (
  <div className="section-divider" aria-hidden="true">
    <span className="section-divider-rail" />
    <span className="section-divider-core" />
  </div>
);

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const { toggleSocialPopover } = useSocialPopover();
  const contactButtonRef = useRef(null);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );

  const filteredProjects = useMemo(
    () => (selectedCategory === 'All' ? projects : projects.filter((project) => project.category === selectedCategory)),
    [selectedCategory]
  );

  const selectedProject = useMemo(
    () => filteredProjects.find((project) => project.id === selectedProjectId) || projects.find((project) => project.id === selectedProjectId) || null,
    [selectedProjectId, filteredProjects]
  );

  const selectedProjectIndex = useMemo(
    () => (selectedProject ? filteredProjects.findIndex((project) => project.id === selectedProject.id) : -1),
    [filteredProjects, selectedProject]
  );

  const moveModal = (direction) => {
    if (!selectedProject || filteredProjects.length <= 1) return;
    const nextIndex = (selectedProjectIndex + direction + filteredProjects.length) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[nextIndex].id);
  };

  return (
    <>
      <SEOHead
        title="Projects | Harikrishnan V K"
        description="Explore my portfolio of web applications, mobile apps, and development projects. Built with React, Node.js, Python, and modern technologies."
        url="/projects"
      />

      <div className="pt-20 md:pt-24 pb-20 overflow-hidden relative">
        <div className="content-container">
          <AnimatedSection>
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center mb-4">
                <SparkleIllustration className="text-primary mr-3" size={22} />
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider leading-[1.12] pb-[0.08em]">PROJECTS</h1>
              </div>
              <div className="w-14 h-px bg-primary/40 mx-auto" />
            </motion.div>
          </AnimatedSection>

          <div className="sticky top-[84px] md:top-[92px] z-30 mb-6">
            <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl p-2 shadow-sm">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/70'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="group bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <div className="relative overflow-hidden aspect-video bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.18em] text-foreground/80 bg-background/80 border border-border/60 rounded px-2 py-1">
                      {project.id}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-lg font-bold mb-1.5 leading-tight">{project.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="skill-tag text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-border/40">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon icon="tabler:external-link" className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon icon="tabler:brand-github" className="w-3.5 h-3.5" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatedSection>

          <SectionDivider />

          <AnimatedSection className="mt-2">
            <div className="rounded-xl border border-border/50 bg-card/80 p-8 text-center">
              <h3 className="text-2xl font-bold mb-3">Interested in collaborating?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Open to building high-quality product experiences, frontend systems, and full-stack features.
              </p>
              <button
                ref={contactButtonRef}
                onClick={() => toggleSocialPopover(contactButtonRef)}
                className="button-primary inline-flex items-center"
              >
                Get in Touch
                <Icon icon="tabler:arrow-right" className="ml-2 w-4 h-4" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.div
              className="bg-background border border-border/60 rounded-2xl max-w-5xl mx-auto h-full md:h-auto md:max-h-[92vh] overflow-y-auto"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 md:p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">{selectedProject.category}</p>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">{selectedProject.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedProjectId(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close project details"
                  >
                    <Icon icon="tabler:x" className="w-6 h-6" />
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden mb-6 border border-border/40">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-56 md:h-80 object-cover" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-sm uppercase tracking-[0.16em] text-muted-foreground mb-2">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProject.fullDescription}</p>

                    <h3 className="text-sm uppercase tracking-[0.16em] text-muted-foreground mt-6 mb-2">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature) => (
                        <li key={feature} className="text-sm text-foreground/90 flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <aside>
                    <h3 className="text-sm uppercase tracking-[0.16em] text-muted-foreground mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="skill-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {selectedProject.liveUrl && (
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="button-primary inline-flex items-center w-full justify-center">
                          Visit Live
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="button-secondary inline-flex items-center w-full justify-center">
                          View Source
                        </a>
                      )}
                    </div>
                  </aside>
                </div>

                <div className="mt-7 pt-4 border-t border-border/40 flex items-center justify-between">
                  <button
                    onClick={() => moveModal(-1)}
                    className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                    disabled={filteredProjects.length <= 1}
                  >
                    <Icon icon="tabler:arrow-left" className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={() => moveModal(1)}
                    className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                    disabled={filteredProjects.length <= 1}
                  >
                    Next
                    <Icon icon="tabler:arrow-right" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
