// src/pages/CloseTwo/CloseTwo.jsx
import React, { useState, useEffect, useRef } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';

const CloseTwo = ({ onBack, onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const [montageActive, setMontageActive] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [montageFiles, setMontageFiles] = useState([]);
  const [currentMontageIndex, setCurrentMontageIndex] = useState(0);
  const [activeMontageItems, setActiveMontageItems] = useState([]);
  const [showOfficeText, setShowOfficeText] = useState(false);
  const [officeTextStep, setOfficeTextStep] = useState(0);
  const videoRef = useRef(null);

  // Function to get alternating left/right positions
  const getAlternatingPosition = (isLeft) => {
    return {
      top: 50, // Center vertically at 50%
      left: isLeft ? 25 : 75, // Left side at 25%, right side at 75%
    };
  };

  // Function to get consistent size while maintaining natural aspect ratio
  const getConsistentSize = () => {
    // Set a consistent height and let width adjust naturally
    return {
      height: 700, // Fixed height
      // Width will be determined by natural aspect ratio
    };
  };

  // Load montage files
  useEffect(() => {
    const loadMontageFiles = () => {
      try {
        // All montage files except office.jpg
        const files = [
          'kintaro1.jpg',
          'mcd1.jpg', 
          'mcd2.mp4',
          'mcd3.mp4',
          'mcd4.mp4',
          'mcd5.mp4',
          'mcd6.mp4',
          'mcd7.mp4',
          'naruto1.jpg',
          'naruto2.jpg',
          'ss1.jpg',
          'ss2.jpg'
        ];
        
        // Shuffle array for random order
        const shuffledFiles = [...files].sort(() => Math.random() - 0.5);
        
        // Add office.jpg as the last item (not shuffled)
        const finalFiles = [...shuffledFiles, 'office.jpg'];
        
        const montageData = finalFiles.map((file, index) => {
          const type = file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.mov') ? 'video' : 'image';
          const isLeft = index % 2 === 0; // Alternate: even indices on left, odd on right
          return {
            src: `./montage/${file}`,
            type: type,
            isLeft: isLeft,
            ...getConsistentSize(),
            ...getAlternatingPosition(isLeft),
          };
        });
        
        setMontageFiles(montageData);
        console.log('Montage files loaded:', montageData);
      } catch (error) {
        console.error('Error loading montage files:', error);
        setMontageFiles([]); // Set empty array on error
      }
    };

    loadMontageFiles();
  }, []);

  useEffect(() => {
    // Start video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }

    // Calculate montage duration based on overlapping pattern
    // First item starts immediately, subsequent items start every 2 seconds
    // Each item lasts 5 seconds (4s visible + 1s fade out)
    // So total duration = (number of files - 1) * 2000ms + 5000ms for the last item
    const montageTotalDuration = montageFiles.length > 0 
      ? (montageFiles.length - 1) * 2000 + 5000 
      : 0;

    console.log('Text animation starting, montage files:', montageFiles.length);

    // Text animation sequence with montage timing
    const timers = [
      // Step 1: "Happy Birthday Anusha" appears after 6 second delay
      setTimeout(() => {
        console.log('Step 1: Happy Birthday appears');
        setTextStep(1);
      }, 6000 + 4000),
      
      // Step 2: "A" disappears, "Pyaara" appears with ":)" after 5 more seconds
      setTimeout(() => {
        console.log('Step 2: Name transformation');
        setTextStep(2);
      }, 11000 + 6000),
      
      // Step 3: Start fade out of birthday text
      setTimeout(() => {
        console.log('Step 3: Text starts fading');
        setTextStep(3);
      }, 19000 + 6000),
      
      // Activate montage after text has faded out (1 second delay)
      setTimeout(() => {
        console.log('Montage activated');
        setMontageActive(true);
      }, 19000 + 6000 + 1000),
      
      // Step 4: "Have a blessed life" appears after montage completes and office text fades
      setTimeout(() => {
        console.log('Step 4: Blessed life appears');
        setTextStep(4);
        setMontageActive(false);
        setShowOfficeText(false); // Ensure office text is hidden
      }, 25000 + Math.max(montageTotalDuration, 10000) + 12000), // Extra 10 seconds for office text sequence
      
      // Step 5: Final fade out
      setTimeout(() => {
        console.log('Step 5: Final fade out');
        setTextStep(5);
      }, 25000 + Math.max(montageTotalDuration, 10000) + 22000), // Adjusted for office text timing
    ];

    // Montage timing - only if we have files
    if (montageFiles.length > 0) {
      setTimeout(() => {
        console.log('Starting montage with', montageFiles.length, 'files');
        startMontage();
      }, 26000 + 1000); // Start 2 seconds after text fade begins (increased by 1 second)
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [montageFiles]);

  const startMontage = () => {
    if (!montageFiles || montageFiles.length === 0) {
      console.log('No montage files to display');
      return;
    }

    console.log('Starting montage with files:', montageFiles);
    let index = 0;
    
    const showNextMontageItem = () => {
      if (index >= montageFiles.length) {
        console.log('Montage complete');
        return;
      }

      const item = montageFiles[index];
      const id = Date.now() + Math.random();
      const isLastItem = index === montageFiles.length - 1; // Check if this is office.jpg (last item)
      
      console.log(`Showing montage item ${index + 1} of ${montageFiles.length} on ${item.isLeft ? 'LEFT' : 'RIGHT'} side${isLastItem ? ' (FINAL ITEM - office.jpg)' : ''}`);
      
      // Add new montage item (don't clear existing ones for overlapping effect)
      setActiveMontageItems(prev => [...prev, { ...item, id, opacity: 0 }]);
      
      // Fade in after a brief delay
      setTimeout(() => {
        setActiveMontageItems(prev => 
          prev.map(activeItem => 
            activeItem.id === id ? { ...activeItem, opacity: 0.75 } : activeItem
          )
        );
      }, 100);
      
      if (item.type === 'video') {
        // For videos: wait for the video to load and get its duration
        const videoElement = document.createElement('video');
        videoElement.src = item.src;
        videoElement.addEventListener('loadedmetadata', () => {
          const videoDuration = videoElement.duration * 1000; // Convert to milliseconds
          const fadeOutStart = Math.max(videoDuration - 1000, videoDuration * 0.9); // Start fading 1s before end or at 90%
          
          console.log(`Video duration: ${videoDuration}ms, fade out starts at: ${fadeOutStart}ms`);
          
          // Start fade out near the end of the video
          setTimeout(() => {
            setActiveMontageItems(prev => 
              prev.map(activeItem => 
                activeItem.id === id ? { ...activeItem, opacity: 0 } : activeItem
              )
            );
            
            // Remove from DOM after fade out completes
            setTimeout(() => {
              setActiveMontageItems(prev => 
                prev.filter(activeItem => activeItem.id !== id)
              );
            }, 1000);
          }, fadeOutStart);
        });
      } else {
        // For images: use the original 4-second timing
        // But for the last item (office.jpg), give it extra display time and trigger text
        const displayDuration = isLastItem ? 12000 : 4000; // office.jpg gets 12 seconds, others get 4
        
        // If this is the last item (office.jpg), trigger the office text sequence
        if (isLastItem) {
          console.log('Office.jpg detected - starting text sequence');
          
          // Show office text container after previous right-side item has faded out
          setTimeout(() => {
            setShowOfficeText(true);
          }, 2500); // Wait for previous item to fade out completely
          
          // Step 1: First part of text appears
          setTimeout(() => {
            console.log('Office text step 1: First part appears');
            setOfficeTextStep(1);
          }, 3000);
          
          // Step 2: Second part appears  
          setTimeout(() => {
            console.log('Office text step 2: Second part appears');
            setOfficeTextStep(2);
          }, 5000);
          
          // Step 3: Everything fades out (after staying for 4 seconds each)
          setTimeout(() => {
            console.log('Office text step 3: Everything fades out');
            setOfficeTextStep(3);
          }, 11000); // First text shows for 4s, second text shows for 4s total
        }
        
        setTimeout(() => {
          setActiveMontageItems(prev => 
            prev.map(activeItem => 
              activeItem.id === id ? { ...activeItem, opacity: 0 } : activeItem
            )
          );
          
          // Remove from DOM after fade out completes
          setTimeout(() => {
            setActiveMontageItems(prev => 
              prev.filter(activeItem => activeItem.id !== id)
            );
          }, 1000);
        }, displayDuration);
      }
      
      index++;
      
      // Schedule next item to start halfway through current item (2 seconds)
      // But for the last item, don't schedule another one
      if (index < montageFiles.length) {
        setTimeout(showNextMontageItem, 2000);
      }
    };
    
    showNextMontageItem();
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackButton onClick={handleBack} theme="dark" />

      {/* Fallback background while video loads */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black"></div>
      )}

      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoLoad}
      >
        <source src="./fireworks.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/25 transition-opacity duration-1000"></div>

      {/* Montage Layer - only show when montageActive is true */}
      {montageActive && activeMontageItems.length > 0 && (
        <div className="absolute inset-0 z-5">
          {activeMontageItems.map(item => (
            <div
              key={item.id}
              className="absolute transition-opacity duration-1000"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                height: `${item.height}px`,
                opacity: item.opacity,
                transform: 'translate(-50%, -50%)', // Center the item on its position
              }}
            >
              {item.type === 'video' ? (
                <video
                  className="h-full w-auto object-cover rounded-lg shadow-2xl"
                  autoPlay
                  muted
                  playsInline
                  style={{
                    filter: 'brightness(0.9) contrast(1.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item.src}
                  alt="Montage"
                  className="h-full w-auto object-cover rounded-lg shadow-2xl"
                  style={{
                    filter: 'brightness(0.9) contrast(1.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Office Text Layer - appears when office.jpg is shown */}
      {showOfficeText && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pl-8 md:pl-16">
          <div className="text-left max-w-3xl ml-80">
            {/* First part: "Whatever someone you become..." */}
            <div
              className={`mb-6 transform transition-all duration-[2000ms] ease-out ${
                officeTextStep >= 1 && officeTextStep < 3
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-10 opacity-0'
              }`}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed"
                 style={{ 
                   fontFamily: "Zen Loop, cursive", 
                   fontWeight: 400, 
                   fontStyle: "normal",
                   color: 'white',
                   textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)',
                   WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)'
                 }}>
                Whatever someone you become and wherever you are in the world, you'd be doing wonders.
              </p>
            </div>
            
            {/* Second part: "shall always be rooting for you." */}
            <div
              className={`transform transition-all duration-[2000ms] ease-out ${
                officeTextStep >= 2 && officeTextStep < 3
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-10 opacity-0'
              }`}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed"
                 style={{ 
                   fontFamily: "Zen Loop, cursive", 
                   fontWeight: 400, 
                   fontStyle: "normal",
                   color: 'white',
                   textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)',
                   WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.2)'
                 }}>
                shall always be rooting for you.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="text-center max-w-4xl">
          
          {/* Step 1: Happy Birthday Anusha */}
          <div
            className={`mb-8 transform transition-all duration-[5000ms] ease-out ${
              textStep >= 1 && textStep < 3
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] text-center mb-8" 
                style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontWeight: 400, 
                  fontStyle: "normal",
                  color: 'white',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)'
                }}>
              Happy Birthday
            </h1>
            
            {/* Dynamic Anusha/nusha text - centered properly */}
            <div className="text-8xl md:text-9xl lg:text-[12rem] text-center"
                 style={{ 
                   fontFamily: "Zen Loop, cursive", 
                   fontWeight: 400, 
                   fontStyle: "normal",
                   color: 'white',
                   textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4)',
                   WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)'
                 }}>
              
              {/* Centered layout for the name transformation */}
              <div className="flex items-center justify-center">
                {/* Pyaara appears in step 2 */}
                <span
                  className={`transition-all duration-[5000ms] ease-out ${
                    textStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                  }`}
                >
                  Pyaara{' '}
                </span>
                
                {/* A disappears in step 2 */}
                <span
                  className={`transition-all duration-[5000ms] ease-out ${
                    textStep >= 2 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                >
                  A
                </span>
                
                {/* nusha always visible after step 1 */}
                nusha
                
                {/* :) appears in step 2 */}
                <span
                  className={`transition-all duration-[5000ms] ease-out ${
                    textStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ marginLeft: '0.5rem' }}
                >
                    :)
                </span>
              </div>
            </div>
          </div>

          {/* Step 4: Have a blessed life - positioned to take full screen center */}
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-all duration-[5000ms] ease-out ${
              textStep >= 4
                ? textStep === 5
                  ? 'translate-y-0 opacity-0' // Fade out in step 5
                  : 'translate-y-0 opacity-100' // Visible in step 4
                : 'translate-y-10 opacity-0' // Hidden before step 4
            }`}
          >
            <h2 className="text-7xl md:text-8xl lg:text-[10rem] text-center px-4"
                style={{ 
                  fontFamily: "Zen Loop, cursive", 
                  fontWeight: 400, 
                  fontStyle: "normal",
                  color: 'white',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.4)',
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)'
                }}>
              Have a blessed life
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CloseTwo;