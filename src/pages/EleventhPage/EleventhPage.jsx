// src/pages/EleventhPage/EleventhPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import PageFlip from '../../components/PageFlip/PageFlip.jsx';
import ScribbleReveal from '../../components/ScribbleReveal/ScribbleReveal.jsx';

const EleventhPage = ({ onBack, onNext }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageFlip, setStartPageFlip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [showSpotifyImage, setShowSpotifyImage] = useState(false);
  const [showCheckItOut, setShowCheckItOut] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Text fades in first
    setTimeout(() => {
      setShowText(true);
    }, 500);
    
    // Image scribbles in after text
    setTimeout(() => {
      setShowImage(true);
    }, 1000);
    
    // Sub text fades in after main text and image
    setTimeout(() => {
      setShowSubText(true);
    }, 3000);
    
    // Spotify image fades in after sub text
    setTimeout(() => {
      setShowSpotifyImage(true);
    }, 4000);
    
    // "Check it out" text appears after Spotify image
    setTimeout(() => {
      setShowCheckItOut(true);
    }, 5000);
    
    // Button appears last
    setTimeout(() => {
      setShowButton(true);
    }, 6000);
  }, []);

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  const handleNext = () => {
    setStartPageFlip(true);
  };

  const handlePageFlipComplete = () => {
    onNext();
  };

  if (startPageFlip) {
    return (
      <PageFlip onComplete={handlePageFlipComplete}>
        {/* Pass the actual page content as children */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24">
            
            {/* Left side - Image */}
            <div className="flex-1 flex items-center justify-end">
              <img 
                src="./khaww1.jpg"
                alt="Character"
                style={{
                  width: 'min(675px, 60vw)',
                  height: 'min(675px, 60vw)',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            {/* Right side - Text */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <h1 style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                  fontWeight: 400, 
                  color: '#1f2937',
                  lineHeight: '1.3',
                  maxWidth: '500px',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  Jo khaww kar ke so jata hai
                </h1>
                
                <p style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', 
                  fontWeight: 400, 
                  color: '#4b5563',
                  lineHeight: '1.4',
                  maxWidth: '450px',
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  I made another instrumental playlist for you btw
                </p>
                
                <a 
                  href="https://open.spotify.com/playlist/172X2fPSEzkd8Sf95cF9jQ?si=hn7bF7A8Q32j6PRA3N4y7g&pi=nDFZGpTuRLeyN&nd=1&dlsi=3407a6be2e6b46d0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <img 
                    src="./spotify.jpg"
                    alt="Spotify Playlist"
                    style={{
                      width: '200px',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '16px',
                      boxShadow: '0 0 25px rgba(255, 193, 7, 0.6), 0 0 50px rgba(255, 193, 7, 0.3), 0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                </a>
                
                <p style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
                  fontWeight: 400, 
                  color: '#6b7280',
                  lineHeight: '1.4',
                  textAlign: 'center',
                  marginTop: '1rem'
                }}>
                  check it out
                </p>
              </div>
            </div>
          </div>
          
          {/* Button positioned at bottom center */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <button
              className="group relative px-12 py-4 bg-gray-100 text-gray-800 font-semibold rounded-full shadow-lg border border-gray-300"
              style={{ 
                fontFamily: "Zen Loop, cursive", 
                fontSize: '1.5rem',
                fontWeight: 400
              }}
            >
              Grr
            </button>
          </div>
        </div>
      </PageFlip>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)'
    }}>
      <BackButton onClick={handleBack} theme="light" />

      <div className={`relative z-10 min-h-screen transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Greeting card style layout - two centered columns */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24">
            
            {/* Left side - Image with scribble reveal */}
            <div className="flex-1 flex items-center justify-end">
              <ScribbleReveal
                src="./khaww1.jpg"
                width={675}
                height={675}
                duration={2}
                strokeWidth={50}
                strokeColor="white"
                trigger={showImage}
                delay={0}
                alt="Character"
              />
            </div>
            
            {/* Right side - Text with fade in */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <h1 
                  className={`transform transition-all duration-[2000ms] ease-out ${
                    showText
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ 
                    fontFamily: "Zen Loop, cursive", 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: 400, 
                    color: '#1f2937',
                    lineHeight: '1.3',
                    maxWidth: '500px',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}
                >
                  Jo khaww kar ke so jata hai
                </h1>
                
                <p 
                  className={`transform transition-all duration-[2000ms] ease-out ${
                    showSubText
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ 
                    fontFamily: "Zen Loop, cursive", 
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', 
                    fontWeight: 400, 
                    color: '#4b5563',
                    lineHeight: '1.4',
                    maxWidth: '450px',
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  I made another instrumental playlist for you btw
                </p>
                
                <a 
                  href="https://open.spotify.com/playlist/172X2fPSEzkd8Sf95cF9jQ?si=hn7bF7A8Q32j6PRA3N4y7g&pi=nDFZGpTuRLeyN&nd=1&dlsi=3407a6be2e6b46d0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transform transition-all duration-[2000ms] ease-out hover:scale-105 ${
                    showSpotifyImage
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <img 
                    src="./spotify.jpg"
                    alt="Spotify Playlist"
                    style={{
                      width: '200px',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '16px',
                      boxShadow: '0 0 25px rgba(255, 193, 7, 0.6), 0 0 50px rgba(255, 193, 7, 0.3), 0 4px 12px rgba(0,0,0,0.15)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </a>
                
                <p 
                  className={`transform transition-all duration-[2000ms] ease-out ${
                    showCheckItOut
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ 
                    fontFamily: "Zen Loop, cursive", 
                    fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
                    fontWeight: 400, 
                    color: '#6b7280',
                    lineHeight: '1.4',
                    textAlign: 'center',
                    marginTop: '1rem'
                  }}
                >
                  check it out
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button positioned at bottom center with fade in */}
        <div 
          className={`absolute bottom-[60px] left-1/2 transform -translate-x-1/2 transition-all duration-[2000ms] ease-out ${
            showButton
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <button
            onClick={handleNext}
            className="group relative px-12 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-300 hover:border-gray-400"
            style={{ 
              fontFamily: "Zen Loop, cursive", 
              fontSize: '1.5rem',
              fontWeight: 400
            }}
          >
            <span className="relative z-10">Grr</span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gray-300 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EleventhPage;