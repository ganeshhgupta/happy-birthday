// src/pages/LandingPage/LandingPage.js
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import BackgroundDoodles from '../../components/BackgroundDoodles/BackgroundDoodles';

const LandingPage = ({ onNext }) => {
  const [visibleHellos, setVisibleHellos] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reset states when component mounts
    setVisibleHellos(0);
    setShowButton(false);
    setFadeOut(false);
    
    // Animate hellos appearing one by one
    const timers = [
      setTimeout(() => setVisibleHellos(1), 500),
      setTimeout(() => setVisibleHellos(2), 1000),
      setTimeout(() => setVisibleHellos(3), 1500),
      setTimeout(() => setShowButton(true), 2500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      onNext();
    }, 1000); // Longer delay for smooth transition
  };

  const HelloText = ({ index, children }) => (
    <div
      className={`transform transition-all duration-700 ${
        visibleHellos >= index
          ? 'translate-y-0 opacity-100 animate-bounce'
          : 'translate-y-10 opacity-0'
      }`}
      style={{
        animationDelay: `${(index - 1) * 0.2}s`,
        animationDuration: '0.8s',
        animationFillMode: 'forwards',
        animationIterationCount: visibleHellos >= index ? '1' : '0',
      }}
    >
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-0 tracking-wider font-mono cute-font">
        {children}
      </h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center relative overflow-hidden">
      
      <BackgroundDoodles />

      <div className={`text-center z-10 px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          <HelloText index={1}>Hello</HelloText>
          <HelloText index={2}>Hello</HelloText>
          <HelloText index={3}>Hello</HelloText>
        </div>

        {/* Button appears after all hellos */}
        <div
          className={`mt-12 transform transition-all duration-1000 ${
            showButton
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          <button
            onClick={handleNext}
            className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl">
              Kya chahiye tumko? 😒
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
            <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;