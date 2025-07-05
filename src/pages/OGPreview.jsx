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
              <img src="/og-homepage.png" alt="Homepage OG" className="max-w-full h-auto" />
            </div>
            <p className="text-gray-400 mt-2">URL: /og-homepage.png</p>
          </div>

          {/* Blog OG */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Blog Page & Blog Posts OG Image</h2>
            <div className="bg-gray-900 p-4 rounded-lg inline-block">
              <img src="/og-blog.png" alt="Blog OG" className="max-w-full h-auto" />
            </div>
            <p className="text-gray-400 mt-2">URL: /og-blog.png (used for all blog pages)</p>
          </div>

          {/* Note about future blog posts */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Future: Individual Blog Post Images</h2>
            <div className="bg-gray-800 p-6 rounded-lg inline-block border-2 border-dashed border-gray-600">
              <p className="text-gray-400 text-lg">🚀 Coming Soon</p>
              <p className="text-gray-300 mt-2">Dynamic OG images for each blog post</p>
              <p className="text-gray-500 text-sm mt-1">For now, all blog posts use the same beautiful blog image above</p>
            </div>
            <p className="text-gray-400 mt-2">We can implement dynamic blog post images later</p>
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