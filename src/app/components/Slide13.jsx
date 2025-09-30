"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide13 = ({ isActive }) => {
  useGSAP(() => {
    if (!isActive) return;

    let split1 = SplitText.create(".content", { type: "words,lines" });

    gsap.fromTo(
      split1.lines,
      {
        scale: 0,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "power4.out",
        delay: 0.5,
      }
    );
  }, [isActive]);

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/15.webp')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white md:bg-black/50 bg-black/30  p-2 md:p-5 ">
            <h1 className="md:text-3xl mb-2 font-bold content">TEŞEKKÜRLER</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide13;
