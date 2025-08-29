// src/pages/NinthPage/NinthPage.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';
import PageFlip from '../../components/PageFlip/PageFlip.jsx';
import ScribbleReveal from '../../components/ScribbleReveal/ScribbleReveal.jsx';
import BubbleQuiz from '../../components/BubbleQuiz/BubbleQuiz.jsx';

const NinthPage = ({ onBack, onNext }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [startPageFlip, setStartPageFlip] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [textFloatUp, setTextFloatUp] = useState(false);
  const [textFadeOut, setTextFadeOut] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    // Image scribbles in first
    setTimeout(() => {
      setShowImage(true);
    }, 500);
    
    // Text fades in
    setTimeout(() => {
      setShowText(true);
    }, 1500);
    
    // Button appears
    setTimeout(() => {
      setShowButton(true);
    }, 3500);
    
    // Text floats up
    setTimeout(() => {
      setTextFloatUp(true);
    }, 5000);
    
    // Text fades out
    setTimeout(() => {
      setTextFadeOut(true);
    }, 5800);
    
    // Start quiz (clue appears where text was)
    setTimeout(() => {
      setShowQuiz(true);
    }, 6300);
  }, []);

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      onBack();
    }, 500);
  };

  const handleNext = () => {
    setStartPageFlip(true);
  };

  const handlePageFlipComplete = () => {
    onNext();
  };

  const handleQuizComplete = () => {
    console.log('Quiz completed!');
    // You can add any completion logic here
  };

  if (startPageFlip) {
    return (
      <PageFlip onComplete={handlePageFlipComplete}>
        {/* Pass the actual page content as children */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24">
            
            {/* Left side - Image with quiz completed */}
            <div className="flex-1 flex items-center justify-end">
              <div style={{ position: 'relative', width: '450px', height: '450px' }}>
                <img 
                  src="./1.png"
                  alt="Character"
                  style={{
                    width: '450px',
                    height: '450px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'Zen Loop, cursive',
                  fontSize: '3rem',
                  fontWeight: 400,
                  color: '#6b7280'
                }}>
                  Good job!
                </div>
              </div>
            </div>
            
            {/* Right side - Text */}
            <div className="flex-1 flex items-center justify-start">
              <h1 style={{ 
                fontFamily: 'Zen Loop, cursive', 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 400, 
                color: '#1f2937',
                lineHeight: '1.3',
                maxWidth: '500px',
                textAlign: 'left'
              }}>
                Jo tarah tarah ki awazein nikaalta hai?
              </h1>
            </div>
          </div>
          
          {/* Button positioned at bottom center */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <button
              className="group relative px-12 py-4 bg-gray-100 text-gray-800 font-semibold rounded-full shadow-lg border border-gray-300"
              style={{ 
                fontFamily: 'Zen Loop, cursive', 
                fontSize: '1.5rem',
                fontWeight: 400
              }}
            >
              Grr
            </button>
          </div>
        </div>
      </PageFlip>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'radial-gradient(circle, rgba(235, 235, 231, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(245, 245, 245, 0.9) 100%)'
    }}>
      <BackButton onClick={handleBack} theme="light" />

      <div className={`relative z-10 min-h-screen transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        
        {/* Greeting card style layout - two centered columns */}
        <div className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-7xl w-full flex items-center justify-center gap-16 lg:gap-24">
            
            {/* Left side - Image stays visible */}
            <div className="flex-1 flex items-center justify-end">
              <ScribbleReveal
                src="./1.png"
                width={450}
                height={450}
                duration={4}
                strokeWidth={50}
                strokeColor="white"
                trigger={showImage}
                delay={0}
                alt="Character"
              />
            </div>
            
            {/* Right side - Text transforms to quiz */}
            <div className="flex-1 flex items-center justify-start">
              <div style={{ position: 'relative', width: '600px', height: '500px' }}>
                {/* Original text that floats up and fades */}
                {!textFadeOut && (
                  <div style={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    textAlign: 'center'
                  }}>
                    <h1 
                      className={`transition-all ease-out ${
                        showText ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ 
                        fontFamily: 'Zen Loop, cursive', 
                        fontSize: '3rem', 
                        fontWeight: 400, 
                        color: '#1f2937',
                        lineHeight: '1.3',
                        transform: textFloatUp ? 'translateY(-30px)' : 'translateY(10px)',
                        transition: 'all 1s ease-out',
                        opacity: textFadeOut ? 0 : (showText ? 1 : 0)
                      }}
                    >
                      Jo tarah tarah ki awazein nikaalta hai..
                    </h1>
                  </div>
                )}
                
                {/* Quiz appears in same area */}
                {showQuiz && (
                  <BubbleQuiz 
                    trigger={showQuiz}
                    onComplete={handleQuizComplete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Button positioned at bottom center with fade in */}
        <div 
          className={`absolute bottom-[60px] left-1/2 transform -translate-x-1/2 transition-all duration-[2000ms] ease-out ${
            showButton
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0'
          }`}
        >
          <button
            onClick={handleNext}
            className="group relative px-12 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-300 hover:border-gray-400"
            style={{ 
              fontFamily: 'Zen Loop, cursive', 
              fontSize: '1.5rem',
              fontWeight: 400
            }}
          >
            <span className="relative z-10">Grr</span>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-gray-300 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NinthPage;