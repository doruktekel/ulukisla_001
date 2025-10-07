"use client";
import ContactForm from "./ContactForm";

const FormSlider = () => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/10.webp')" }}
      >
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center p-2 md:p-5"
          onTouchStart={stopPropagation}
          onTouchMove={stopPropagation}
          onTouchEnd={stopPropagation}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default FormSlider;
