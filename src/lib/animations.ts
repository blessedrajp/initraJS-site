// Animation utilities and constants
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
} as const;

export const EASING = {
  easeInOut: "power2.inOut",
  easeOut: "power2.out",
  easeIn: "power2.in",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
} as const;

export const fadeInUp = (element: string | Element, delay = 0) => {
  if (typeof window !== 'undefined' && window.gsap) {
    return window.gsap.fromTo(element, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.easeOut,
        delay 
      }
    );
  }
};

export const staggerFadeInUp = (elements: string | NodeList | Element[], staggerAmount = 0.1) => {
  if (typeof window !== 'undefined' && window.gsap) {
    return window.gsap.fromTo(elements, 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.easeOut,
        stagger: staggerAmount 
      }
    );
  }
};

export const scaleIn = (element: string | Element, delay = 0) => {
  if (typeof window !== 'undefined' && window.gsap) {
    return window.gsap.fromTo(element, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.bounce,
        delay 
      }
    );
  }
};

export const createScrollTrigger = (element: string | Element, animation: any, options = {}) => {
  if (typeof window !== 'undefined' && window.ScrollTrigger) {
    return window.ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      animation,
      ...options
    });
  }
};

// Declare global types for GSAP
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    mouseX?: number;
    mouseY?: number;
  }
}
