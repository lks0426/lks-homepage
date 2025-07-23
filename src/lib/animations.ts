// Animation Design System
// Unified animation constants and variants for consistent motion design

// Animation timing and easing
export const ANIMATION_TIMING = {
  // Duration
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
  
  // Delays
  stagger: 0.1,
  staggerFast: 0.05,
  staggerSlow: 0.15,
} as const;

export const EASING = {
  // Standard easing curves
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  
  // Custom easing for specific interactions
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.175, 0.885, 0.32, 1.275],
  backOut: [0.34, 1.56, 0.64, 1],
  anticipate: [0.2, 1, 0.3, 1],
  
  // Apple-inspired easing
  spring: [0.25, 0.46, 0.45, 0.94],
  snappy: [0.4, 0.0, 0.2, 1.0],
} as const;

// Standard animation variants
export const FADE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: ANIMATION_TIMING.normal,
      ease: EASING.easeOut
    }
  }
};

export const SLIDE_UP_VARIANTS = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_TIMING.slow,
      ease: EASING.easeOut
    }
  }
};

export const SLIDE_IN_LEFT_VARIANTS = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: ANIMATION_TIMING.slow,
      ease: EASING.easeOut
    }
  }
};

export const SLIDE_IN_RIGHT_VARIANTS = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: ANIMATION_TIMING.slow,
      ease: EASING.easeOut
    }
  }
};

export const SCALE_VARIANTS = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: ANIMATION_TIMING.slow,
      ease: EASING.backOut
    }
  }
};

export const ELASTIC_VARIANTS = {
  hidden: { 
    opacity: 0, 
    scale: 0.3 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: ANIMATION_TIMING.slower,
      ease: EASING.elastic
    }
  }
};

// Hover animation presets
export const HOVER_LIFT = {
  scale: 1.03,
  y: -4,
  transition: {
    duration: ANIMATION_TIMING.normal,
    ease: EASING.spring
  }
};

export const HOVER_SCALE = {
  scale: 1.05,
  transition: {
    duration: ANIMATION_TIMING.normal,
    ease: EASING.spring
  }
};

export const HOVER_GLOW = {
  scale: 1.02,
  boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)",
  transition: {
    duration: ANIMATION_TIMING.normal,
    ease: EASING.easeOut
  }
};

export const HOVER_ROTATE = {
  scale: 1.05,
  rotate: 3,
  transition: {
    duration: ANIMATION_TIMING.normal,
    ease: EASING.spring
  }
};

// Tap animations
export const TAP_SCALE = {
  scale: 0.95,
  transition: {
    duration: ANIMATION_TIMING.fast,
    ease: EASING.easeOut
  }
};

// Container animations for staggered children
export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_TIMING.stagger,
      delayChildren: 0.1
    }
  }
};

export const STAGGER_FAST_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_TIMING.staggerFast,
      delayChildren: 0.05
    }
  }
};

export const STAGGER_SLOW_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: ANIMATION_TIMING.staggerSlow,
      delayChildren: 0.2
    }
  }
};

// Loading and progress animations
export const LOADING_DOTS = {
  animate: {
    y: [0, -10, 0],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.4,
      repeat: Infinity,
      ease: EASING.easeInOut
    }
  }
};

export const LOADING_SPINNER = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: EASING.linear
    }
  }
};

export const PROGRESS_BAR = {
  initial: { width: 0 },
  animate: { width: "100%" },
  transition: {
    duration: ANIMATION_TIMING.slowest,
    ease: EASING.easeOut
  }
};

// Page transition variants
export const PAGE_TRANSITIONS = {
  slideLeft: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  },
  slideRight: {
    initial: { x: -300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 }
  },
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 }
  },
  slideDown: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  }
};

// Advanced micro-interactions
export const MICRO_INTERACTIONS = {
  // Button press with ripple effect
  buttonPress: {
    scale: 0.95,
    transition: { duration: ANIMATION_TIMING.fast }
  },
  
  // Card hover with enhanced shadow
  cardHover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: ANIMATION_TIMING.normal,
      ease: EASING.spring
    }
  },
  
  // Icon bounce on interaction
  iconBounce: {
    scale: [1, 1.2, 1],
    rotate: [0, -10, 10, 0],
    transition: {
      duration: ANIMATION_TIMING.slow,
      ease: EASING.bounce
    }
  },
  
  // Text highlight effect
  textHighlight: {
    backgroundColor: ["rgba(59, 130, 246, 0)", "rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0)"],
    transition: { duration: ANIMATION_TIMING.slower }
  },
  
  // Success feedback
  successPulse: {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(34, 197, 94, 0.4)",
      "0 0 0 10px rgba(34, 197, 94, 0)",
      "0 0 0 0 rgba(34, 197, 94, 0)"
    ],
    transition: { duration: ANIMATION_TIMING.slower }
  }
};

// Utility functions for creating dynamic animations
export const createStaggerVariants = (delay = ANIMATION_TIMING.stagger) => ({
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * delay,
      duration: ANIMATION_TIMING.slow,
      ease: EASING.easeOut
    }
  })
});

export const createDelayedVariant = (baseVariant: any, delay: number) => ({
  ...baseVariant,
  visible: {
    ...baseVariant.visible,
    transition: {
      ...baseVariant.visible.transition,
      delay
    }
  }
});

// Viewport-aware animations
export const VIEWPORT_ONCE = {
  once: true,
  margin: "-10% 0px -10% 0px"
};

export const VIEWPORT_REPEAT = {
  once: false,
  margin: "-20% 0px -20% 0px"
};

// Animation presets for common component types
export const COMPONENT_ANIMATIONS = {
  modal: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: ANIMATION_TIMING.normal }
    },
    content: {
      initial: { opacity: 0, scale: 0.9, y: 50 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9, y: 50 },
      transition: { 
        duration: ANIMATION_TIMING.slow,
        ease: EASING.backOut
      }
    }
  },
  
  dropdown: {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: ANIMATION_TIMING.normal,
        ease: EASING.backOut
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: ANIMATION_TIMING.fast }
    }
  },
  
  toast: {
    initial: { opacity: 0, x: 300, scale: 0.8 },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: ANIMATION_TIMING.slow,
        ease: EASING.backOut
      }
    },
    exit: { 
      opacity: 0, 
      x: 300,
      transition: { duration: ANIMATION_TIMING.normal }
    }
  }
};