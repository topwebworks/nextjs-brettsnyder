import React from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import Button from '@/components/ui/Button';
import { emailLinks } from '@/lib/config';
import { getAllBlogs } from '@/lib/blogLoader';
import type { BlogData } from '@/lib/types/blog';
import { getBlogImages } from '@/lib/generated/blogImageImports';
import Image from 'next/image';
import { Metadata } from 'next';
import BlogScripts from '@/components/BlogScripts';
import '@/styles/pagination.css';
import styles from './BlogPage.module.css';

// Page metadata
export const metadata: Metadata = {
  title: 'Blog - RockitCode',
  description: 'Explore my latest thoughts, tutorials, and insights on web development, technology, and design.',
  openGraph: {
    title: 'Blog - RockitCode',
    description: 'Explore my latest thoughts, tutorials, and insights on web development, technology, and design.',
    type: 'website',
  },
};

// Enable static generation with revalidation
export const revalidate = 3600; // 1 hour

export default async function BlogPage() {
  // Load all blog data using auto-discovery
  const allBlogs = await getAllBlogs();
  
  // Get unique categories and tags
  const categories = Array.from(new Set(allBlogs.map((blog: BlogData) => blog.category)));
  const tags = Array.from(new Set(allBlogs.flatMap((blog: BlogData) => blog.tags || [])));

  // Helper function to get first available image for a blog
  const getFirstImage = (blogId: string, blogData: BlogData) => {
    const images = getBlogImages(blogId);
    // Try static images first
    const staticImage = images.hero || images.screenshots?.[0];
    if (staticImage) return staticImage;
    
    // Fallback to remote images from blog data
    const remoteHero = blogData.images?.hero;
    const remoteScreenshot = blogData.images?.screenshots?.[0];
    return remoteHero || remoteScreenshot || null;
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {/* Atmospheric Background */}
        <AtmosphericBackground variant="subtle" orbCount={3} includeBackground={true} />
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Hero Section */}
          <section className={styles.heroSection}>

            {/* Subtle Background Glass Panel */}
            <div className={`${styles.floatPanel} float-panel`} />

            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Blog &amp; Insights
              </h1>
              <p className={styles.heroSubtitle}>
                Thoughts, tutorials, and insights on web development, technology trends, and creative problem-solving in the modern digital&nbsp;landscape.
              </p>

              {/* Blog Stats */}
              <div className={`${styles.blogListStats} blog-list-stats`}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {allBlogs.length}
                  </div>
                  <div className={styles.statLabel}>
                    Posts
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {allBlogs.length}
                  </div>
                  <div className={styles.statLabel}>
                    Topics
                  </div>
                </div>
                
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    {tags.length - 1}
                  </div>
                  <div className={styles.statLabel}>
                    Tags
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Posts Grid Section */}
          <section className={styles.blogPostsSection}>
            <div className={styles.blogPostsContainer}>
              {/* Category Filter Buttons */}
              <div className={styles.categoryFilterContainer}>
                <div className={`category-filters-container ${styles.categoryFiltersContainer}`}>
                  <div className={`category-buttons-row ${styles.categoryButtonsRow}`}>
                    {categories.map((category, index) => (
                      <button
                        key={`category-${index}`}
                        className={`category-filter-btn ${styles.categoryFilterBtn}`}
                        data-filter={category}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog Posts Flexbox Container */}
              <div className={styles.blogPostsGrid}>
                {allBlogs.map((blog: BlogData, index: number) => (
                  <article
                    key={`blog-${blog?.id || index}`}
                    className={`blog-card pagination-item ${styles.blogCard} ${styles.paginationItem} ${index >= 1 ? styles.hidden : ''}`}
                    data-category={blog?.category || 'General'}
                    data-featured={blog?.featured ? 'true' : 'false'}
                    data-index={index}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >

                    <div className={styles.blogCardContent}>

                      <div>
                        {/* Blog Header Row - Category and Date */}
                        <div className={styles.blogHeaderRow}>
                          <div className={styles.blogCategoryBadge}>
                            {blog?.category || 'General'}
                          </div>

                          <div className={styles.blogDateInfo}>
                            <Calendar size={14} />
                            {blog?.publishDate 
                              ? new Date(blog.publishDate).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short' 
                                })
                              : 'No Date'
                            }
                          </div>
                        </div>

                        {/* Image and Content Container */}
                        {(() => {
                          const firstImage = getFirstImage(blog?.id || '', blog);
                          
                          if (firstImage) {
                            // With image: stacked layout
                            return (
                              <div className={`project-image-container ${styles.projectImageContainer}`}>
                                <div 
                                  className={`project-card-image ${styles.projectCardImage}`}
                                >
                                  <Image
                                    src={firstImage}
                                    alt={`${blog?.title || 'Blog post'} preview`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 550px"
                                    style={{
                                      objectFit: 'cover',
                                      objectPosition: 'center'
                                    }}
                                    quality={85}
                                    loading="lazy"
                                    unoptimized={typeof firstImage === 'string' && firstImage.startsWith('http')}
                                  />
                                </div>

                                <div className={`project-content-with-image ${styles.projectContentWithImage}`}>
                                  {/* Blog Title */}
                                  <h3 className={styles.blogTitle}>
                                    {blog?.title || 'Untitled Post'}
                                  </h3>

                                  {/* Blog Description */}
                                  <p className={`${styles.blogDescription} ${styles.blogDescriptionMaxWidth} ${styles.blogDescriptionWithImage}`}>
                                    {blog?.excerpt || blog?.description || 'No excerpt available.'}
                                  </p>

                                  {/* Read Time */}
                                  <div className={styles.blogReadTime}>
                                    <Clock size={14} />
                                    {blog?.readTime || '5 min read'}
                                  </div>

                                  {/* Blog Tags */}
                                  <div className={styles.blogTagsContainer}>
                                    {(blog.tags || []).slice(0, 4).map((tag: string, tagIndex: number) => (
                                      <span 
                                        key={`${blog?.id || 'unknown'}-tag-${tagIndex}`}
                                        className={`tech-tag ${styles.techTag}`}
                                      >
                                        <Tag size={10} />
                                        {tag}
                                      </span>
                                    ))}
                                    {(blog.tags || []).length > 4 && (
                                      <span className={styles.tagMoreCount}>
                                        +{(blog.tags || []).length - 4}
                                      </span>
                                    )}
                                  </div>
                                </div>

                              </div>
                            );
                          } else {
                            // Without image: normal stacked layout
                            return (
                              <>
                                {/* Blog Title */}
                                <h3 className={styles.blogTitle}>
                                  {blog?.title || 'Untitled Post'}
                                </h3>

                                {/* Blog Description */}
                                <p className={`${styles.blogDescription} ${styles.blogDescriptionNoImage}`}>
                                  {blog?.excerpt || blog?.description || 'No excerpt available.'}
                                </p>

                                {/* Read Time */}
                                <div className={`${styles.blogReadTime} ${styles.blogReadTimeNoImage}`}>
                                  <Clock size={14} />
                                  {blog?.readTime || '5 min read'}
                                </div>

                                {/* Blog Tags */}
                                <div className={`${styles.blogTagsContainer} ${styles.blogTagsContainerNoImage}`}>
                                  {(blog.tags || []).slice(0, 4).map((tag: string, tagIndex: number) => (
                                    <span 
                                      key={`${blog?.id || 'unknown'}-tag-${tagIndex}`}
                                      className={`tech-tag ${styles.techTag} ${styles.techTagAlt}`}
                                    >
                                      <Tag size={10} />
                                      {tag}
                                    </span>
                                  ))}
                                  {(blog.tags || []).length > 4 && (
                                    <span className={styles.tagMoreCount}>
                                      +{(blog.tags || []).length - 4}
                                    </span>
                                  )}
                                </div>
                              </>
                            );
                          }
                        })()}

                      </div>

                      {/* Blog Actions */}
                      <div className={`${styles.blogActions} blog-actions`}>
                        <div className={styles.blogActionsLeft}>
                        </div>

                        <a
                          href={`/blog/${blog?.id || 'unknown'}`}
                          className={`view-details-btn ${styles.viewDetailsBtn}`}
                        >
                          <Button
                            variant="secondary"
                            size="medium"
                            icon="arrow-right"
                          >
                            Read More
                          </Button>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Show More Button */}
              <div id="show-more-blogs" className={`${styles.showMoreBlogs} ${styles.showMoreBlogsVisible}`}>
                <Button
                  variant="ghost"
                  size="medium"
                  icon="chevron-down"
                >
                  Show More
                </Button>
              </div>

              {/* Subscribe CTA */}
              <div className={styles.subscribeCta}>
                <div className={styles.subscribeCtaContent}>
                  <h2 className={styles.subscribeCtaTitle}>
                    Stay Updated
                  </h2>
                  <p className={styles.subscribeCtaSubtitle}>
                    Follow along for the latest insights on web development, 
                    technology trends, and creative problem-solving&nbsp;techniques.
                  </p>

                  {/* Contact CTA matching homepage */}
                  <div className={styles.subscribeCtaActions}>
                    {/* Primary Button */}
                    <a 
                      href={emailLinks.blog()}
                      className={styles.subscribeCtaLink}
                    >
                      <Button
                        variant="primary"
                        size="medium"
                        icon="user"
                      >
                        Say Hello
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Blog Scripts */}
        <BlogScripts />
      </div>
    </>
  );
}