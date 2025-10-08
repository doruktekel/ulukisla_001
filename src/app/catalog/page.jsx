const CatalogPage = () => {
  return (
    <div className="w-full h-screen relative">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/3.webp')" }}
      >
        <div className="absolute  inset-0 bg-black/20 flex items-start justify-center">
          <div className="text-white max-w-6xl mx-auto p-10 text-justify">
            <p className="md:text-xl text-sm md:p-5 p-1 mb-2 content1 bg-black/30  ">
              Katalog Yazılımı Yapim Asamasinda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;

// import { useState, useEffect } from "react";
// import FlipBook from "../components/FlipBook";

// function CatalogPage() {
//   const [catalog, setCatalog] = useState(null);

//   useEffect(() => {
//     fetch("/catalog-fis.json")
//       .then((res) => res.json())
//       .then((data) => setCatalog(data));
//   }, []);

//   if (!catalog) return <div>Loading</div>;

//   return (
//     <div className="">
//       <FlipBook pages={catalog.pages} />
//     </div>
//   );
// }

// export default CatalogPage;
