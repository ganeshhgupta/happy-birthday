// src/components/AudioManager/AudioManager.jsx
import React, { useRef, useEffect, useState } from 'react';

const AudioManager = ({ currentPage, audioFile = './Blue.mp3', autoPlay = true, loop = true }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Pages where this audio should play - Updated to include all pages including CloseOne and CloseTwo
  const playOnPages = [
    'landing', 'ageSelection', 'third', 'fourth', 'fifth', 
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
    'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
    'closeOne', 'closeTwo'
  ];
  const shouldPlay = playOnPages.includes(currentPage);

  // Track user interaction
  useEffect(() => {
    const handleInteraction = (event) => {
      setUserInteracted(true);
    };

    if (!userInteracted) {
      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });
      document.addEventListener('touchstart', handleInteraction, { once: true });
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [userInteracted]);

  // Handle audio loading and file changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (e) => {
      console.error('Audio loading error:', e);
      setError('Failed to load audio file');
      setIsLoaded(false);
    };

    const handleLoadStart = () => {
      setIsLoaded(false);
      console.log('Audio loading started for:', audioFile);
    };

    const handleLoadedData = () => {
      console.log('Audio data loaded for:', audioFile);
    };

    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        if (shouldPlay && isPlaying) {
          audio.play().catch(console.error);
        }
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    // Only reload if the audio file actually changed
    if (audio.src !== window.location.origin + audioFile) {
      console.log('Audio file changed, loading:', audioFile);
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioFile, loop]);

  // Auto-play when conditions are met
  useEffect(() => {
    console.log('AudioManager effect - shouldPlay:', shouldPlay, 'isLoaded:', isLoaded, 'userInteracted:', userInteracted, 'isPlaying:', isPlaying);
    
    if (shouldPlay && isLoaded && userInteracted && !isPlaying && autoPlay) {
      console.log('Attempting to play audio');
      playAudio();
    } else if (!shouldPlay && isPlaying) {
      console.log('Pausing audio - not on play page');
      pauseAudio();
    }
  }, [currentPage, shouldPlay, isLoaded, userInteracted, isPlaying, autoPlay]);

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) {
      console.log('Cannot play - audio not ready');
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      console.log('Audio playing successfully');
    } catch (error) {
      console.error('Playback failed:', error);
      setError('Playback failed - click the music button to try again');
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    console.log('Audio paused');
  };

  const toggleAudio = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }

    if (!isLoaded) {
      console.log('Audio not loaded yet');
      return;
    }

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Always render the audio element and controls (removed the early return)
  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop={loop}
        className="hidden"
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src={audioFile} type="audio/mpeg" />
        <source src={audioFile.replace('.mp3', '.ogg')} type="audio/ogg" />
        <source src={audioFile.replace('.mp3', '.wav')} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Music control button - always visible for debugging */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 p-3 bg-gray-800/80 backdrop-blur-md hover:bg-gray-700/80 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600/50 hover:border-gray-400/50"
        title={
          error ? error :
          !isLoaded ? 'Loading music...' :
          isPlaying ? 'Pause music' : 'Play music'
        }
        disabled={!isLoaded && !error}
      >
        <div className="flex items-center justify-center text-white">
          {!isLoaded && !error ? (
            // Loading spinner
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : error ? (
            // Error indicator
            <div className="w-4 h-4 text-red-400">⚠</div>
          ) : isPlaying ? (
            // Playing indicator (animated bars)
            <div className="w-4 h-4 flex gap-1 items-end">
              <div className="w-1 h-2 bg-current animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          ) : (
            // Play button
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-0 h-0 border-l-4 border-l-current border-t-2 border-b-2 border-t-transparent border-b-transparent ml-0.5"></div>
            </div>
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 blur-lg transition-all duration-300"></div>
      </button>
    </>
  );
};

export default AudioManager;