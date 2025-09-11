/**
 * Supports: scroll-fade-up, scroll-fade-up-fast, scroll-skills-progress
 */

interface AnimationConfig {
  className: string;
  keyframe: string;
  duration: string;
  customHandler?: (element: HTMLElement) => void;
}

const ANIMATIONS: AnimationConfig[] = [
  {
    className: 'scroll-fade-up',
    keyframe: 'fadeUpGentle',
    duration: '1.2s'
  },
  {
    className: 'scroll-fade-up-fast', 
    keyframe: 'fadeUpFast',
    duration: '0.8s'
  },
  {
    className: 'scroll-skills-progress',
    keyframe: '',
    duration: '',
    customHandler: (el) => el.dispatchEvent(new CustomEvent('skillsInView', { bubbles: true }))
  }
];

class ScrollAnimationManager {
  private observer: IntersectionObserver | null = null;
  private fastObserver: IntersectionObserver | null = null;
  private animated = new Set<Element>();

  constructor() {
    this.injectCSS();
  }

  private injectCSS() {
    if (typeof document === 'undefined' || document.getElementById('scroll-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'scroll-animations';
    style.textContent = `
      @keyframes fadeUpGentle {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes fadeUpFast {
        from { transform: translateY(40px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .scroll-fade-up, .scroll-fade-up-fast {
        opacity: 0;
      }

      .scroll-fade-up {
        transform: translateY(30px);
      }

      .scroll-fade-up-fast {
        transform: translateY(40px);
      }

      .scroll-animated {
        opacity: 1 !important;
      }

      .scroll-animated.scroll-fade-up,
      .scroll-animated.scroll-fade-up-fast {
        transform: translateY(0) !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .scroll-fade-up, .scroll-fade-up-fast {
          transform: none !important;
          opacity: 1 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  init() {
    if (this.observer || typeof window === 'undefined') return;

    // Regular observer for content
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animate(entry.target as HTMLElement);
          this.animated.add(entry.target);
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    // Fast observer for images
    this.fastObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animate(entry.target as HTMLElement);
          this.animated.add(entry.target);
          this.fastObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    this.observe();
  }

  private animate(element: HTMLElement) {
    const config = ANIMATIONS.find(a => element.classList.contains(a.className));
    if (!config) return;

    if (config.customHandler) {
      config.customHandler(element);
      return;
    }

    // Store original transition to restore later
    const originalTransition = element.style.transition;
    
    element.style.animation = `${config.keyframe} ${config.duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    element.style.opacity = '1';
    element.classList.add('scroll-animated');
    
    // Restore transition after animation completes
    setTimeout(() => {
      element.style.animation = '';
      if (originalTransition) {
        element.style.transition = originalTransition;
      }
    }, parseFloat(config.duration) * 1000);
  }

  private observe() {
    const elements = document.querySelectorAll('.scroll-fade-up, .scroll-fade-up-fast, .scroll-skills-progress');
    elements.forEach(el => {
      if (this.animated.has(el)) return;
      
      if (el.classList.contains('scroll-fade-up-fast')) {
        this.fastObserver?.observe(el);
      } else {
        this.observer?.observe(el);
      }
    });
  }

  destroy() {
    this.observer?.disconnect();
    this.fastObserver?.disconnect();
    this.observer = this.fastObserver = null;
    this.animated.clear();
  }
}

let manager: ScrollAnimationManager | null = null;

export function initScrollAnimations(): void {
  if (typeof window === 'undefined') return;
  if (!manager) manager = new ScrollAnimationManager();
  manager.init();
}

export function destroyScrollAnimations(): void {
  manager?.destroy();
  manager = null;
}

// Auto-initialize
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initScrollAnimations, 100));
  } else {
    setTimeout(initScrollAnimations, 100);
  }
}
