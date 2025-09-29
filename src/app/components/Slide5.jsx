"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide5 = ({ isActive }) => {
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
        style={{ backgroundImage: "url('/17.webp')" }}
      >
        <div className="absolute inset-0  flex items-start justify-center">
          <div className="text-white bg-black/30 max-w-7xl mx-auto mt-10 p-10 text-center">
            <h1 className="md:text-4xl mb-4 font-bold content1">
              1-Ulukışla’nın Yükselen Değeri : Ulukışla Endüstri Şehri Yapı
              Kooperatifi
            </h1>
            <p className="md:text-2xl content2">
              Ulukışla Endüstri Şehri Yapı Kooperatifi, yalnızca bir toplu konut
              projesi değil; şehrin modern yüzünü temsil eden yeni bir yaşam
              merkezi olarak tasarlandı. 2+1 ve 3+1 daire seçenekleriyle hem
              ailelere hem de bireylere uygun çözümler sunan proje, her ihtiyaca
              cevap verebilecek çeşitlilikte bir yaşam alanı oluşturuyor. Çağdaş
              mimarisi ve planlı yerleşim düzeni sayesinde sakinlerine ferah,
              düzenli ve güvenli bir çevre sağlıyor. Konutların iç
              tasarımlarında fonksiyonellik ve konfor bir arada düşünülerek,
              modern yaşamın tüm beklentilerine yanıt veriyor. Geniş
              balkonlardan doğal ışık alan salonlara kadar her ayrıntı,
              sakinlerine keyifli bir yaşam deneyimi sunuyor. Ulukışla
              Belediyesi’nin öncülüğünde hayata geçirilen bu vizyoner proje,
              bölgenin değerini artırırken, sakinlerine de uzun yıllar güven ve
              huzur içinde yaşayabilecekleri bir yuva kazandırıyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide5;
