"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText);

const Slide1 = () => {
  useGSAP(() => {
    let split = SplitText.create(".split", { type: "lines" });

    gsap.from(split.lines, {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.5,
      ease: "power4.out",
      delay: 2,
    });
  });

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Video */}
      <video className="w-full h-full object-cover" autoPlay muted playsInline>
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 translate-0 pt-4 transition-opacity duration-700">
        <div className="text-white text-center">
          <Image
            src="/favicon.png"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="md:text-5xl text-2xl font-bold mb-2 header split">
            ULUKIŞLA ENDÜSTRİ
          </h1>
          <p className="md:text-5xl text-2xl mb-2 content split font-bold">
            ŞEHRİ YAPI KOOPERATİFİ
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
