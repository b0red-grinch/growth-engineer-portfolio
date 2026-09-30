import { gsap, SplitText } from "./gsap";

export const createHeroTextAnimation = (container: HTMLElement | null) => {
  if (!container) return;

  document.fonts.ready.then(() => {
    const boxes = gsap.utils.toArray<HTMLElement>(".box-content");

    boxes.forEach((box) => {
      const leftSplits = gsap.utils.toArray<HTMLElement>(".split-left");
      const rightSplit = box.querySelector<HTMLElement>(".split-right");

      leftSplits.forEach((leftSplit) => {
        SplitText.create(leftSplit, {
          type: "lines",
          mask: "lines",
          onSplit: (self) => {
            gsap.from(self.lines, {
              x: 100,
              mask: "lines",
              ease: "back.out",
              autoAlpha: 0,
              duration: 2,
              scrollTrigger: {
                trigger: box,
                start: "-400% 0%",
              },
              onComplete: () => {
                self.revert();
              },
            });
          },
        });
      });

      if (!rightSplit) return;

      SplitText.create(rightSplit, {
        type: "lines",
        mask: "lines",
        onSplit: (self) => {
          gsap.from(self.lines, {
            x: -100,
            delay: 1,
            ease: "back.out",
            autoAlpha: 0.2,
            yoyo: true,
            duration: 2,
            stagger: {
              amount: 0.5,
              from: 0,
            },
            scrollTrigger: {
              trigger: box,
              start: "-400% 0%",
            },
            onComplete: () => {
              self.revert();
            },
          });
        },
      });
    });
  });
};