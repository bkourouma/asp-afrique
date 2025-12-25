"use client";

import { Video, VideoType } from "@/types/video";
import { getYouTubeEmbedUrl } from "@/lib/video-utils";
import { 
  Play, 
  Youtube, 
  Upload, 
  ExternalLink,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Pause
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
  controls?: boolean;
}

export function VideoPlayer({ video, autoplay = false, controls = true }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime);
    const handleDurationChange = () => setDuration(videoElement.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setVolume(videoElement.volume);
      setIsMuted(videoElement.muted);
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('durationchange', handleDurationChange);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('volumechange', handleVolumeChange);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('durationchange', handleDurationChange);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = !videoElement.muted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newVolume = parseFloat(e.target.value);
    videoElement.volume = newVolume;
    videoElement.muted = newVolume === 0;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newTime = parseFloat(e.target.value);
    videoElement.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderYouTubePlayer = () => {
    const handleYouTubeClick = () => {
      console.log('YouTube click triggered');
      console.log('Video data:', video);
      console.log('Video URL:', video.videoUrl);
      console.log('Video ID:', video.videoId);
      
      // Essayer différentes sources d'URL
      let youtubeUrl = video.videoUrl;
      
      if (!youtubeUrl && video.videoId) {
        youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
      }
      
      if (youtubeUrl) {
        console.log('Opening YouTube URL:', youtubeUrl);
        window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.error('No YouTube URL found');
        alert('URL YouTube non trouvée');
      }
    };

    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 relative group cursor-pointer" onClick={handleYouTubeClick}>
        {/* Thumbnail ou image de fond */}
        {video.thumbnail && (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay avec bouton play */}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-200">
          <div className="bg-red-600 rounded-full p-6 group-hover:scale-110 transition-transform duration-200">
            <Youtube className="h-12 w-12 text-white" />
          </div>
        </div>
        
        {/* Texte d'information */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-sm opacity-90">Cliquez pour ouvrir sur YouTube</p>
          <p className="text-xs opacity-70 mt-1">Type: {video.type} | URL: {video.videoUrl ? 'Oui' : 'Non'}</p>
        </div>
      </div>
    );
  };

  const renderHTML5Player = () => {
    return (
      <div ref={playerRef} className="relative w-full h-full bg-black group">
        <video
          ref={videoRef}
          src={video.videoFile}
          poster={video.thumbnail || undefined}
          className="w-full h-full object-contain"
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        />
        
        {controls && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
            {/* Overlay de contrôle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-gray-800" />
                ) : (
                  <Play className="h-8 w-8 text-gray-800" />
                )}
              </button>
            </div>

            {/* Contrôles en bas */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="space-y-2">
                {/* Barre de progression */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-white text-xs">{formatTime(duration)}</span>
                </div>

                {/* Contrôles */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-gray-300"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-gray-300"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="text-white hover:text-gray-300">
                      <Settings className="h-5 w-5" />
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-gray-300"
                    >
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderExternalPlayer = () => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <ExternalLink className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Vidéo externe</h3>
          <p className="text-gray-500 mb-4">
            Cette vidéo est hébergée sur une plateforme externe
          </p>
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play className="h-4 w-4 mr-2" />
            Ouvrir la vidéo
          </a>
        </div>
      </div>
    );
  };

  const renderPlayer = () => {
    switch (video.type) {
      case VideoType.YOUTUBE:
        return renderYouTubePlayer();
      case VideoType.UPLOAD:
        return renderHTML5Player();
      case VideoType.EXTERNAL:
        return renderExternalPlayer();
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Type de vidéo non supporté</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderPlayer()}
    </div>
  );
}
