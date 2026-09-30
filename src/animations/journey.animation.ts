import type { RefObject } from "react";

import { gsap } from "./gsap";
import { createHorizontalJourney } from "./horizontalJourney.animation";
import { createPurchaseEffect } from "./purchase.animation";
import type { WalkingCharacterHandle } from "../components/Hero/walking-character";

export const createJourneyAnimations = (
  spillBox: RefObject<HTMLDivElement | null>,
    characterRef: React.RefObject<HTMLDivElement | null>,
    walkingCharacterRef: React.RefObject<WalkingCharacterHandle | null>
) => {
  
  const horizontalTween = createHorizontalJourney(spillBox, characterRef, walkingCharacterRef);

  if (!horizontalTween) {
    return;
  }

  //card animation
  gsap.utils.toArray<HTMLElement>(".box-item").forEach((item) => {
    const heading = item.querySelector("h2");

    if (!heading) return;

    const isPurchaseCard = item.querySelector("#purchases-border");

    gsap.from(heading, {
      yPercent: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: item,
        containerAnimation: horizontalTween,
        start: "-200% 0%", //start scroller-start
        end: "right 45%", //end scroller-end
        toggleActions: "play none none reverse"
        // markers: true
      },
      onComplete: () => {
        if (isPurchaseCard) {
          const effect = item.querySelector(".card-effect");

          if (effect) {
            createPurchaseEffect(effect as HTMLElement);
          }
        }
      },
    });
  });

  //arrow animation
  gsap.utils.toArray<HTMLElement>(".journey-arrow").forEach((container, index) => {
    const arrow = container.querySelector("svg");
    if (!arrow) return;

    const isFirstArrow = index === 0;

    gsap.from(arrow, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: isFirstArrow ? spillBox.current : container,
        containerAnimation: horizontalTween,
        start: "left 90%", //start scroller-start
        end: "left-=400 0%", //end scroller-end
        scrub: true,
        // markers: true
      },
    });
  });


};