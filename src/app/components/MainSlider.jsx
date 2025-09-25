"use client";
import { useState } from "react";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import FormSlider from "./FormSlider";

const MainSlider = () => {
  const slides = [
    { id: 1, item: Slide1 },
    { id: 2, item: Slide2 },
    { id: 3, item: Slide3 },
    { id: 4, item: FormSlider },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const CurrentSlideComponent = slides[currentSlide].item;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
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
              <SlideComponent />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-4 rounded-full cursor-pointer z-10 transition-all duration-300"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-4 rounded-full cursor-pointer z-10 transition-all duration-300"
      >
        →
      </button>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
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
    </div>
  );
};

export default MainSlider;
