"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText);

const Slide3_1 = ({ isActive }) => {
  useGSAP(() => {
    if (!isActive) return;
    const tl = gsap.timeline({ delay: 0.5 });

    let split1 = SplitText.create(".content1", { type: "words, lines" });
    let split2 = SplitText.create(".content2", {
      type: "words , lines ",
    });

    // Timeline ile sırayla
    tl.from(split1.lines, {
      duration: 0.5,
      y: 100,
      autoAlpha: 0,
      ease: "power4.out",
    }).from(
      split2.words,
      {
        duration: 1,
        y: 100,
        autoAlpha: 0,
        ease: "power4.out",
      },
      "+=0.2"
    );
  }, [isActive]);

  return (
    <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <Image
        src="/3+1.webp"
        alt="Logo"
        width={1480}
        height={2000}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />

      <div className="w-full h-screen flex flex-col items-center justify-start md:hidden">
        <Image src="/3+1K.webp" alt="Logo" width={800} height={800} />
        <Image src="/3+1Y.webp" alt="Logo" width={300} height={300} />
      </div>
    </div>
  );
};

export default Slide3_1;
