"use client";

import { useParams } from "next/navigation";
import MainSlider from "../components/MainSlider";

const HomePage = () => {
  const params = useParams();
  console.log(params.slug);

  return (
    <div>
      <MainSlider />
    </div>
  );
};

export default HomePage;
