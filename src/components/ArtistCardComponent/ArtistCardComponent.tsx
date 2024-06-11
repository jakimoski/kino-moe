import Image, { StaticImageData } from "next/image";
import React from "react";
import "../ArtistCardComponent/ArtistCardComponent.scss";

const IMAGE_WIDTH = 584;
const IMAGE_HEIGHT = 536;

export default function ArtistCardComponent({
  name,
  imgSrc,
}: {
  name: string;
  imgSrc: string | StaticImageData;
}) {
  return (
    <div id="artist-card" className="artist-card">
      {name ? <h3 className="artist-card__title">{name}</h3> : null}
      <div className="artist-card__image">
        <Image
          src={imgSrc}
          alt="name"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </div>
    </div>
  );
}
