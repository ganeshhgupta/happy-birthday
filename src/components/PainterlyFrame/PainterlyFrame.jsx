// src/components/PainterlyFrame/PainterlyFrame.jsx
import React from 'react';

const PainterlyFrame = ({ 
  children, 
  intensity = 'medium',
  style = {},
  className = '',
  ...props 
}) => {
  const filterId = `rough-edge-${Math.random().toString(36).substr(2, 9)}`;

  // Edge roughness presets - only affects the edges, not the content
  const intensitySettings = {
    light: {
      baseFrequency: '0.02',
      numOctaves: '2',
      scale: '1.5'
    },
    medium: {
      baseFrequency: '0.04',
      numOctaves: '3',
      scale: '2.5'
    },
    strong: {
      baseFrequency: '0.06',
      numOctaves: '4',
      scale: '4'
    },
    extreme: {
      baseFrequency: '0.08',
      numOctaves: '5',
      scale: '6'
    }
  };

  const settings = intensitySettings[intensity] || intensitySettings.medium;

  return (
    <div 
      className={`painterly-frame-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        filter: `url(#${filterId})`,
        ...style
      }}
      {...props}
    >
      {/* Content with rough edges applied directly */}
      {children}
      
      {/* SVG filter for rough edges only */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        version="1.1" 
        width="0" 
        height="0" 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none'
        }}
      >
        <defs>
          <filter 
            id={filterId} 
            x="-10%" 
            y="-10%" 
            width="120%" 
            height="120%"
            filterUnits="objectBoundingBox"
          >
            {/* Create noise texture */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency={settings.baseFrequency}
              numOctaves={settings.numOctaves}
              seed="5" 
              result="noise"
            />
            
            {/* Use the noise to slightly displace only the edges */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise"
              scale={settings.scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default PainterlyFrame;