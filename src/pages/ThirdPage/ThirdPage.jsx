// src/pages/ThirdPage/ThirdPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';

const ThirdPage = ({ selectedAge, onBack, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = blank, 1-4 = text steps
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reset and start the sequential animation
    setCurrentStep(0);
    
    const timers = [
      // Step 1: Show "Girl," then hide it
      setTimeout(() => setCurrentStep(1), 1000),        // Show "Girl,"
      setTimeout(() => setCurrentStep(0), 3000),        // Hide (back to blank)
      
      // Step 2: Show "are you today's date?" then hide it
      setTimeout(() => setCurrentStep(2), 4000),        // Show "are you today's date?"
      setTimeout(() => setCurrentStep(0), 6500),        // Hide (back to blank)
      
      // Step 3: Show the punchline then hide it
      setTimeout(() => setCurrentStep(3), 7500),        // Show "cause you're a 09 + 01 = 10"
      setTimeout(() => setCurrentStep(0), 10000),       // Hide (back to blank)
      
      // Step 4: Show the button (and keep it visible)
      setTimeout(() => setCurrentStep(4), 11000),       // Show button
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
        <div className="w-full relative">
          
          {/* Text Step 1: "Girl," */}
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
              currentStep === 1
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white cute-font text-center">
              Girl,
            </h1>
          </div>

          {/* Text Step 2: "are you today's date?" */}
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
              currentStep === 2
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white cute-font text-center leading-tight">
              are you today's date?
            </h2>
          </div>

          {/* Text Step 3: "cause you're a 09 + 01 = 10" */}
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
              currentStep === 3
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white cute-font text-center leading-tight">
              cause you're a <span className="text-yellow-400">09 + 01 = 10</span>
            </h3>
          </div>

          {/* Button Step 4 */}
          <div
            className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
              currentStep === 4
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-10 opacity-0 scale-95'
            }`}
          >
            <button
              onClick={handleNext}
              className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl cute-font"
            >
              <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl">
                very lame 🙄
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