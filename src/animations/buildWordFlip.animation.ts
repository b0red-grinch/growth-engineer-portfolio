import { gsap, SplitText, ScrollTrigger } from "./gsap";
import gearsVideo from "../assets/gears.mp4";

export const createBuildWordAnimation = () => {
  document.fonts.ready.then(() => {
    const box = document.getElementsByClassName("box-content-2")[0] as HTMLElement | undefined;
    const splitText = box?.querySelector<HTMLElement>(".split-2");

    if (!box || !splitText) return;

    SplitText.create(splitText, {
      type: "words",
      wordsClass: "word++",
      smartWrap: true,
      autoSplit: true,
      yoyo: true,
      mask: "words",
      onSplit: (self) => {
        const buildWord = self.words[1];

        const positionVideo = () => {
          const wordRect = buildWord.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          gsap.set(videoElement, {
            left: wordRect.left - containerRect.left,
            top: wordRect.top - containerRect.top,
            x: "-50%",
            autoAlpha: 0,
          });
        };

        const container = box;

        let videoElement = container.querySelector<HTMLVideoElement>(".build-video");

        if (!videoElement) {
          videoElement = document.createElement("video");
          videoElement.src = gearsVideo;
          videoElement.muted = true;
          videoElement.loop = true;
          videoElement.playsInline = true;
          videoElement.classList.add("build-video");
          container.appendChild(videoElement);
        }

        positionVideo();

        gsap.from(self.words, {
          y: -150,
          mask: "words",
          ease: "back.out",
          autoAlpha: 0,
          duration: 1.5,
          stagger: {
            amount: 2,
            each: 0.005,
            from: "center",
          },
          scrollTrigger: {
            trigger: box,
            start: "-20% 0%",
            end: "bottom",
          },
        });

        gsap.to(videoElement, {
          y: "-50%",
          autoAlpha: 1,
          duration: 1,
          delay: 2,
          ease: "back.out",
          scrollTrigger: {
            trigger: box,
            start: "-20% 0%",
          },
        });

        const secondWord = self.words[1];
        const tl = gsap.timeline({
          repeat: -1,
          delay: 3.7,
          repeatDelay: 1.15,
          scrollTrigger: {
            trigger: box,
            start: "-20% 0%",
            end: "bottom",
          },
        });

        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        async function executeWithDelays() {
          await delay(3500);
          videoElement?.play();
        }

        executeWithDelays();

        tl.to(secondWord, {
          y: -50,
          duration: 0.6,
          ease: "power2.in",
        })
          .set(secondWord, {
            y: 50,
          })
          .to(secondWord, {
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
      },
    });
    // ScrollTrigger.refresh();
  });
};