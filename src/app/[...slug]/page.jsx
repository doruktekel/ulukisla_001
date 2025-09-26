"use client";

import { useParams } from "next/navigation";
import MainSlider from "../components/MainSlider";

const HomePage = () => {
  const params = useParams();

  console.log(params);

  return (
    <div>
      {JSON.stringify(params)}
      <MainSlider />
    </div>
  );
};

export default HomePage;
