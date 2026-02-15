// Cloudflare Functions Middleware for handling social media crawlers
// This intercepts requests from social media bots and serves them static HTML with proper OG tags

export async function onRequest(context) {
  const { request, next } = context;
  const userAgent = request.headers.get('user-agent') || '';
  
  // Detect social media crawlers
  const socialMediaCrawlerUserAgents = /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator|WhatsApp|Telegram|Discord|Skype/i;
  const isSocialMediaCrawler = socialMediaCrawlerUserAgents.test(userAgent);
  
  // If it's not a social media crawler, proceed normally
  if (!isSocialMediaCrawler) {
    return next();
  }

  const getSocialImageForCrawler = (ua, origin) => {
    if (/Twitterbot/i.test(ua)) {
      return { image: `${origin}/social/x-1200x675.jpg`, width: 1200, height: 675 };
    }
    if (/LinkedInBot/i.test(ua)) {
      return { image: `${origin}/social/linkedin-1200x627.jpg`, width: 1200, height: 627 };
    }
    if (/facebookexternalhit|Facebot/i.test(ua)) {
      return { image: `${origin}/social/facebook-1200x630.jpg`, width: 1200, height: 630 };
    }
    if (/WhatsApp/i.test(ua)) {
      return { image: `${origin}/social/whatsapp-1200x630.jpg`, width: 1200, height: 630 };
    }
    if (/Telegram/i.test(ua)) {
      return { image: `${origin}/social/telegram-1200x630.jpg`, width: 1200, height: 630 };
    }
    if (/Discord/i.test(ua)) {
      return { image: `${origin}/social/discord-1200x630.jpg`, width: 1200, height: 630 };
    }
    return { image: `${origin}/og.jpg`, width: 1200, height: 630 };
  };

  // Extract route information
  const url = new URL(request.url);
  const pathname = url.pathname;
  const selectedSocialImage = getSocialImageForCrawler(userAgent, url.origin);
  
  // Generate appropriate meta tags based on the route
  let title = "Harikrishnan V K | Portfolio";
  let description = "Full-stack developer specializing in modern web technologies. Explore my projects, blog posts, and professional journey.";
  let image = selectedSocialImage.image;
  let imageWidth = selectedSocialImage.width;
  let imageHeight = selectedSocialImage.height;
  let type = "website";
  
  // Route-specific meta tags
  if (pathname === '/') {
    // Homepage - use defaults
    title = "Harikrishnan V K | Full-Stack Developer Portfolio";
    description = "Explore my portfolio showcasing modern web applications built with React, Node.js, and cutting-edge technologies. Full-stack developer passionate about creating exceptional user experiences.";
    image = selectedSocialImage.image;
  } else if (pathname === '/about') {
    title = "About | Harikrishnan V K";
    description = "Learn about Harikrishnan V K - a passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Discover my journey, skills, and experience.";
    image = selectedSocialImage.image;
  } else if (pathname === '/projects') {
    title = "Projects | Harikrishnan V K";
    description = "Explore my portfolio of web applications, mobile apps, and development projects. Built with React, Node.js, Python, and modern technologies.";
    image = selectedSocialImage.image;
  } else if (pathname === '/contact') {
    title = "Contact | Harikrishnan V K";
    description = "Get in touch with Harikrishnan V K. Let's discuss your next project, collaborate on exciting opportunities, or just have a chat about web development.";
    image = selectedSocialImage.image;
  } else if (pathname === '/blog') {
    title = "Blog | Harikrishnan V K";
    description = "Read my thoughts on web development, programming, and technology. Discover insights about React, Node.js, and modern web development practices.";
    image = selectedSocialImage.image;
  } else if (pathname.startsWith('/blog/')) {
    // Extract blog post ID
    const postId = pathname.split('/blog/')[1];
    title = `Blog Post | Harikrishnan V K`;
    description = "Read my thoughts on web development, programming, and technology.";
    image = selectedSocialImage.image;
    type = "article";
  }

  // Return static HTML with proper meta tags for social media crawlers
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Basic Meta Tags -->
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="author" content="Harikrishnan V K" />
  <link rel="canonical" href="${url.href}" />

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:secure_url" content="${image}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="${imageWidth}" />
  <meta property="og:image:height" content="${imageHeight}" />
  <meta property="og:image:alt" content="Preview image for ${title}" />
  <meta property="og:url" content="${url.href}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="Harikrishnan V K | Portfolio" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@harikrishnanvk" />
  <meta name="twitter:creator" content="@harikrishnanvk" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:image:alt" content="Preview image for ${title}" />

  <!-- Additional Meta Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#000000" />
  <meta name="msapplication-TileColor" content="#000000" />

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root">
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0f0f23; color: white; font-family: 'Space Grotesk', sans-serif;">
      <div style="text-align: center; max-width: 600px; padding: 2rem;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">${title}</h1>
        <p style="font-size: 1.1rem; opacity: 0.8; margin-bottom: 2rem;">${description}</p>
        <p style="opacity: 0.6;">Loading full experience...</p>
      </div>
    </div>
  </div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
    },
  });
}
