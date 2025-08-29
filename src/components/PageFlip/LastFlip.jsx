// src/components/LastFlip/LastFlip.jsx
import React, { useState, useEffect } from 'react';

const LastFlip = ({ onComplete, currentPageLayout, currentPageText, currentPageElement, children }) => {
  const [animationStep, setAnimationStep] = useState(0);
  // 0 = initial white page
  // 1 = flipping (mid-animation)  
  // 2 = final black page

  useEffect(() => {
    // Step 1: Start flipping after brief delay
    setTimeout(() => {
      setAnimationStep(1);
    }, 100);

    // Step 2: Complete flip 
    setTimeout(() => {
      setAnimationStep(2);
      if (onComplete) onComplete();
    }, 1300);
  }, [onComplete]);

  // Calculate rotation based on animation step
  const getRotation = () => {
    if (animationStep === 0) return 0;
    if (animationStep === 1) return -90; // Mid flip
    return -180; // Complete flip
  };

  const getOpacity = () => {
    // Keep the white page fully opaque throughout the flip
    // Only hide it when completely flipped away (step 2)
    return animationStep === 2 ? 0 : 1;
  };

  return (
    <div className="fixed inset-0 z-50" style={{
      background: 'linear-gradient(to bottom right, #000000, #111827, #374151)', // Match CloseOne bg
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      perspective: '1000px'
    }}>
      
      {/* Container for both pages - FULL SCREEN */}
      <div className="absolute inset-0" style={{
        width: '100vw',
        height: '100vh'
      }}>
        
        {/* Dark gradient page underneath (always visible) - FULL SCREEN */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom right, #000000, #111827, #374151)', // Match CloseOne
            zIndex: 1
          }}
        >
          {/* Empty dark gradient page - no content */}
        </div>

        {/* White page that flips out - FULL SCREEN */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
            transformOrigin: 'left center',
            transform: `rotateY(${getRotation()}deg)`,
            opacity: getOpacity(),
            transition: animationStep === 2 ? 'transform 1.2s ease-in-out, opacity 0.1s ease-in-out' : 'transform 1.2s ease-in-out',
            zIndex: 2
          }}
        >
          
          {/* White page content */}
          {children ? (
            children
          ) : (
            <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24 px-8">
              
              {/* Left side - Text */}
              <div className="flex-1 flex items-center justify-end">
                <h1 
                  className="text-center lg:text-left opacity-100 translate-y-0"
                  style={{ 
                    fontFamily: "Zen Loop, cursive", 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: 400, 
                    color: '#1f2937',
                    lineHeight: '1.3',
                    maxWidth: '500px',
                    transition: 'none' // Disable transitions during flip
                  }}
                >
                  {currentPageText || "Who loves ramen and sweet treats"}
                </h1>
              </div>
              
              {/* Right side - Static image */}
              <div className="flex-1 flex items-center justify-start">
                <img 
                  src="/6.jpg"
                  width={700}
                  height={700}
                  alt="Character"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastFlip;