// src/components/FlipBook/FlipBook.jsx
import React, { useEffect, useRef } from 'react';

const FlipBook = ({ children, onPageTurn, currentPage = 1, width = 800, height = 600 }) => {
  const flipbookRef = useRef(null);
  const turnJSRef = useRef(null);

  useEffect(() => {
    // Initialize turn.js when component mounts
    const initFlipbook = () => {
      if (flipbookRef.current && window.$ && window.$.fn.turn) {
        console.log('Initializing flipbook with turn.js');
        
        const $flipbook = window.$(flipbookRef.current);
        
        // Initialize turn.js
        $flipbook.turn({
          width: width,
          height: height,
          autoCenter: true,
          gradients: true,
          elevation: 50,
          when: {
            turning: function(event, page, view) {
              console.log('Page turning to:', page);
              if (onPageTurn) {
                onPageTurn(page, view);
              }
            },
            turned: function(event, page, view) {
              console.log('Page turned to:', page);
            }
          }
        });
        
        // Go to specific page if provided
        if (currentPage > 1) {
          $flipbook.turn('page', currentPage);
        }
        
        turnJSRef.current = $flipbook;
      }
    };

    // Check if turn.js is loaded
    if (window.$ && window.$.fn.turn) {
      initFlipbook();
    } else {
      // If not loaded, wait and try again
      const checkInterval = setInterval(() => {
        if (window.$ && window.$.fn.turn) {
          clearInterval(checkInterval);
          initFlipbook();
        }
      }, 100);
      
      // Cleanup interval after 5 seconds
      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    // Cleanup function
    return () => {
      if (turnJSRef.current) {
        try {
          turnJSRef.current.turn('destroy');
        } catch (e) {
          console.log('Error destroying flipbook:', e);
        }
      }
    };
  }, [width, height, currentPage, onPageTurn]);

  // Method to programmatically turn to a page
  const turnToPage = (page) => {
    if (turnJSRef.current) {
      turnJSRef.current.turn('page', page);
    }
  };

  // Method to go to next page
  const nextPage = () => {
    if (turnJSRef.current) {
      turnJSRef.current.turn('next');
    }
  };

  // Method to go to previous page
  const previousPage = () => {
    if (turnJSRef.current) {
      turnJSRef.current.turn('previous');
    }
  };

  // Expose methods to parent via ref callback
  useEffect(() => {
    if (flipbookRef.current) {
      flipbookRef.current.flipbookMethods = {
        turnToPage,
        nextPage,
        previousPage
      };
    }
  });

  return (
    <div className="flipbook-container flex items-center justify-center min-h-screen">
      <div 
        ref={flipbookRef}
        className="flipbook shadow-2xl"
        style={{
          width: width + 'px',
          height: height + 'px'
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="page">
            {child}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .flipbook-container {
          background: #f1c40f;
          padding: 20px;
        }
        
        .flipbook {
          background: white;
        }
        
        .flipbook .hard {
          background: #c0392b !important;
          color: #fff;
          font-weight: bold;
          border: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        
        .flipbook .hard small {
          font-style: italic;
          font-weight: lighter;
          opacity: 0.7;
          font-size: 14px;
        }
        
        .flipbook .page {
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(0, 0, 0, 0.11);
          padding: 20px;
          box-sizing: border-box;
        }
        
        .page img {
          width: 70%;
          object-fit: cover;
          margin: auto;
        }
        
        .flipbook .page small {
          font-size: 14px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default FlipBook;