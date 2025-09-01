// src/pages/AgeSelectionPage/AgeSelectionPage.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import BackgroundDoodles from '../../components/BackgroundDoodles/BackgroundDoodles';
import BackButton from '../../components/BackButton/BackButton';

const AgeSelectionPage = ({ onNext, onBack }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Ensure we start from step 0
    setAnimationStep(0);
    
    console.log('AgeSelectionPage mounted, starting animation sequence');
    
    // Start animation sequence when component mounts
    const timers = [
      setTimeout(() => {
        console.log('Step 1: Kuchh nahi appears');
        setAnimationStep(1);
      }, 500),
      
      setTimeout(() => {
        console.log('Step 2: Kuchh nahi fades out');
        setAnimationStep(2);
      }, 2500),
      
      setTimeout(() => {
        console.log('Step 3: So this is your... appears');
        setAnimationStep(3);
      }, 3500),
      
      setTimeout(() => {
        console.log('Step 4: 27th button appears');
        setAnimationStep(4);
      }, 5000),
      
      setTimeout(() => {
        console.log('Step 5: 28th button appears');
        setAnimationStep(5);
      }, 5500),
      
      setTimeout(() => {
        console.log('Step 6: 29th button appears');
        setAnimationStep(6);
      }, 6000),
      
      setTimeout(() => {
        console.log('Step 7: 30th button appears');
        setAnimationStep(7);
      }, 6500),
      
      setTimeout(() => {
        console.log('Step 8: 5th button appears');
        setAnimationStep(8);
      }, 7000),
      
      setTimeout(() => {
        console.log('Step 9: secret button appears');
        setAnimationStep(9);
      }, 7500),
      
      setTimeout(() => {
        console.log('Step 10: birthday appears');
        setAnimationStep(10);
      }, 8500),
    ];

    return () => {
      console.log('AgeSelectionPage unmounting, clearing timers');
      timers.forEach(clearTimeout);
    };
  }, []); // Empty dependency array

  const handleAgeSelect = (age) => {
    onNext(age);
  };

  const handleBack = () => {
    onBack();
  };

  console.log('AgeSelectionPage render, current animationStep:', animationStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center relative overflow-hidden">
      
      <BackButton onClick={handleBack} theme="dark" />
      
      {/* Background Doodles with same styling as LandingPage */}
      <div className="absolute inset-0 z-5" style={{ opacity: 0.8 }}>
        <BackgroundDoodles />
      </div>

      <div className="text-center z-10 px-4 max-w-5xl">
        
        {/* Step 1: "Kuchh nahi" - only visible in step 1 */}
        <div
          className={`mb-12 transform transition-all duration-1000 ${
            animationStep === 1 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white cute-font">
            Kuchh nahi
          </h1>
        </div>

        {/* Steps 3+: Main content */}
        {animationStep >= 3 && (
          <>
            {/* Step 3: "So this is your..." */}
            <div 
              className={`mb-12 transform transition-all duration-1000 ${
                animationStep >= 3
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-wider cute-font">
                So this is your...
              </h1>
            </div>
            
            {/* Age options - 2 rows of 3, all same size */}
            <div className="mb-16 max-w-2xl mx-auto">
              
              {/* First row - 27th, 28th, 29th */}
              <div className="flex justify-center items-center gap-6 md:gap-8 mb-8">
                
                {/* 27th button - Step 4 */}
                <div
                  className={`transform transition-all duration-700 ${
                    animationStep >= 4 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAgeSelect('27th')}
                    className="group relative w-32 h-16 md:w-40 md:h-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl flex items-center justify-center cute-font"
                  >
                    <span className="relative z-10 text-sm md:text-xl">27th</span>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-15 blur-lg transition-all duration-300"></div>
                    <div className="absolute -inset-1 rounded-lg bg-white opacity-0 group-hover:opacity-8 blur-xl transition-all duration-300"></div>
                  </button>
                </div>

                {/* 28th button - Step 5 */}
                <div
                  className={`transform transition-all duration-700 ${
                    animationStep >= 5 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAgeSelect('28th')}
                    className="group relative w-32 h-16 md:w-40 md:h-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl flex items-center justify-center cute-font"
                  >
                    <span className="relative z-10 text-sm md:text-xl">28th</span>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-15 blur-lg transition-all duration-300"></div>
                    <div className="absolute -inset-1 rounded-lg bg-white opacity-0 group-hover:opacity-8 blur-xl transition-all duration-300"></div>
                  </button>
                </div>

                {/* 29th button - Step 6 */}
                <div
                  className={`transform transition-all duration-700 ${
                    animationStep >= 6 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAgeSelect('29th')}
                    className="group relative w-32 h-16 md:w-40 md:h-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl flex items-center justify-center cute-font"
                  >
                    <span className="relative z-10 text-sm md:text-xl">29th</span>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-15 blur-lg transition-all duration-300"></div>
                    <div className="absolute -inset-1 rounded-lg bg-white opacity-0 group-hover:opacity-8 blur-xl transition-all duration-300"></div>
                  </button>
                </div>
              </div>

              {/* Second row - 30th, 5th, secret */}
              <div className="flex justify-center items-center gap-6 md:gap-8">
                
                {/* 30th button - Step 7 */}
                <div
                  className={`transform transition-all duration-700 ${
                    animationStep >= 7 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAgeSelect('30th')}
                    className="group relative w-32 h-16 md:w-40 md:h-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl flex items-center justify-center cute-font"
                  >
                    <span className="relative z-10 text-sm md:text-xl">30th</span>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-15 blur-lg transition-all duration-300"></div>
                    <div className="absolute -inset-1 rounded-lg bg-white opacity-0 group-hover:opacity-8 blur-xl transition-all duration-300"></div>
                  </button>
                </div>

                {/* 5th button - Step 8 */}
                <div
                  className={`transform transition-all duration-700 ${
                    animationStep >= 8 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAgeSelect('5th')}
                    className="group relative w-32 h-16 md:w-40 md:h-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl flex items-center justify-center cute-font"
                  >
                    <span className="relative z-10 text-sm md:text-xl">5th</span>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-15 blur-lg transition-all duration-300"></div>
                    <div className="absolute -inset-1 rounded-lg bg-white opacity-0 group-hover:opacity-8 blur-xl transition-all duration-300"></div>
                  </button>
                </div>

                {/* Secret button - Step 9 */}
                <div
                  className={`transform transition-all duration-700 ${
                    animationStep >= 9 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                  <button
                    onClick={() => handleAgeSelect('secret')}
                    className="group relative w-32 h-16 md:w-40 md:h-20 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl flex items-center justify-center cute-font"
                  >
                    <span className="relative z-10 text-xs md:text-sm whitespace-pre-line text-center leading-tight">
                      <span className="text-sm md:text-lg font-bold">grr</span>
                      <br />
                      <span className="text-xs md:text-sm">nahi batayega</span>
                    </span>
                    <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-15 blur-lg transition-all duration-300"></div>
                    <div className="absolute -inset-1 rounded-lg bg-white opacity-0 group-hover:opacity-8 blur-xl transition-all duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 10: "birthday" */}
            <div
              className={`transform transition-all duration-1000 ${
                animationStep >= 10
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider cute-font">
                birthday
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgeSelectionPage;