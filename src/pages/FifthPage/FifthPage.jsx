// src/pages/FifthPage/FifthPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';

const FifthPage = ({ onBack, onNext }) => {
  const [pagePhase, setPagePhase] = useState(0); // 0: white, 1: image fade in, 2: text fade in, 3: button fade in
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log('FifthPage mounted - starting with white page');
    
    // Phase 1: Image fades in after short delay
    setTimeout(() => {
      console.log('Phase 1: Image fading in');
      setPagePhase(1);
      setShowImage(true);
    }, 1000); // 1s delay from white page
    
    // Phase 2: Text fades in after image is visible
    setTimeout(() => {
      console.log('Phase 2: Text fading in');
      setPagePhase(2);
      setShowText(true);
    }, 3500); // 2.5s after image starts fading in
    
    // Phase 3: Button fades in after text
    setTimeout(() => {
      console.log('Phase 3: Button fading in');
      setPagePhase(3);
      setShowButton(true);
    }, 5500); // 2s after text starts fading in
    
  }, []);

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      if (onNext) onNext();
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-sky-400">
      <BackButton onClick={handleBack} theme="light" />

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Image - fades in first, 150% bigger, no border/circle */}
        <div
          className={`mb-12 transform transition-all duration-[2000ms] ease-out ${
            showImage
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          <img 
            src="/1.png" 
            alt="Today's about her" 
            className="shadow-2xl object-cover"
            style={{
              width: '480px', // 150% of 320px
              height: '480px', // 150% of 320px
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)' // Softer shadow
            }}
            onLoad={() => console.log('Image 1.png loaded successfully')}
            onError={(e) => {
              console.error('Failed to load image 1.png:', e);
              console.log('Image src attempted:', e.target.src);
            }}
          />
        </div>

        {/* Text - "today's about her" with Zen Loop font */}
        <div
          className={`mb-12 transform transition-all duration-[2000ms] ease-out ${
            showText
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black text-center zen-loop-regular">
            today's about her
          </h1>
        </div>

        {/* Button - "Bruh" with light color and Zen Loop font */}
        <div
          className={`transform transition-all duration-[2000ms] ease-out ${
            showButton
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <button
            onClick={handleNext}
            className="group relative px-12 py-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-300 hover:border-gray-400 hover:shadow-gray/40 hover:shadow-xl zen-loop-regular"
          >
            <span className="relative z-10 flex items-center gap-3 text-xl md:text-2xl">
              Bruh
            </span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gray-300 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
            <div className="absolute -inset-1 rounded-full bg-gray-300 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
          </button>
        </div>

        {/* Debug info */}
        <div className="fixed bottom-4 left-4 bg-white/90 text-black p-2 rounded text-xs border">
          PagePhase: {pagePhase} | Image: {showImage.toString()} | Text: {showText.toString()} | Button: {showButton.toString()}
        </div>

      </div>
    </div>
  );
};

export default FifthPage;