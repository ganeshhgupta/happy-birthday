// src/components/BackgroundDoodles/BackgroundDoodles.js
import React from 'react';

const BackgroundDoodles = () => {
  const emojis = [
    '😒', '😶‍🌫️', '🥺', '🐤', '🐣', '🐥', '🍀', '🌕', '🌈', '🍎',
    '🧀', '🥑', '🍱', '🥟', '🍙', '🍥', '🥠', '🎂', '🍭', '🍜', 
    '🍛', '🍔', '🥢', '🎨', '🎁', '🎈', '🎀', '💎', '📚', '📕',
    '📗', '📘', '📝', '🩵', '💙', '🤍', '⭐', '✨', '🌟', '💝',
    '🎵', '🎶', '🌸', '🌺', '🌙', '☁️','💐','🌻','🌼','🌷','🪻',
    '💻'
  ];

  // Predefined positions to ensure consistency across all pages
  const fixedPositions = [
    { top: 15, left: 8, size: 'text-sm', animation: 'animate-pulse', delay: '0s', duration: '2s', rotation: 45 },
    { top: 25, left: 85, size: 'text-lg', animation: 'animate-bounce', delay: '1s', duration: '3s', rotation: 120 },
    { top: 12, left: 45, size: 'text-xs', animation: 'animate-pulse', delay: '2s', duration: '2.5s', rotation: 180 },
    { top: 35, left: 15, size: 'text-base', animation: 'animate-bounce', delay: '0.5s', duration: '4s', rotation: 270 },
    { top: 8, left: 75, size: 'text-sm', animation: 'animate-pulse', delay: '1.5s', duration: '3s', rotation: 90 },
    { top: 45, left: 92, size: 'text-lg', animation: 'animate-bounce', delay: '2.5s', duration: '2s', rotation: 315 },
    { top: 55, left: 5, size: 'text-xs', animation: 'animate-pulse', delay: '1s', duration: '3.5s', rotation: 60 },
    { top: 65, left: 35, size: 'text-base', animation: 'animate-bounce', delay: '3s', duration: '2.5s', rotation: 150 },
    { top: 75, left: 70, size: 'text-sm', animation: 'animate-pulse', delay: '0s', duration: '4s', rotation: 240 },
    { top: 85, left: 20, size: 'text-lg', animation: 'animate-bounce', delay: '2s', duration: '3s', rotation: 30 },
    { top: 18, left: 25, size: 'text-xs', animation: 'animate-pulse', delay: '1s', duration: '2s', rotation: 75 },
    { top: 28, left: 60, size: 'text-base', animation: 'animate-bounce', delay: '2.5s', duration: '3.5s', rotation: 200 },
    { top: 40, left: 45, size: 'text-sm', animation: 'animate-pulse', delay: '0.5s', duration: '2.5s', rotation: 300 },
    { top: 50, left: 80, size: 'text-lg', animation: 'animate-bounce', delay: '1.5s', duration: '4s', rotation: 45 },
    { top: 60, left: 12, size: 'text-xs', animation: 'animate-pulse', delay: '3s', duration: '2s', rotation: 135 },
    { top: 70, left: 55, size: 'text-base', animation: 'animate-bounce', delay: '0s', duration: '3s', rotation: 225 },
    { top: 22, left: 90, size: 'text-sm', animation: 'animate-pulse', delay: '2s', duration: '3.5s', rotation: 285 },
    { top: 32, left: 5, size: 'text-lg', animation: 'animate-bounce', delay: '1s', duration: '2.5s', rotation: 15 },
    { top: 42, left: 75, size: 'text-xs', animation: 'animate-pulse', delay: '2.5s', duration: '4s', rotation: 105 },
    { top: 52, left: 25, size: 'text-base', animation: 'animate-bounce', delay: '0.5s', duration: '2s', rotation: 195 },
    { top: 62, left: 85, size: 'text-sm', animation: 'animate-pulse', delay: '1.5s', duration: '3s', rotation: 255 },
    { top: 72, left: 40, size: 'text-lg', animation: 'animate-bounce', delay: '3s', duration: '3.5s', rotation: 345 },
    { top: 82, left: 65, size: 'text-xs', animation: 'animate-pulse', delay: '0s', duration: '2.5s', rotation: 80 },
    { top: 92, left: 10, size: 'text-base', animation: 'animate-bounce', delay: '2s', duration: '4s', rotation: 170 },
    { top: 5, left: 50, size: 'text-sm', animation: 'animate-pulse', delay: '1s', duration: '3s', rotation: 260 },
    { top: 38, left: 88, size: 'text-lg', animation: 'animate-bounce', delay: '2.5s', duration: '2s', rotation: 20 },
    { top: 48, left: 2, size: 'text-xs', animation: 'animate-pulse', delay: '0.5s', duration: '3.5s', rotation: 110 },
    { top: 58, left: 72, size: 'text-base', animation: 'animate-bounce', delay: '1.5s', duration: '2.5s', rotation: 200 },
    { top: 68, left: 30, size: 'text-sm', animation: 'animate-pulse', delay: '3s', duration: '4s', rotation: 290 },
    { top: 78, left: 95, size: 'text-lg', animation: 'animate-bounce', delay: '0s', duration: '3s', rotation: 50 },
    { top: 88, left: 45, size: 'text-xs', animation: 'animate-pulse', delay: '2s', duration: '2.5s', rotation: 140 },
    { top: 95, left: 75, size: 'text-base', animation: 'animate-bounce', delay: '1s', duration: '3.5s', rotation: 230 },
    { top: 2, left: 35, size: 'text-sm', animation: 'animate-pulse', delay: '2.5s', duration: '2s', rotation: 320 },
    { top: 20, left: 18, size: 'text-lg', animation: 'animate-bounce', delay: '0.5s', duration: '4s', rotation: 70 },
    { top: 30, left: 78, size: 'text-xs', animation: 'animate-pulse', delay: '1.5s', duration: '3s', rotation: 160 },
    { top: 80, left: 52, size: 'text-base', animation: 'animate-bounce', delay: '3s', duration: '2.5s', rotation: 250 },
    { top: 10, left: 95, size: 'text-sm', animation: 'animate-pulse', delay: '0s', duration: '3.5s', rotation: 340 },
    { top: 90, left: 82, size: 'text-lg', animation: 'animate-bounce', delay: '2s', duration: '4s', rotation: 25 },
    { top: 25, left: 42, size: 'text-xs', animation: 'animate-pulse', delay: '1s', duration: '2s', rotation: 115 },
    { top: 45, left: 68, size: 'text-base', animation: 'animate-bounce', delay: '2.5s', duration: '3s', rotation: 205 },
    { top: 65, left: 22, size: 'text-sm', animation: 'animate-pulse', delay: '0.5s', duration: '3.5s', rotation: 295 },
    { top: 85, left: 88, size: 'text-lg', animation: 'animate-bounce', delay: '1.5s', duration: '2.5s', rotation: 35 },
    { top: 5, left: 65, size: 'text-xs', animation: 'animate-pulse', delay: '3s', duration: '4s', rotation: 125 },
    { top: 95, left: 28, size: 'text-base', animation: 'animate-bounce', delay: '0s', duration: '3s', rotation: 215 },
    { top: 15, left: 55, size: 'text-sm', animation: 'animate-pulse', delay: '2s', duration: '2.5s', rotation: 305 },
    { top: 75, left: 8, size: 'text-lg', animation: 'animate-bounce', delay: '1s', duration: '3.5s', rotation: 85 },
    { top: 35, left: 95, size: 'text-xs', animation: 'animate-pulse', delay: '2.5s', duration: '2s', rotation: 175 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {emojis.map((emoji, index) => {
        if (index >= fixedPositions.length) return null; // Safety check
        
        const position = fixedPositions[index];
        
        return (
          <div
            key={index}
            className={`absolute ${position.size} ${position.animation}`}
            style={{
              top: `${position.top}%`,
              left: `${position.left}%`,
              animationDelay: position.delay,
              animationDuration: position.duration,
              transform: `rotate(${position.rotation}deg)`,
            }}
          >
            {emoji}
          </div>
        );
      })}
      
      {/* Additional sparkle elements with fixed positions */}
      <div className="absolute top-52 right-1/5 text-sm animate-pulse" style={{ animationDelay: '2s' }}>✧</div>
      <div className="absolute bottom-52 left-1/3 text-sm animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
      <div className="absolute top-1/5 left-20 text-sm animate-pulse" style={{ animationDelay: '3s' }}>❋</div>
      <div className="absolute bottom-20 right-10 text-sm animate-pulse" style={{ animationDelay: '1.5s' }}>✧</div>
      <div className="absolute top-40 left-2/3 text-sm animate-pulse" style={{ animationDelay: '2.5s' }}>✦</div>
    </div>
  );
};

export default BackgroundDoodles;