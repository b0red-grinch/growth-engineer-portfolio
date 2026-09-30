import { ScrollTrigger } from "./../animations/gsap"
export const refreshAfterAssets = () => {
  const refresh = () => ScrollTrigger.refresh();

  // Fonts change text size, which shifts everything below
  document.fonts?.ready.then(refresh);

  // Covers the case where your setup runs after "load" has already fired
  if (document.readyState === "complete") {
    refresh();
  } else {
    window.addEventListener("load", refresh, { once: true });
  }
};