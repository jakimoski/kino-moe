import React from "react";
import { Metadata } from "next";
import { useGetData } from "@/hooks/useGetData";
import MovieHeaderComponent from "@/components/MovieHeaderComponent/MovieHeaderComponent";
import MovieSliderComponent from "@/components/MoviesSliderComponent/MoviesSliderComponent";

import MainButtonComponent from "@/components/ButtonComponents/MainButtonComponent";

export const metadata: Metadata = {
  title: "KinoMoe - Home",
  description: "Entertainment platform for everyone",
};

export default async function MoviesRoomPage() {
  const { movies, series, kidsMovies, newMovies } = await useGetData();

  const categories = [
    "Popular",
    "Action",
    "Comedy",
    "Horror",
    "Drama",
    "History",
  ];

  return (
    <>
      <MovieHeaderComponent title="Movies Room" categories={categories} />
      <main className="main-page">
        <MovieSliderComponent title="Popular" content={movies} />
        <MovieSliderComponent title="Action" content={series} />
        <MovieSliderComponent title="Comedy" content={movies} />
        <MovieSliderComponent title="Horror" content={movies} />
        <MovieSliderComponent title="Drama" content={kidsMovies} />
        <MovieSliderComponent title="History" content={kidsMovies} />
        <div className="center-inner">
          <MainButtonComponent>Show more</MainButtonComponent>
        </div>
      </main>
    </>
  );
}
