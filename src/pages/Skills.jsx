import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { 
          name: "HTML/CSS", 
          level: 95, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          )
        },
        { 
          name: "JavaScript", 
          level: 90, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 4v10.54a4 4 0 1 1-4-4"></path>
              <path d="M4 4v16a2 2 0 0 0 2 2h14"></path>
            </svg>
          )
        },
        { 
          name: "React", 
          level: 92, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          )
        },
        { 
          name: "TypeScript", 
          level: 88, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <path d="M3.27 6.96L12 12.01l8.73-5.05"></path>
              <path d="M12 22.08V12"></path>
            </svg>
          )
        },
        { 
          name: "Next.js", 
          level: 85, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12h8"></path>
              <path d="M12 8v8"></path>
            </svg>
          )
        }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { 
          name: "Node.js", 
          level: 85, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-4v4h4v-4z"></path>
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
            </svg>
          )
        },
        { 
          name: "Express", 
          level: 82, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          )
        },
        { 
          name: "MongoDB", 
          level: 80, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M18.4 7.8l-3.3 3.3-3.8-3.8L7.8 10"></path>
            </svg>
          )
        },
        { 
          name: "GraphQL", 
          level: 75, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="16" x2="16" y2="16"></line>
              <line x1="8" y1="16" x2="4.9" y2="19.1"></line>
              <line x1="16" y1="16" x2="19.1" y2="19.1"></line>
            </svg>
          )
        },
        { 
          name: "REST APIs", 
          level: 88, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
            </svg>
          )
        }
      ]
    },
    {
      title: "Design & Tools",
      skills: [
        { 
          name: "UI/UX Design", 
          level: 88, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          )
        },
        { 
          name: "Figma", 
          level: 85, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v8"></path>
              <path d="M8 12h8"></path>
            </svg>
          )
        },
        { 
          name: "Responsive Design", 
          level: 90, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          )
        },
        { 
          name: "Git", 
          level: 86, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M18 17h1a2 2 0 0 0 2-2v-5l-6-6H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"></path>
              <path d="M4 22h5m7-4v4l3-2-3-2z"></path>
            </svg>
          )
        },
        { 
          name: "Performance Optimization", 
          level: 80, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
            </svg>
          )
        }
      ]
    }
  ];

  // Feature cards for additional competencies
  const features = [
    {
      title: "Web Performance",
      description: "Optimize websites for speed, SEO, and user experience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      )
    },
    {
      title: "Responsive Design",
      description: "Create layouts that work on any device and screen size",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: "API Integration",
      description: "Connect with third-party services and data sources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      )
    },
    {
      title: "Deployment",
      description: "Set up CI/CD pipelines and deploy to various platforms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="content-container mb-20">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-10">
            <h1 className="section-heading">My Skills & Expertise</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 mb-6"></div>
            <p className="text-secondary max-w-2xl mx-auto">
              I've developed a diverse set of skills throughout my journey as a developer,
              focusing on creating efficient and user-friendly digital experiences.
            </p>
          </div>
        </AnimatedSection>

        {/* Expertise Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              animation="fadeUp"
              delay={index * 0.1}
            >
              <motion.div 
                className="border border-border p-6 h-full rounded-lg flex flex-col bg-card hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Detailed Skills */}
      {skillCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="content-container mb-20">
          <AnimatedSection animation="fadeUp">
            <div className="flex items-center mb-10">
              <SparkleIllustration className="text-primary mr-2" size={16} />
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent ml-4"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.skills.map((skill, index) => (
              <AnimatedSection
                key={index}
                animation="fadeUp"
                delay={index * 0.1}
              >
                <motion.div 
                  className="fancy-border p-0.5 h-full"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="border border-border p-5 relative rounded-lg bg-card h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-4 text-primary">
                          {skill.icon}
                        </div>
                        <h3 className="font-medium text-lg">{skill.name}</h3>
                      </div>
                      <span className="text-primary text-sm font-medium">{skill.level}%</span>
                    </div>

                    <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="content-container mt-16">
        <AnimatedSection animation="fadeUp">
          <div className="fancy-border p-1 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-accent/20">
            <div className="border border-border p-8 text-center rounded-lg bg-card/80 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always looking for new challenges and opportunities to apply my skills.
                If you have a project in mind, let's discuss how I can help bring it to life.
              </p>
              <motion.a
                href="/contact"
                className="button-primary inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Skills; 