import React, { useState, useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { motion } from '../lib/motion';
import { Link } from 'react-router-dom';
import SparkleIllustration from '../components/SparkleIllustration';
import Shimmer from '../components/Shimmer';
import SEOHead from '../components/SEOHead';
import { usePostHog } from '@posthog/react';
import useSWR from 'swr';
import { duration } from '../utils/motionSettings';
import { cardMotion, motionTransition } from '../utils/motionContract';
import { client, urlFor } from '../lib/sanity';

const BLOG_LIST_CACHE_KEY = 'blog:list:v1';
const BLOG_LAST_COUNT_KEY = 'blog:last-count:v1';
const formatViews = (count) => `${new Intl.NumberFormat().format(count || 0)} views`;
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.json();
};

const BlogCardSkeleton = () => (
  <div className="border border-border/50 p-6 h-full flex flex-col bg-card/80 backdrop-blur-sm rounded-xl">
    <div className="w-full h-48 bg-muted/60 rounded-md mb-4" />
    <div className="flex-grow">
      <div className="h-7 w-[82%] bg-muted/60 rounded mb-3" />
      <div className="h-3 w-[58%] bg-muted/50 rounded mb-3" />
      <div className="space-y-2 mb-6">
        <div className="h-4 w-full bg-muted/50 rounded" />
        <div className="h-4 w-[94%] bg-muted/50 rounded" />
        <div className="h-4 w-[76%] bg-muted/50 rounded" />
      </div>
    </div>
    <div className="mt-auto pt-4 border-t border-border/30">
      <div className="h-4 w-28 bg-muted/50 rounded" />
    </div>
  </div>
);

const BlogPostCard = ({ post, onCardClick }) => (
  <motion.div
    className="group h-full"
    variants={cardMotion.itemVariants}
    whileHover={cardMotion.hover}
    whileTap={cardMotion.press}
  >
    <Link to={`/blog/${post.slug.current}`} className="block h-full" onClick={() => onCardClick(post)}>
      <div className="border border-border/50 p-6 h-full flex flex-col bg-card/80 backdrop-blur-sm
                      hover:border-primary/30 hover:shadow-lg 
                      transition-[border-color,box-shadow,transform,background-color] duration-200 rounded-xl 
                      group-hover:bg-card/90">
        {post.mainImage ? (
          <img 
            src={urlFor(post.mainImage).width(400).height(300).url()} 
            alt={post.title} 
            className="w-full h-48 object-cover rounded-md mb-4" 
          />
        ) : (
          <div className="w-full h-48 rounded-md mb-4 relative overflow-hidden 
                          flex flex-col items-center justify-center 
                          bg-gradient-to-br from-muted/30 via-background to-muted/10 
                          border border-border/30 group-hover:border-primary/20 
                          transition-[border-color] duration-200">
            
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.02] to-accent/[0.02]"></div>
            
            {/* Single sparkle accent */}
            <SparkleIllustration 
              size={20} 
              className="text-primary/40 mb-4 group-hover:text-primary/60 transition-colors duration-300" 
            />
            
            {/* Clean typography */}
            <div className="relative z-10 px-4">
              <h3 className="text-sm font-medium text-muted-foreground/80 text-center leading-relaxed">
                {post.title}
              </h3>
              <div className="w-8 h-px bg-primary/30 mx-auto mt-3 group-hover:scale-x-125 group-hover:bg-primary/50 transition-[transform,background-color] duration-200 origin-center"></div>
            </div>
          </div>
        )}
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary/90 transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-xs text-muted-foreground/80 mb-3 uppercase tracking-wider font-medium">
            {new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            {post.viewCount > 0 ? (
              <>
                {' '}•{' '}
                {formatViews(post.viewCount)}
              </>
            ) : null}
          </p>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-auto pt-4 border-t border-border/30">
          <span className="inline-flex items-center text-primary/80 hover:text-primary text-sm font-medium 
                           group-hover:translate-x-1 transition-[color,transform] duration-200">
            Read Article
            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m7-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skeletonCount, setSkeletonCount] = useState(1);
  const posthog = usePostHog();
  const { data: viewCountsData } = useSWR('/api/blog-view-counts', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
  });
  const viewCounts = viewCountsData?.ok && viewCountsData?.counts ? viewCountsData.counts : {};

  const handleBlogCardClick = (post) => {
    posthog?.capture('blog_card_clicked', {
      post_slug: post?.slug?.current,
      post_title: post?.title,
      current_path: window.location.pathname,
    });
  };

  useEffect(() => {
    try {
      const lastCount = Number(sessionStorage.getItem(BLOG_LAST_COUNT_KEY) || 0);
      if (Number.isFinite(lastCount) && lastCount > 0) {
        setSkeletonCount(Math.min(3, Math.max(1, lastCount)));
      }
    } catch {
      // ignore cache read issues
    }

    try {
      const cached = sessionStorage.getItem(BLOG_LIST_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlogPosts(parsed);
          setIsLoading(false);
        }
      }
    } catch {
      // ignore cache parse issues
    }

    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }`;

    client.fetch(query)
      .then((data) => {
        setBlogPosts(data);
        setIsLoading(false);
        try {
          sessionStorage.setItem(BLOG_LIST_CACHE_KEY, JSON.stringify(data));
          sessionStorage.setItem(BLOG_LAST_COUNT_KEY, String(data.length || 1));
        } catch {
          // ignore storage write issues
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SEOHead 
        title="Blog | Harikrishnan V K"
        description="Read my thoughts on web development, programming, and technology. Discover insights about React, Node.js, and modern web development practices."
        url="/blog"
        type="website"
        image="/og.jpg"
      />
      <div className="pt-32 pb-20 min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      <AnimatedSection animation="fadeUp">
        <div className="content-container text-center mb-20">
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.moderate / 1000, ease: 'easeOut' }}
          >
            <SparkleIllustration className="text-primary mr-3" size={24} />
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
              BLOG
            </h1>
          </motion.div>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.04, duration: duration.standard / 1000, ease: 'easeOut' }}
          >
            Thoughts, stories, and ideas worth sharing.
          </motion.p>
          <motion.div
            className="w-16 h-px bg-primary/40 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.08, duration: duration.standard / 1000, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fadeIn" delay={0.3}>
        <div className="content-container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <Shimmer key={i} loading={true}>
                  <BlogCardSkeleton />
                </Shimmer>
              ))}
            </div>
          ) : blogPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
              variants={cardMotion.gridVariants}
              initial="hidden"
              animate="visible"
            >
              {blogPosts.map((post) => (
                <BlogPostCard
                  key={post._id}
                  post={{
                    ...post,
                    viewCount: viewCounts[post?.slug?.current] || 0,
                  }}
                  onCardClick={handleBlogCardClick}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <motion.h2
                className="text-2xl font-semibold text-muted-foreground mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08, duration: duration.standard / 1000, ease: 'easeOut' }}
              >
                No blog posts yet.
              </motion.h2>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: duration.standard / 1000, ease: 'easeOut' }}
              >
                Check back soon for new articles!
              </motion.p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
    </>
  );
};

export default Blog;
