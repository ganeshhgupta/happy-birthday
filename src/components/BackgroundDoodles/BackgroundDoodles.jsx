 
// src/components/BackgroundDoodles/BackgroundDoodles.js
import React from 'react';

const BackgroundDoodles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      <div className="absolute top-20 left-10 text-2xl animate-pulse" style={{ animationDelay: '0s' }}>⭐</div>
      <div className="absolute top-32 right-20 text-xl animate-pulse" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute top-1/4 left-1/4 text-lg animate-pulse" style={{ animationDelay: '2s' }}>🌟</div>
      
      {/* Hearts */}
      <div className="absolute bottom-40 left-16 text-lg animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}>💝</div>
      
      {/* Music notes */}
      <div className="absolute top-60 left-1/3 text-lg animate-pulse" style={{ animationDelay: '1s' }}>🎵</div>
      <div className="absolute bottom-1/3 right-1/4 text-xl animate-pulse" style={{ animationDelay: '2.5s' }}>🎶</div>
      
      {/* Flowers */}
      <div className="absolute top-1/3 right-12 text-lg animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>🌸</div>
      <div className="absolute bottom-20 left-1/5 text-xl animate-bounce" style={{ animationDelay: '3s', animationDuration: '3.5s' }}>🌺</div>
      
      {/* Cute shapes */}
      <div className="absolute top-16 left-1/2 text-lg animate-pulse" style={{ animationDelay: '1.5s' }}>🌙</div>
      <div className="absolute bottom-32 right-1/3 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>☁️</div>
      
      {/* Sparkles */}
      <div className="absolute top-52 right-1/5 text-sm animate-pulse" style={{ animationDelay: '2s' }}>✧</div>
      <div className="absolute bottom-52 left-1/3 text-sm animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
      <div className="absolute top-1/5 left-20 text-sm animate-pulse" style={{ animationDelay: '3s' }}>❋</div>
      
      {/* Birthday elements */}
      <div className="absolute top-1/2 left-8 text-lg animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '2s' }}>🎈</div>
      <div className="absolute bottom-1/4 right-16 text-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>🎀</div>
    </div>
  );
};

export default BackgroundDoodles;