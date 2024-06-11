import "./SearchResults.scss";
import MovieSliderComponent from "../MoviesSliderComponent/MoviesSliderComponent";
import { TMovie } from "@/types/types";

function SearchResults({ movies }: { movies: TMovie[] }) {
  if (movies.length === 0) return;
  return (
    <section className="search-results">
      <h3 className="search-results__title">Search Results</h3>
      <MovieSliderComponent content={movies} />
    </section>
  );
}

export default SearchResults;
