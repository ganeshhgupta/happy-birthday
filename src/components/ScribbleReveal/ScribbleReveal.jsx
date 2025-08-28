import React, { useState, useEffect } from 'react';

const ScribbleReveal = ({ 
  src,                    // Image source
  width = 480,            // Image width
  height = 480,           // Image height
  duration = 5,           // Animation duration in seconds
  strokeWidth = 45,       // Width of the reveal stroke
  strokeColor = 'white',  // Color of the reveal stroke
  trigger = true,         // When true, starts the animation
  delay = 0,              // Delay before animation starts (in ms)
  onAnimationComplete,    // Callback when animation completes
  className = '',         // Additional classes for the container
  style = {},            // Additional styles for the container
  alt = 'Image'          // Alt text for accessibility
}) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const maskId = `scribbleMask-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsRevealing(true);
        
        // Call completion callback after animation
        if (onAnimationComplete) {
          const completeTimer = setTimeout(() => {
            onAnimationComplete();
          }, duration * 1000);
          
          return () => clearTimeout(completeTimer);
        }
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, delay, duration, onAnimationComplete]);

  // Generate path points based on dimensions
  const generatePath = () => {
    const segments = 20; // Number of zigzag segments
    const points = [];
    
    // Create zigzag from left to top/right
    for (let i = 0; i <= segments; i++) {
      const progress = i / segments;
      if (i % 2 === 0) {
        points.push(`L 0,${progress * height}`);
      } else {
        points.push(`L ${progress * width},0`);
      }
    }
    
    // Create zigzag from right to bottom
    for (let i = 0; i <= segments; i++) {
      const progress = i / segments;
      if (i % 2 === 0) {
        points.push(`L ${width},${progress * height}`);
      } else {
        points.push(`L ${progress * width},${height}`);
      }
    }
    
    // Close the path
    points.push(`L ${width},${height}`);
    
    return `M 0,0 ${points.join(' ')}`;
  };

  return (
    <div className={className} style={{ position: 'relative', width, height, ...style }}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 10 }}
      >
        <defs>
          <mask id={maskId}>
            {/* Start with everything hidden (black) */}
            <rect width={width} height={height} fill="black" />
            {/* Reveal with strokes */}
            <path 
              d={generatePath()}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={isRevealing ? '0' : '100'}
              style={{
                transition: isRevealing ? `stroke-dashoffset ${duration}s ease-in-out` : 'none'
              }}
            />
          </mask>
        </defs>
        
        {/* Image revealed through mask */}
        <image 
          href={src}
          x="0" 
          y="0" 
          width={width}
          height={height}
          mask={`url(#${maskId})`}
          alt={alt}
        />
      </svg>
    </div>
  );
};

export default ScribbleReveal;