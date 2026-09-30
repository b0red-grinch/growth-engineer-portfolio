import type { WalkingCharacterHandle } from "../components/Hero/walking-character";
import { gsap } from "./gsap"

export const createHorizontalJourney = (
    spillBox: React.RefObject<HTMLDivElement | null>,
    characterRef: React.RefObject<HTMLDivElement | null>,
    walkingCharacterRef: React.RefObject<WalkingCharacterHandle | null>
) => {


    const outerContainer = spillBox.current

    if (!outerContainer) return;
    
    const spillContainer =
    outerContainer.querySelector<HTMLElement>(".box-content-3");
    if (!spillContainer) return;

    const character = characterRef.current;
    if (!character) return;

    gsap.set(character, {
        x: 0,
    });

    // Make absolutely sure we're starting from the beginning
    outerContainer.scrollLeft = 0;
    gsap.set(spillContainer, { x: 0 });


    const getDistance = () => {
        return Math.max(
            0,
            spillContainer.scrollWidth - window.innerWidth 
        );

    };

    // const walkCard = spillBox.current.querySelector<HTMLElement>(
    //     ".walk-card-effect"
    // );

    // if (walkCard) {
    //     ScrollTrigger.create({
    //         trigger: walkCard,
    //         start: "top top",
    //         end: () => `+=${getDistance()}`,
    //         pin: true,
    //         pinSpacing: false,
    //         invalidateOnRefresh: true,
    //     });
    // }


    const horizontalTween = gsap.fromTo(
        spillContainer,
        {
            x: 0,
        },
        {
            // x: () => -3000,
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
                trigger: spillContainer,
                start: "top top",
                // end: "+=60000",
                end: () => `+=${getDistance()}`,
                pin: outerContainer,
                scrub: true,
                invalidateOnRefresh: true,
                // markers: true,

                onUpdate: (self) => {
                    const character = characterRef.current;
                    const walkingCharacter = walkingCharacterRef.current;

                    if (!character || !walkingCharacter) return;

                    // Move character across the journey
                    const characterDistance =
                        getDistance();

                    gsap.set(character, {
                        x: self.progress * characterDistance,
                        // x: self.progress * characterDistance,
                    });

                    // Character is walking while the page is scrolling
                    walkingCharacter.setWalking(true);
                },
            },
        },
    );

    return horizontalTween;

    // gsap.from(".interaction", {
    //     opacity: 0,
    //     y: 30,

    //     scrollTrigger: {
    //         trigger: ".interaction",
    //         containerAnimation: horizontalTween,

    //         start: "left 70%",
    //         end: "left 30%",
    //         scrub: true,
    //     },
    // });
}