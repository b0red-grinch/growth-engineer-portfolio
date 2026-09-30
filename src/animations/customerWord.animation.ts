import { gsap  } from "./gsap";

export const createCustomerBadgeAnimation = () => {
  gsap.fromTo(
    "#customer",
    {
      rotation: -12,
      scale: 0.9,
      opacity: 0,
    },
    {
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ".box-content-3",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    },
  );
};