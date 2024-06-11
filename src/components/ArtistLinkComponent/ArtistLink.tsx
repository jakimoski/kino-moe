"use client";
import React, { useState } from "react";
import "./ArtistLink.scss";

import Modal from "../ModalComponent/Modal";
import { createPortal } from "react-dom";
import ArtistOverview from "../ArtistOverviewComponent/ArtistOverview";

export default function ArtistLink({ name }: { name: string }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="artist-link" onClick={() => setShowModal(true)}>
        {name}
      </button>
      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)}>
            <ArtistOverview name={name} />
          </Modal>,
          document.body
        )}
    </>
  );
}
