import React from 'react';

const OGImageGenerator = ({ 
  type = 'homepage',
  title = 'Harikrishnan V K',
  subtitle = 'Full-Stack Developer',
  description = 'Building modern web experiences with React, Node.js & cutting-edge tech',
  blogTitle,
  blogExcerpt,
  date,
  readTime = '2 min read'
}) => {
  const renderHomepage = () => (
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="homepageBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#0f0f23', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#1a1a2e', stopOpacity:1}} />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        </pattern>
      </defs>
      
      {/* Background */}
      <rect width="1200" height="630" fill="url(#homepageBg)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      
      {/* Decorative circles */}
      <circle cx="1000" cy="150" r="120" fill="rgba(99,102,241,0.1)"/>
      <circle cx="200" cy="500" r="80" fill="rgba(139,92,246,0.08)"/>
      
      {/* Main content */}
      <text x="600" y="240" fill="#ffffff" fontSize="68" fontWeight="bold" 
            textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
        {title}
      </text>
      
      <text x="600" y="300" fill="#a0a0a0" fontSize="32" 
            textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
        {subtitle}
      </text>
      
      <text x="600" y="350" fill="#808080" fontSize="22" 
            textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
        {description}
      </text>
      
      {/* Accent line */}
      <line x1="400" y1="390" x2="800" y2="390" stroke="#6366f1" strokeWidth="4"/>
      
      {/* Website URL */}
      <text x="600" y="450" fill="#6366f1" fontSize="26" fontWeight="bold"
            textAnchor="middle" fontFamily="Space Grotesk, sans-serif">
        hari.works
      </text>
    </svg>
  );

  const renderBlog = () => (
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blogBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#1e1b4b', stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#312e81', stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <rect width="1200" height="630" fill="url(#blogBg)"/>
      
      {/* Decorative circles */}
      <circle cx="1050" cy="120" r="100" fill="rgba(99,102,241,0.15)"/>
      <circle cx="150" cy="550" r="70" fill="rgba(139,92,246,0.12)"/>
      
      {/* Blog label */}
      <rect x="80" y="80" width="100" height="35" fill="rgba(99,102,241,0.3)"/>
      <text x="90" y="103" fill="#6366f1" fontSize="18" fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif">
        BLOG
      </text>
      
      {/* Main title */}
      <text x="80" y="250" fill="#ffffff" fontSize="48" fontWeight="bold"
            fontFamily="DM Serif Display, serif">
        Latest Thoughts &
      </text>
      <text x="80" y="310" fill="#ffffff" fontSize="48" fontWeight="bold"
            fontFamily="DM Serif Display, serif">
        Tech Insights
      </text>
      
      {/* Description */}
      <text x="80" y="380" fill="#a0a0a0" fontSize="24"
            fontFamily="Space Grotesk, sans-serif">
        Exploring web development, programming,
      </text>
      <text x="80" y="410" fill="#a0a0a0" fontSize="24"
            fontFamily="Space Grotesk, sans-serif">
        and modern technology trends.
      </text>
      
      {/* Author info */}
      <text x="80" y="520" fill="#6366f1" fontSize="20"
            fontFamily="Space Grotesk, sans-serif">
        By Harikrishnan V K
      </text>
      
      {/* Website */}
      <text x="80" y="550" fill="#8b5cf6" fontSize="18" fontWeight="bold"
            fontFamily="Space Grotesk, sans-serif">
        hari.works/blog
      </text>
    </svg>
  );

  const renderBlogPost = () => {
    // Split long titles into multiple lines
    const titleLines = blogTitle ? [blogTitle] : ["Don't spend too much time", "reading my blogs."];
    const excerptLines = blogExcerpt ? 
      [blogExcerpt.substring(0, 60) + '...', blogExcerpt.substring(60, 120) + '...'] : 
      ["Seriously, who has time for long reads? Use my speed", "reader and get on with your day. Here's why it's awesome."];

    return (
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blogPostBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#1e1b4b', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#312e81', stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect width="1200" height="630" fill="url(#blogPostBg)"/>
        
        {/* Decorative circles */}
        <circle cx="1050" cy="120" r="100" fill="rgba(99,102,241,0.15)"/>
        <circle cx="150" cy="550" r="70" fill="rgba(139,92,246,0.12)"/>
        
        {/* Blog label */}
        <rect x="80" y="80" width="120" height="35" fill="rgba(99,102,241,0.3)"/>
        <text x="90" y="103" fill="#6366f1" fontSize="18" fontWeight="bold"
              fontFamily="Space Grotesk, sans-serif">
          BLOG POST
        </text>
        
        {/* Blog post title */}
        {titleLines.map((line, index) => (
          <text key={index} x="80" y={200 + (index * 55)} fill="#ffffff" fontSize="42" fontWeight="bold"
                fontFamily="DM Serif Display, serif">
            {line}
          </text>
        ))}
        
        {/* Excerpt */}
        {excerptLines.map((line, index) => (
          <text key={index} x="80" y={315 + (index * 28)} fill="#a0a0a0" fontSize="22"
                fontFamily="Space Grotesk, sans-serif">
            {line}
          </text>
        ))}
        
        {/* Date and author */}
        <text x="80" y="520" fill="#6366f1" fontSize="18"
              fontFamily="Space Grotesk, sans-serif">
          {date || 'May 11, 2025'} • Harikrishnan V K
        </text>
        
        {/* Reading time */}
        <text x="80" y="550" fill="#8b5cf6" fontSize="18"
              fontFamily="Space Grotesk, sans-serif">
          {readTime}
        </text>
      </svg>
    );
  };

  switch (type) {
    case 'blog':
      return renderBlog();
    case 'blog-post':
      return renderBlogPost();
    default:
      return renderHomepage();
  }
};

export default OGImageGenerator; 