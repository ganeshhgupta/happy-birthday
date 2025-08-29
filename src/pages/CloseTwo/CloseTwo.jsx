// src/pages/CloseTwo/CloseTwo.jsx
import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';

const CloseTwo = ({ onBack, onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Start video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }

    // Text animation sequence with longer initial delay
    const timers = [
      // Step 1: "Happy Birthday Anusha" appears after 6 second delay
      setTimeout(() => setTextStep(1), 6000),
      
      // Step 2: "A" disappears, "Pyaara" appears with ":)" after 5 more seconds
      setTimeout(() => setTextStep(2), 11000),
      
      // Step 3: Fade out birthday text after 5 more seconds
      setTimeout(() => setTextStep(3), 16000),
      
      // Step 4: "Have a blessed life" appears
      setTimeout(() => setTextStep(4), 18000),
      
      // Step 5: Final fade out
      setTimeout(() => setTextStep(5), 22000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackButton onClick={handleBack} theme="dark" />

      {/* Fallback background while video loads */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black"></div>
      )}

      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoLoad}
      >
        <source src="./fireworks.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/25 transition-opacity duration-1000"></div>

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="text-center max-w-4xl">
          
          {/* Step 1: Happy Birthday Anusha */}
          <div
            className={`mb-8 transform transition-all duration-[5000ms] ease-out ${
              textStep >= 1 && textStep < 3
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] text-center mb-8" 
                style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontWeight: 400, 
                  fontStyle: "normal",
                  color: 'white',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)'
                }}>
              Happy Birthday
            </h1>
            
            {/* Dynamic Anusha/nusha text - centered properly */}
            <div className="text-8xl md:text-9xl lg:text-[12rem] text-center"
                 style={{ 
                   fontFamily: "Zen Loop, cursive", 
                   fontWeight: 400, 
                   fontStyle: "normal",
                   color: 'white',
                   textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4)',
                   WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)'
                 }}>
              
              {/* Centered layout for the name transformation */}
              <div className="flex items-center justify-center">
                {/* Pyaara appears in step 2 */}
                <span
                  className={`transition-all duration-[5000ms] ease-out ${
                    textStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                >
                  Pyaara{' '}
                </span>
                
                {/* A disappears in step 2 */}
                <span
                  className={`transition-all duration-[5000ms] ease-out ${
                    textStep >= 2 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                >
                  A
                </span>
                
                {/* nusha always visible after step 1 */}
                nusha
                
                {/* :) appears in step 2 */}
                <span
                  className={`transition-all duration-[5000ms] ease-out ${
                    textStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ marginLeft: '0.5rem' }}
                >
                    :)
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Have a blessed life */}
          <div
            className={`transform transition-all duration-[5000ms] ease-out ${
              textStep >= 4
                ? textStep === 5
                  ? 'translate-y-0 opacity-0' // Fade out in step 5
                  : 'translate-y-0 opacity-100' // Visible in step 4
                : 'translate-y-10 opacity-0' // Hidden before step 4
            }`}
          >
            <h2 className="text-7xl md:text-8xl lg:text-[10rem] text-center"
                style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontWeight: 400, 
                  fontStyle: "normal",
                  color: 'white',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)'
                }}>
              Have a blessed life
            </h2>
          </div>

        </div>
      </div>

      {/* Debug info */}
      <div className="fixed bottom-4 left-4 bg-white/90 text-black p-2 rounded text-xs border z-20">
        Text Step: {textStep} / 5
        <br />
        Playing fireworks video...
      </div>
    </div>
  );
};

export default CloseTwo;