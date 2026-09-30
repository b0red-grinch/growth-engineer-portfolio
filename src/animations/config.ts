export const animationConfig = {
  duration: {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
  },

  ease: {
    standard: "power3.out",
    smooth: "power4.out",
    elastic: "elastic.out(1, 0.5)",
  },
} as const;