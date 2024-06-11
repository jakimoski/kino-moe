// useVideoPlayer.js
import { useState, useRef, useEffect, useCallback } from "react";

export const useVideoPlayer = () => {
  const backBtn = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const infoBtn = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>;
  const videoWrapper = useRef() as React.MutableRefObject<HTMLDivElement>;
  const controlsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [videoIsPlaying, setVideoIsPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [fullScreen, setFullScreen] = useState(false);

  const handleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
    setVolume(videoRef.current.muted ? 0 : 0.5);
  }, [videoRef]);

  const handleVolumeChange = useCallback(
    (e: { target: { value: string | number } }) => {
      if (!videoRef.current) return;
      const newVolume = +e.target.value;
      videoRef.current.muted = newVolume === 0;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setMuted(newVolume === 0);
    },
    [videoRef]
  );

  const goFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoWrapper.current.requestFullscreen();
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  }, [videoWrapper]);

  const playPause = useCallback(() => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoIsPlaying(true);
      setTimeout(() => {
        controlsRef.current.style.display = "none";
        backBtn.current.style.display = "none";
        infoBtn.current.style.display = "none";
      }, 3000);
    } else {
      videoRef.current.pause();
      setVideoIsPlaying(false);
      setTimeout(() => {
        controlsRef.current.style.display = "block";
        backBtn.current.style.display = "block";
        infoBtn.current.style.display = "block";
      }, 500);
    }
  }, []);

  const progressHandler = useCallback(
    (value: string | number) => {
      videoRef.current.currentTime = +value;
    },
    [videoRef]
  );

  const rewindHandler = (type: string) => {
    if (type === "forward") {
      videoRef.current.currentTime += 10;
    } else {
      videoRef.current.currentTime -= 10;
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };

    const handleKeyDown = (e: { key: string }) => {
      if (e.key === " ") {
        playPause();
      }
    };

    video.addEventListener("timeupdate", updateTime);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playPause]);

  return {
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
  };
};
