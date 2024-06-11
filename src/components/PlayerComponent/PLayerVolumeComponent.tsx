import React from "react";
import Image from "next/image";
import "./playercomponent.scss";

import VolumeIcon from "@public/assets/icons/sound_controll.png";

type PLayerVolumeComponentProps = {
  handleMute: () => void;
  muted: boolean;
  volume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ICON_WIDTH = 40;
const ICON_HEIGHT = 40;

function PLayerVolumeComponent({
  handleMute,
  muted,
  volume,
  handleVolumeChange,
}: PLayerVolumeComponentProps) {
  return (
    <div className="video-player__volume">
      <button
        onClick={handleMute}
        className={`video-player__volume-button ${
          muted ? "video-player__volume-button--muted" : ""
        }`}
      >
        <Image
          src={VolumeIcon}
          alt="volume"
          width={ICON_WIDTH}
          height={ICON_HEIGHT}
        />
      </button>
      <input
        type="range"
        id="volume-bar"
        className="video-player__volume-input"
        value={volume}
        min="0"
        max="1"
        step="0.1"
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default PLayerVolumeComponent;
