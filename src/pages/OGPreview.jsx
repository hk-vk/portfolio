import React from 'react';
import OGImageGenerator from '../components/OGImageGenerator';

const OGPreview = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          OG Image Preview
        </h1>
        
        <div className="space-y-12">
          {/* Homepage OG */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Homepage OG Image</h2>
            <div className="bg-gray-900 p-4 rounded-lg inline-block">
              <OGImageGenerator type="homepage" />
            </div>
            <p className="text-gray-400 mt-2">URL: /api/og?type=homepage</p>
          </div>

          {/* Blog OG */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Blog Page OG Image</h2>
            <div className="bg-gray-900 p-4 rounded-lg inline-block">
              <OGImageGenerator type="blog" />
            </div>
            <p className="text-gray-400 mt-2">URL: /api/og?type=blog</p>
          </div>

          {/* Blog Post OG */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Blog Post OG Image</h2>
            <div className="bg-gray-900 p-4 rounded-lg inline-block">
              <OGImageGenerator 
                type="blog-post"
                blogTitle="Don't spend too much time reading my blogs."
                blogExcerpt="Seriously, who has time for long reads? Use my speed reader and get on with your day. Here's why it's awesome."
                date="May 11, 2025"
                readTime="2 min read"
              />
            </div>
            <p className="text-gray-400 mt-2">URL: /api/og?type=blog-post&blogTitle=...</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            These images are dynamically generated using your design system and will appear when your portfolio is shared on social media.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OGPreview; 