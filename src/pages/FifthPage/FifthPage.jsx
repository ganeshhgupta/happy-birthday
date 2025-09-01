import React, { useState, useEffect, useRef } from 'react';
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
  const [imageDimensions, setImageDimensions] = useState({ width: 480, height: 480 });
  const imageRef = useRef(null);

  useEffect(() => {
    console.log('FifthPage mounted - starting with white page');
    
    // Load image and get its natural dimensions
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const maxSize = 480;
      
      let width, height;
      if (aspectRatio > 1) {
        // Landscape: width is max, height is calculated
        width = maxSize;
        height = maxSize / aspectRatio;
      } else {
        // Portrait or square: height is max, width is calculated
        height = maxSize;
        width = maxSize * aspectRatio;
      }
      
      setImageDimensions({ width: Math.round(width), height: Math.round(height) });
    };
    img.src = "./real1.png";
    
    // Phase 1: Image fades in after shorter delay
    setTimeout(() => {
      console.log('Phase 1: Image fading in');
      setPagePhase(1);
      setShowImage(true);
    }, 500);
    
    // Phase 2: Text fades in after image is visible
    setTimeout(() => {
      console.log('Phase 2: Text fading in');
      setPagePhase(2);
      setShowText(true);
    }, 1500);
    
    // Phase 3: Button fades in after text
    setTimeout(() => {
      console.log('Phase 3: Button fading in');
      setPagePhase(3);
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
        imageDimensions={imageDimensions}
      >
        {/* Pass the actual page content as children */}
        <div className="min-h-screen relative overflow-hidden" style={{
          background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)'
        }}>
          
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
            
            {/* Image - with natural dimensions maintained */}
            <div className="mb-12">
              <img 
                ref={imageRef}
                src="./real1.png"
                alt="Today's about her"
                style={{
                  width: `${imageDimensions.width}px`,
                  height: `${imageDimensions.height}px`,
                  objectFit: 'contain' // Changed from 'cover' to maintain aspect ratio
                }}
              />
            </div>

            {/* Text - "today's about her" with Zen Loop font */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black text-center" 
                  style={{ 
                    fontFamily: "Zen Loop, cursive", 
                    fontWeight: 400, 
                    fontStyle: "normal" 
                  }}>
                today's about her
              </h1>
            </div>

            {/* Button - static during flip */}
            <div>
              <button
                className="group relative px-12 py-6 bg-gray-100 text-gray-800 font-semibold rounded-full shadow-lg border border-gray-300"
                style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontWeight: 400, 
                  fontStyle: "normal" 
                }}
              >
                <span className="relative z-10 flex items-center gap-3 text-xl md:text-2xl">
                  Bruh
                </span>
              </button>
            </div>
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

      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Image with scribble reveal animation using the component */}
        <div className="mb-12">
          <ScribbleReveal
            src="./real1.png"
            width={imageDimensions.width}
            height={imageDimensions.height}
            duration={2.5}
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
    </div>
  );
};

export default FifthPage;