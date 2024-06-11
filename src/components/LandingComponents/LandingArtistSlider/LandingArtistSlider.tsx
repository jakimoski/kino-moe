"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { artists } from "@/tem-db";
import ArtistCardComponent from "@/components/ArtistCardComponent/ArtistCardComponent";

const LandingArtistSlider = () => {
  return (
    <div className="artists-slider">
      <Swiper
        spaceBetween={50}
        roundLengths={true}
        setWrapperSize={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },

          1400: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        onSlideChange={() => {}}
      >
        {artists
          ? artists.map((artist) => (
              <SwiperSlide style={{ width: "fit-content" }} key={artist.name}>
                <ArtistCardComponent
                  key={artist.name}
                  name={artist.name}
                  imgSrc={artist.imageSrc}
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default LandingArtistSlider;
