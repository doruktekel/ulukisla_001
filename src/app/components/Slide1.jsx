"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText);

const Slide1 = () => {
  useGSAP(() => {
    gsap.from(".logo", {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.5,
      ease: "power4.out",
      delay: 2,
      scale: 0.6,
    });
  });

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Video */}
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 translate-0 transition-opacity duration-700 flex justify-center items-center ">
        <div className="text-white text-center logo">
          <Image
            src="/logo_b.webp"
            alt="Logo"
            width={200}
            height={200}
            className="mx-auto mb-4 w-[250px] md:w-[500px] "
          />
          {/* <h1 className="md:text-5xl text-2xl font-bold mb-2 header split">
            ULUKIŞLA ANADOLU
          </h1>
          <p className="md:text-5xl text-2xl mb-2 content split font-bold">
            YAPI KOOPERATİFİ
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Slide1;
