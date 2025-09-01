import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import ShootingStarAnimation from '../../components/ShootingStarAnimation/ShootingStarAnimation.jsx';

const CloseOne = ({ onBack, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = blank, 1-15 = text steps, 16 = after shooting star
  const [fadeOut, setFadeOut] = useState(false);
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [bgTransitionProgress, setBgTransitionProgress] = useState(0); // 0-100 for gradual transition
  const [showShootingStar, setShowShootingStar] = useState(false);
  const [pageVisible, setPageVisible] = useState(true); // Start with page visible
  const [stars, setStars] = useState([]); // Array to hold star data
  const [starAnimationStarted, setStarAnimationStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Track time since star animation started
  const [debugShootingStarVisible, setDebugShootingStarVisible] = useState(false);
  const [showLookdownImage, setShowLookdownImage] = useState(false); // New state for image
  const [textMovedUp, setTextMovedUp] = useState(false); // New state for text movement

  // Generate random stars when component mounts
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      const numStars = 150; // Total number of stars
      
      // Create distinct batches of stars with bigger delays between them
      const batches = [
        { startTime: 0, count: 20 },    // First batch: 20 stars at 0s
        { startTime: 8, count: 25 },    // Second batch: 25 stars at 8s  
        { startTime: 18, count: 30 },   // Third batch: 30 stars at 18s
        { startTime: 30, count: 35 },   // Fourth batch: 35 stars at 30s
        { startTime: 45, count: 40 }    // Fifth batch: 40 stars at 45s
      ];
      
      let starId = 0;
      batches.forEach(batch => {
        for (let i = 0; i < batch.count; i++) {
          starArray.push({
            id: starId++,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleDelay: Math.random() * 6,
            appearanceTime: batch.startTime + (Math.random() * 3) // Small random offset within batch (0-3s)
          });
        }
      });
      
      setStars(starArray);
    };
    
    generateStars();
  }, []);

  // Array of text content - now includes the wish text as the last entry
  const textContent = [
    "thanks for being a good friend",
    "a good co-worker",
    "a good influence",
    "a sweet maasi (wait, ye main kyu bol raha)",
    "and well..",
    "and dw, I (literally) don't look up to you, see..",
    "never underestimate yourself, or ever feel lesser",
    "You're one of the smartest, most diligent, and kindest people I know.",
    "and I (still) try to learn a great deal from you",
    "soar high, keep shining and may all your dreams come true",
    "make a wish, miss Anand :)"
  ];

  // Auto-start the sequence when component mounts
  useEffect(() => {
    // Start the sequence automatically after a short delay
    const autoStartTimer = setTimeout(() => {
      setSequenceStarted(true);
    }, 1000); // Start after 1 second

    return () => clearTimeout(autoStartTimer);
  }, []);

  useEffect(() => {
    if (!sequenceStarted) return;

    // Start star animation 10 seconds after sequence starts
    const starTimer = setTimeout(() => {
      setStarAnimationStarted(true);
    }, 10000);

    // Reset animation and start text sequence
    setCurrentStep(0);
    
    const timers = [starTimer];
    
    // Create sequential show/hide pattern for each text EXCEPT the last one (wish text)
    const regularTextContent = textContent.slice(0, -1); // All except the last entry
    
    regularTextContent.forEach((_, index) => {
      let stepStartTime = index * 4000 + 1000;
      
      // Add 3-second pause only for step 7 (index 6) - the first step after the image
      if (index === 6) {
        stepStartTime += 3000; // Add 3 second pause after step 6
      }
      // For steps after 7, maintain the same offset
      if (index > 6) {
        stepStartTime += 3000; // Keep the same offset for subsequent steps
      }
      
      // Show text
      timers.push(setTimeout(() => setCurrentStep(index + 1), stepStartTime));
      
      // Special handling for the "look down" text (index 5, step 6)
      if (index === 5) { // "and dw, I (literally) don't look up to you, see.."
        // Move text up after 2 seconds of text being visible
        timers.push(setTimeout(() => {
          setTextMovedUp(true);
        }, stepStartTime + 2000));
        
        // Show image after text has moved up (1s after text movement)
        timers.push(setTimeout(() => {
          setShowLookdownImage(true);
        }, stepStartTime + 3000));
        
        // Hide image and reset text position - reduce to 5 seconds total
        timers.push(setTimeout(() => {
          setShowLookdownImage(false);
          setTextMovedUp(false);
        }, stepStartTime + 5000));
        
        // Hide text for this step also after 5 seconds
        timers.push(setTimeout(() => setCurrentStep(0), stepStartTime + 5000));
      } else {
        // Hide text (back to blank) - normal timing for other steps
        timers.push(setTimeout(() => setCurrentStep(0), stepStartTime + 3500));
      }
    });

    // Gradual background transition during text sequence
    // Account for the extended step 6 duration
    const step6ExtraTime = 1000; // Extra 1 second for step 6 (reduced from 3)
    const regularSequenceDuration = (regularTextContent.length - 1) * 4000 + (4000 + step6ExtraTime); // Last step gets extra time
    const transitionSteps = 100; // Number of steps for smooth transition
    const stepDuration = regularSequenceDuration / transitionSteps;
    
    for (let i = 0; i <= transitionSteps; i++) {
      timers.push(setTimeout(() => {
        setBgTransitionProgress(i);
      }, i * stepDuration + 1000)); // Start transition 1 second after sequence starts
    }

    // After last regular text, start shooting star sequence
    const shootingStarTimer = setTimeout(() => {
      setCurrentStep(0); // Hide the last regular text
      
      // Start shooting star animation
      setTimeout(() => {
        setShowShootingStar(true);
        setDebugShootingStarVisible(true);
        
        // Fallback: if shooting star doesn't complete in 8 seconds, force completion
        setTimeout(() => {
          if (showShootingStar) {
            handleShootingStarComplete();
          }
        }, 8000);
      }, 500);
      
    }, regularSequenceDuration + 1000); // 1 second after last regular text

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(shootingStarTimer);
    };
  }, [sequenceStarted]);

  // Timer for star animation elapsed time
  useEffect(() => {
    if (!starAnimationStarted) return;

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [starAnimationStarted]);

  const handleShootingStarComplete = () => {
    setShowShootingStar(false);
    setDebugShootingStarVisible(false);
    
    // Show the wish text (last item in textContent array) after a delay
    setTimeout(() => {
      setCurrentStep(textContent.length); // Show the last text entry
      
      // Keep it visible for 2 seconds, then fade out and transition
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onNext();
        }, 2000); // Increased fade out time from 1s to 2s for smoother transition
      }, 2000); // Reduced from 4 seconds to 2 seconds
    }, 0); // No delay - appears immediately after shooting star completes
  };

  const handleBack = () => {
    onBack();
  };

  // Calculate overlay opacity based on transition progress
  const getOverlayOpacity = () => {
    const progress = bgTransitionProgress / 100; // 0 to 1
    return progress * 0.9; // Max 90% opacity so it doesn't go completely black too quickly
  };

  // Calculate star visibility based on elapsed time since star animation started
  const getStarVisibility = (star) => {
    if (!starAnimationStarted) {
      return { opacity: 0, shouldShow: false };
    }
    
    // Check if enough time has passed for this star to start appearing
    if (elapsedTime < star.appearanceTime) {
      return { opacity: 0, shouldShow: false };
    }
    
    // Star should show and start its CSS fade-in animation
    return { 
      opacity: star.opacity, // Target opacity
      shouldShow: true,
      animationDelay: `${elapsedTime - star.appearanceTime}s` // How long ago it should have started
    };
  };

  return (
    <div 
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 bg-gradient-to-br from-black via-gray-900 to-gray-800 ${
        pageVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Black overlay that gradually appears */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-200 ease-out pointer-events-none"
        style={{ opacity: getOverlayOpacity() }}
      />

      {/* Stars that appear as it gets darker - only show after star animation starts */}
      {starAnimationStarted && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {stars.map((star) => {
            const visibility = getStarVisibility(star);
            if (!visibility.shouldShow) return null;
            
            return (
              <div
                key={star.id}
                className="absolute bg-white rounded-full star-fade-in"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  '--target-opacity': visibility.opacity,
                  animation: `starFadeIn 5s ease-out forwards, twinkle 3s ease-in-out infinite ${star.twinkleDelay + 5}s`,
                  boxShadow: star.size > 2 ? '0 0 4px rgba(255, 255, 255, 0.5)' : 'none',
                  opacity: 0 // Start at 0, animation will bring it to target
                }}
              />
            );
          })}
        </div>
      )}
      <BackButton onClick={handleBack} theme="dark" />

      {/* Show lookdown image only for step 6 (index 5) - OUTSIDE the main content container */}
      {currentStep === 6 && (
        <img 
          src="./lookdown.png" 
          alt="Looking down"
          className={`fixed w-[48rem] md:w-[56rem] lg:w-[64rem] rounded-lg z-30 ${
            showLookdownImage ? 'opacity-100 transition-opacity duration-1000 ease-out' : 'opacity-0 transition-opacity duration-3000 ease-in-out'
          }`}
          style={{
            filter: 'brightness(0.9) contrast(1.1)',
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            margin: '0 auto',
            padding: '0',
            display: 'block',
            zIndex: '9999'
          }}
        />
      )}

      {/* Content - shows after auto-start */}
      {sequenceStarted && (
        <div className={`relative z-20 min-h-screen flex items-center justify-center px-4 transition-opacity duration-1000 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="w-full relative">
            
            {/* Render each text line with sequential show/hide */}
            {textContent.map((text, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-1000 ${
                  currentStep === index + 1
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <div className={`text-container transition-all duration-700 ease-out ${
                  index === 5 && textMovedUp ? 'transform -translate-y-64' : ''
                }`}>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white cute-font leading-relaxed text-center">
                    {text}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* Debug shooting star with trail - independent of the component */}
      {debugShootingStarVisible && (
        <div className="fixed inset-0 z-60 pointer-events-none">
          {/* Main shooting star */}
          <div 
            className="absolute bg-white rounded-full shooting-star-main"
            style={{
              top: '10%',
              left: '90%',
              width: '8px',
              height: '8px',
              boxShadow: '0 0 20px white, 0 0 40px rgba(255,255,255,0.8)',
              animation: 'debugShootingStar 5s ease-out forwards',
              zIndex: 67
            }}
            onAnimationEnd={() => {
              setTimeout(() => handleShootingStarComplete(), 100);
            }}
          />
          
          {/* Trail effect - multiple delayed elements */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: '10%',
                left: '90%',
                width: `${6 - i * 0.3}px`,
                height: `${6 - i * 0.3}px`,
                background: `rgba(255, 255, 255, ${0.8 - i * 0.06})`,
                boxShadow: `0 0 ${15 - i}px rgba(255, 255, 255, ${0.6 - i * 0.04})`,
                animation: `debugShootingStar 5s ease-out forwards`,
                animationDelay: `${i * 0.05}s`, // Stagger the trail
                zIndex: 65 - i
              }}
            />
          ))}
          
          {/* Streak/tail effect */}
          <div 
            className="absolute"
            style={{
              top: '10%',
              left: '90%',
              width: '1px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.3) 100%)',
              borderRadius: '1px',
              transformOrigin: 'right center',
              transform: 'rotate(30deg)',
              animation: 'debugShootingStar 5s ease-out forwards',
              zIndex: 64
            }}
          />
        </div>
      )}

      {/* Original Shooting Star Animation - hidden for now to debug */}
      {showShootingStar && false && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <ShootingStarAnimation onComplete={handleShootingStarComplete} />
        </div>
      )}



      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        
        @keyframes starFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: var(--target-opacity);
          }
        }
        
        @keyframes debugShootingStar {
          0% {
            opacity: 0;
            transform: translateX(0) translateY(0) scale(0.5);
          }
          5% {
            opacity: 1;
            transform: translateX(-30px) translateY(30px) scale(1);
          }
          95% {
            opacity: 1;
            transform: translateX(-1200px) translateY(600px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-1220px) translateY(610px) scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default CloseOne;