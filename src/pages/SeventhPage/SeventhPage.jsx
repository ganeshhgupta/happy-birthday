// src/pages/SeventhPage/SeventhPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import PageFlip from '../../components/PageFlip/PageFlip.jsx';
import ScribbleReveal from '../../components/ScribbleReveal/ScribbleReveal.jsx';

const SeventhPage = ({ onBack, onNext }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageFlip, setStartPageFlip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    './flowers1.png',
    './flowers2.png',
    './flowers3.png',
    './flowers4.png'
  ];

  useEffect(() => {
    // Text fades in first
    setTimeout(() => {
      setShowText(true);
    }, 500);
    
    // Image scribbles in after text
    setTimeout(() => {
      setShowImage(true);
    }, 1000);
    
    // Button appears last
    setTimeout(() => {
      setShowButton(true);
    }, 2000);

    // Start image cycling after image appears
    const imageTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % images.length
        );
      }, 1000); // Change image every 1 second

      return () => clearInterval(interval);
    }, 1000); // Start cycling when image first appears

    return () => clearTimeout(imageTimer);
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
            
            {/* Left side - Image - FIXED: Use flowers1.png here */}
            <div className="flex-1 flex items-center justify-end">
              <img 
                src="./flowers1.png"
                alt="Character"
                style={{
                  width: 'min(600px, 45vw)',
                  height: 'min(600px, 45vw)',
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            </div>
            
            {/* Right side - Text */}
            <div className="flex-1 flex items-center justify-start">
              <h1 style={{ 
                fontFamily: "Zen Loop, cursive", 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 400, 
                color: '#1f2937',
                lineHeight: '1.3',
                maxWidth: '500px',
                textAlign: 'left'
              }}>
                Who says she hates flowers (but doesn't seem to, really)
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
            
            {/* Left side - Cycling images with fade transitions */}
            <div className="flex-1 flex items-center justify-end">
              <div 
                className={`relative transform transition-all duration-[2000ms] ease-out ${
                  showImage
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{
                  width: 'min(600px, 45vw)',
                  height: 'min(600px, 45vw)',
                }}
              >
                {images.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt="Flowers"
                    className={`absolute top-0 left-0 w-full h-full object-contain rounded-lg transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Right side - Text with fade in */}
            <div className="flex-1 flex items-center justify-start">
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
                  textAlign: 'left'
                }}
              >
                Who says she hates flowers (but doesn't seem to, really)
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

export default SeventhPage;