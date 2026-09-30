import { gsap } from "./gsap";

export const createPurchaseEffect = (container: HTMLElement) => {
  const particles: HTMLSpanElement[] = [];

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("span");

    particle.className = "money-particle";
    particle.textContent = "$";

    container.appendChild(particle);
    particles.push(particle);

    gsap.set(particle, {
      x: 0,
      y: 0,
      scale: gsap.utils.random(0.5, 1),
      rotation: gsap.utils.random(-25, 25),
      opacity: 0,
    });
  }

  particles.forEach((particle) => {
    const x = gsap.utils.random(-150, 150);
    const y = gsap.utils.random(-100, -180);

    gsap.to(particle, {
      x,
      y,
      opacity: 1,
      duration: gsap.utils.random(0.5, 0.8),
      ease: "power2.out",
    });

    gsap.to(particle, {
      y: y - gsap.utils.random(40, 100),
      opacity: 0,
      duration: gsap.utils.random(0.6, 1),
      delay: 0.5,
      ease: "power1.in",
      onComplete: () => particle.remove(),
    });
  });
};