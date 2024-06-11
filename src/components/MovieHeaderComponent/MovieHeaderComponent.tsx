"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  FreeMode,
  Autoplay,
  EffectFade,
  Thumbs,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import Image from "next/image";
import "./MovieHeaderComponent.scss";
import React, { useEffect, useState } from "react";

import { headerMovies } from "@/tem-db";
import MovieButtonsGroup from "./MovieButtonsGroup";
import SearchIcon from "@public/assets/icons/search.png";
import Link from "next/link";
import Dropdown from "../DropdownComponent/Dropdown";
import { TUser } from "@/types/types";
import { truncateText } from "@/utils/helpers";

export default function MovieHeaderComponent({
  title,
  categories,
}: {
  title?: string;
  categories?: string[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<TUser>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) setCurrentUser(user);
  }, []);

  return (
    <header className="movie-header">
      <h1 className="movie-header__page-title">{title}</h1>
      <Swiper
        modules={[EffectFade, FreeMode, Autoplay, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        loop={true}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {headerMovies.map((movie) => (
          <SwiperSlide key={movie.title}>
            <div className="movie-header__wrapper">
              <div className="movie-header__image--wrapper">
                <Image
                  className="movie-header__image"
                  src={movie.imageSrc}
                  alt={movie.title}
                  fill
                  priority
                  style={{ position: "absolute" }}
                  sizes="100vw"
                />
              </div>

              <div className="movie-header__content">
                <div>
                  <span className="movie-header__pre">
                    {truncateText(movie.storyline, 100)}
                  </span>
                  <h1 className="movie-header__title">{movie.title}</h1>
                  <p className="movie-header__desc">
                    {truncateText(movie.description, 300)}
                  </p>
                </div>
              </div>
              <div className="movie-header__buttons">
                <MovieButtonsGroup
                  userId={currentUser?.id as number}
                  movieId={movie?.movieId as number}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}
      <div className="thumbs-header">
        <Swiper
          modules={[EffectFade, FreeMode, Navigation, Autoplay, Thumbs]}
          onSwiper={setThumbsSwiper}
          loop
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
        >
          {headerMovies.map((movie) => (
            <SwiperSlide style={{ width: "fit-content" }} key={movie.title}>
              <div className="qwe">
                <Image
                  src={movie.thumbnail}
                  alt={movie.title}
                  fill
                  priority
                  style={{ position: "absolute" }}
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="movie-header__search">
        {categories ? <Dropdown options={categories} /> : null}
        <Link href={"/search"}>
          <Image src={SearchIcon} alt="search" />
        </Link>
      </div>
    </header>
  );
}
