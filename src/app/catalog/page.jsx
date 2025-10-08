"use client";
import FlipBook from "../components/FlipBook";
import catalogData from "../../../public/catalog-fis.json";

function CatalogPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <FlipBook pages={catalogData.pages} />
    </div>
  );
}

export default CatalogPage;
