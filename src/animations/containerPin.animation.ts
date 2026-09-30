import { gsap, ScrollTrigger } from "./gsap";

export const createBoxPinAnimations = () => {
  const boxes = gsap.utils.toArray<HTMLElement>(".box");

  console.log("INITIAL SCROLL:", window.scrollY);

  boxes.forEach((box, index) => {
    // console.log(`Creating box pin ${index}`, {
    //   height: box.offsetHeight,
    //   top: box.getBoundingClientRect().top,
    //   position: getComputedStyle(box).position,
    // });

    ScrollTrigger.create({
      trigger: box,
      start: "top top",
      end: () => `+=${box.offsetHeight * 1.6}`,
      pin: box,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,

      // onEnter: () => {
      //   console.log(`BOX ${index} ENTER`);
      // },

      // onLeave: () => {
      //   console.log(`BOX ${index} LEAVE`);
      // },

      // onEnterBack: () => {
      //   console.log(`BOX ${index} ENTER BACK`);
      // },

      // onLeaveBack: () => {
      //   console.log(`BOX ${index} LEAVE BACK`);
      // },

      // onRefresh: (self) => {
      //   console.log(`BOX ${index} REFRESH`, {
      //     start: self.start,
      //     end: self.end,
      //   });
      // },
    });
  });
};