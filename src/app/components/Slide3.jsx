const Slide3 = () => {
  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/4.webp')" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-justify max-w-6xl mx-auto md:p-10 p-5 bg-black/30">
            <p className="md:text-xl mb-4 text-sm p-1 md:p-5">
              Ulukışla Belediyesi öncülüğünde hayata geçirilen Ulukışla Anadolu
              Yapı Kooperatifi, şehrin geleceğine yön veren en önemli
              yatırımlardan biri olarak öne çıkıyor. 10.000 konutluk dev
              ölçeğiyle yalnızca bugünün ihtiyaçlarını karşılamakla kalmayan
              proje, gelecek nesiller için de güvenli, modern ve sürdürülebilir
              bir yaşam alanı sunmayı hedefliyor.
            </p>
            <p className="md:text-xl text-sm p-1 md:p-5">
              Planlı yapısı, çağdaş mimarisi ve geniş sosyal donatılarıyla
              sakinlerine konforlu bir hayatın kapılarını açarken; okul, kreş,
              hastane, spor tesisleri, kapalı havuz ve yürüyüş alanları gibi
              zengin imkanlarıyla yaşamı her açıdan kolaylaştırıyor. Ulukışla,
              bu vizyoner adımla yalnızca bölgesinde değil, ülke genelinde de
              örnek gösterilecek bir cazibe merkezi olma yolunda hızla
              ilerliyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide3;
