import React from 'react';
import { Helmet } from 'react-helmet-async';

const OG_IMAGE_VERSION = '20260324-1';

const SEOHead = ({
  title = "Harikrishnan V K | Portfolio",
  description = "Full-stack developer specializing in modern web technologies. Explore my projects, blog posts, and professional journey.",
  image = "/social/og-universal-1200x630.jpg",
  url = "",
  type = "website",
  author = "Harikrishnan V K",
  twitterHandle = "@harikrishnanvk"
}) => {
  const getSiteUrl = () => {
    if (import.meta.env.VITE_SITE_URL) {
      return import.meta.env.VITE_SITE_URL;
    }
    if (typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }
    return 'https://hari.works';
  };

  const siteUrl = getSiteUrl();
  const fullUrl = url
    ? url.startsWith('http')
      ? url
      : new URL(url, siteUrl).href
    : siteUrl;
  const resolvedImageUrl = image.startsWith('http') ? image : new URL(image, siteUrl).href;
  const fullImageUrl = new URL(resolvedImageUrl);
  fullImageUrl.searchParams.set('v', OG_IMAGE_VERSION);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl.href} />
      <meta property="og:image:secure_url" content={fullImageUrl.href} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`Preview image for ${title}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Harikrishnan V K | Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={new URL(`/social/x-1200x675.jpg?v=${OG_IMAGE_VERSION}`, siteUrl).href} />
      <meta name="twitter:image:src" content={new URL(`/social/x-1200x675.jpg?v=${OG_IMAGE_VERSION}`, siteUrl).href} />
      <meta name="twitter:image:alt" content={`Preview image for ${title}`} />

      {/* Additional Meta Tags for better SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
    </Helmet>
  );
};

export default SEOHead; 
