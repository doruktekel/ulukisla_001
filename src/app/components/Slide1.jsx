"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useParams } from "next/navigation";
import jwtDecode from "jwt-decode";

gsap.registerPlugin(SplitText);
const Slide1 = () => {
  const params = useParams();
  let decodedToken;

  console.log("params", params);
  console.log("params.slug", params.slug);

  // if (params?.slug[0]) {
  //   try {
  //     console.log("params", params);
  //     console.log("params.slug", params.slug);
  //     console.log("params.slug[0]", params.slug[0]);

  //     decodedToken = jwtDecode(params.slug[0]);
  //   } catch (error) {
  //     console.error("Token decode hatası:", error);
  //   }
  // }

  useGSAP(() => {
    // .split class'ına sahip elementleri böl
    let split = SplitText.create(".split", { type: "lines" });

    gsap.from(split.lines, {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.5,
      ease: "power4.out",
    });
  });

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-in-out"
        style={{ backgroundImage: "url('/3.png')", willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-700">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4 header split">
              Modern Architecture
            </h1>

            {decodedToken && (
              <p className="text-xl content split">{decodedToken}</p>
            )}
            <p className="text-xl content split">
              Innovative design meets functionality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide1;
