"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide12 = ({ isActive }) => {
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
        // Birinciden hemen sonra başlar
        duration: 1,
        y: 100,
        autoAlpha: 0,
        ease: "power4.out",
      },
      "+=0.2"
    ); // 0.2 saniye bekle sonra başla
  }, [isActive]);

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/13.webp')" }}
      >
        <div className="absolute inset-0 bottom-32 md:bottom-16 flex items-end justify-center">
          <div className="text-white text-center md:bg-black/50 bg-black/30 w-4/5 mx-auto mt-10 p-2 md:p-5 ">
            <h1 className="md:text-2xl mb-2 font-bold content1">
              ULUKIŞLA ENDÜSTRİ ŞEHRİ YAPI KOOPERATİFİ
            </h1>
            <p className="md:text-lg content2">
              ADRES : CEPA OFİS KULE Mustafa Kemal Mahallesi Eskişehir Yolu 7.
              km 2123 Sokak No:2/D, Kat 11, No:1103 ÇANKAYA / ANKARA
            </p>
            <p className="md:text-lg content2">
              İLETİŞİM: T: +90 312 473 56 50 M: info@belenandpartners.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide12;
