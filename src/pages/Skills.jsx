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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l1.908-.636a.891.891 0 0 1 .622-.007l1.908.636c.54.18.54.46.01.634l-1.908.636a.891.891 0 0 1-.622-.007L1.946 9.315zM3.061 12.115c-.522.174-.527.455.01.634l1.908.636a.891.891 0 0 1 .622.007l1.908-.636c.54-.18.54.46.01.634l-1.908-.636a.891.891 0 0 1-.622-.007L3.061 12.115zM3.061 14.916c-.522.174-.527.455.01.634l1.908.636a.891.891 0 0 1 .622.007l1.908-.636c.54-.18.54.46.01.634l-1.908-.636a.891.891 0 0 1-.622-.007L3.061 14.916zM4.939 21.528L2.809 20.3c-.849-1.102-.849-2.694 0-3.796l15.09-13.04c.849-1.102 2.694-.849 3.796 0l2.129 1.229c.849 1.102.849 2.694 0 3.796L7.735 21.528c-.849 1.102-2.694.849-3.796 0zM6.564 17.319l1.908.636c.54.18.54.46.01.634l-1.908.636a.891.891 0 0 1-.622-.007l-1.908-.636c-.522-.174-.527-.455.01-.634l1.908-.636a.891.891 0 0 1 .622.007z"/>
            </svg>
          )
        },
        { 
          name: "JavaScript", 
          level: 90, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
          )
        },
        { 
          name: "React", 
          level: 92, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l1.41-1.41L12 16.17l4.09-4.08L17.5 13.5 12 19l-5.5-5.5z"/>
            </svg>
          )
        },
        { 
          name: "TypeScript", 
          level: 88, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 20c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1.31 10.5c-.28-.28-.5-.62-.61-.99H18V16h-2v-3.28h-.91v3.28h-2V16h-1.5v-4.49c-.11.37-.33.71-.61.99L8.5 14H7l4.29-4.29c.39-.39.39-1.02 0-1.41L7 4h1.5l2.18 2.18c.28.28.5.62.61.99H12V4h2v3.28h.91V4h2v3.28h1.5v4.49c.11-.37.33-.71.61-.99L20.5 10H22l-4.29 4.29c-.4.39-1.03.39-1.42 0l.01-.01z"/>
            </svg>
          )
        },
        { 
          name: "Next.js", 
          level: 85, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.3 11.7c0-.2-.1-.4-.2-.5l-8.2-6.7c-.3-.2-.6-.3-.9-.3s-.6.1-.9.3L4.2 11.2c-.2.1-.2.3-.2.5s.1.4.2.5l8.2 6.7c.3.2.6.3.9.3s.6-.1.9-.3l8.2-6.7c.1-.1.2-.3.2-.5zm-9.4 4.4L6.8 12l6.1-5 6.1 5-6.1 4.1zM4 18.8c0 .7.5 1.2 1.2 1.2h13.6c.7 0 1.2-.5 1.2-1.2V15l-7.9 5.5L4 15v3.8z"/>
            </svg>
          )
        },
        { 
          name: "Express", 
          level: 82, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M13.5 5.5c-2.35 0-4.35 1.5-5.12 3.5H3V11h5.38c.24-.84.66-1.6 1.22-2.23.73-.8 1.69-1.27 2.9-1.27.95 0 1.78.37 2.42 1 .45.44.78.98.98 1.59H21V7h-5.38c-.24.84-.66 1.6-1.22 2.23-.73.8-1.69 1.27-2.9 1.27-1.33 0-2.5-.6-3.27-1.5H3v2h7.23c.14.34.31.66.52.95.51.72 1.18 1.25 2 1.55v2.91c-1.86.26-3.45 1.15-4.59 2.59H3v2h5.41c1.32 2.09 3.69 3.5 6.59 3.5s5.27-1.41 6.59-3.5H21v-2h-5.41c-1.14-1.44-2.73-2.33-4.59-2.59V15.5c.82-.3 1.49-.83 2-1.55.21-.29.38-.61.52-.95H21V11h-7.23c-.14-.34-.31-.66-.52-.95-.51-.72-1.18-1.25-2-1.55V5.5zm-1.5 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
          )
        },
        { 
          name: "MongoDB", 
          level: 80, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.03 0-3.81-.93-5-2.35.18-.03.35-.08.53-.15.84-.28 1.53-.82 1.95-1.5.52-.84.52-1.91 0-2.75-.42-.68-1.11-1.22-1.95-1.5-.18-.07-.35-.12-.53-.15C8.19 7.93 9.97 7 12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5zm2.69-6.19c-.02.02-.04.03-.06.05-.59.49-1.04 1.18-1.29 1.94-.12.39-.12.81 0 1.19.25.76.7 1.45 1.29 1.94.02.02.04.03.06.05.22.18.47.33.73.45.04.02.08.03.12.05.22.1.46.17.71.21.14.02.28.03.43.03.73 0 1.41-.21 2-.57v-2.93c-.01-.05-.01-.1-.02-.15-.32-1.18-1.18-2.12-2.32-2.51-.09-.03-.19-.06-.28-.08-.28-.06-.57-.09-.87-.09-.18 0-.36.02-.53.05z"/>
            </svg>
          )
        },
        { 
          name: "GraphQL", 
          level: 75, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-8.5L12 15l5.5-3.5L12 8l-5.5 3.5z"/>
            </svg>
          )
        },
        { 
          name: "REST APIs", 
          level: 88, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
               <path d="M0 0h24v24H0V0z" fill="none"/>
               <path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          )
        },
        { 
          name: "Figma", 
          level: 85, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-2-3.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm4 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-2-3a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/>
            </svg>
          )
        },
        { 
          name: "Responsive Design", 
          level: 90, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6v5h-2V8H9v7H7V8H1v7h22V8z"/>
            </svg>
          )
        },
        { 
          name: "Git", 
          level: 86, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20.58 8.59L16 4H8C6.9 4 6 4.9 6 6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9l4.58-.41c.32-.03.58-.29.58-.61V8c0-.33-.27-.6-.6-.6h-.01zm-2.08 8.41H8V6h7.17l2.42 2.42V17zM11 15v-2h2v2h-2zm0-4V9h2v2h-2zm0-4V5h2v2h-2z"/>
            </svg>
          )
        },
        { 
          name: "Performance Optimization", 
          level: 80, 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          )
        }
      ]
    }
  ];

  const features = [
    {
      title: "Web Performance",
      description: "Optimize websites for speed, SEO, and user experience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
         <path d="M0 0h24v24H0z" fill="none"/>
         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      )
    },
    {
      title: "Responsive Design",
      description: "Create layouts that work on any device and screen size",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6v5h-2V8H9v7H7V8H1v7h22V8z"/>
        </svg>
      )
    },
    {
      title: "API Integration",
      description: "Connect with third-party services and data sources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      )
    },
    {
      title: "Deployment",
      description: "Set up CI/CD pipelines and deploy to various platforms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/>
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