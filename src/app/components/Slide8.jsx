"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide8 = ({ isActive }) => {
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
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/24.webp')" }}
      >
        <div className="absolute inset-0 bottom-32 md:bottom-16 flex md:items-end items-center  justify-center">
          <div className="text-white md:bg-black/50 bg-black/30 w-4/5 mx-auto mt-10 p-1 md:p-5 ">
            <h1 className="md:text-2xl text-lg mb-2 font-bold content1">
              4-Güvenli Gelecek, Sağlıklı Yaşam
            </h1>
            <p className="md:text-lg text-sm content2">
              Yaşamın en temel ihtiyaçlarını merkeze alan bu proje, sağlık
              hizmetleriyle fark yaratıyor. Modern altyapıya sahip hastane ve
              sağlık merkezleri, yalnızca acil durumlara değil; düzenli sağlık
              kontrollerine ve sürekli bakım ihtiyaçlarına da cevap verecek
              şekilde planlandı. Sakinler, kapsamlı sağlık hizmetlerine
              evlerinden yalnızca birkaç adım uzaklıkta ulaşmanın ayrıcalığını
              yaşayacak. Böylece günlük yaşam, güven ve huzur içinde sürerken;
              geleceğe dair kaygılar da en aza indirilecek. Bu yaklaşım, projeyi
              sadece bir konut topluluğu olmaktan çıkararak, ailelere uzun
              vadeli bir yaşam güvencesi sunuyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide8;
