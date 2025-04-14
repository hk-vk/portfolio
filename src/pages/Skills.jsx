import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SparkleIllustration from '../components/SparkleIllustration';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "HTML/CSS", level: 95, icon: "🌐" },
        { name: "JavaScript", level: 90, icon: "📜" },
        { name: "React", level: 92, icon: "⚛️" },
        { name: "TypeScript", level: 88, icon: "📘" },
        { name: "Next.js", level: 85, icon: "🔺" }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Express", level: 82, icon: "🚂" },
        { name: "MongoDB", level: 80, icon: "🍃" },
        { name: "GraphQL", level: 75, icon: "◼️" },
        { name: "REST APIs", level: 88, icon: "🔄" }
      ]
    },
    {
      title: "Design & Tools",
      skills: [
        { name: "UI/UX Design", level: 88, icon: "🎨" },
        { name: "Figma", level: 85, icon: "🖌️" },
        { name: "Responsive Design", level: 90, icon: "📱" },
        { name: "Git", level: 86, icon: "🔄" },
        { name: "Performance Optimization", level: 80, icon: "⚡" }
      ]
    }
  ];

  // Feature cards for additional competencies
  const features = [
    {
      title: "Web Performance",
      description: "Optimize websites for speed, SEO, and user experience",
      icon: "⚡"
    },
    {
      title: "Responsive Design",
      description: "Create layouts that work on any device and screen size",
      icon: "📱"
    },
    {
      title: "API Integration",
      description: "Connect with third-party services and data sources",
      icon: "🔌"
    },
    {
      title: "Deployment",
      description: "Set up CI/CD pipelines and deploy to various platforms",
      icon: "🚀"
    }
  ];

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="content-container mb-20">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-10">
            <h1 className="section-heading">My Skills & Expertise</h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 mb-6"></div>
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
                className="border border-border p-6 h-full rounded-lg flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-4xl mb-4">{feature.icon}</span>
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
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8">
            {category.skills.map((skill, index) => (
              <AnimatedSection
                key={index}
                animation="fadeUp"
                delay={index * 0.1}
              >
                <div className="fancy-border p-0.5">
                  <div className="border border-border p-4 relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{skill.icon}</span>
                        <h3 className="font-medium text-lg">{skill.name}</h3>
                      </div>
                      <span className="text-secondary text-sm font-medium">{skill.level}%</span>
                    </div>

                    <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-secondary to-primary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="content-container mt-16">
        <AnimatedSection animation="fadeUp">
          <div className="fancy-border p-1">
            <div className="border border-border p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I'm always looking for new challenges and opportunities to apply my skills.
                If you have a project in mind, let's discuss how I can help bring it to life.
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
      </section>
    </div>
  );
};

export default Skills; 