import React from "react";
import { movieGroup, kidsGroup, docsGroup, podcastsGroup } from "@/tem-db";
import MoviesGroup from "./MoviesGroup";
import "./LandingMoviesGroup.scss";

const movieGroups = [
  { title: "Movies", movies: movieGroup },
  { title: "Kids Room", movies: kidsGroup },
  { title: "Doc. Room", movies: docsGroup },
  { title: "Podcasts", movies: podcastsGroup },
  { title: "TV Series", movies: movieGroup },
];

export default function LandingMoviesGroup() {
  return (
    <section>
      <div className="movies-group-wrapper">
        {movieGroups.map((group) => (
          <MoviesGroup
            key={group.title}
            title={group.title}
            movies={group.movies}
          />
        ))}
      </div>
    </section>
  );
}
