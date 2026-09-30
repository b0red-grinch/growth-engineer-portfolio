import Lenis from "lenis";

import { gsap, ScrollTrigger } from "./gsap";


export const initializeLenisScroll = () => {
    //disable for touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
        return;
    }
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
        lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
        gsap.ticker.remove(updateLenis);
        lenis.destroy();
    };
}