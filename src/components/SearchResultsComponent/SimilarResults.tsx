import "./SearchResults.scss";
import { TMovie } from "@/types/types";
import React from "react";
import MovieCardComponent from "../MovieCardComponent/MovieCardComponent";

function SimilarResults({ moviesByDesc }: { moviesByDesc: TMovie[] }) {
  return (
    <section className="similar-results">
      <h3 className="search-results__title">
        {moviesByDesc.length > 0
          ? "Similar results"
          : "There ara no results based on your term, please try another!"}
      </h3>
      <div className="similar-results__wrapper">
        {moviesByDesc
          ? moviesByDesc.map((movie) => (
              <MovieCardComponent key={movie.title} movie={movie} />
            ))
          : null}
      </div>
    </section>
  );
}

export default SimilarResults;
