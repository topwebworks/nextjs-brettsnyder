"use client"

import React, { useState } from 'react';
import { 
  Code, Monitor, Zap, Terminal, Smartphone, 
  Coffee, Settings, Camera, Music, Cloud, Shield,
  Keyboard, Headphones, Gamepad2,
  Palette, Target, Lightbulb, Database, Server,
  Globe, Lock, Cpu, HardDrive, Wifi, Battery,
  Wrench, Package, GitBranch, Layers, Brush,
  FileText, Calculator, Calendar, Mail, MessageSquare,
  ChevronLeft, ChevronRight, Star
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AtmosphericBackground from '@/components/ui/AtmosphericBackground';
import styles from './ToolsPage.module.css';

// 30 Icon/Subcategory mappings for flexible tool categorization
const iconCategoryMap = {
  'Editor': Code,
  'Language': Terminal, 
  'Framework': Code,
  'Tools': Terminal,
  'DevOps': Cloud,
  'Design': Palette,
  'Deployment': Cloud,
  'Computer': Monitor,
  'Display': Monitor,
  'Input': Keyboard,
  'Audio': Headphones,
  'Mobile': Smartphone,
  'Furniture': Settings,
  'Organization': Lightbulb,
  'Entertainment': Music,
  'Utility': Target,
  'Lifestyle': Coffee,
  'Creative': Camera,
  'Security': Shield,
  'Database': Database,
  'Server': Server,
  'Web': Globe,
  'Encryption': Lock,
  'Hardware': Cpu,
  'Storage': HardDrive,
  'Network': Wifi,
  'Power': Battery,
  'Maintenance': Wrench,
  'Package': Package,
  'Version': GitBranch,
  'Layers': Layers,
  'Art': Brush,
  'Documents': FileText,
  'Calculator': Calculator,
  'Schedule': Calendar,
  'Communication': Mail,
  'Chat': MessageSquare,
  'Gaming': Gamepad2,
  'Performance': Zap
};

// Helper function to get icon for category
const getCategoryIcon = (category: string) => {
  return iconCategoryMap[category as keyof typeof iconCategoryMap] || Settings;
};

// Development tools data
const developmentTools = [
  { name: 'VS Code', description: 'Primary code editor with extensive customization', category: 'Editor', rating: 10 },
  { name: 'Shopify', description: 'E-commerce platform for online stores', category: 'Framework', rating: 9 },
  { name: 'Copilot', description: 'AI-assited code suggestions', category: 'Editor', rating: 9 },
  { name: 'Next.js', description: 'Full-stack React framework with excellent DX', category: 'Framework', rating: 9 },
  { name: 'Git & GitHub', description: 'Version control and collaboration platform', category: 'Version', rating: 10 },
  { name: 'Photoshop', description: 'Because every pixel matters', category: 'Design', rating: 9 },
  { name: 'Figma', description: 'Design collaboration and prototyping tool', category: 'Design', rating: 9 },
  { name: 'Vercel', description: 'Seamless deployment platform for modern web projects', category: 'Deployment', rating: 9 }
];

// Hardware setup data
const hardwareSetup = [
  { name: 'Asus Zephyrus G14', description: '15-inch powerhouse for development and design work', category: 'Computer', rating: 10 },
  { name: 'Logitech G915 TKL', description: 'Wireless mechanical keyboard for comfortable typing', category: 'Input', rating: 9 },
  { name: 'Logitech G502 X & G Powerplay', description: 'Precision pointing device with gesture support', category: 'Input', rating: 9 },
  { name: 'Sony WH-H900N', description: 'Noise-canceling headphones for focus and calls', category: 'Audio', rating: 9 },
  { name: 'Samsung Flip 6', description: 'Compact foldable phone for multitasking', category: 'Mobile', rating: 9 },
  { name: 'iVoler laptop stand & Zippi fan', description: 'Laptop stand and fan for cool ergonomic setup', category: 'Furniture', rating: 9 }
];

// Productivity tools data
const productivityTools = [
  { name: 'OneNote', description: 'Multi-device all-in-one note-taking and organization tool', category: 'Organization', rating: 8 },
  { name: 'Spotify', description: 'Music streaming for focused coding sessions', category: 'Entertainment', rating: 9 },
  { name: 'Mophie/Anker Magsafe Packs', description: 'Portable charging solutions for devices', category: 'Utility', rating: 9 },
  { name: 'Slack/Teams/Zoom', description: 'Communication and collaboration tools for remote work', category: 'Communication', rating: 8 },
  { name: 'Vitamix Smoothie', description: 'Protein smoothies, banana berry, chocolate, tropical', category: 'Lifestyle', rating: 10 },
  { name: 'Destiny 2', description: 'Deleted account and now more productive', category: 'Gaming', rating: 6 },
  { name: 'OneDrive', description: 'Cloud storage with versioning and file sharing service', category: 'Utility', rating: 9 },
  { name: 'Wrike/Jira', description: 'Project management and issue tracking tools', category: 'Productivity', rating: 8 }
];

// Reviews & Favorites data
const favoritesTools = [
  { name: 'Galaxy SmartTags', description: 'Item tracking and location services', category: 'Utility', rating: 9 },
  { name: 'Icon ID-5100 & ID-51 Ham Radio', description: 'Amateur radio transceivers for communication and experimentation', category: 'Communication', rating: 9 },
  { name: 'GrooveLife Products', description: '98 year warranty accessories', category: 'Lifestyle', rating: 10 },
  { name: 'Ryobi Tools', description: 'Because I live next to Home Depot', category: 'Maintenance', rating: 9 },
  { name: 'Birkenstock', description: 'Always a good day in Birks', category: 'Lifestyle', rating: 9 },
  { name: 'Tailwind CSS', description: 'utility-first CSS framework for rapid UI development', category: 'Framework', rating: 8 },
  { name: 'Supabase', description: 'Open source Firebase alternative with real-time database and auth', category: 'Database', rating: 8 },
  { name: 'Vercel - Free Tier', description: 'Best free hosting for Next.js apps', category: 'Deployment', rating: 10 }
];

// Stats data
const usesStats = [
  { label: 'Years Experience', value: '25+', icon: Target },
  { label: 'Tools Used Daily', value: '23+', icon: Code },
  { label: 'Smoothies Consumed', value: '1K+', icon: Coffee }
];

// Intro content
const usesIntro = {
  description: "A curated collection of the tools, software, and hardware that fuel my daily development workflow and creative process.",
  approach: "My tool selection evolves constantly as I discover better ways to work. Each choice is intentional, tested in real projects, and proven to enhance productivity and creativity."
};

export default function UsesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Check scroll indicators
  const checkScrollIndicators = () => {
    if (tabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll
  const handleScroll = (direction: 'left' | 'right') => {
    if (tabContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? tabContainerRef.current.scrollLeft - scrollAmount
        : tabContainerRef.current.scrollLeft + scrollAmount;
      
      tabContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Check indicators on mount and resize
  React.useEffect(() => {
    const checkIndicators = () => {
      setTimeout(checkScrollIndicators, 100);
    };
    
    checkIndicators();
    window.addEventListener('resize', checkIndicators);
    
    return () => window.removeEventListener('resize', checkIndicators);
  }, []);

  // Check indicators when content changes
  React.useEffect(() => {
    checkScrollIndicators();
  }, []);

  // Tab categories
  const categories = [
    {
      id: 'development',
      label: 'Development',
      icon: Code,
      tools: developmentTools
    },
    {
      id: 'hardware',
      label: 'Hardware',
      icon: Monitor,
      tools: hardwareSetup
    },
    {
      id: 'productivity',
      label: 'Productivity',
      icon: Zap,
      tools: productivityTools
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: Star,
      tools: favoritesTools
    }
  ];

  return (
    <>
      <AtmosphericBackground 
        variant="subtle" 
        orbCount={4} 
        includeBackground={true}
        className={styles.atmosphericBackground}
      />
      <Header />
      
      <main className={styles.mainContainer}>
        
        {/* Subtle Background Glass Panel */}
        <div className={`${styles.backgroundPanel} float-panel`} />

        {/* Tab Navigation */}
        <section className={styles.tabNavigationSection}>
          <div className={styles.tabNavigationContainer}>
            <div className={styles.tabNavWrapper}>
              {/* Left Scroll Arrow */}
              <button
                className={`${styles.scrollArrow} ${styles.scrollArrowLeft} ${showLeftArrow ? styles['scrollArrow--visible'] : ''}`}
                onClick={() => handleScroll('left')}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Scrollable Tab Container */}
              <div 
                ref={tabContainerRef}
                className={styles.tabScrollContainer}
                onScroll={checkScrollIndicators}
              >
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveTab(index)}
                      className={`${styles.tabButton} ${activeTab === index ? styles['tabButton--active'] : styles['tabButton--inactive']}`}
                    >
                      <Icon size={20} />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Scroll Arrow */}
              <button
                className={`${styles.scrollArrow} ${styles.scrollArrowRight} ${showRightArrow ? styles['scrollArrow--visible'] : ''}`}
                onClick={() => handleScroll('right')}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className={styles.tabContentSection}>
          
          <div className={styles.tabContentContainer}>
            {/* Category Header */}
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>
                {categories[activeTab].label}
              </h2>
              <p className={styles.categoryDescription}>
                {activeTab === 0 && "The software and frameworks that form the backbone of my development workflow."}
                {activeTab === 1 && "The physical tools and devices that enable my productivity and creativity."}
                {activeTab === 2 && "Apps and tools that enhance my daily productivity and work-life balance."}
                {activeTab === 3 && "My latest discoveries and favorite tools that are changing how I work and create."}
              </p>
            </div>

            {/* Tools Flexbox */}
            <div className={styles.toolsContainer}>
              {categories[activeTab].tools.map((tool) => (
                <div
                  key={tool.name}
                  className={styles.toolCard}
                >
                  <div className={styles.toolCardContent}>
                    {/* First Row: Icon, Subcategory, and Rating */}
                    <div className={styles.toolCardHeader}>
                      <div className={styles.toolCardIconGroup}>
                        <div className={styles.toolCardIcon}>
                          {(() => {
                            const CategoryIcon = getCategoryIcon(tool.category);
                            return <CategoryIcon size={18} />;
                          })()}
                        </div>
                        <span className={styles.toolCardCategory}>
                          {tool.category}
                        </span>
                      </div>
                      
                      {/* Rating display */}
                      <div className={styles.toolCardRating}>
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`${styles.ratingDot} ${i < Math.round(tool.rating / 2) ? styles['ratingDot--filled'] : styles['ratingDot--empty']}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Second Row: Title */}
                    <h3 className={styles.toolCardTitle}>
                      {tool.name}
                    </h3>
                    
                    {/* Third Row: Description */}
                    <p className={styles.toolCardDescription}>
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className={styles.statsContainer}>
              {usesStats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <div className={styles.statItemHeader}>
                    <stat.icon 
                      size={20} 
                      className={styles.statItemIcon}
                    />
                    <span className={styles.statItemValue}>
                      {stat.value}
                    </span>
                  </div>
                  <p className={styles.statItemLabel}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing Message */}
            <div className={styles.closingMessage}>
              <h3 className={styles.closingTitle}>
                Always Evolving
              </h3>
              <p className={styles.closingDescription}>
                {usesIntro.approach}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
