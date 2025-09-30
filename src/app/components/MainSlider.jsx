// "use client";

// import { useState } from "react";
// import Slide1 from "./Slide1";
// import Slide2 from "./Slide2";
// import Slide3 from "./Slide3";
// import Slide4 from "./Slide4";
// import Slide5 from "./Slide5";
// import Slide6 from "./Slide6";
// import Slide7 from "./Slide7";
// import Slide8 from "./Slide8";
// import Slide9 from "./Slide9";
// import FormSlider from "./FormSlider";
// import WhatsappRefButton from "./WhatsappRefButton";
// import Slide11 from "./Slide11";
// import Slide10 from "./Slide10";
// import Image from "next/image";

// const MainSlider = () => {
//   const slides = [
//     { id: 1, item: Slide1 },
//     { id: 2, item: Slide2 },
//     { id: 3, item: Slide3 },
//     { id: 4, item: Slide4 },
//     { id: 5, item: Slide5 },
//     { id: 6, item: Slide6 },
//     { id: 7, item: Slide7 },
//     { id: 8, item: Slide8 },
//     { id: 9, item: Slide9 },
//     { id: 10, item: Slide10 },
//     { id: 11, item: Slide11 },
//     { id: 12, item: FormSlider },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const CurrentSlideComponent = slides[currentSlide].item;

//   return (
//     <div className="relative w-full h-screen overflow-hidden bg-black">
//       {/* All Slides */}
//       <div className="w-full h-full relative">
//         {slides.map((slide, index) => {
//           const SlideComponent = slide.item;
//           return (
//             <div
//               key={index}
//               className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
//                 currentSlide === index
//                   ? "opacity-100 transform translate-x-0"
//                   : currentSlide < index
//                   ? "opacity-0 transform translate-x-full"
//                   : "opacity-0 transform -translate-x-full"
//               }`}
//             >
//               <SlideComponent isActive={currentSlide === index} />
//             </div>
//           );
//         })}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={prevSlide}
//         className="md:text-2xl hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/30 text-gray-500 p-4 rounded-full cursor-pointer z-10 transition-all duration-300"
//       >
//         ←
//       </button>
//       <button
//         onClick={nextSlide}
//         className="md:text-2xl hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/30 text-gray-500 p-4 rounded-full cursor-pointer z-10 transition-all duration-300"
//       >
//         →
//       </button>

//       {/* Pagination */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 bg-black/20 p-2 md:rounded-full w-80 md:w-fit justify-center rounded-xl">
//         {slides.map((slide, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold cursor-pointer ${
//               currentSlide === index
//                 ? "bg-white text-black"
//                 : "bg-white/30 text-white hover:bg-white/50"
//             }`}
//           >
//             {slide.id}
//           </button>
//         ))}
//       </div>

//       {/* Sirket Logosu */}

//       <div className="absolute md:block hidden md:bottom-12 md:top-auto md:left-9">
//         {currentSlide !== 0 && (
//           <Image
//             src="/favicon.png"
//             alt="Logo"
//             width={100}
//             height={100}
//             className="mx-auto mb-4"
//           />
//         )}
//       </div>

//       {/* Whatsapp Button */}

//       <div className="absolute bottom-20 right-5 md:bottom-12 md:right-12">
//         <WhatsappRefButton />
//       </div>
//     </div>
//   );
// };

// export default MainSlider;

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
import Slide11 from "./Slide11";
import Slide10 from "./Slide10";
import Image from "next/image";

const MainSlider = () => {
  const slides = [
    { id: 1, item: Slide1 },
    { id: 2, item: Slide2 },
    { id: 3, item: Slide3 },
    { id: 4, item: Slide4 },
    { id: 5, item: Slide5 },
    { id: 6, item: Slide6 },
    { id: 7, item: Slide7 },
    { id: 8, item: Slide8 },
    { id: 9, item: Slide9 },
    { id: 10, item: Slide10 },
    { id: 11, item: Slide11 },
    { id: 12, item: FormSlider },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Mouse wheel event handler
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();

      setIsScrolling(true);

      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    const slider = document.getElementById("main-slider");
    slider?.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slider?.removeEventListener("wheel", handleWheel);
    };
  }, [currentSlide, isScrolling]);

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isScrolling) return;

    const diff = touchStartY.current - touchEndY.current;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      setIsScrolling(true);

      if (diff > 0) {
        // Swipe up - next slide
        nextSlide();
      } else {
        // Swipe down - previous slide
        prevSlide();
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  const CurrentSlideComponent = slides[currentSlide].item;

  return (
    <div
      id="main-slider"
      className="relative w-full h-screen overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`md:text-2xl hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/30 text-gray-500 p-4 rounded-full z-10 transition-all duration-300 ${
          currentSlide === 0
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`md:text-2xl hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/60 hover:bg-white/30 text-gray-500 p-4 rounded-full z-10 transition-all duration-300 ${
          currentSlide === slides.length - 1
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        →
      </button>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-2 bg-black/20 p-2 md:rounded-full w-80 md:w-fit justify-center rounded-xl z-20">
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
      <div className="absolute md:block hidden md:bottom-12 md:top-auto md:left-9">
        {currentSlide !== 0 && (
          <Image
            src="/favicon.png"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
        )}
      </div>

      {/* Whatsapp Button */}
      <div className="absolute bottom-20 right-5 md:bottom-12 md:right-12 z-20">
        <WhatsappRefButton />
      </div>
    </div>
  );
};

export default MainSlider;
