"use client";
import "./ArtistOverview.scss";
import MainButtonComponent from "../ButtonComponents/MainButtonComponent";
import MovieSliderComponent from "../MoviesSliderComponent/MoviesSliderComponent";
import ArtistCardComponent from "../ArtistCardComponent/ArtistCardComponent";

import { useState, useEffect } from "react";
import { TMovie } from "@/types/types";

import ArtistPlaceholder from "../../../public/assets/icons/profile_img.png";
import { truncateText } from "@/utils/helpers";
import { supabase } from "@/lib/supabaseClient";

type TArtist = {
  name: string;
  bio: string;
  awards: string[];
  imageSrc: string;
};

function ArtistOverview({ name }: { name: string }) {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [artist, setArtist] = useState<TArtist[]>([]);

  useEffect(() => {
    async function getMovies() {
      const { data } = await supabase
        .from("Movie")
        .select()
        .or(`actors.cs.{${name}}`);

      setMovies(data as TMovie[]);
    }
    async function getArtist() {
      const { data } = await supabase.from("Artist").select().eq("name", name);

      setArtist(data as TArtist[]);
    }
    getMovies();
    getArtist();
  }, [name]);

  return (
    <>
      <section className="artists-overview">
        <div className="artists-overview__image">
          {artist[0] ? (
            <ArtistCardComponent name="" imgSrc={artist[0].imageSrc} />
          ) : (
            <ArtistCardComponent name="" imgSrc={ArtistPlaceholder} />
          )}
        </div>
        <div className="artists-overview__content">
          <h2 className="artists-overview__name">{name}</h2>
          {artist[0] ? (
            <p className="artists-overview__bio">
              {artist[0].bio ? truncateText(artist[0].bio, 200) : "bio"}
            </p>
          ) : (
            <p className="artists-overview__bio">Biography not available</p>
          )}
          <MainButtonComponent customStyles="btn--sm">
            See more
          </MainButtonComponent>
        </div>
      </section>
      <div className="artists-overview__info">
        <h4>Artist Movies</h4>
        {movies ? <MovieSliderComponent content={movies} /> : null}
        <div>
          <ul>
            {artist[0]
              ? artist[0].awards.map((award) => <li key={award}>{award}</li>)
              : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ArtistOverview;
