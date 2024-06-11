import { useEffect, useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);

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
  }, []);

  return { showModal, setShowModal, onClose };
};
