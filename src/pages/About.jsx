import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedGrid } from '../components/AnimatedSection';
import ProfileCard from '../components/ProfileCard';
import SEOHead from '../components/SEOHead';

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
    <>
      <SEOHead 
        title="About | Harikrishnan V K"
        description="Learn about Harikrishnan V K - a passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Discover my journey, skills, and experience."
        url="/about"
      />
      <div className="pt-32 pb-20 relative">
      
      <section className="content-container relative z-10">
        <AnimatedSection animation="fadeUp">
          <h1 className="text-3xl md:text-4xl font-bold uppercase text-center mb-6">ABOUT</h1>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 mb-8"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 items-center">
          {/* Left Column: Profile Card */}
          <AnimatedSection animation="slideInLeft">
            <div className="flex justify-center items-center h-full">
              <ProfileCard />
            </div>
          </AnimatedSection>

          {/* Right Column: About Me Content */}
          <AnimatedSection animation="slideInRight" className="space-y-6">
            <h2 className="text-2xl font-bold">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Harikrishnan V K</span>
            </h2>
            <p className="text-muted-foreground">
              I build digital experiences that combine clean code with intuitive design. Currently pursuing B.Tech in Information Technology at GEC Idukki, I specialize in full-stack development with React, Next.js, and FastAPI.
            </p>
            <p className="text-muted-foreground">
              My projects range from Malayalam fake news detection platforms to medical image systems with unique compression algorithms. I'm passionate about creating tech that solves real problems while delivering exceptional user experiences.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-muted-foreground">Kerala, India</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">vkharikrishnan45@gmail.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Freelance</h3>
                <p className="text-primary">Available</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Student</h3>
                <p className="text-muted-foreground">B.Tech (2021-Present)</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section className="content-container mt-20">
        <AnimatedSection animation="fadeUp">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-center mb-6">SKILLS</h2>
          <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
            Here's what I work with to bring ideas to life
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            { name: "React/Next.js", level: 92 },
            { name: "JavaScript/TypeScript", level: 90 },
            { name: "HTML/CSS/Tailwind", level: 95 },
            { name: "Node.js/FastAPI", level: 85 },
            { name: "PostgreSQL/MongoDB", level: 78 },
            { name: "Python/PyTorch", level: 82 },
            { name: "Git/GitHub", level: 88 },
            { name: "Docker", level: 75 },
          ].map((skill, index) => (
            <AnimatedSection
              key={index}
              animation="fadeUp"
              delay={index * 0.1}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center">
                  <span className="mr-2 text-xl leading-none">
                    {skill.name === "React/Next.js" && "⚛️"}
                    {skill.name === "JavaScript/TypeScript" && "💻"}
                    {skill.name === "HTML/CSS/Tailwind" && "🎨"}
                    {skill.name === "Node.js/FastAPI" && "⚙️"}
                    {skill.name === "PostgreSQL/MongoDB" && "💾"}
                    {skill.name === "Python/PyTorch" && "🐍"}
                    {skill.name === "Git/GitHub" && "🔗"}
                    {skill.name === "Docker" && "🐳"}
                  </span>
                  {skill.name}
                </h3>
                <span className="text-muted-foreground text-sm">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-accent/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                ></motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="content-container mt-20">
        <AnimatedSection animation="fadeUp">
          <h2 className="section-heading text-center">Featured Projects</h2>
          <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
            Some cool stuff I've been working on lately
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <AnimatedSection animation="fadeUp" delay={0.1} className="border border-border p-6 rounded-xl hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">YEAH</h3>
            <p className="text-sm text-muted-foreground mb-4">React • FastAPI • PyTorch</p>
            <p className="text-muted-foreground">
              A Malayalam fake news detection platform that uses ML to analyze text, URLs, and images.
              Handles 1000+ queries daily with a slick React frontend and robust FastAPI backend.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeUp" delay={0.2} className="border border-border p-6 rounded-xl hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">MedVault</h3>
            <p className="text-sm text-muted-foreground mb-4">Next.js • MongoDB • Clerk</p>
            <p className="text-muted-foreground">
              Secure medical image management platform with role-based access control and HIPAA-compliant
              data protection. Includes custom LZW compression that cuts storage needs by 60%.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeUp" delay={0.3} className="border border-border p-6 rounded-xl hover:border-primary transition-colors">
            <h3 className="text-xl font-bold mb-2">Commit Story Gen</h3>
            <p className="text-sm text-muted-foreground mb-4">React • Next.js • Gemini API</p>
            <p className="text-muted-foreground">
              Transforms boring GitHub commit histories into fun narratives using the Gemini API.
              Features a responsive UI with server-side rendering that's 40% faster than client-side alternatives.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section className="py-20 mt-10">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
            {/* Education - Now full width since Community Involvement is removed */}
            <div>
              <AnimatedSection animation="fadeUp">
                <h2 className="text-2xl font-bold mb-8">Education</h2>
              </AnimatedSection>

              <div className="space-y-8">
                <AnimatedSection
                  animation="fadeUp"
                  delay={0.1}
                  className="relative pl-6 border-l-2 border-accent/20"
                >
                  <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-0"></div>
                  <h3 className="text-xl font-semibold">B.Tech in Information Technology</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <span>Government Engineering College, Idukki</span>
                    <span className="mx-2">•</span>
                    <span>2021 - Present</span>
                  </div>
                  <p className="text-muted-foreground">CGPA: 7.9 | Focusing on web technologies and machine learning applications.</p>
                </AnimatedSection>

                <AnimatedSection
                  animation="fadeUp"
                  delay={0.2}
                  className="relative pl-6 border-l-2 border-accent/20"
                >
                  <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-0"></div>
                  <h3 className="text-xl font-semibold">Class 12</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <span>MKM HSS, Piravom</span>
                    <span className="mx-2">•</span>
                    <span>2021</span>
                  </div>
                  <p className="text-muted-foreground">Score: 99% | Higher Secondary Education</p>
                </AnimatedSection>

                <AnimatedSection
                  animation="fadeUp"
                  delay={0.3}
                  className="relative pl-6 border-l-2 border-accent/20"
                >
                  <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-0"></div>
                  <h3 className="text-xl font-semibold">Published Research</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <span>FOSS-CIL T25 International Conference</span>
                    <span className="mx-2">•</span>
                    <span>Jan 2024</span>
                  </div>
                  <p className="text-muted-foreground">A Survey of Encryption, Compression, and Segmentation Techniques for Medical Image Processing</p>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="content-container py-16 bg-accent/5 rounded-3xl">
        <AnimatedSection animation="fadeUp">
          <h2 className="section-heading text-center">When I'm Not Coding</h2>
          <p className="text-muted-foreground text-center mt-4 max-w-2xl mx-auto">
            Stepping away from the keyboard, you'll find me exploring these interests
          </p>
        </AnimatedSection>

        <AnimatedGrid
          className="mt-10"
          stagger={0.1}
          columns={{ sm: 2, md: 4 }}
        >
          {['Photography', 'Hiking', 'Reading', 'Tech Meetups'].map((interest, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-accent/10 rounded-full text-2xl">
                {index === 0 && '📷'}
                {index === 1 && '🏔️'}
                {index === 2 && '📚'}
                {index === 3 && '👥'}
              </div>
              <h3 className="font-medium">{interest}</h3>
            </div>
          ))}
        </AnimatedGrid>
      </section>
    </div>
    </>
  );
};

export default About;
