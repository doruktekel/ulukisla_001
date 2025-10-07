"use client";

import { useState, useRef, useEffect } from "react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import Slide5 from "./Slide5";
import Slide6 from "./Slide6";
import Slide7 from "./Slide7";
import Slide8 from "./Slide8";
import Slide9 from "./Slide9";
import FormSlider from "./FormSlider";
import WhatsappRefButton from "./WhatsappRefButton";

import Image from "next/image";
import Slide12 from "./Slide12";
import Slide13 from "./Slide13";
import Slide1_1 from "./Slide1_1";
import Slide2_1 from "./Slide2_1";
import Slide3_1 from "./Slide3_1";
import Slide4_1 from "./Slide4_1";
import SlideVideo from "./SlideVideo";

const MainSlider = () => {
  const slides = [
    { id: 1, item: Slide1 },
    { id: 2, item: Slide2 },
    { id: 3, item: SlideVideo },
    { id: 4, item: Slide3 },
    { id: 5, item: Slide4 },
    { id: 6, item: Slide5 },
    { id: 7, item: Slide6 },
    { id: 8, item: Slide7 },
    { id: 9, item: Slide8 },
    { id: 10, item: Slide9 },
    { id: 11, item: Slide1_1 },
    { id: 12, item: Slide2_1 },
    { id: 13, item: Slide3_1 },
    { id: 14, item: Slide4_1 },
    { id: 15, item: FormSlider },
    { id: 16, item: Slide12 },
    { id: 17, item: Slide13 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const sliderRef = useRef(null);
  const isSwiping = useRef(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    // Form içindeki elementleri kontrol et
    const target = e.target;
    const isFormElement =
      target.tagName === "INPUT" ||
      target.tagName === "SELECT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "BUTTON" ||
      target.closest("form") !== null;

    if (isFormElement) {
      isSwiping.current = false;
      return;
    }

    isSwiping.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current) return;

    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;

    // Yatay ve dikey hareket mesafesini hesapla
    const deltaX = Math.abs(touchStartX.current - touchEndX.current);
    const deltaY = Math.abs(touchStartY.current - touchEndY.current);

    // Eğer yatay hareket dikey hareketten fazlaysa, scroll'u engelle
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) {
      return;
    }

    const swipeThreshold = 50;
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = Math.abs(touchStartY.current - touchEndY.current);

    // Yatay swipe dikey swipe'dan fazla olmalı
    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
    touchStartY.current = 0;
    touchEndY.current = 0;
    isSwiping.current = false;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      // Passive: false ile scroll'u engelleyebiliriz
      slider.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      slider.addEventListener("touchmove", handleTouchMove, { passive: false });
      slider.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [currentSlide]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
    >
      {/* All Slides */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => {
          const SlideComponent = slide.item;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                currentSlide === index
                  ? "opacity-100 transform translate-x-0"
                  : currentSlide < index
                  ? "opacity-0 transform translate-x-full"
                  : "opacity-0 transform -translate-x-full"
              }`}
            >
              <SlideComponent isActive={currentSlide === index} />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={prevSlide}
        className="md:text-2xl hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/30 text-gray-500 p-4 rounded-full cursor-pointer z-10 transition-all duration-300"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="md:text-2xl hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/30 text-gray-500 p-4 rounded-full cursor-pointer z-10 transition-all duration-300"
      >
        →
      </button>

      {/* Pagination */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 bg-black/20 md:p-2 p-1 md:rounded-full w-80 md:w-fit justify-center rounded-xl z-20">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold cursor-pointer ${
              currentSlide === index
                ? "bg-white text-black"
                : "bg-white/30 text-white hover:bg-white/50"
            }`}
          >
            {slide.id}
          </button>
        ))}
      </div>

      {/* Sirket Logosu */}
      <div className="absolute md:block hidden md:bottom-12 md:top-auto md:left-7 z-20">
        {currentSlide !== 0 && (
          <Image
            src="/logo_untext.webp"
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        )}
      </div>

      {/* Whatsapp Button */}
      <div className="absolute bottom-24 right-4 md:bottom-14 md:right-12 z-20">
        <WhatsappRefButton />
      </div>
    </div>
  );
};

export default MainSlider;
