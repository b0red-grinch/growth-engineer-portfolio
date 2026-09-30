import { useRef } from "react";
import { useGSAP } from "@gsap/react";

// import { heroAnimation } from "./hero.animation";

import "./Hero.css";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
    //   heroAnimation();
    },
    {
      scope: container,
    }
  );

  return (
    <section ref={container} className="hero">
      <h1 className="hero__title">
        Build Something Amazing
      </h1>

      <p className="hero__description">
        A better way to build modern applications.
      </p>

      <button className="hero__button">
        Get Started
      </button>
    </section>
  );
}