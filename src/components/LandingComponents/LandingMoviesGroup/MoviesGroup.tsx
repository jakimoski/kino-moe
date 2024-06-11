import Image from "next/image";
import "./LandingMoviesGroup.scss";

type TGroupMovies = {
  title: string;
  imageSrc: string;
};

export default function MoviesGroup({
  title,
  movies,
}: {
  title: string;
  movies: TGroupMovies[];
}) {
  return (
    <div className="movie-group">
      <h3>{title}</h3>
      <div className="movie-group__block">
        {movies?.length
          ? movies.map((movie) => (
              <div key={movie.title} className="movie-group__image">
                <Image
                  src={movie.imageSrc}
                  alt={movie.title}
                  style={{ width: "100%", height: "100%" }}
                  fill
                  sizes="width:100%"
                ></Image>
              </div>
            ))
          : "No movies found."}
      </div>
    </div>
  );
}
