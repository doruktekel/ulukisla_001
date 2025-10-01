"use client";

import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Slide2 = ({ isActive }) => {
  const params = useParams();
  let decodedToken;

  if (params.slug) {
    try {
      decodedToken = jwtDecode(params?.slug?.[0]);
    } catch (error) {
      console.error("Token decode hatası:", error);
    }
  }

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
          <div className="text-white max-w-6xl mx-auto p-10 text-justify">
            {decodedToken && (
              <h1 className="md:text-2xl content split uppercase bg-black/30 p-5">
                Sayın {decodedToken.name};
              </h1>
            )}
            <p className="md:text-xl mb-2 content1 bg-black/30 p-5 ">
              Sizleri, Niğde Ulukışla’da hayata geçireceğimiz Ulukışla Endüstri
              Şehri Yapı Kooperatifi’ne üye olmaya davet ediyoruz.
              Kooperatifimiz, GIA Özel Endüstri Bölgesi’nin hemen yanında,
              modern yaşam ve konforun buluştuğu bir alan üzerinde kurulacaktır.
            </p>
            <p className="md:text-xl content2 bg-black/30 p-5 ">
              Projemiz yaklaşık 10.000 konut ile planlanmış olup; güvenli, lüks
              ve konforlu dairelerin yanı sıra kendi içerisinde sosyal tesisler,
              özel alanlar ve çeşitli yaşam kolaylıkları sunacaktır. Bu eşsiz
              proje, hem yatırım hem de yaşam alanı olarak size benzersiz
              fırsatlar sunmaktadır. Siz de Ulukışla Endüstri Şehri’nin bir
              parçası olarak, geleceğin modern yaşam alanını birlikte
              şekillendirebiliriz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
