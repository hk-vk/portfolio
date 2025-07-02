import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';
import LeafIllustration from '../components/LeafIllustration';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Web App'];

  const projects = [
    {
      id: '01',
      title: 'yeah yeah',
      description: 'This web app integrates text analysis, image recognition, URL examination, and reverse image search to effectively detect fake news.',
      category: 'Web App',
      tags: ['TypeScript', 'React', 'Fake News Detection'],
      year: '2024',
    },
    {
      id: '02',
      title: 'commitstorygen',
      description: 'A web App that generates a storyline based on the commit history of a github repo',
      category: 'Web App',
      tags: ['JavaScript', 'Node.js', 'GitHub API'],
      year: '2024',
    },
    {
      id: '03',
      title: 'pdfX',
      description: 'A fully offline PDF manipulation toolkit with all processing done in your browser',
      category: 'Web App',
      tags: ['TypeScript', 'WebAssembly', 'PDF'],
      year: '2024',
    },
    
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

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
                className="fancy-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="border border-border p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl font-bold text-primary opacity-20">{project.id}</span>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>

                  <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                  <div className="mt-auto">
                    <div className="flex items-center mb-2">
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
