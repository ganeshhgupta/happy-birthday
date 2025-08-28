// src/pages/FourthPage/FourthPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import Moon from '../../components/Moon/Moon.jsx';

// StarryNight component using particles.js
const StarryNight = ({ show }) => {
  const particlesRef = useRef(null);

  useEffect(() => {
    if (show && window.particlesJS) {
      // Initialize particles.js with twinkling stars configuration
      window.particlesJS('starry-night', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false
            },
            onclick: {
              enable: false
            },
            resize: true
          }
        },
        retina_detect: true
      });
    }

    return () => {
      // Cleanup particles when component unmounts
      if (window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
      }
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      id="starry-night"
      ref={particlesRef}
      className="absolute inset-0 z-5"
      style={{
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  );
};
const VideoCircle = ({ show, videoRef, intensifyGlow = false }) => {
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoGlow, setVideoGlow] = useState(false);
  const [videoGlowIntensity, setVideoGlowIntensity] = useState(0);

  useEffect(() => {
    if (show) {
      // Start as tiny dot, then grow after delay
      setTimeout(() => {
        console.log('Video circle starting to grow from tiny dot');
        setVideoVisible(true);
        
        // After video finishes growing, start glow animation
        setTimeout(() => {
          console.log('Video circle starting gradual glow animation');
          setVideoGlow(true);
          
          // Gradually increase glow intensity
          const glowInterval = setInterval(() => {
            setVideoGlowIntensity(prev => {
              if (prev >= 1) {
                clearInterval(glowInterval);
                return 1;
              }
              return prev + 0.02;
            });
          }, 50);
          
        }, 5000); // Wait for video zoom to complete (4s) + 1s delay
        
      }, 1500); // 1.5s delay before starting the grow animation
    } else {
      setVideoVisible(false);
      setVideoGlow(false);
      setVideoGlowIntensity(0);
    }
  }, [show]);

  // Intensify glow when button is clicked
  useEffect(() => {
    if (intensifyGlow && videoGlowIntensity >= 1) {
      console.log('Starting intense glow for video circle');
      
      const intensifyInterval = setInterval(() => {
        setVideoGlowIntensity(prev => {
          if (prev >= 15) { // Much higher intensity to fill screen
            clearInterval(intensifyInterval);
            return 15;
          }
          return prev + 0.1;
        });
      }, 50);

      return () => clearInterval(intensifyInterval);
    }
  }, [intensifyGlow, videoGlowIntensity]);

  // Calculate glow values based on intensity - much more subtle initial glow
  const glowBoxShadow = videoGlowIntensity > 0
    ? `0px 0px ${4 + (20 * videoGlowIntensity)}px ${1 + (5 * videoGlowIntensity)}px rgba(255, 255, 255, ${Math.min(1, 0.05 + (0.95 * videoGlowIntensity))}), 
       0px 0px ${8 + (30 * videoGlowIntensity)}px ${2 + (8 * videoGlowIntensity)}px rgba(255, 255, 255, ${Math.min(1, 0.03 * videoGlowIntensity)}), 
       0px 0px ${16 + (50 * videoGlowIntensity)}px ${3 + (12 * videoGlowIntensity)}px rgba(255, 255, 255, ${Math.min(1, 0.02 * videoGlowIntensity)})`
    : 'none';

  const glowBackground = videoGlowIntensity > 0
    ? `radial-gradient(circle, rgba(255, 255, 255, ${Math.min(1, 0.02 + (0.98 * videoGlowIntensity))}) 0%, rgba(255, 255, 255, ${Math.min(1, 0.01 + (0.99 * videoGlowIntensity))}) 40%, rgba(255, 255, 255, ${Math.min(1, 0.05 * videoGlowIntensity)}) 70%, transparent 100%)`
    : 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)';

  return (
    <div className="video-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Glow effect - completely separate from video container */}
      <div 
        className={`absolute rounded-full blur-2xl transition-all duration-[4000ms] ease-out ${
          videoVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '320px',
          height: '320px',
          background: glowBackground,
          transform: `scale(${1.1 + (videoGlowIntensity * 2)})`,
          transition: 'transform 50ms ease-out, opacity 4000ms ease-out',
          top: '0',
          left: '0',
          zIndex: 1
        }}
      ></div>
      
      {/* Video container - completely clean, higher z-index */}
      <div 
        className={`transform transition-all duration-[4000ms] ease-out ${
          videoVisible ? 'scale-100 opacity-100' : 'scale-[0.02] opacity-20'
        }`}
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 4000ms ease-out, opacity 4000ms ease-out',
          zIndex: 10
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)',
            borderRadius: '50%'
          }}
        />
      </div>
      
    </div>
  );
};

const FourthPage = ({ onBack, onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const [backgroundFade, setBackgroundFade] = useState(false);
  const [textFadeOut, setTextFadeOut] = useState(false);
  const [cameraGranted, setCameraGranted] = useState(null);
  const [showMoon, setShowMoon] = useState(false);
  const [showVideoCircle, setShowVideoCircle] = useState(false);
  const [showCutieText, setShowCutieText] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [intensifyGlow, setIntensifyGlow] = useState(false); // New state for button click
  const [showRadialOverlay, setShowRadialOverlay] = useState(false); // New state for radial fade
  const [showStars, setShowStars] = useState(false); // New state for starry night
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Reset states
    setTextStep(0);
    setBackgroundFade(false);
    setTextFadeOut(false);
    setCameraGranted(null);
    setShowMoon(false);
    setShowVideoCircle(false);
    setShowCutieText(false);
    setShowFinalButton(false);
    setIntensifyGlow(false);
    
    // Step 1: Text animation sequence
    const timers = [
      setTimeout(() => setTextStep(1), 1000),
      setTimeout(() => setTextStep(2), 3500),
      setTimeout(() => setTextStep(3), 6500),
      setTimeout(() => setTextFadeOut(true), 9000),
      setTimeout(() => setBackgroundFade(true), 10500),
      
      // Step 2: Start moon/webcam sequence
      setTimeout(() => {
        requestWebcam();
      }, 15000)
    ];

    return () => {
      timers.forEach(clearTimeout);
      stopWebcam();
    };
  }, []);

  const requestWebcam = async () => {
    try {
      console.log('Requesting webcam access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { min: 320, ideal: 640, max: 1280 },
          height: { min: 240, ideal: 480, max: 720 },
          facingMode: 'user'
        } 
      });
      
      console.log('Webcam permission granted');
      setCameraGranted(true);
      streamRef.current = stream;
      
      // Show video circle animation
      setShowVideoCircle(true);
      
      // Set up video element
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = async () => {
            try {
              await videoRef.current.play();
              console.log('Video playing successfully');
              
              // Wait for moon animation to complete, then show text/button
              setTimeout(() => {
                console.log('8 seconds elapsed, calling showTextAndButton');
                showTextAndButton();
              }, 8000); // Reduced wait time for testing
              
            } catch (playError) {
              console.error('Video play error:', playError);
            }
          };
        }
      }, 100);
      
    } catch (error) {
      console.error('Webcam permission denied:', error);
      setCameraGranted(false);
      
      // Show moon instead
      setTimeout(() => {
        setShowMoon(true);
        // Wait for moon animation, then show text/button
        setTimeout(() => {
          showTextAndButton();
        }, 15000);
      }, 500);
    }
  };

  const showTextAndButton = () => {
    // Stars should already be visible by now from the initial timeline
    console.log('Calling showTextAndButton - stars should already be visible');
    
    // Step 4: Show text
    setShowCutieText(true);
    
    // Step 5: Show button after delay
    setTimeout(() => {
      setShowFinalButton(true);
    }, 2000);
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => onBack(), 500);
  };

  const handleNext = () => {
    console.log('Button clicked - starting transition after delay');
    
    // Add delay before starting radial fade
    setTimeout(() => {
      console.log('Starting radial fade transition');
      setShowRadialOverlay(true);
    }, 500); // 0.5s delay after button click
    
    // Wait for delay + radial animation to complete, then navigate
    setTimeout(() => {
      console.log('Navigating to FifthPage');
      if (onNext) {
        onNext({
          fromWebcam: cameraGranted === true,
          videoRef: videoRef,
          streamRef: streamRef
        });
      }
    }, 3500); // 0.5s delay + 3s animation
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 transition-opacity duration-[4000ms] ease-in-out ${
          backgroundFade ? 'opacity-0' : 'opacity-100'
        }`}
      ></div>
      
      {/* Starry Night particles effect */}
      <StarryNight show={showStars} />
      
      {/* Radial fade overlay - inspired by your HTML example */}
      <div 
        className={`fixed top-1/2 left-1/2 w-80 h-80 bg-white rounded-full blur-2xl transition-transform duration-[3000ms] ease-out z-50 ${
          showRadialOverlay ? 'scale-[20]' : 'scale-0'
        }`}
        style={{
          transform: `translate(-50%, -50%) ${showRadialOverlay ? 'scale(20)' : 'scale(0)'}`,
          pointerEvents: 'none'
        }}
      ></div>
      
      <BackButton onClick={handleBack} theme="dark" />

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Step 1: Text sequence */}
        {!showMoon && !showVideoCircle && (
          <div className={`text-center max-w-4xl transition-opacity duration-[2000ms] ease-out ${
            textFadeOut ? 'opacity-0' : 'opacity-100'
          }`}>
            
            <div className={`mb-12 transform transition-all duration-1000 ${
              textStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white cute-font">btw</h1>
            </div>

            <div className={`mb-12 transform transition-all duration-1000 ${
              textStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white cute-font">
                did you look at the moon today?
              </h2>
            </div>

            <div className={`transform transition-all duration-1000 ${
              textStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white cute-font">
                in case you didn't
              </h3>
            </div>

          </div>
        )}

        {/* Step 2-3: Video Circle or Moon */}
        {showVideoCircle && cameraGranted === true && (
          <div className="text-center">
            <div className="relative mx-auto mb-8" style={{ width: '320px', height: '320px' }}>
              <VideoCircle show={showVideoCircle} videoRef={videoRef} intensifyGlow={intensifyGlow} />
            </div>
          </div>
        )}

        {showMoon && cameraGranted === false && (
          <div className="text-center">
            <div className="relative mx-auto mb-8" style={{ width: '320px', height: '320px' }}>
              <Moon show={showMoon} />
            </div>
          </div>
        )}

        {/* Steps 4-6: Text and Button */}
        {(showVideoCircle || showMoon) && (
          <div className="text-center relative z-20">
            
            {/* Step 4: "isn't she a cutie?" text */}
            <div className={`mb-8 transform transition-all duration-1000 ${
              showCutieText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white cute-font mb-6">
                isn't she a cutie?
              </h2>
            </div>

            {/* Step 5: Buttons */}
            <div className={`transform transition-all duration-1000 ${
              showFinalButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                
                <button
                  onClick={handleNext}
                  className="group relative px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl cute-font z-30"
                  style={{ position: 'relative', zIndex: 30 }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg md:text-xl">Yess 😍</span>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                  <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
                </button>
                
                <button
                  onClick={handleNext}
                  className="group relative px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl cute-font z-30"
                  style={{ position: 'relative', zIndex: 30 }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg md:text-xl">Bada Aaya 😏</span>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                  <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
                </button>
                
              </div>
            </div>

          </div>
        )}

        {/* Debug info */}
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
          Camera: {cameraGranted} | Moon: {showMoon} | Video: {showVideoCircle} | ShowStars: {showStars}
          <br />
          BackgroundFade: {backgroundFade} | ShowRadialOverlay: {showRadialOverlay}
        </div>

      </div>
    </div>
  );
};

export default FourthPage;