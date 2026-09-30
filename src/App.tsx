import {
  // useState,
  useRef,
} from "react";

//animations
import { useGSAP, ScrollTrigger } from "./animations/gsap";

import video from "./assets/hero-shapes-1.mp4";
import logo from "./assets/name-logo.svg";
import linkedInLogo from "./assets/linkedIn-icon.svg";
import mediumLogo from "./assets/medium-logo.svg";

import "./App.css";
import { JourneyArrow } from "./assets/journey-arrow";
import { createVideoScrollAnimation } from "./animations/backgroundVideoScroll.animation";
import { createHeroTextAnimation } from "./animations/hero.animation";
import { createBuildWordAnimation } from "./animations/buildWordFlip.animation";
import { createBoxPinAnimations } from "./animations/containerPin.animation";
import { createJourneyAnimations } from "./animations/journey.animation";
import { initializeLenisScroll } from "./animations/lenisScroll";

import {
  WalkingCharacter,
  type WalkingCharacterHandle,
} from "./components/Hero/walking-character";

function App() {
  //reference APIs
  const container = useRef(null);
  const spillBox = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const walkingCharacterRef = useRef<WalkingCharacterHandle | null>(null);

  //lenis scroll
  //smooth scrolling
  useGSAP(() => {
    initializeLenisScroll();
  });

//   useGSAP(() => {
//   console.log("SCROLL POSITION:", window.scrollY);

//   console.log("touch", ScrollTrigger.isTouch)

//   const update = () => {
//     console.log("scroll:", window.scrollY);
//   };

//   window.addEventListener("scroll", update);

//   return () => {
//     window.removeEventListener("scroll", update);
//   };
// });



  //video animation
  useGSAP(() => {
    createVideoScrollAnimation();
  });

  // split text animation
  // hero text
  useGSAP(
    () => {
      createHeroTextAnimation(container.current);
    },
    // { scope: container },
  );

  //second frame
  useGSAP(() => {
    createBuildWordAnimation();
  });

  //trigger box scroll animations
  useGSAP(() => {
    createBoxPinAnimations();
  });

  // horizontal page scroll
  useGSAP(
    () => {
      createJourneyAnimations(spillBox, characterRef, walkingCharacterRef);
    },
    { scope: spillBox, dependencies: [] },
  );

  // useGSAP(
  //   () => {
  //     createCustomerBadgeAnimation()
  //   },
  //   // { scope: container },
  // );

  //   gsap.to(logoRef.current, {
  //     rotation: 360,
  //     duration: 2,
  //     ease: "none",
  //     repeat: -1,
  //   });
  // });

  //SWAYING ICON ANIMATION
  // useGSAP(() => {
  //   // if (!logoRef.current) return;

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".user-icon", // The element that activates the scroll effect
  //       start: "top bottom", // Animation starts when the container enters the viewport
  //       end: "bottom top", // Animation ends when the container leaves the viewport
  //       scrub: -3, // links the animation progress directly to the scrollbar
  //     },
  //   });

  //   // Chain the left-and-right movements
  //   tl.to(".user-icon", { rotation: -15, ease: "none" }) // Turn left
  //     .to(".user-icon", { rotation: 15, ease: "none" }) // Turn right
  //     .to(".user-icon", { rotation: 0, ease: "none" }); // Return to center
  // });

  // Images scroll trigger animation
  // useGSAP(() => {
  //   const imageContainers = gsap.utils.toArray<HTMLElement>(
  //     ".box-image-container",
  //   );

  //   imageContainers.forEach((imageContainer) => {
  //     const image =
  //       imageContainer.querySelector<HTMLImageElement>(".box-image");

  //     if (!image) return;

  //     gsap.to(image, {
  //       y: -300,
  //       ease: "none",

  //       scrollTrigger: {
  //         trigger: imageContainer,
  //         start: "30% top",
  //         end: () => `+=${imageContainer.offsetHeight * 1.6}`,
  //         scrub: 4,
  //         // markers: true,
  //       },
  //     });
  //   });
  // });

  //counter state
  // const [count, setCount] = useState(0);
  // const tl = gsap.timeline();
  // tl.from("orange", {xPercnet: -100})
  // tl.from("purple", {xPercnet: -100})

  return (
    <>
      <section id="top">
        <div className="header">
          <img
            // ref={logoRef}
            // src="https://toast.ng/wp-content/uploads/2022/02/Toast-White-Logo.svg"
            src={logo}
            //{sailorWheel}
            // "https://res.cloudinary.com/oio9dlim/image/upload/q_auto/openart-image_Ip_eu15O_1788864223951_raw"
            className="icon"
            alt="Toast Logo"
          />
        </div>
      </section>

      <section>
        <div className="video-container">
          <video
            src={video}
            id="bg-video"
            muted
            playsInline
            preload="auto"
          ></video>
        </div>
      </section>

      <section id="center" ref={container}>
        <div className="box" style={{ background: "transparent" }}>
          <div className="box-content">
            <div>
              <h2 className="split-left">Software Engineer</h2>
              <p className="split-left">
                Backend Engineer focused on Product, Growth & Customer Lifecycle
                Systems
              </p>
            </div>
            <div className="split-right" id="points">
              <p> Discovery </p>
              <p> Activation </p>
              <p> Retention </p>
            </div>
          </div>
          <div className="contact-info"></div>

          {/* <div className="box-image-container">
            <img
              src="https://toast.ng/wp-content/uploads/2024/07/toast-ezgif.com-png-to-webp-converter.webp"
              alt=""
              className="box-image"
            />
          </div> */}
        </div>

        <div className="box" style={{ backgroundColor: "transparent" }}>
          <div className="box-content-2">
            <h2 className="split-2">
              I build reliable systems behind products; from APIs and
              distributed workflows to analytics, personalization, and customer
              lifecycle experiences
            </h2>
          </div>
        </div>
      </section>
      <section className="journey-scroll-section">
        <div
          className="spill-box"
          style={{ backgroundColor: "black" }}
          ref={spillBox}
        >
          <div className="box-content-3">
            <div className="walk-card-effect">
              <WalkingCharacter
                ref={walkingCharacterRef}
                characterRef={characterRef}
              />
            </div>
            <div className="journey-step">
              <div className="box-item" id="customer">
                <h2>
                  <span id="customer-border"> One Customer </span>
                </h2>
              </div>
            </div>

            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item" id="product">
                <h2>
                  <span id="product-border"> Discovers Product </span>{" "}
                </h2>
              </div>
            </div>

            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <h2>
                  <span id="cart-border"> Adds to Cart </span>
                </h2>
              </div>
            </div>

            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <h2>
                  <span id="leaves-border"> Leaves </span>
                </h2>
              </div>
            </div>

            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <h2>
                  <span id="lifecycle-border"> Lifecycle event fires </span>
                </h2>
              </div>
            </div>

            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <h2>
                  <span id="reminder-border"> Personalized reminder </span>
                </h2>
              </div>
            </div>
            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <h2>
                  <span id="returns-border"> Returns </span>
                </h2>
              </div>
            </div>
            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <div className="card-effect" />
                <h2>
                  <span id="purchases-border"> Purchases </span>
                </h2>
              </div>
            </div>

            <JourneyArrow />

            <div className="journey-step">
              <div className="box-item">
                <h2>
                  <span id="upsell-border"> Upsell </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section> */}

      {/* <div className="ticks"></div> */}

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2> Read my blogs </h2>
          <p> When I'm not writing code, I'm writing about tech </p>
          <ul>
            <li>
              <a href="https://medium.com/me/stories?tab=posts-published" target="_blank">
                <img className="logo" src={mediumLogo} alt="" />
                Medium
              </a>
            </li>
            {/* <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li> */}
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with me</h2>
          <p>Let's build the future together</p>
          <ul>
            <li>
              <a href="https://github.com/b0red-grinch" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/raphael-esezobor-a992aa240/" target="_blank">
                <img
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                  src={linkedInLogo}
                />
                LinkedIn
              </a>
            </li>
            {/* <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li> */}
          </ul>
        </div>
      </section>

      {/* <div className="ticks"></div> */}
      {/* <section id="spacer"></section> */}
    </>
  );
}

export default App;
