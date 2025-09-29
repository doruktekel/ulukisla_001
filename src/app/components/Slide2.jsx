const Slide2 = () => {
  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/2-1.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Sustainable Living</h1>
            <p className="text-xl">Eco-friendly architectural solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
