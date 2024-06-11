import React from "react";
import { Metadata } from "next";
import { useGetData } from "@/hooks/useGetData";
import MovieHeaderComponent from "@/components/MovieHeaderComponent/MovieHeaderComponent";
import MovieSliderComponent from "@/components/MoviesSliderComponent/MoviesSliderComponent";
import MovieBannerComponent from "@/components/MovieBannerComponent/MovieBannerComponent";

import { bannersGroupMovies } from "@/tem-db";

export const metadata: Metadata = {
  title: "KinoMoe - Home",
  description: "Entertainment platform for everyone",
};

export default async function SeriesPage() {
  const { movies, series, kidsMovies, newMovies } = await useGetData();

  return (
    <>
      <MovieHeaderComponent title="Series Room" />
      <main className="main-page">
        <MovieSliderComponent title="Popularni" content={movies} />
        <MovieSliderComponent title="New Releases" content={newMovies} />
        <MovieBannerComponent
          imgSrc={bannersGroupMovies[1].imageSrc}
          alt={bannersGroupMovies[1].title}
          title="Coming soon"
          background={false}
        />
        <MovieSliderComponent title="Our recommendation" content={movies} />
        <MovieBannerComponent
          imgSrc={bannersGroupMovies[2].imageSrc}
          alt={bannersGroupMovies[2].title}
          title="Coming soon"
          background={false}
        />
        <MovieSliderComponent title="Podcasts" content={movies} />
        <MovieSliderComponent title="Kids" content={kidsMovies} />
      </main>
    </>
  );
}
