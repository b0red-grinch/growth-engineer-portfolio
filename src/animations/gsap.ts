import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

ScrollTrigger.config({ ignoreMobileResize: true });

if (window.matchMedia("(pointer: coarse)").matches) {
  ScrollTrigger.normalizeScroll(true);
}

export { gsap, useGSAP, ScrollTrigger, SplitText };