import "./ContentPreview.scss";
import MovieButtonsGroup from "../MovieHeaderComponent/MovieButtonsGroup";
import { useState } from "react";
import ArtistLink from "../ArtistLinkComponent/ArtistLink";
import { TMovie, TUser } from "@/types/types";

function ContentPreview({ movie }: { movie: TMovie }) {
  const [showModal, setShowModal] = useState(false);

  const currentUser: TUser = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <>
      <section className="content-preview">
        <div
          className="content-preview__image"
          style={{
            backgroundImage: `linear-gradient(
              0deg,
              rgba(11, 21, 27, 1) 20%,
              rgba(11, 21, 27, 0.2) 100%
            ), url(${movie.posterImage})`,
          }}
        ></div>
        <div className="content-preview__content">
          <h1 className="content-preview__title">{movie.title}</h1>
          <p className="content-preview__description">{movie.description}</p>
        </div>
        <div className="content-preview__buttons">
          <MovieButtonsGroup userId={currentUser.id} movieId={movie.id} />
        </div>

        <p className="content-preview__match">100% Match {movie.releaseDate}</p>
        <div className="content-preview__info">
          <div className="content-preview__info__box">
            <h4>Genres:</h4>
            {movie.genres
              ? movie.genres.map((genre) => <p key={genre}>{genre}</p>)
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Writers:</h4>
            {movie.writers
              ? movie.writers.map((writer) => <p key={writer}>{writer}</p>)
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Editing:</h4>
            {movie.editing
              ? movie.editing.map((editor) => <p key={editor}>{editor}</p>)
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Cast:</h4>
            {movie.actors
              ? movie.actors.map((actor) => (
                  <ArtistLink key={actor} name={actor} />
                ))
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Producers:</h4>
            {movie.producers
              ? movie.producers.map((producer) => (
                  <p key={producer}>{producer}</p>
                ))
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Costume Design:</h4>
            {movie.costumeDesign
              ? movie.costumeDesign.map((costume) => (
                  <p key={costume}>{costume}</p>
                ))
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Director:</h4>
            {movie.directors
              ? movie.directors.map((director) => (
                  <p key={director}>{director}</p>
                ))
              : null}
          </div>
          <div className="content-preview__info__box">
            <h4>Cinematography:</h4>
            {movie.cinematography
              ? movie.cinematography.map((cinematography) => (
                  <p key={cinematography}>{cinematography}</p>
                ))
              : null}
          </div>
        </div>
      </section>
    </>
  );
}

export default ContentPreview;
