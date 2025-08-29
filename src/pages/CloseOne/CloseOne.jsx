// src/pages/CloseOne/CloseOne.jsx
import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton/BackButton.jsx';

const CloseOne = ({ onBack, onNext }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = blank, 1-14 = text steps
  const [fadeOut, setFadeOut] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [sequenceStarted, setSequenceStarted] = useState(false);

  // Array of text content
  const textContent = [
    "zyada ho gaya na? :)",
    "aaj ke liye rakh lo appreciation",
    "thanks for being a good friend",
    "a good coworker",
    "a good influence",
    "and well..",
    "never underestimate yourself",
    "or ever feel ki tum stupid hai",
    "aur main ye aisehi nahi bol raha but..",
    "you're one of the smartest and dilligent people I know",
    "and I try to learn from you",
    "bas ho gaya",
    "and don't worry, I don't look up to you",
    "I literally don't, see.."
  ];

  useEffect(() => {
    if (!sequenceStarted) return;

    // Reset animation and start text sequence
    setCurrentStep(0);
    
    const timers = [];
    
    // Create sequential show/hide pattern for each text
    textContent.forEach((_, index) => {
      // Show text
      timers.push(setTimeout(() => setCurrentStep(index + 1), index * 4000 + 1000));
      // Hide text (back to blank) - except for the last one
      if (index < textContent.length - 1) {
        timers.push(setTimeout(() => setCurrentStep(0), index * 4000 + 3500));
      }
    });

    // Auto-transition to CloseTwo after all text is shown
    const autoTransitionTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onNext();
      }, 1000);
    }, textContent.length * 4000 + 2000); // Extra 2 seconds after last text

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(autoTransitionTimer);
    };
  }, [sequenceStarted, onNext]);

  const handleStartClick = () => {
    // Find and play the audio element
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.play().catch(console.error);
    });
    
    // Fade out the button
    setShowStartButton(false);
    
    // Start the text sequence after button fades out
    setTimeout(() => {
      setSequenceStarted(true);
    }, 500);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <BackButton onClick={handleBack} theme="dark" />

      {/* Start Button - appears first */}
      {showStartButton && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <button
            onClick={handleStartClick}
            className={`px-12 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full shadow-2xl transition-all duration-500 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-105 active:scale-95 ${
              showStartButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            style={{ 
              fontSize: '1.5rem',
              fontFamily: 'inherit',
              animation: showStartButton ? 'fadeIn 1s ease-out' : 'fadeOut 0.5s ease-out'
            }}
          >
            chalo ab, ho gaya
          </button>
        </div>
      )}

      {/* Content - only shows after button is clicked */}
      {sequenceStarted && (
        <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 transition-opacity duration-1000 ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="w-full relative">
            
            {/* Render each text line with sequential show/hide */}
            {textContent.map((text, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
                  currentStep === index + 1
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-white cute-font leading-relaxed text-center">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* Debug info */}
      <div className="fixed bottom-4 left-4 bg-white/90 text-black p-2 rounded text-xs border">
        {showStartButton ? 'Waiting for start...' : `Current Text Step: ${currentStep} / ${textContent.length}`}
        <br />
        {sequenceStarted && 'Auto-transition in progress...'}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default CloseOne;