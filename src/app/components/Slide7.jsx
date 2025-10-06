"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide7 = ({ isActive }) => {
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
        style={{ backgroundImage: "url('/21.webp')" }}
      >
        <div className="absolute inset-0 bottom-32 md:bottom-16 flex items-end justify-center">
          <div className="text-white md:bg-black/50 bg-black/30 w-4/5 mx-auto mt-10 p-1 md:p-5 ">
            <h1 className="md:text-2xl text-lg mb-2 font-bold content1">
              3 – Aile İçin Huzur, Çocuk İçin Güven
            </h1>
            <p className="md:text-lg text-sm content2">
              Bu yeni yaşam alanının merkezinde ailelerin mutluluğu ve huzuru
              yer alıyor. Güvenli ve planlı yapısıyla hem çocuklar hem de
              ebeveynler için güven veren bir düzen oluşturuluyor. Çocuklar için
              özel olarak tasarlanan parklar, oyun alanları, kreş ve okul
              imkânları, onların gelişimini destekleyerek hem eğitim hem de
              sosyal hayatlarına katkı sağlıyor. Aileler, çocuklarının güven
              içinde büyüdüğünü bilmenin huzurunu yaşarken, aynı zamanda kendi
              ihtiyaçlarına da cevap bulan bir ortamda yaşamlarını sürdürüyor.
              Yetişkinler içinse dingin, sosyal ve paylaşım dolu bir yaşam
              hazırlanıyor; komşuluk ilişkilerinin güçlendiği, topluluk
              bilincinin öne çıktığı sıcak bir kültür inşa ediliyor. Burada
              hayat yalnızca dört duvar arasında değil; tüm mahalleye yayılan
              dayanışma ve samimiyet duygusuyla anlam kazanıyor. Nesiller
              boyunca sürecek bu düzen, ailelere güvenle yarınlara
              bakabilecekleri güçlü bir gelecek sunuyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide7;
