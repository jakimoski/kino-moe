"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./MoviesSlider.scss";
import MovieCardComponent from "../MovieCardComponent/MovieCardComponent";
import { TMovie } from "@/types/types";

type MovieSliderProps = {
  title?: string;
  content: TMovie[];
};

export default function MovieSliderComponent({
  title,
  content,
}: MovieSliderProps) {
  return (
    <div className="movies-slider">
      {title && <h2 className="movies-slider__title">{title}</h2>}
      <Swiper
        spaceBetween={15}
        roundLengths={true}
        setWrapperSize={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          1400: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
        }}
        onSlideChange={() => {}}
      >
        {content
          ? content.map((movie) => (
              <SwiperSlide style={{ width: "fit-content" }} key={movie.id}>
                <MovieCardComponent movie={movie} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
}
