import { gsap, ScrollTrigger } from "./gsap";

export const createBoxPinAnimations = () => {
  const boxes = gsap.utils.toArray<HTMLElement>(".box");

  boxes.forEach((box) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "0% 0%",
        end: () => `+=${box.offsetHeight * 1.6}`,
        scrub: true,
        pinSpacing: false,
        pin: true,
      },
    });
  });

  // ScrollTrigger.refresh();
};