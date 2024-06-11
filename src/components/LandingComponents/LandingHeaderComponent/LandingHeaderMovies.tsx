import React from "react";
import { landingBannerMovies } from "@/tem-db";
import "./LandingBannerMovies.scss";

import Image from "next/image";

const IMAGE_WIDTH = 250;
const IMAGE_HEIGHT = 300;

export default function LandingHeaderMovies() {
  return (
    <div className="banner-movies">
      {landingBannerMovies.map((img) => (
        <Image
          key={img.title}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          src={img.imageSrc}
          alt={img.title}
          style={{ width: "100%", height: "100%" }}
          className="banner-movies-img"
        ></Image>
      ))}
    </div>
  );
}
