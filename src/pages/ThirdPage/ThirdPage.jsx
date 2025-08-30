// src/pages/ThirdPage/ThirdPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';

const ThirdPage = ({ selectedAge, onBack, onNext }) => {
  const [textStep, setTextStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reset animation and start text sequence
    setTextStep(0);
    
    // Text animation sequence with delays
    const timers = [
      setTimeout(() => setTextStep(1), 1000),    // "Girl,"
      setTimeout(() => setTextStep(2), 3500),    // "are you today's date?"
      setTimeout(() => setTextStep(3), 6500),    // "cause you're a 09 + 01 = 10"
      setTimeout(() => setTextStep(4), 9000),    // Show button
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleBack = () => {
    onBack();
  };

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <BackButton onClick={handleBack} theme="dark" />

      {/* Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="text-center max-w-4xl">
          
          {/* Text Step 1: "Girl," */}
          <div
            className={`mb-8 transform transition-all duration-1000 ${
              textStep >= 1
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 cute-font">
              Girl,
            </h1>
          </div>

          {/* Text Step 2: "are you today's date?" */}
          <div
            className={`mb-8 transform transition-all duration-1000 ${
              textStep >= 2
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 cute-font">
              are you today's date?
            </h2>
          </div>

          {/* Text Step 3: "cause you're a 09 + 01 = 10" */}
          <div
            className={`mb-12 transform transition-all duration-1000 ${
              textStep >= 3
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-8 cute-font">
              cause you're a <span className="text-yellow-400">09 + 01 = 10</span>
            </h3>
          </div>

          {/* Button Step 4 */}
          <div
            className={`transform transition-all duration-1000 ${
              textStep >= 4
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-10 opacity-0 scale-95'
            }`}
          >
            <button
              onClick={handleNext}
              className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl cute-font"
            >
              <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl">
                veryy lame
              </span>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
              <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThirdPage;