// src/pages/FourthPage/FourthPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import Moon from '../../components/Moon/Moon.jsx';

// VideoCircle component - similar animation to Moon
const VideoCircle = ({ show, videoRef }) => {
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
                
                // After reaching full glow, start fade out after delay
                setTimeout(() => {
                  console.log('Video circle glow gradually receding');
                  const fadeInterval = setInterval(() => {
                    setVideoGlowIntensity(prev => {
                      if (prev <= 0) {
                        clearInterval(fadeInterval);
                        setVideoGlow(false);
                        return 0;
                      }
                      return prev - 0.02;
                    });
                  }, 50);
                }, 5000); // Glow at full intensity for 5 seconds
                
                return 1;
              }
              return prev + 0.02;
            });
          }, 50); // Update every 50ms for smooth animation
          
        }, 5000); // Wait for video zoom to complete (4s) + 1s delay
        
      }, 1500); // 1.5s delay before starting the grow animation
    } else {
      setVideoVisible(false);
      setVideoGlow(false);
      setVideoGlowIntensity(0);
    }
  }, [show]);

  // Calculate glow values based on intensity
  const glowBoxShadow = videoGlowIntensity > 0
    ? `0px 0px ${8 + (52 * videoGlowIntensity)}px ${2 + (10 * videoGlowIntensity)}px rgba(255, 255, 255, ${0.301 + (0.599 * videoGlowIntensity)}), 
       0px 0px ${20 + (100 * videoGlowIntensity)}px ${4 + (20 * videoGlowIntensity)}px rgba(255, 255, 255, ${0.2 * videoGlowIntensity}), 
       0px 0px ${40 + (160 * videoGlowIntensity)}px ${8 + (32 * videoGlowIntensity)}px rgba(255, 255, 255, ${0.1 * videoGlowIntensity})`
    : '0px 0px 8px 2px rgba(255, 255, 255, 0.301)';

  const glowBackground = videoGlowIntensity > 0
    ? `radial-gradient(circle, rgba(255, 255, 255, ${0.15 + (0.25 * videoGlowIntensity)}) 0%, rgba(255, 255, 255, ${0.08 + (0.12 * videoGlowIntensity)}) 40%, transparent 70%)`
    : 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)';

  return (
    <div className="video-outer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div 
        className={`video-circle transform transition-all duration-[4000ms] ease-out ${
          videoVisible ? 'scale-100 opacity-100' : 'scale-[0.02] opacity-20'
        }`}
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: glowBoxShadow,
          position: 'relative',
          transition: 'transform 4000ms ease-out, opacity 4000ms ease-out',
          border: '4px solid rgba(255, 255, 255, 0.2)'
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
          onError={(e) => {
            console.error('Video error:', e);
          }}
          onPlay={() => {
            console.log('Video started playing in circle');
          }}
          onLoadedMetadata={() => {
            console.log('Video metadata loaded in circle, dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
          }}
        />
      </div>
      
      {/* Outer glow effect */}
      <div 
        className={`absolute inset-0 rounded-full blur-2xl transform transition-all duration-[4000ms] ease-out ${
          videoVisible ? 'scale-110 opacity-100' : 'scale-[0.02] opacity-0'
        }`}
        style={{
          width: '320px',
          height: '320px',
          background: glowBackground,
          transition: 'transform 4000ms ease-out, opacity 4000ms ease-out'
        }}
      ></div>
    </div>
  );
};

const FourthPage = ({ onBack, onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const [backgroundFade, setBackgroundFade] = useState(false);
  const [textFadeOut, setTextFadeOut] = useState(false);
  const [webcamStep, setWebcamStep] = useState(0);
  const [cameraGranted, setCameraGranted] = useState(null); // null, true, false
  const [showMoon, setShowMoon] = useState(false);
  const [showVideoCircle, setShowVideoCircle] = useState(false);
  const [showCutieText, setShowCutieText] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [intensePulse, setIntensePulse] = useState(false); // New state for intense glow
  const [whiteOut, setWhiteOut] = useState(false); // New state for white page transition
  const [glowIntensity, setGlowIntensity] = useState(0); // New state for glow intensity like Moon
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Reset animation and start text sequence
    setTextStep(0);
    setBackgroundFade(false);
    setTextFadeOut(false);
    setWebcamStep(0);
    setCameraGranted(null);
    setShowMoon(false);
    setShowVideoCircle(false);
    setShowCutieText(false);
    setShowFinalButton(false);
    
    // Text animation sequence with delays
    const timers = [
      setTimeout(() => {
        console.log('Step 1: btw appears');
        setTextStep(1);
      }, 1000),
      
      setTimeout(() => {
        console.log('Step 2: did you look at the moon today? appears');
        setTextStep(2);
      }, 3500),
      
      setTimeout(() => {
        console.log('Step 3: in case you didn\'t appears');
        setTextStep(3);
      }, 6500),
      
      setTimeout(() => {
        console.log('Step 4: text starts fading out');
        setTextFadeOut(true);
      }, 9000),
      
      setTimeout(() => {
        console.log('Step 5: background starts fading to black (4s duration)');
        setBackgroundFade(true);
      }, 10500),
      
      setTimeout(() => {
        console.log('Step 6: requesting webcam');
        requestWebcam();
      }, 15000), // Wait 4.5s after background fade starts (fade takes 4s)
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
      
      console.log('Webcam permission granted, stream:', stream);
      console.log('Stream active:', stream.active);
      console.log('Video tracks:', stream.getVideoTracks());
      setCameraGranted(true);
      streamRef.current = stream; // Store stream immediately
      
      // Show video circle animation
      setShowVideoCircle(true);
      
      // Wait a bit for the video element to be rendered, then attach stream
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Video element found after render, setting srcObject');
          videoRef.current.srcObject = stream;
          
          // Wait for metadata and then play
          videoRef.current.onloadedmetadata = async () => {
            console.log('Video metadata loaded');
            console.log('Video dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
            try {
              await videoRef.current.play();
              console.log('Video playing successfully');
              
              // Start cutie text sequence after video circle animation
              setTimeout(() => {
                showCutieTextSequence();
              }, 15000); // Wait for full video circle animation like moon
              
            } catch (playError) {
              console.error('Video play error:', playError);
            }
          };
          
          videoRef.current.onloadeddata = () => {
            console.log('Video data loaded');
          };
          
          videoRef.current.oncanplay = () => {
            console.log('Video can play');
          };
          
          videoRef.current.onplay = () => {
            console.log('Video started playing event fired');
          };
          
          videoRef.current.onerror = (e) => {
            console.error('Video element error:', e);
          };
          
        } else {
          console.error('Video ref is still null after timeout');
          // Retry with longer delay
          setTimeout(() => {
            if (videoRef.current) {
              console.log('Video element found on retry, setting srcObject');
              videoRef.current.srcObject = stream;
            } else {
              console.error('Video ref is still null after retry');
            }
          }, 1000);
        }
      }, 100); // Short delay to let React render the video element
      
    } catch (error) {
      console.error('Webcam permission denied:', error);
      setCameraGranted(false);
      
      // Show moon animation instead
      setTimeout(() => {
        setShowMoon(true);
        showCutieTextSequence();
      }, 500);
    }
  };

  const showCutieTextSequence = () => {
    // This will be called by the moon when glow animation completes
    console.log('Moon glow animation complete, showing cutie text');
    setShowCutieText(true);
    
    setTimeout(() => {
      console.log('Showing final button');
      setShowFinalButton(true);
    }, 2000); // 2s after cutie text
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
    setTimeout(() => {
      onBack();
    }, 500);
  };

  const handleNext = () => {
    console.log('Button clicked - starting transition sequence');
    
    // Step 1: Fade out text and buttons
    setShowCutieText(false);
    setShowFinalButton(false);
    
    // Step 2: Start intense pulsing after text fades - using Moon's exact pattern
    setTimeout(() => {
      console.log('Starting intense glow animation');
      setIntensePulse(true);
      
      // Gradually increase glow intensity like Moon component
      const glowInterval = setInterval(() => {
        setGlowIntensity(prev => {
          console.log('Current glow intensity:', prev);
          if (prev >= 10) { // Much higher intensity to cover screen
            clearInterval(glowInterval);
            
            // Navigate after reaching maximum intensity
            setTimeout(() => {
              console.log('Navigating to FifthPage');
              if (onNext) {
                onNext({
                  fromWebcam: cameraGranted === true,
                  videoRef: videoRef,
                  streamRef: streamRef
                });
              }
            }, 500);
            
            return 10;
          }
          return prev + 0.1; // Faster increment to see progress
        });
      }, 100); // Update every 100ms for visible progress
      
    }, 1000); // 1s for text to fade out
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Single background layer that fades from gradient to transparent, revealing black behind */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 transition-opacity duration-[4000ms] ease-in-out ${
          backgroundFade ? 'opacity-0' : 'opacity-100'
        }`}
      ></div>
      
      {/* White out overlay for transition */}
      {/* Removed - we want the glow from circles to create the white effect */}
      
      <BackButton onClick={handleBack} theme="dark" />

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Text sequence - hide when webcam/moon appears or when fading out */}
        {!showMoon && !showVideoCircle && (
          <div className={`text-center max-w-4xl transition-opacity duration-[2000ms] ease-out ${
            textFadeOut ? 'opacity-0' : 'opacity-100'
          }`}>
            
            {/* Text Step 1: "btw" */}
            <div
              className={`mb-12 transform transition-all duration-1000 ${
                textStep >= 1
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white cute-font">
                btw
              </h1>
            </div>

            {/* Text Step 2: "did you look at the moon today?" */}
            <div
              className={`mb-12 transform transition-all duration-1000 ${
                textStep >= 2
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white cute-font">
                did you look at the moon today?
              </h2>
            </div>

            {/* Text Step 3: "in case you didn't" */}
            <div
              className={`transform transition-all duration-1000 ${
                textStep >= 3
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white cute-font">
                in case you didn't
              </h3>
            </div>

          </div>
        )}

        {/* Video Circle section - shows only when camera permission granted */}
        {showVideoCircle && cameraGranted === true && (
          <div className="text-center">
            <div className="relative mx-auto mb-8" style={{ width: '320px', height: '320px' }}>
              <VideoCircle show={showVideoCircle} videoRef={videoRef} externalGlowIntensity={glowIntensity} />
            </div>
          </div>
        )}

        {/* Moon section - shows only when camera permission denied */}
        {cameraGranted === false && (
          <div className="text-center">
            <div className="relative mx-auto mb-8" style={{ width: '320px', height: '320px' }}>
              <Moon show={showMoon} />
            </div>
          </div>
        )}

        {/* Common content for both scenarios */}
        {(showVideoCircle || cameraGranted === false) && (
          <div className="text-center">
            
            {/* "isn't she a cutie?" text */}
            <div
              className={`mb-8 transform transition-all duration-1000 ${
                showCutieText
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white cute-font mb-6">
                isn't she a cutie?
              </h2>
            </div>

            {/* Final buttons - both options */}
            <div
              className={`transform transition-all duration-1000 ${
                showFinalButton
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                
                {/* Yess button */}
                <button
                  onClick={handleNext}
                  className="group relative px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl cute-font"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg md:text-xl">
                    Yess 😍
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                  <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
                </button>
                
                {/* Bada Aaya button */}
                <button
                  onClick={handleNext}
                  className="group relative px-10 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl cute-font"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg md:text-xl">
                    Bada Aaya 😏
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                  <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
                </button>
                
              </div>
            </div>

          </div>
        )}

        {/* Debug info */}
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
          Text: {textStep} | BG: {backgroundFade ? 'Black' : 'Gradient'} | Camera: {cameraGranted} | Moon: {showMoon} | VideoCircle: {showVideoCircle}
          <br />
          VideoRef: {videoRef.current ? 'Present' : 'Null'} | Stream: {streamRef.current ? 'Active' : 'None'}
        </div>

      </div>
    </div>
  );
};

export default FourthPage;