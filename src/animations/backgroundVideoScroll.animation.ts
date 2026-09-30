import { gsap } from "./gsap";

export const createVideoScrollAnimation = () => {
  const video = document.getElementById("bg-video") as HTMLVideoElement | null;

  if (!video) return;

  const setupVideo = () => {
    gsap.to(video, {
      currentTime: video.duration,
      ease: "none",
      scrollTrigger: {
        trigger: ".video-container",
        start: "top top",
        end: "+=3000",
        scrub: 0.3,
      },
    });
  };

  if (video.readyState >= 1) {
    setupVideo();
    return;
  }

  video.addEventListener("loadedmetadata", setupVideo);

  return () => {
    video.removeEventListener("loadedmetadata", setupVideo);
  };
};

