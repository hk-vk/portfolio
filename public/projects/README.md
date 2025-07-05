# Project Assets Directory

This directory contains all the media assets for your portfolio projects.

## Directory Structure

```
public/projects/
├── images/          # Project screenshots and images
│   ├── yeah-fake-news.jpg
│   ├── commitstorygen.jpg
│   ├── pdfx.jpg
│   ├── ecotracker.jpg
│   ├── devops-dashboard.jpg
│   ├── ai-code-reviewer.jpg
│   └── blockchain-voting.jpg
└── videos/          # Project demo videos
    ├── yeah-demo.mp4
    ├── commitstorygen-demo.mp4
    ├── pdfx-demo.mp4
    ├── ecotracker-demo.mp4
    ├── devops-demo.mp4
    ├── ai-reviewer-demo.mp4
    └── blockchain-voting-demo.mp4
```

## Image Guidelines

- **Format**: Use JPG for photos, PNG for graphics with transparency
- **Size**: Recommended dimensions 800x600px or 16:9 aspect ratio
- **File Size**: Keep under 500KB for optimal loading
- **Naming**: Use kebab-case matching project IDs

## Video Guidelines

- **Format**: MP4 with H.264 encoding
- **Duration**: Keep demos under 30 seconds
- **Size**: Recommended 1280x720px (720p)
- **File Size**: Keep under 5MB for web performance
- **Content**: Show key features and user interactions

## Fallback Images

If you don't have custom images yet, you can use placeholder services:
- `https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Project+Name`
- `https://picsum.photos/800/600` (random images)

## Adding New Projects

1. Add your image to `/images/` directory
2. Add your demo video to `/videos/` directory (optional)
3. Update the project data in `src/pages/Projects.jsx`
4. Update featured projects in `src/pages/Home.jsx` if needed

## Performance Tips

- Optimize images using tools like TinyPNG or ImageOptim
- Consider using WebP format for better compression
- Use lazy loading for images (already implemented in components)
- Compress videos using tools like HandBrake or FFmpeg
