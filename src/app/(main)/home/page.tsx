import React from "react";
import { Metadata } from "next";
import { useGetData } from "@/hooks/useGetData";
import MovieHeaderComponent from "@/components/MovieHeaderComponent/MovieHeaderComponent";
import MovieSliderComponent from "@/components/MoviesSliderComponent/MoviesSliderComponent";
import MovieBannerComponent from "@/components/MovieBannerComponent/MovieBannerComponent";

import { bannersGroupMovies } from "@/tem-db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "KinoMoe - Home",
  description: "Entertainment platform for everyone",
};

export default async function HomePage() {
  const {
    movies,
    series,
    kidsMovies,
    newMovies,
    getPopularMovies,
    getUser,
    getPodcasts,
  } = await useGetData();
  const popularMovies = await getPopularMovies("Movie");

  const session = await getServerSession(authOptions);
  const podcasts = await getPodcasts();

  const currentUser = await getUser(session?.user?.email as string);

  return (
    <>
      <MovieHeaderComponent />
      <main className="main-page">
        <MovieSliderComponent title="Popular" content={popularMovies} />
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
        <MovieSliderComponent title="Series" content={series} />
        <MovieSliderComponent title="Podcasts" content={podcasts} />
        <MovieSliderComponent title="Kids" content={kidsMovies} />
      </main>
    </>
  );
}
