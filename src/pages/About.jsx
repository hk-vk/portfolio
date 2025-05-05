import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedGrid } from '../components/AnimatedSection';
import { AboutPageBadge } from '../context/BadgeContext';

const About = () => {
  // Skills with progress levels
  const skills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 92 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 88 },
    { name: "TypeScript", level: 80 },
    { name: "Next.js", level: 85 },
    { name: "GraphQL", level: 75 },
  ];

  // Work experience
  const experience = [
    {
      position: "Senior Frontend Developer",
      company: "TechVision Inc.",
      period: "2021 - Present",
      description: "Leading the frontend development team, implementing modern UI solutions and ensuring code quality through reviews and best practices.",
    },
    {
      position: "UI/UX Designer & Developer",
      company: "CreativeMinds Agency",
      period: "2018 - 2021",
      description: "Created user interfaces and experiences for various client projects, bridging the gap between design and development.",
    },
    {
      position: "Web Developer",
      company: "Digital Solutions Ltd",
      period: "2016 - 2018",
      description: "Developed responsive websites and web applications for clients across different industries.",
    },
  ];

  // Education
  const education = [
    {
      degree: "Master's in Computer Science",
      institution: "Tech University",
      year: "2016",
      description: "Specialized in Human-Computer Interaction and Web Technologies.",
    },
    {
      degree: "Bachelor's in Information Technology",
      institution: "State University",
      year: "2014",
      description: "Focused on software development and design principles.",
    },
  ];

  return (
    <div className="pt-32 pb-20 relative">
      {/* Badge Component */}
      <AboutPageBadge />
      
      {/* Hero Section */}
      <section className="content-container">
        <AnimatedSection animation="fadeUp">
          <h1 className="section-heading text-center">About Me</h1>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 mb-8"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 items-center">
          <div></div>

          <AnimatedSection animation="slideInRight" className="space-y-6">
            <h2 className="text-2xl font-bold">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Harikrishnan V K</span>
            </h2>
            <p className="text-secondary">
              I'm a passionate developer and designer with over 5 years of experience creating
              modern digital solutions. My expertise spans frontend and backend development,
              with a particular focus on creating intuitive, user-friendly interfaces.
            </p>
            <p className="text-secondary">
              I approach each project with a blend of technical expertise and creative thinking,
              ensuring that the end result not only meets but exceeds expectations. My goal is
              to create digital experiences that are both functional and visually stunning.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-secondary">San Francisco, CA</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-secondary">contact@portfolio.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Freelance</h3>
                <p className="text-primary">Available</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Languages</h3>
                <p className="text-secondary">English, Spanish</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section className="content-container mt-20">
        <AnimatedSection animation="fadeUp">
          <h2 className="section-heading text-center">My Skills</h2>
          <p className="text-secondary text-center mt-4 max-w-2xl mx-auto">
            A collection of my technical skills and proficiency levels.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {skills.map((skill, index) => (
            <AnimatedSection
              key={index}
              animation="fadeUp"
              delay={index * 0.1}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{skill.name}</h3>
                <span className="text-secondary text-sm">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                ></motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Experience & Education Section */}
      <section className="py-20 mt-10">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Experience */}
            <div>
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
              </AnimatedSection>

              <div className="space-y-8">
                {experience.map((job, index) => (
                  <AnimatedSection
                    key={index}
                    animation="fadeUp"
                    delay={index * 0.1}
                    className="relative pl-6 border-l-2 border-accent/20"
                  >
                    <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-0"></div>
                    <h3 className="text-xl font-semibold">{job.position}</h3>
                    <div className="flex items-center text-secondary mb-2">
                      <span>{job.company}</span>
                      <span className="mx-2">•</span>
                      <span>{job.period}</span>
                    </div>
                    <p className="text-secondary">{job.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold mb-8">Education</h2>
              </AnimatedSection>

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <AnimatedSection
                    key={index}
                    animation="fadeUp"
                    delay={index * 0.1}
                    className="relative pl-6 border-l-2 border-accent/20"
                  >
                    <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-0"></div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <div className="flex items-center text-secondary mb-2">
                      <span>{edu.institution}</span>
                      <span className="mx-2">•</span>
                      <span>{edu.year}</span>
                    </div>
                    <p className="text-secondary">{edu.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="content-container py-16 bg-accent/5 rounded-3xl">
        <AnimatedSection animation="fadeUp">
          <h2 className="section-heading text-center">Personal Interests</h2>
          <p className="text-secondary text-center mt-4 max-w-2xl mx-auto">
            When I'm not coding or designing, here's what you can find me doing.
          </p>
        </AnimatedSection>

        <AnimatedGrid
          className="mt-10"
          stagger={0.1}
          columns={{ sm: 2, md: 4 }}
        >
          {['Photography', 'Hiking', 'Reading', 'Cooking'].map((interest, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-accent/10 rounded-full text-2xl">
                {index === 0 && '📷'}
                {index === 1 && '🏔️'}
                {index === 2 && '📚'}
                {index === 3 && '🍳'}
              </div>
              <h3 className="font-medium">{interest}</h3>
            </div>
          ))}
        </AnimatedGrid>
      </section>
    </div>
  );
};

export default About;
