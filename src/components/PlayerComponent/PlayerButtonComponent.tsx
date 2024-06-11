import React from "react";
import Image, { StaticImageData } from "next/image";
import "./playercomponent.scss";

const ICON_WIDTH = 40;
const ICON_HEIGHT = 40;

type PlayerButtonComponentProps = {
  handler?: () => void;
  alt?: string;
  icon: StaticImageData;
};

function PlayerButtonComponent({
  handler,
  alt,
  icon,
}: PlayerButtonComponentProps) {
  return (
    <button onClick={handler}>
      <Image
        src={icon}
        alt={alt || "icon"}
        width={ICON_WIDTH}
        height={ICON_HEIGHT}
      />
    </button>
  );
}

export default PlayerButtonComponent;
