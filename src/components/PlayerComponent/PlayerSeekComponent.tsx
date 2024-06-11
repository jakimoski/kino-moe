import React from "react";

type PlayerSeekComponentProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement>;
  currentTime: number;
  progressHandler: (value: string) => void;
};

function PlayerSeekComponent({
  videoRef,
  currentTime,
  progressHandler,
}: PlayerSeekComponentProps) {
  return (
    <div className="video-player__top-controls-wrapper">
      <input
        onChange={(e) => progressHandler(e.target.value)}
        type="range"
        className="video-player__seek-bar"
        value={currentTime}
        max={videoRef?.current?.duration}
        min="0"
        step="1"
      />
    </div>
  );
}

export default PlayerSeekComponent;
