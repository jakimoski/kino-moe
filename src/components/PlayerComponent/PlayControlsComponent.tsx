import React from "react";
import Image from "next/image";
import "./playercomponent.scss";

import PlayIcon from "@public/assets/icons/play_controll.png";
import PauseIcon from "@public/assets/icons/pause_controll (2).png";
import BackIcon from "@public/assets/icons/back_controll.png";
import ForwardIcon from "@public/assets/icons/forward_controll.png";

type PlayControlsComponentProps = {
  playVideoHandler: () => void;
  videoIsPlaying: boolean;
  rewindHandler: (direction: string) => void;
};

function PlayControlsComponent({
  playVideoHandler,
  videoIsPlaying,
  rewindHandler,
}: PlayControlsComponentProps) {
  return (
    <div className="video-player__play">
      <button onClick={() => rewindHandler("back")}>
        <Image src={BackIcon} alt="play" width={50} height={50} />
      </button>

      <button onClick={playVideoHandler}>
        <Image
          src={videoIsPlaying ? PauseIcon : PlayIcon}
          alt="play"
          width={50}
          height={50}
        />
      </button>
      <button onClick={() => rewindHandler("forward")}>
        <Image src={ForwardIcon} alt="play" width={50} height={50} />
      </button>
    </div>
  );
}

export default PlayControlsComponent;
