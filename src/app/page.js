"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  const slideButtonRef = useRef(null);
  const catalogButtonRef = useRef(null);

  const handleSlideClick = () => {
    gsap.to(slideButtonRef.current, {
      x: -2000,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  const handleCatalogClick = () => {
    gsap.to(catalogButtonRef.current, {
      x: 2000,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/3.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col">
          {/* Navigation Buttons */}
          <div className="w-full flex items-center justify-center py-8 px-10">
            <Image src="/logo_b.webp" alt="Logo" width={400} height={400} />
          </div>
          <div className="flex-1 flex items-center justify-center px-10 gap-10">
            {/* Left Button - Slide */}
            <Link href="/slide" onClick={handleSlideClick}>
              <div className="group cursor-pointer" ref={slideButtonRef}>
                <div className="rounded-full px-2 bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-2xl group-hover:scale-110">
                  <GoTriangleLeft className="w-10 h-10 md:w-12 md:h-12 text-gray-700" />
                  <span className="text-gray-700 text-lg md:text-2xl mr-4 font-semibold rounded-full backdrop-blur-sm">
                    Talep Formu
                  </span>
                </div>
              </div>
            </Link>
            {/* Right Button - Katalog */}
            <Link href="/catalog" onClick={handleCatalogClick}>
              <div className="group cursor-pointer" ref={catalogButtonRef}>
                <div className="rounded-full px-2 bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 shadow-2xl group-hover:scale-110">
                  <span className="text-gray-700 text-lg md:text-2xl ml-4 font-semibold rounded-full backdrop-blur-sm">
                    Katalog
                  </span>
                  <GoTriangleRight className="w-10 h-10 md:w-12 md:h-12 text-gray-700" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
