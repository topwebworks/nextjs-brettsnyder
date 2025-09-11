/**
 * Global Scroll-Triggered Animation System
 * 
 * Usage:
 * 1. Add animation classes to elements: 'scroll-slide-up', 'scroll-slide-down', 'scroll-slide-left', 'scroll-slide-right'
 * 2. Call initScrollAnimations() once when the app loads
 * 3. Elements will automatically animate when they come into view
 */

interface AnimationConfig {
  className: string;
  initialTransform: string;
  finalTransform: string;
  animationName: string;
  customHandler?: (element: HTMLElement) => void;
}

const ANIMATION_CONFIGS: AnimationConfig[] = [
  {
    className: 'scroll-slide-up',
    initialTransform: 'translateY(150px)',
    finalTransform: 'translateY(0)',
    animationName: 'slideInFromBottom'
  },
  {
    className: 'scroll-slide-down',
    initialTransform: 'translateY(-150px)',
    finalTransform: 'translateY(0)',
    animationName: 'slideInFromTop'
  },
  {
    className: 'scroll-slide-left',
    initialTransform: 'translateX(150px)',
    finalTransform: 'translateX(0)',
    animationName: 'slideInFromRight'
  },
  {
    className: 'scroll-slide-right',
    initialTransform: 'translateX(-150px)',
    finalTransform: 'translateX(0)',
    animationName: 'slideInFromLeft'
  },
  {
    className: 'scroll-skills-progress',
    initialTransform: '',
    finalTransform: '',
    animationName: '',
    customHandler: (element: HTMLElement) => {
      // Trigger skills progress bar animation
      const event = new CustomEvent('skillsInView', { 
        detail: { target: element },
        bubbles: true 
      });
      element.dispatchEvent(event);
    }
  }
];

class ScrollAnimationManager {
  private isInitialized = false;
  private observer: IntersectionObserver | null = null;
  private animatedElements = new Set<Element>();

  constructor() {
    this.injectCSS();
  }

  private injectCSS() {
    if (typeof document === 'undefined') return;
    
    const styleId = 'scroll-animations-global';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Global Scroll Animation Keyframes */
      @keyframes slideInFromBottom {
        from { transform: translateY(150px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes slideInFromTop {
        from { transform: translateY(-150px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes slideInFromLeft {
        from { transform: translateX(-150px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes slideInFromRight {
        from { transform: translateX(150px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      /* Animation classes */
      .scroll-animate {
        transition: all 0.3s ease;
      }

      .scroll-slide-up {
        transform: translateY(150px);
        opacity: 0;
      }

      .scroll-slide-down {
        transform: translateY(-150px);
        opacity: 0;
      }

      .scroll-slide-left {
        transform: translateX(150px);
        opacity: 0;
      }

      .scroll-slide-right {
        transform: translateX(-150px);
        opacity: 0;
      }

      .scroll-animate-in {
        animation-duration: 1.2s;
        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        animation-fill-mode: forwards;
        opacity: 1;
      }

      /* Permanent animated state - keeps elements visible after animation */
      .scroll-animated {
        opacity: 1 !important;
        transform: translateY(0) translateX(0) !important;
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .scroll-slide-up,
        .scroll-slide-down,
        .scroll-slide-left,
        .scroll-slide-right {
          transform: none !important;
          opacity: 1 !important;
          animation: none !important;
        }
      }

      /* Stagger delays for multiple elements */
      .scroll-stagger-1 { animation-delay: 0.1s; }
      .scroll-stagger-2 { animation-delay: 0.2s; }
      .scroll-stagger-3 { animation-delay: 0.3s; }
      .scroll-stagger-4 { animation-delay: 0.4s; }
      .scroll-stagger-5 { animation-delay: 0.5s; }
      .scroll-stagger-6 { animation-delay: 0.6s; }
    `;
    
    document.head.appendChild(style);
  }

  public init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Skip if already animated (has permanent marker)
        if (entry.isIntersecting && 
            !this.animatedElements.has(entry.target) && 
            !entry.target.classList.contains('scroll-animated')) {
          this.animateElement(entry.target as HTMLElement);
          this.animatedElements.add(entry.target);
          this.observer?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.observeElements();
    
    // Re-observe on DOM changes
    this.setupMutationObserver();
  }

  private animateElement(element: HTMLElement) {
    const config = ANIMATION_CONFIGS.find(config => 
      element.classList.contains(config.className)
    );

    if (!config) return;

    // Handle custom animations (like skills progress)
    if (config.customHandler) {
      config.customHandler(element);
      return;
    }

    // Handle standard slide animations
    element.classList.add('scroll-animate-in');
    element.style.animationName = config.animationName;
    
    // Track cleanup to prevent multiple calls
    let finished = false;
    
    const finish = () => {
      if (finished) return;
      finished = true;

      // Keep the final transform inline to prevent jump
      element.style.transform = config.finalTransform;
      element.style.opacity = '1';

      // Add permanent animated marker (never remove original class)
      element.classList.add('scroll-animated');
      element.classList.remove('scroll-animate-in');
      element.style.animationName = '';
    };

    // Listen for animation end for smooth cleanup
    element.addEventListener('animationend', finish, { once: true });

    // Fallback timeout slightly longer than animation duration (1.4s vs 1.2s)
    const fallbackTimeout = window.setTimeout(finish, 1400);

    // Clear fallback when animationend fires
    element.addEventListener('animationend', () => clearTimeout(fallbackTimeout), { once: true });
  }

  private observeElements() {
    if (!this.observer) return;

    const selectors = ANIMATION_CONFIGS.map(config => `.${config.className}`).join(', ');
    const elements = document.querySelectorAll(selectors);
    
    elements.forEach(element => {
      // Skip if already animated or being tracked
      if (!this.animatedElements.has(element) && !element.classList.contains('scroll-animated')) {
        this.observer?.observe(element);
      }
    });
  }

  private setupMutationObserver() {
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldReobserve = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldReobserve = true;
        }
      });
      
      if (shouldReobserve) {
        setTimeout(() => this.observeElements(), 100);
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animatedElements.clear();
    this.isInitialized = false;
  }

  public addStaggeredAnimations(containerSelector: string, itemSelector: string, direction: 'up' | 'down' | 'left' | 'right') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    const animationClass = `scroll-slide-${direction}`;
    
    items.forEach((item, index) => {
      item.classList.add(animationClass);
      if (index < 6) {
        item.classList.add(`scroll-stagger-${index + 1}`);
      }
    });

    this.observeElements();
  }
}

// Global instance
let scrollAnimationManager: ScrollAnimationManager | null = null;

/**
 * Initialize the global scroll animation system
 * Call this once when your app loads
 */
export function initScrollAnimations(): void {
  if (typeof window === 'undefined') return;
  
  if (!scrollAnimationManager) {
    scrollAnimationManager = new ScrollAnimationManager();
  }
  
  scrollAnimationManager.init();
}

/**
 * Destroy the scroll animation system
 * Useful for cleanup when unmounting
 */
export function destroyScrollAnimations(): void {
  if (scrollAnimationManager) {
    scrollAnimationManager.destroy();
    scrollAnimationManager = null;
  }
}

/**
 * Add staggered animations to a group of elements
 * @param containerSelector - CSS selector for the container
 * @param itemSelector - CSS selector for items within the container
 * @param direction - Animation direction
 */
export function addStaggeredScrollAnimations(
  containerSelector: string, 
  itemSelector: string, 
  direction: 'up' | 'down' | 'left' | 'right'
): void {
  if (scrollAnimationManager) {
    scrollAnimationManager.addStaggeredAnimations(containerSelector, itemSelector, direction);
  }
}

/**
 * Add scroll animation to skills progress section
 * @param selectorOrElement - CSS selector string or HTMLElement for the skills container
 */
export function addSkillsProgressAnimation(selectorOrElement: string | HTMLElement): void {
  const element = typeof selectorOrElement === 'string' 
    ? document.querySelector(selectorOrElement) as HTMLElement
    : selectorOrElement;
    
  if (element) {
    element.classList.add('scroll-skills-progress');
    if (scrollAnimationManager) {
      scrollAnimationManager.addStaggeredAnimations('', '', 'up'); // Trigger re-observation
    }
  }
}

/**
 * Utility function to add animation classes to elements
 * @param selector - CSS selector for elements
 * @param direction - Animation direction
 * @param stagger - Whether to add stagger delays
 */
export function addScrollAnimation(
  selector: string, 
  direction: 'up' | 'down' | 'left' | 'right',
  stagger: boolean = false
): void {
  const elements = document.querySelectorAll(selector);
  const animationClass = `scroll-slide-${direction}`;
  
  elements.forEach((element, index) => {
    element.classList.add(animationClass);
    if (stagger && index < 6) {
      element.classList.add(`scroll-stagger-${index + 1}`);
    }
  });
}

// Auto-initialize on DOM ready if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initScrollAnimations, 100);
    });
  } else {
    setTimeout(initScrollAnimations, 100);
  }
}
