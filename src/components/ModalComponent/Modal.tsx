"use client";
import { useEffect } from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";
import ExitIcon from "../../../public/assets/icons/exit-modal.png";
import Image from "next/image";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return createPortal(
    <section className={"modal-overlay"}>
      <div className={"modal-overlay"} onClick={() => onClose()}></div>
      <div className="modal">
        <div className="modal__wrapper">
          <button className="modal__close-btn" onClick={() => onClose()}>
            <Image
              src={ExitIcon}
              alt="exit icon"
              width={40}
              height={36}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </button>
          {children}
        </div>
      </div>
    </section>,
    document.body
  );
};

export default Modal;
