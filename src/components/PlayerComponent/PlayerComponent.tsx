"use client";
import React from "react";
import "./playercomponent.scss";

import SettingsIcon from "@public/assets/icons/movie-open-settings_controll.png";
import SubtitlesIcon from "@public/assets/icons/subtitles_controll.png";
import FullScreenIcon from "@public/assets/icons/fullscreen_icon.png";
import ExitFullIcon from "@public/assets/icons/fullscreen_exit_icon.png";
import infoIcon from "@public/assets/icons/ico-info.png";
import { useRouter } from "next/navigation";
import backIcon from "@public/assets/icons/Back-Player-Button.png";
import Image from "next/image";
import { formatSeconds } from "@/utils/helpers";
import { comments } from "@/tem-db";
import PlayerCommentsComponent from "./PlayerCommentsComponent";
import PlayControlsComponent from "./PlayControlsComponent";
import PLayerVolumeComponent from "./PLayerVolumeComponent";
import PlayerButtonComponent from "./PlayerButtonComponent";
import PlayerSeekComponent from "./PlayerSeekComponent";

import { useVideoPlayer } from "@/hooks/videoPlayer";
import { MovieType } from "@/types/types";

export const VideoPlayer = ({ movie }: { movie: MovieType }) => {
  const {
    videoRef,
    videoWrapper,
    videoIsPlaying,
    muted,
    currentTime,
    volume,
    fullScreen,
    handleMute,
    handleVolumeChange,
    goFullScreen,
    playPause,
    progressHandler,
    rewindHandler,
    controlsRef,
    backBtn,
    infoBtn,
  } = useVideoPlayer();

  const router = useRouter();

  return (
    <div className="video-player">
      <div
        onDoubleClick={goFullScreen}
        ref={videoWrapper}
        className="video-player__wrapper"
      >
        <button
          ref={backBtn}
          className="video-player__back-btn"
          onClick={() => router.back()}
        >
          <Image src={backIcon} width={50} height={50} alt="back-button" />
        </button>
        <button ref={infoBtn} className="video-player__info-btn">
          <Image src={infoIcon} width={50} height={50} alt="back-button" />
        </button>
        <video
          className="video-player__player"
          ref={videoRef}
          width="100%"
          autoPlay={true}
        >
          <source src="/assets/videos/ThebestofBalcan.mp4" />
        </video>
        {/* Controls */}
        <div ref={controlsRef} className="video-player__main-controls-wrapper">
          {/* Video Seek Controls */}
          <PlayerSeekComponent
            videoRef={videoRef}
            currentTime={currentTime}
            progressHandler={progressHandler}
          />
          <div className="video-player__bottom-controls-wrapper">
            {/* Time */}
            <div className="video-player__time">
              <p>
                {formatSeconds(currentTime)} /{" "}
                {formatSeconds(videoRef?.current?.duration)}
              </p>
            </div>
            {/* Play controls */}
            <PlayControlsComponent
              playVideoHandler={playPause}
              videoIsPlaying={videoIsPlaying}
              rewindHandler={rewindHandler}
            />
            {/* Settings controls */}
            <div className="video-player__settings">
              <PlayerButtonComponent alt="settings-icon" icon={SettingsIcon} />
              <PlayerButtonComponent
                alt="subtitles-icon"
                icon={SubtitlesIcon}
              />
              <PlayerButtonComponent
                handler={goFullScreen}
                alt="fullscreen-icon"
                icon={fullScreen ? ExitFullIcon : FullScreenIcon}
              />
              <PLayerVolumeComponent
                handleMute={handleMute}
                muted={muted}
                volume={volume}
                handleVolumeChange={handleVolumeChange}
              />
              {/* Comments  */}
              <PlayerCommentsComponent
                videoRef={videoRef}
                comments={comments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
