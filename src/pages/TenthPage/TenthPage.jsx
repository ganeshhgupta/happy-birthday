// src/pages/TenthPage/TenthPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import PageFlip from '../../components/PageFlip/PageFlip.jsx';
import ScribbleReveal from '../../components/ScribbleReveal/ScribbleReveal.jsx';

const TenthPage = ({ onBack, onNext }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageFlip, setStartPageFlip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Text fades in first
    setTimeout(() => {
      setShowText(true);
    }, 500);
    
    // Image scribbles in after text
    setTimeout(() => {
      setShowImage(true);
    }, );
    
    // Button appears last
    setTimeout(() => {
      setShowButton(true);
    }, 2000);
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
            
            {/* Left side - Text */}
            <div className="flex-1 flex items-center justify-end">
              <h1 style={{ 
                fontFamily: "Zen Loop, cursive", 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 400, 
                color: '#1f2937',
                lineHeight: '1.3',
                maxWidth: '500px'
              }}>
                Jisko lock in ho ke padhna aata hai
              </h1>
            </div>
            
            {/* Right side - Image */}
            <div className="flex-1 flex items-center justify-start">
              <img 
                src="./1.png"
                alt="Character"
                style={{
                  width: 'min(450px, 40vw)',
                  height: 'min(450px, 40vw)',
                  objectFit: 'cover'
                }}
              />
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
            
            {/* Left side - Text with fade in */}
            <div className="flex-1 flex items-center justify-end">
              <h1 
                className={`text-center lg:text-left transform transition-all duration-[2000ms] ease-out ${
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
                  maxWidth: '500px'
                }}
              >
                Jisko lock in ho ke padhna aata hai
              </h1>
            </div>
            
            {/* Right side - Image with scribble reveal */}
            <div className="flex-1 flex items-center justify-start">
              <ScribbleReveal
                src="./lockin1.jpg"
                width={450}
                height={450}
                duration={2}
                strokeWidth={50}
                strokeColor="white"
                trigger={showImage}
                delay={0}
                alt="Character"
              />
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

export default TenthPage;