import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';
import LeafIllustration from '../components/LeafIllustration';
import { useSocialPopover } from '../context/SocialPopoverContext';
import SEOHead from '../components/SEOHead';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const { toggleSocialPopover } = useSocialPopover();
  const contactButtonRef = useRef(null);

  const categories = ['All', 'Web App', 'Mobile App', 'Desktop App', 'DevOps', 'AI/ML', 'Blockchain'];

  const projects = [
    {
      id: '01',
      title: 'YEAH - Fake News Detector',
      description: 'This web app integrates text analysis, image recognition, URL examination, and reverse image search to effectively detect fake news.',
      fullDescription: 'A comprehensive fake news detection system that combines multiple AI technologies including natural language processing, computer vision, and web scraping to analyze and verify news content across different media formats.',
      category: 'Web App',
      tags: ['TypeScript', 'React', 'Fake News Detection', 'AI/ML', 'Computer Vision'],
      image: 'https://i.ibb.co/8L95n5wZ/yeahpreview.png',
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
      image: 'https://i.ibb.co/pvwgtwFx/image.png',
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
      image: 'https://i.ibb.co/7dDSnW5j/Screenshot-2025-07-06-020503.png',
      video: '/projects/videos/cricket-widget-demo.mp4',
      githubUrl: 'https://github.com/hk-vk/cricket-score-widget',
      techStack: ['Electron', 'React', 'Vite', 'Node.js', 'Cheerio', 'CSS'],
      features: ['Live Cricket Scores', 'System Tray Integration', 'Always-on-Top Window', 'Light/Dark Theme', 'Auto-refresh', 'Draggable Interface'],
      challenges: 'Creating a system tray application with real-time data fetching while maintaining performance and user experience.',
      solutions: 'Implemented efficient data scraping, optimized refresh intervals, and created an intuitive always-on-top interface.'
    }
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <SEOHead 
        title="Projects | Harikrishnan V K"
        description="Explore my portfolio of web applications, mobile apps, and development projects. Built with React, Node.js, Python, and modern technologies."
        url="/projects"
      />
      <div className="pt-32 pb-20">
      <div className="content-container relative">
        {/* Decorative elements */}
        <div className="absolute -left-20 top-20 opacity-30 rotate-45 hidden lg:block">
          <LeafIllustration fill="#4CAF50" />
        </div>
        <div className="absolute right-0 bottom-20 opacity-30 -rotate-45 hidden lg:block">
          <LeafIllustration fill="#2E7D32" />
        </div>

        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.h1
              className="text-3xl md:text-4xl font-bold uppercase mb-6"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              PROJECTS
            </motion.h1>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              A collection of my work across various fields and technologies.
              Each project represents a unique challenge and solution.
            </motion.p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {/* Filter categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="fancy-border cursor-pointer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openModal(project)}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
              >
                <div className="border border-border p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4 pointer-events-none">
                    <span className="text-4xl font-bold text-primary opacity-20">{project.id}</span>
                    <div className="flex items-center gap-2">
                      {/* Action icons */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors pointer-events-auto"
                            title="Live Demo"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
                            title="GitHub Repository"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        <button
                          className="text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
                          title="More Details"
                          onClick={() => openModal(project)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 4a1 1 0 0 1-1 1H6.414l3.293 3.293a1 1 0 0 1-1.414 1.414L5 6.414V8a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zm8.586 15l-3.293-3.293a1 1 0 0 1 1.414-1.414L19 17.586V16a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1h-4a1 1 0 1 1 0-2h1.586zM9 20a1 1 0 0 0-1-1H6.414l3.293-3.293a1 1 0 0 0-1.414-1.414L5 17.586V16a1 1 0 1 0-2 0v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1zm8.586-15l-3.293 3.293a1 1 0 0 0 1.414 1.414L19 6.414V8a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-4a1 1 0 1 0 0 2h1.586z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="relative w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center" style={{ display: 'none' }}>
                      <span className="text-gray-500 text-sm">Preview Image</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <SparkleIllustration className="text-primary mr-2" size={12} />
                      <span className="text-xs font-medium uppercase tracking-wider">{project.category}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="skill-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="bg-background border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                    <span className="text-gray-500">Preview Image</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, i) => (
                      <span key={i} className="skill-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary"
                    >
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <AnimatedSection className="mt-20">
          <div className="fancy-border p-1">
            <div className="border border-border p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always open to discussing product design work or partnership opportunities.
              </p>
              <button
                ref={contactButtonRef}
                onClick={() => toggleSocialPopover(contactButtonRef)}
                className="button-primary inline-flex items-center"
              >
                Get in Touch
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
    </>
  );
};

export default Projects;
