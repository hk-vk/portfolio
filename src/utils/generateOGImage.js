// Utility to generate Open Graph images
// This creates a canvas-based image for social media previews

export const generateHomepageOGImage = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to standard OG image dimensions
  canvas.width = 1200;
  canvas.height = 630;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#0f0f23');
  gradient.addColorStop(1, '#1a1a2e');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);
  
  // Add subtle pattern overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 1200; i += 60) {
    for (let j = 0; j < 630; j += 60) {
      ctx.fillRect(i, j, 30, 30);
    }
  }
  
  // Add main title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Harikrishnan V K', 600, 250);
  
  // Add subtitle
  ctx.fillStyle = '#a0a0a0';
  ctx.font = '36px "Space Grotesk", sans-serif';
  ctx.fillText('Full-Stack Developer', 600, 320);
  
  // Add description
  ctx.fillStyle = '#808080';
  ctx.font = '24px "Space Grotesk", sans-serif';
  ctx.fillText('Building modern web experiences with React, Node.js & more', 600, 380);
  
  // Add accent line
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(450, 420);
  ctx.lineTo(750, 420);
  ctx.stroke();
  
  // Add website URL
  ctx.fillStyle = '#6366f1';
  ctx.font = '28px "Space Grotesk", sans-serif';
  ctx.fillText('hari.works', 600, 480);
  
  return canvas.toDataURL('image/png');
};

export const generateBlogPostOGImage = (title, excerpt, date) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = 1200;
  canvas.height = 630;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
  gradient.addColorStop(0, '#1e1b4b');
  gradient.addColorStop(1, '#312e81');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);
  
  // Add decorative elements
  ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
  ctx.beginPath();
  ctx.arc(1100, 100, 150, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
  ctx.beginPath();
  ctx.arc(100, 530, 100, 0, Math.PI * 2);
  ctx.fill();
  
  // Add blog post title (with text wrapping)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "DM Serif Display", serif';
  ctx.textAlign = 'left';
  
  const words = title.split(' ');
  let line = '';
  let y = 180;
  const maxWidth = 1000;
  const lineHeight = 60;
  
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, 100, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 100, y);
  
  // Add excerpt
  if (excerpt) {
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '24px "Space Grotesk", sans-serif';
    const excerptY = y + 80;
    
    // Wrap excerpt text
    const excerptWords = excerpt.split(' ');
    let excerptLine = '';
    let excerptCurrentY = excerptY;
    
    for (let n = 0; n < excerptWords.length && excerptCurrentY < 450; n++) {
      const testLine = excerptLine + excerptWords[n] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(excerptLine, 100, excerptCurrentY);
        excerptLine = excerptWords[n] + ' ';
        excerptCurrentY += 30;
      } else {
        excerptLine = testLine;
      }
    }
    if (excerptCurrentY < 450) {
      ctx.fillText(excerptLine, 100, excerptCurrentY);
    }
  }
  
  // Add date and author info
  ctx.fillStyle = '#6366f1';
  ctx.font = '20px "Space Grotesk", sans-serif';
  ctx.fillText(`${date} • Harikrishnan V K`, 100, 550);
  
  // Add blog label
  ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
  ctx.fillRect(100, 80, 80, 30);
  ctx.fillStyle = '#6366f1';
  ctx.font = 'bold 16px "Space Grotesk", sans-serif';
  ctx.fillText('BLOG', 110, 100);
  
  return canvas.toDataURL('image/png');
}; 