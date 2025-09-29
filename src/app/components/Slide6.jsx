"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide6 = ({ isActive }) => {
  useGSAP(() => {
    if (!isActive) return;
    const tl = gsap.timeline({ delay: 0.5 });

    let split1 = SplitText.create(".content1", { type: "words, lines" });
    let split2 = SplitText.create(".content2", { type: "words, lines" });

    // Timeline ile sırayla
    tl.from(split1.lines, {
      duration: 0.5,
      y: 100,
      autoAlpha: 0,
      ease: "power4.out",
    }).from(
      split2.lines,
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
        style={{ backgroundImage: "url('/3.webp')" }}
      >
        <div className="absolute  inset-0 bg-black/20 flex items-start justify-center">
          <div className="text-white max-w-6xl mx-auto p-10">
            <h1 className="md:text-4xl mb-4 font-bold content1">
              2- Sağlıklı Yaşam, Sosyal Hayat
            </h1>
            <p className="md:text-2xl content2">
              Ulukışla Endüstri Şehri Yapı Kooperatifi, sakinlerine yalnızca
              modern konutlar değil, aynı zamanda sağlıklı ve hareketli bir
              yaşamın kapılarını açıyor. Proje içerisinde basketbol, futbol ve
              tenis sahalarıyla her yaştan bireyin aktif kalabileceği geniş spor
              olanakları sunuluyor. Kapalı yüzme havuzu, dört mevsim spor yapma
              fırsatı sağlarken, yürüyüş parkurları ve bisiklet yolları da
              doğayla iç içe keyifli zaman geçirme imkânı yaratıyor. Açık hava
              spor alanlarının yanı sıra planlanan fitness bölümleri ve çok
              amaçlı sahalar, spor alışkanlığını günlük yaşamın bir parçası
              haline getiriyor. Bu imkanlar, yalnızca bireysel spor için değil,
              aynı zamanda topluluk ruhunu güçlendiren etkinliklere de zemin
              hazırlıyor. Tesisin sunduğu zengin sosyal ve sportif imkanlarla
              hem yetişkinlere hem de çocuklara sağlıklı, dinamik ve keyifli bir
              yaşam sunuyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide6;
