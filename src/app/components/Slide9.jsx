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
        style={{ backgroundImage: "url('/8.webp')" }}
      >
        <div className="absolute inset-0 bottom-32 md:bottom-16 flex items-end justify-center">
          <div className="text-white md:bg-black/50 bg-black/30 w-4/5 mx-auto mt-10 p-2 md:p-5 ">
            <h1 className="md:text-2xl mb-2 font-bold content1">
              5-Geleceğe Değer Katan Yatırım
            </h1>
            <p className="md:text-lg content2">
              Bu proje, yalnızca modern bir yaşam alanı değil aynı zamanda güçlü
              bir yatırım fırsatıdır. Bölgenin endüstri merkezine olan yakınlığı
              sayesinde, iş ve yaşam dengesini en verimli şekilde kurma imkânı
              sunuyor. Stratejik konumu, ulaşım kolaylıkları ve çevresinde hızla
              gelişen altyapı yatırımları, projenin değerini her geçen gün
              artırıyor. Burada ev sahibi olmak, hem bugünün ihtiyaçlarını
              karşılayan konforlu bir yaşam sağlamak hem de gelecekte değerini
              koruyacak ve katlayacak bir yatırıma sahip olmak anlamına geliyor.
              Konumsal üstünlüğü sayesinde, bu proje yalnızca Ulukışla için
              değil, tüm bölge için yeni bir cazibe merkezi olarak öne çıkıyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide8;
