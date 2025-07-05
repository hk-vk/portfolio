import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';
import LeafIllustration from '../components/LeafIllustration';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web App', 'Mobile App', 'DevOps', 'AI/ML', 'Blockchain'];

  const projects = [
    {
      id: '01',
      title: 'YEAH - Fake News Detector',
      description: 'This web app integrates text analysis, image recognition, URL examination, and reverse image search to effectively detect fake news.',
      fullDescription: 'A comprehensive fake news detection system that combines multiple AI technologies including natural language processing, computer vision, and web scraping to analyze and verify news content across different media formats.',
      category: 'Web App',
      tags: ['TypeScript', 'React', 'Fake News Detection', 'AI/ML', 'Computer Vision'],
      year: '2024',
      image: '/projects/images/yeah-fake-news.jpg',
      video: '/projects/videos/yeah-demo.mp4',
      liveUrl: 'https://yeah-fake-news-detector.vercel.app',
      githubUrl: 'https://github.com/hk-vk/yeah-fake-news-detector',
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
      year: '2024',
      image: '/projects/images/commitstorygen.jpg',
      video: '/projects/videos/commitstorygen-demo.mp4',
      liveUrl: 'https://commitstorygen.netlify.app',
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
      year: '2024',
      image: '/projects/images/pdfx.jpg',
      video: '/projects/videos/pdfx-demo.mp4',
      liveUrl: 'https://pdfx-toolkit.vercel.app',
      githubUrl: 'https://github.com/hk-vk/pdfx-toolkit',
      techStack: ['TypeScript', 'WebAssembly', 'PDF-lib', 'React', 'Vite', 'Service Workers'],
      features: ['Merge PDFs', 'Split PDFs', 'Compress Files', 'Add Watermarks', 'Extract Pages', 'OCR Support'],
      challenges: 'Implementing complex PDF operations in the browser while maintaining performance and file size limits.',
      solutions: 'Leveraged WebAssembly for heavy computations and implemented chunked processing for large files.'
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PROJECTS
            </motion.h1>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => openModal(project)}
              >
                <div className="border border-border p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-bold text-primary opacity-20">{project.id}</span>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
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

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="skill-tag">{tag}</span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-muted text-muted-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/70 hover:text-foreground transition-colors text-center flex items-center justify-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
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
                    <p className="text-muted-foreground">{selectedProject.year}</p>
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
              <a
                href="/contact"
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
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Projects;
