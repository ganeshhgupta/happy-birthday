import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import PageFlip from '../../components/PageFlip/PageFlip.jsx';
import ScribbleReveal from '../../components/ScribbleReveal/ScribbleReveal.jsx';

const FifthPage = ({ onBack = () => {}, onNext = () => {} }) => {
  const [pagePhase, setPagePhase] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageFlip, setStartPageFlip] = useState(false);

  useEffect(() => {
    console.log('FifthPage mounted - starting with white page');
    
    // Phase 1: Image fades in after short delay
    setTimeout(() => {
      console.log('Phase 1: Image fading in');
      setPagePhase(1);
      setShowImage(true);
    }, 1000);
    
    // Phase 2: Text fades in after image is visible
    setTimeout(() => {
      console.log('Phase 2: Text fading in');
      setPagePhase(2);
      setShowText(true);
    }, 3500);
    
    // Phase 3: Button fades in after text
    setTimeout(() => {
      console.log('Phase 3: Button fading in');
      setPagePhase(3);
      setShowButton(true);
    }, 5500);
  }, []);

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  const handleNext = () => {
    console.log('Starting page flip directly - no fade out');
    setStartPageFlip(true);
  };

  const handlePageFlipComplete = () => {
    console.log('Page flip animation complete, moving to SixthPage');
    onNext();
  };

  if (startPageFlip) {
    return (
      <PageFlip 
        onComplete={handlePageFlipComplete}
        fromPageContent="chapter two"
        toPageContent="where stories unfold like pages in the wind, each moment a new beginning"
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)'
    }}>
      <BackButton onClick={handleBack} theme="light" />

      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Image with scribble reveal animation using the component */}
        <div className="mb-12">
          <ScribbleReveal
            src="/1.png"
            width={480}
            height={480}
            duration={5}
            strokeWidth={45}
            strokeColor="white"
            trigger={showImage}
            delay={0}
            alt="Today's about her"
            onAnimationComplete={() => console.log('Scribble animation complete!')}
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black text-center" 
              style={{ fontFamily: "Zen Loop, cursive", fontWeight: 400, fontStyle: "normal" }}>
            today's about her
          </h1>
        </div>

        {/* Button */}
        <div
          className={`transform transition-all duration-[2000ms] ease-out ${
            showButton
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <button
            onClick={handleNext}
            className="group relative px-12 py-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-300 hover:border-gray-400 hover:shadow-gray/40 hover:shadow-xl"
            style={{ fontFamily: "Zen Loop, cursive", fontWeight: 400, fontStyle: "normal" }}
          >
            <span className="relative z-10 flex items-center gap-3 text-xl md:text-2xl">
              Bruh
            </span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gray-300 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
            <div className="absolute -inset-1 rounded-full bg-gray-300 opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* Debug info */}
      <div className="fixed bottom-4 left-4 bg-white/90 text-black p-2 rounded text-xs border">
        PagePhase: {pagePhase} | Image: {showImage.toString()} | Text: {showText.toString()} | Button: {showButton.toString()}
        <br />
        StartPageFlip: {startPageFlip.toString()}
      </div>
    </div>
  );
};

export default FifthPage;