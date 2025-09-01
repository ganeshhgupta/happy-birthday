// src/components/AudioManager/AudioManager.jsx
import React, { useRef, useEffect, useState } from 'react';

const AudioManager = ({ currentPage, audioFile = './Blue.mp3', autoPlay = true, loop = true }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFading, setIsFading] = useState(false);
  const fadeTimeoutRef = useRef(null);

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

  // Fade out current audio before switching to new file
  const fadeOut = (callback, duration = 1000) => {
    const audio = audioRef.current;
    if (!audio || !isPlaying) {
      if (callback) callback();
      return;
    }

    setIsFading(true);
    const startVolume = audio.volume;
    const volumeStep = startVolume / (duration / 50);
    
    const fadeInterval = setInterval(() => {
      const newVolume = Math.max(0, audio.volume - volumeStep);
      audio.volume = newVolume;
      setVolume(newVolume);
      
      if (newVolume <= 0) {
        clearInterval(fadeInterval);
        audio.pause();
        setIsPlaying(false);
        setIsFading(false);
        if (callback) callback();
      }
    }, 50);
  };

  // Fade in new audio
  const fadeIn = (duration = 1000) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    setVolume(0);
    setIsFading(true);
    
    playAudio().then(() => {
      const targetVolume = 1;
      const volumeStep = targetVolume / (duration / 50);
      
      const fadeInterval = setInterval(() => {
        const newVolume = Math.min(1, audio.volume + volumeStep);
        audio.volume = newVolume;
        setVolume(newVolume);
        
        if (newVolume >= 1) {
          clearInterval(fadeInterval);
          setIsFading(false);
        }
      }, 50);
    });
  };

  // Handle audio loading and file changes with fade transition
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setError(null);
      console.log('Audio loaded and ready for:', audioFile);
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
      console.log('Audio ended, loop setting:', loop);
      if (loop) {
        audio.currentTime = 0;
        if (shouldPlay && isPlaying) {
          audio.play().catch(console.error);
        }
      } else {
        setIsPlaying(false);
        // Reset volume for next play
        audio.volume = 1;
        setVolume(1);
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    // Check if we need to fade out and switch audio
    const currentSrc = audio.src;
    const newSrc = window.location.origin + audioFile;
    
    if (currentSrc && currentSrc !== newSrc) {
      console.log('Audio file changing from', currentSrc, 'to', newSrc);
      
      // Fade out current audio, then load new audio
      fadeOut(() => {
        console.log('Fade out complete, loading new audio:', audioFile);
        audio.src = audioFile;
        audio.loop = loop;
        audio.load();
      }, 800); // 800ms fade out
    } else if (!currentSrc) {
      // First time loading
      console.log('Initial audio loading:', audioFile);
      audio.src = audioFile;
      audio.loop = loop;
      audio.load();
    } else {
      // Same file, just update loop setting
      audio.loop = loop;
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [audioFile, loop]);

  // Auto-play when conditions are met - Updated to handle transitions
  useEffect(() => {
    console.log('AudioManager auto-play effect - shouldPlay:', shouldPlay, 'isLoaded:', isLoaded, 'userInteracted:', userInteracted, 'isPlaying:', isPlaying, 'isFading:', isFading);
    
    // Once user has interacted, we can auto-play on transitions without requiring new interaction
    if (shouldPlay && isLoaded && userInteracted && !isPlaying && autoPlay && !isFading) {
      console.log('Starting audio with fade in');
      fadeTimeoutRef.current = setTimeout(() => {
        fadeIn(1000); // 1 second fade in
      }, 100);
    } else if (!shouldPlay && isPlaying && !isFading) {
      console.log('Stopping audio - not on play page');
      fadeOut(() => {}, 500);
    }

    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [shouldPlay, isLoaded, userInteracted, autoPlay, isFading]); // Removed isPlaying to prevent loops

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) {
      console.log('Cannot play - audio not ready');
      return Promise.reject('Audio not ready');
    }

    try {
      await audio.play();
      setIsPlaying(true);
      console.log('Audio playing successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('Playback failed:', error);
      setError('Playback failed - click the music button to try again');
      return Promise.reject(error);
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

    if (!isLoaded || isFading) {
      console.log('Audio not ready for toggle (loading or fading)');
      return;
    }

    if (isPlaying) {
      fadeOut(() => {}, 500); // 500ms fade out
    } else {
      fadeIn(500); // 500ms fade in
    }
  };

  // Always render the audio element and controls
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
        <source src={audioFile.replace('.mp3', '.m4a')} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>

      {/* Music control button - always visible */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 p-3 bg-gray-800/80 backdrop-blur-md hover:bg-gray-700/80 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600/50 hover:border-gray-400/50"
        title={
          error ? error :
          !isLoaded ? 'Loading music...' :
          isFading ? 'Transitioning...' :
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
          ) : isFading ? (
            // Fading indicator
            <div className="w-4 h-4 flex gap-0.5 items-center justify-center">
              <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
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

        {/* Volume indicator overlay */}
        {isFading && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800/80 px-2 py-1 rounded whitespace-nowrap">
            {Math.round(volume * 100)}%
          </div>
        )}

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 blur-lg transition-all duration-300"></div>
      </button>
    </>
  );
};

export default AudioManager;