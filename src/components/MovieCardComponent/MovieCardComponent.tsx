"use client";
import React, { useState } from "react";
import "./MovieCardComponent.scss";
import Image from "next/image";
import Link from "next/link";
import PlayIcon from "@public/assets/icons/play-bold.png";
import Modal from "../ModalComponent/Modal";
import { createPortal } from "react-dom";

import { TMovie } from "@/types/types";
import ContentPreview from "../ContentPreviewComponent/ContentPreview";

const IMAGE_WIDTH = 276;
const IMAGE_HEIGHT = 388;
const ICON_WIDTH = 50;
const ICON_HEIGHT = 50;

type MovieCardComponentProps = {
  link: string;
  image: string;
  title: string;
};

export default function MovieCardComponent({ movie }: { movie: TMovie }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="movies-card">
      <Image
        onClick={() => setShowModal(true)}
        className="movies-card__image"
        src={movie.posterImage}
        alt={movie.title}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{ objectFit: "fill" }}
      />
      <h1 className="movies-card__title">{movie.title}</h1>

      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)}>
            <ContentPreview movie={movie} />
          </Modal>,
          document.body
        )}
    </div>
  );
}
