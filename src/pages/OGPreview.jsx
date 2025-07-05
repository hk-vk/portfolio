import React from 'react';

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
              <img src="/og-homepage.svg" alt="Homepage OG" className="max-w-full h-auto" />
            </div>
            <p className="text-gray-400 mt-2">URL: /og-homepage.svg</p>
          </div>

          {/* Blog OG */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Blog Page OG Image</h2>
            <div className="bg-gray-900 p-4 rounded-lg inline-block">
              <img src="/og-blog.svg" alt="Blog OG" className="max-w-full h-auto" />
            </div>
            <p className="text-gray-400 mt-2">URL: /og-blog.svg</p>
          </div>

          {/* Blog Post OG */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Blog Post OG Image</h2>
            <div className="bg-gray-900 p-4 rounded-lg inline-block">
              <img src="/og-blog-portfolio-speed-reader-blog.svg" alt="Blog Post OG" className="max-w-full h-auto" />
            </div>
            <p className="text-gray-400 mt-2">URL: /og-blog-portfolio-speed-reader-blog.svg</p>
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