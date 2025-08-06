// Cloudflare Functions API route for generating OG images
// This will serve dynamic SVG OG images based on page content

// Function to escape XML content
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  // Get parameters from query string and escape them
  const type = searchParams.get('type') || 'homepage';
  const title = escapeXml(searchParams.get('title') || 'Harikrishnan V K');
  const subtitle = escapeXml(searchParams.get('subtitle') || 'Full-Stack Developer');
  const description = escapeXml(searchParams.get('description') || 'Building modern web experiences with React, Node.js and cutting-edge tech');
  const blogTitle = escapeXml(searchParams.get('blogTitle') || '');
  const blogExcerpt = escapeXml(searchParams.get('blogExcerpt') || '');
  const date = escapeXml(searchParams.get('date') || '');
  const readTime = escapeXml(searchParams.get('readTime') || '2 min read');

  // Generate SVG based on type
  let svg;
  
  if (type === 'blog') {
    svg = generateBlogSVG();
  } else if (type === 'blog-post') {
    svg = generateBlogPostSVG(blogTitle, blogExcerpt, date, readTime);
  } else {
    svg = generateHomepageSVG(title, subtitle, description);
  }

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

function generateHomepageSVG(title, subtitle, description) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="homepageBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f0f23;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
    </defs>
    
    <rect width="1200" height="630" fill="url(#homepageBg)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    
    <circle cx="1000" cy="150" r="120" fill="rgba(99,102,241,0.1)"/>
    <circle cx="200" cy="500" r="80" fill="rgba(139,92,246,0.08)"/>
    
    <text x="600" y="240" fill="#ffffff" font-size="68" font-weight="bold" 
          text-anchor="middle" font-family="Space Grotesk, sans-serif">
      ${title}
    </text>
    
    <text x="600" y="300" fill="#a0a0a0" font-size="32" 
          text-anchor="middle" font-family="Space Grotesk, sans-serif">
      ${subtitle}
    </text>
    
    <text x="600" y="350" fill="#808080" font-size="22" 
          text-anchor="middle" font-family="Space Grotesk, sans-serif">
      ${description}
    </text>
    
    <line x1="400" y1="390" x2="800" y2="390" stroke="#6366f1" stroke-width="4"/>
    
    <text x="600" y="450" fill="#6366f1" font-size="26" font-weight="bold"
          text-anchor="middle" font-family="Space Grotesk, sans-serif">
      hari.works
    </text>
  </svg>`;
}

function generateBlogSVG() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blogBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e1b4b;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#312e81;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="url(#blogBg)"/>
    
    <circle cx="1050" cy="120" r="100" fill="rgba(99,102,241,0.15)"/>
    <circle cx="150" cy="550" r="70" fill="rgba(139,92,246,0.12)"/>
    
    <rect x="80" y="80" width="100" height="35" fill="rgba(99,102,241,0.3)"/>
    <text x="90" y="103" fill="#6366f1" font-size="18" font-weight="bold"
          font-family="Space Grotesk, sans-serif">
      BLOG
    </text>
    
    <text x="80" y="250" fill="#ffffff" font-size="48" font-weight="bold"
          font-family="DM Serif Display, serif">
      Latest Thoughts and
    </text>
    <text x="80" y="310" fill="#ffffff" font-size="48" font-weight="bold"
          font-family="DM Serif Display, serif">
      Tech Insights
    </text>
    
    <text x="80" y="380" fill="#a0a0a0" font-size="24"
          font-family="Space Grotesk, sans-serif">
      Exploring web development, programming,
    </text>
    <text x="80" y="410" fill="#a0a0a0" font-size="24"
          font-family="Space Grotesk, sans-serif">
      and modern technology trends.
    </text>
    
    <text x="80" y="520" fill="#6366f1" font-size="20"
          font-family="Space Grotesk, sans-serif">
      By Harikrishnan V K
    </text>
    
    <text x="80" y="550" fill="#8b5cf6" font-size="18" font-weight="bold"
          font-family="Space Grotesk, sans-serif">
      hari.works/blog
    </text>
  </svg>`;
}

function generateBlogPostSVG(blogTitle, blogExcerpt, date, readTime) {
  // Use fallback values if parameters are empty and ensure they're properly escaped
  const title = blogTitle || "Don't spend too much time reading my blogs.";
  const excerpt = blogExcerpt || "Seriously, who has time for long reads? Use my speed reader and get on with your day.";
  const postDate = date || 'May 11, 2025';
  
  // Truncate text to fit and ensure it's safe for XML
  const titleLines = title.length > 50 ? [title.substring(0, 50), title.substring(50, 100)] : [title];
  const excerptLines = excerpt.length > 60 ? [excerpt.substring(0, 60), excerpt.substring(60, 120)] : [excerpt];

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blogPostBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e1b4b;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#312e81;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <rect width="1200" height="630" fill="url(#blogPostBg)"/>
    
    <circle cx="1050" cy="120" r="100" fill="rgba(99,102,241,0.15)"/>
    <circle cx="150" cy="550" r="70" fill="rgba(139,92,246,0.12)"/>
    
    <rect x="80" y="80" width="120" height="35" fill="rgba(99,102,241,0.3)"/>
    <text x="90" y="103" fill="#6366f1" font-size="18" font-weight="bold"
          font-family="Space Grotesk, sans-serif">
      BLOG POST
    </text>
    
    ${titleLines.map((line, index) => 
      `<text x="80" y="${200 + (index * 55)}" fill="#ffffff" font-size="42" font-weight="bold"
             font-family="DM Serif Display, serif">
        ${escapeXml(line)}
      </text>`
    ).join('')}
    
    ${excerptLines.map((line, index) => 
      `<text x="80" y="${315 + (index * 28)}" fill="#a0a0a0" font-size="22"
             font-family="Space Grotesk, sans-serif">
        ${escapeXml(line)}
      </text>`
    ).join('')}
    
    <text x="80" y="520" fill="#6366f1" font-size="18"
          font-family="Space Grotesk, sans-serif">
      ${escapeXml(postDate)} • Harikrishnan V K
    </text>
    
    <text x="80" y="550" fill="#8b5cf6" font-size="18"
          font-family="Space Grotesk, sans-serif">
      ${escapeXml(readTime)}
    </text>
  </svg>`;
} 