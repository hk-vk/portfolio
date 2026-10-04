import { Helmet } from 'react-helmet-async';

const DEFAULT_IMAGE = '/social/hero-silver-og-v1.jpg';
const TWITTER_IMAGE = '/social/hero-silver-x-v1.jpg';

const SEOHead = ({
  title = 'Harikrishnan V K | Portfolio',
  description = 'Full-stack developer specializing in modern web technologies. Explore my projects, blog posts, and professional journey.',
  image = DEFAULT_IMAGE,
  url = '',
  type = 'website',
  author = 'Harikrishnan V K',
  twitterHandle = '@harikrishnanvk',
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://hari.works');
  const fullUrl = new URL(url || '/', siteUrl).href;
  const imageUrl = new URL(image, siteUrl).href;
  const isDefaultImage = image === DEFAULT_IMAGE;
  const twitterImageUrl = isDefaultImage ? new URL(TWITTER_IMAGE, siteUrl).href : imageUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {imageUrl.startsWith('https:') && <meta property="og:image:secure_url" content={imageUrl} />}
      {isDefaultImage && <meta property="og:image:type" content="image/jpeg" />}
      {isDefaultImage && <meta property="og:image:width" content="1200" />}
      {isDefaultImage && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={`Preview image for ${title}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Harikrishnan V K | Portfolio" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImageUrl} />
      <meta name="twitter:image:alt" content={`Preview image for ${title}`} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#191b1e" />
    </Helmet>
  );
};

export default SEOHead;
