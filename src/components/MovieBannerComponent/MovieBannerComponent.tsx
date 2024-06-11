import Image, { StaticImageData } from "next/image";
import React from "react";
import "./MovieBannerComponent.scss";

type MovieBannerComponentProps = {
  imgSrc: StaticImageData | string;
  alt: string;
  title?: string;
  background?: boolean;
};

// Background is optional and it determines if the banner should have a background image or not and also it determines the margin of the image

const IMAGE_WIDTH = 1820;
const IMAGE_HEIGHT = 680;

export default function MovieBannerComponent({
  imgSrc,
  alt,
  title,
  background,
}: MovieBannerComponentProps) {
  return (
    <div
      className="movie-banner"
      style={{
        backgroundImage: background
          ? `url(/assets/backgrounds/Rectangle4269.png)`
          : undefined,
      }}
    >
      <h3 className="movie-banner__title">{title}</h3>
      <Image
        className="movie-banner__image"
        priority
        src={imgSrc}
        alt={alt}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        style={{
          width: "100%",
          height: "100%",
          margin: background ? "0 auto" : "",
        }}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
      ></Image>
    </div>
  );
}
