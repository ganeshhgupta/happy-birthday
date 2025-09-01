// src/components/PageFlip/PageFlip.jsx
import React, { useState, useEffect, cloneElement } from 'react';

const PageFlip = ({ onComplete, currentPageLayout, currentPageText, currentPageElement, children, imageDimensions }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Start flip animation after a brief delay
    setTimeout(() => {
      setIsFlipped(true);
    }, 100);

    // Complete after animation
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1300);
  }, [onComplete]);

  // Extract image source from currentPageElement
  const getCurrentPageImage = () => {
    if (currentPageElement) {
      // Look for img elements in the current page element
      const imgElement = currentPageElement.querySelector('img');
      if (imgElement) {
        return imgElement.src;
      }
    }
    // Return null if no image found
    return null;
  };

  // Clone children and update image dimensions if imageDimensions prop is provided
  const renderChildrenWithUpdatedDimensions = () => {
    if (!children || !imageDimensions) return children;

    const updateImageDimensions = (element) => {
      if (React.isValidElement(element)) {
        // If it's an img element, update its dimensions
        if (element.type === 'img') {
          return React.cloneElement(element, {
            style: {
              ...element.props.style,
              width: `${imageDimensions.width}px`,
              height: `${imageDimensions.height}px`,
              objectFit: 'contain' // Use contain to maintain aspect ratio
            }
          });
        }
        
        // If it has children, recursively update them
        if (element.props && element.props.children) {
          return React.cloneElement(element, {
            children: React.Children.map(element.props.children, updateImageDimensions)
          });
        }
      }
      
      return element;
    };

    return React.Children.map(children, updateImageDimensions);
  };

  return (
    <div className="fixed inset-0 z-50" style={{
      background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      perspective: '2000px'
    }}>
      
      {/* Single page that flips */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        transformOrigin: 'left center',
        transformStyle: 'preserve-3d',
        transition: 'transform 1.2s ease',
        transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        zIndex: isFlipped ? 0 : 4
      }}>
        
        {/* Front of page - current page content */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
          boxSizing: 'border-box'
        }}>
          {/* Render children with updated dimensions if provided */}
          {children ? (
            renderChildrenWithUpdatedDimensions()
          ) : (
            <div className="min-h-screen flex items-center justify-center px-8">
              <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24">
                
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
                
                {/* Right side - Dynamic image (only render if image exists) */}
                <div className="flex-1 flex items-center justify-start">
                  {getCurrentPageImage() && (
                    <img 
                      src={getCurrentPageImage()}
                      width={imageDimensions ? imageDimensions.width : 700}
                      height={imageDimensions ? imageDimensions.height : 700}
                      alt="Character"
                      style={{
                        objectFit: 'contain',
                        borderRadius: '8px'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Back of page - next page preview (blank for now) */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)',
          transform: 'rotateY(180deg)',
          boxSizing: 'border-box'
        }}>
          {/* Next page content would go here */}
        </div>
      </div>
    </div>
  );
};

export default PageFlip;