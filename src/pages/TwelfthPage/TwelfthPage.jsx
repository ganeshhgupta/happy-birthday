// src/pages/TwelfthPage/TwelfthPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import PageFlip from '../../components/PageFlip/PageFlip.jsx';
import ScribbleReveal from '../../components/ScribbleReveal/ScribbleReveal.jsx';
import DodgeGame from '../../components/DodgeGame/DodgeGame.jsx';

const TwelfthPage = ({ onBack, onNext }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageFlip, setStartPageFlip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [imageFadeOut, setImageFadeOut] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    // Image scribbles in first
    setTimeout(() => {
      setShowImage(true);
    }, 500);
    
    // Text fades in
    setTimeout(() => {
      setShowText(true);
    }, 1500);
    
    // Button appears
    setTimeout(() => {
      setShowButton(true);
    }, 3500);
    
    // Image fades out
    setTimeout(() => {
      setImageFadeOut(true);
    }, 5000);
    
    // Start game where image was
    setTimeout(() => {
      setShowGame(true);
    }, 5800);
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

  const handleGameComplete = () => {
    console.log('Game completed!');
    // You can add any completion logic here
  };

  if (startPageFlip) {
    return (
      <PageFlip onComplete={handlePageFlipComplete}>
        {/* Pass the actual page content as children */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24">
            
            {/* Left side - Game completed state */}
            <div className="flex-1 flex items-center justify-end">
              <div style={{ 
                position: 'relative', 
                width: '500px', 
                height: '400px',
                background: 'linear-gradient(180deg, #f9f9f7 0%, #f5f5f0 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  fontFamily: 'Zen Loop, cursive',
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  color: '#6b7280',
                  textAlign: 'center'
                }}>
                  Shy ho gaya! 💕
                </div>
              </div>
            </div>
            
            {/* Right side - Text */}
            <div className="flex-1 flex items-center justify-start">
              <h1 style={{ 
                fontFamily: 'Zen Loop, cursive', 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 400, 
                color: '#1f2937',
                lineHeight: '1.3',
                maxWidth: '500px',
                textAlign: 'left'
              }}>
                Jo complements se sharmata hai
              </h1>
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
                fontFamily: 'Zen Loop, cursive', 
                fontSize: '1.5rem',
                fontWeight: 400
              }}
            >
              Next
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
        
        {/* Two-column layout */}
        <div className="min-h-screen flex">
          
          {/* Left side - Takes up entire left half */}
          <div className="flex-1 relative flex items-center justify-center p-8">
            {/* Image that fades out */}
            {!showGame && (
              <div style={{
                opacity: imageFadeOut ? 0 : 1,
                transition: 'opacity 0.8s ease-out'
              }}>
                <ScribbleReveal
                  src="/1.png"
                  width={450}
                  height={450}
                  duration={4}
                  strokeWidth={50}
                  strokeColor="white"
                  trigger={showImage}
                  delay={0}
                  alt="Character"
                />
              </div>
            )}
            
            {/* Game appears after image fades - fills entire left side */}
            {showGame && (
              <div style={{ 
                width: '100%', 
                height: '80vh', // Use viewport height for better sizing
                maxHeight: '600px',
                minHeight: '400px'
              }}>
                <DodgeGame 
                  trigger={showGame}
                  onComplete={handleGameComplete}
                />
              </div>
            )}
          </div>
          
          {/* Right side - Text content */}
          <div className="flex-1 relative flex items-center justify-center p-8">
            <div style={{ 
              maxWidth: '500px',
              width: '100%'
            }}>
              <h1 
                className={`transition-all duration-1000 ease-out ${
                  showText ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  fontFamily: 'Zen Loop, cursive', 
                  fontSize: 'clamp(2.5rem, 4vw, 4rem)', 
                  fontWeight: 400, 
                  color: '#1f2937',
                  lineHeight: '1.3',
                  textAlign: 'left',
                  transform: showText ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                Jo complements se sharmata hai
              </h1>
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
              fontFamily: 'Zen Loop, cursive', 
              fontSize: '1.5rem',
              fontWeight: 400
            }}
          >
            <span className="relative z-10">Next</span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gray-300 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default TwelfthPage;