// src/components/PageFlip/PageFlip.jsx
import React, { useState, useEffect, useRef } from 'react';

const PageFlip = ({ onComplete, fromPageContent, toPageContent }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const flipbookRef = useRef(null);

  // Load scripts and check if they're available
  useEffect(() => {
    const checkAndLoadScripts = () => {
      // First, try to load jQuery if not available
      if (!window.jQuery) {
        console.log('PageFlip: Loading jQuery...');
        const script = document.createElement('script');
        script.src = '/jquery.js';
        script.async = false;
        script.onload = () => {
          console.log('PageFlip: jQuery loaded');
          loadTurnJS();
        };
        script.onerror = () => {
          console.error('PageFlip: Failed to load jQuery');
          // Fallback: skip flip and go directly to next page
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        };
        document.head.appendChild(script);
      } else {
        loadTurnJS();
      }
    };

    const loadTurnJS = () => {
      if (!window.$ || !window.$.fn.turn) {
        console.log('PageFlip: Loading Turn.js...');
        const script = document.createElement('script');
        script.src = '/turn.js';
        script.async = false;
        script.onload = () => {
          console.log('PageFlip: Turn.js loaded');
          setScriptsLoaded(true);
        };
        script.onerror = () => {
          console.error('PageFlip: Failed to load Turn.js');
          // Fallback: skip flip and go directly to next page
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        };
        document.head.appendChild(script);
      } else {
        console.log('PageFlip: Turn.js already available');
        setScriptsLoaded(true);
      }
    };

    checkAndLoadScripts();
  }, [onComplete]);

  useEffect(() => {
    if (scriptsLoaded && flipbookRef.current) {
      // Add CSS overrides for Turn.js to force full viewport height
      const style = document.createElement('style');
      style.id = 'turnjs-height-fix';
      style.textContent = `
        .flipbook, .flipbook .turn-page {
          width: 100vw !important;
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: 100vh !important;
        }
        .flipbook .turn-page-wrapper {
          width: 50vw !important;
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: 100vh !important;
          top: 0 !important;
        }
        .flipbook .page {
          width: 50vw !important;
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: 100vh !important;
          top: 0 !important;
        }
        .flipbook .shadow {
          height: 100vh !important;
          top: 0 !important;
        }
        .flipbook > div {
          height: 100vh !important;
          min-height: 100vh !important;
        }
        .flipbook * {
          box-sizing: border-box !important;
        }
      `;
      document.head.appendChild(style);

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        initFlipbook();
      });

      // Cleanup function
      return () => {
        const existingStyle = document.getElementById('turnjs-height-fix');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [scriptsLoaded]);

  const initFlipbook = () => {
    if (!scriptsLoaded || !window.$ || !window.$.fn.turn || !flipbookRef.current) {
      console.error('PageFlip: Scripts not loaded or flipbook ref not available');
      // Fallback: go directly to next page
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
      return;
    }

    try {
      console.log('PageFlip: Initializing flipbook animation');
      
      // Initialize with slightly larger height to compensate for Turn.js calculations
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const adjustedHeight = Math.round(viewportHeight * 1.05); // Just 5% taller
      
      const $flipbook = window.$(flipbookRef.current);
      
      // Position the flipbook normally but with adjusted height
      $flipbook.css({
        'opacity': '1',
        'width': viewportWidth + 'px',
        'height': adjustedHeight + 'px',
        'position': 'absolute',
        'top': '0px',
        'left': '0px'
      });
      
      $flipbook.turn({
        width: viewportWidth,
        height: adjustedHeight,
        autoCenter: false,
        gradients: true,
        duration: 1200,
        display: 'double',
        acceleration: false,
        elevation: 0,
        page: 1,
        turnCorners: "tr,br",
        when: {
          start: function(event, pageObject, corner) {
            console.log('PageFlip: Animation starting - forcing dimensions');
            // Force dimensions at the exact moment animation starts
            const $flipbook = window.$(flipbookRef.current);
            $flipbook.css({
              'width': window.innerWidth + 'px',
              'height': window.innerHeight + 'px'
            });
            
            // Force all Turn.js generated elements
            $flipbook.find('.turn-page, .turn-page-wrapper, .page').each(function() {
              window.$(this).css({
                'height': window.innerHeight + 'px',
                'min-height': window.innerHeight + 'px',
                'max-height': window.innerHeight + 'px'
              });
            });
          },
          turning: function(event, page, view) {
            console.log('PageFlip: Page turning to:', page);
            // Continue forcing dimensions during turn
            const $flipbook = window.$(flipbookRef.current);
            $flipbook.find('.turn-page, .turn-page-wrapper, .page').css({
              'height': window.innerHeight + 'px'
            });
          },
          turned: function(event, page, view) {
            console.log('PageFlip: Flipbook turned to page:', page);
            if (page >= 2) {
              // Complete the flip after animation
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 600);
            }
          }
        }
      });
      
      // Force all dimensions after initialization
      setTimeout(() => {
        $flipbook.css({
          'width': viewportWidth + 'px',
          'height': viewportHeight + 'px'
        });
        
        // Force the page wrappers and pages to full height
        $flipbook.find('.turn-page-wrapper, .turn-page').css({
          'height': viewportHeight + 'px',
          'min-height': viewportHeight + 'px',
          'max-height': viewportHeight + 'px'
        });
        
        // Force individual pages  
        $flipbook.find('.page').css({
          'height': viewportHeight + 'px',
          'min-height': viewportHeight + 'px',
          'max-height': viewportHeight + 'px',
          'width': (viewportWidth / 2) + 'px'
        });

        // Force shadow to full height
        $flipbook.find('.shadow').css({
          'height': viewportHeight + 'px'
        });
      }, 10);
      
      // Immediately trigger the page turn and set up continuous dimension forcing
      setTimeout(() => {
        try {
          console.log('PageFlip: Starting page turn animation');
          
          // Set up an interval to continuously force dimensions during animation
          const dimensionInterval = setInterval(() => {
            if (flipbookRef.current) {
              const $flipbook = window.$(flipbookRef.current);
              
              // Force all page elements
              $flipbook.find('.turn-page, .turn-page-wrapper, .page').css({
                'height': window.innerHeight + 'px',
                'min-height': window.innerHeight + 'px'
              });
              
              // Aggressively force shadow dimensions
              $flipbook.find('.shadow').css({
                'height': window.innerHeight + 'px',
                'min-height': window.innerHeight + 'px',
                'max-height': window.innerHeight + 'px',
                'top': '0px'
              });
              
              // Force the main flipbook container
              $flipbook.css({
                'height': window.innerHeight + 'px',
                'min-height': window.innerHeight + 'px'
              });
            }
          }, 16); // ~60fps
          
          // Clear interval after animation completes
          setTimeout(() => {
            clearInterval(dimensionInterval);
          }, 1500);
          
          $flipbook.turn('next');
        } catch (error) {
          console.error('PageFlip: Error during page turn:', error);
          // Fallback
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        }
      }, 50);

    } catch (error) {
      console.error('PageFlip: Error initializing flipbook:', error);
      // Fallback: go directly to next page
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50" style={{
      background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Flipbook structure - Start visible for proper dimension calculation */}
      <div 
        ref={flipbookRef}
        className="flipbook"
        style={{ 
          width: '100vw', 
          height: '100vh',
          margin: 0,
          padding: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0 // Start transparent, will be made visible during init
        }}
      >
        {/* Page 1 - Left side content (revealed after flip) */}
        <div className="page" style={{
          background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: '80px 60px',
          position: 'absolute',
          width: '50vw',
          height: '105vh', // Slightly taller than viewport
          minHeight: '105vh',
          left: 0,
          top: 0,
          margin: 0,
          boxSizing: 'border-box'
        }}>
          {fromPageContent && (
            <h1 style={{ 
              fontFamily: "Zen Loop, cursive", 
              fontSize: '3.5rem', 
              fontWeight: 400, 
              color: '#374151',
              marginBottom: '25px'
            }}>
              {fromPageContent}
            </h1>
          )}
          {toPageContent && (
            <p style={{ 
              fontFamily: "Zen Loop, cursive", 
              fontSize: '1.4rem', 
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0,
              maxWidth: '450px'
            }}>
              {toPageContent}
            </p>
          )}
        </div>

        {/* Page 2 - Right side (empty page that flips over) */}
        <div className="page" style={{
          background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
          position: 'absolute',
          width: '50vw',
          height: '105vh', // Slightly taller than viewport
          minHeight: '105vh',
          left: '50vw',
          top: 0,
          margin: 0,
          boxSizing: 'border-box'
        }}>
          {/* Empty page that flips away */}
        </div>
      </div>

      {/* Debug info */}
      <div className="fixed bottom-4 right-4 bg-white/90 text-black p-2 rounded text-xs border">
        PageFlip Component (Turn.js)
        <br />
        ScriptsLoaded: {scriptsLoaded.toString()}
        <br />
        jQuery: {(typeof window !== 'undefined' && !!window.jQuery).toString()} | Turn.js: {(typeof window !== 'undefined' && !!(window.$ && window.$.fn && window.$.fn.turn)).toString()}
      </div>
    </div>
  );
};

export default PageFlip;