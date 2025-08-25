// src/App.js
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import AgeSelectionPage from './pages/AgeSelectionPage/AgeSelectionPage.jsx';
import ThirdPage from './pages/ThirdPage/ThirdPage.jsx';
import FourthPage from './pages/FourthPage/FourthPage.jsx';
import FifthPage from './pages/FifthPage/FifthPage.jsx';
import AudioManager from './components/AudioManager/AudioManager.jsx';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedAge, setSelectedAge] = useState(null);
  const [pageKey, setPageKey] = useState(0);
  const [fifthPageData, setFifthPageData] = useState(null); // Store data for FifthPage

  console.log('App rendering, currentPage:', currentPage);

  const handlePageTransition = (newPage, data = null) => {
    console.log('handlePageTransition called with:', newPage, data);
    setCurrentPage(newPage);
    
    if (data) {
      if (typeof data === 'number') {
        // Age selection data
        setSelectedAge(data);
      } else if (typeof data === 'object') {
        // FifthPage data (fromWebcam, videoRef, streamRef)
        setFifthPageData(data);
      }
    }
    
    // Only increment pageKey for pages that don't need smooth animations
    if (newPage !== 'ageSelection') {
      setPageKey(prev => prev + 1);
    }
  };

  const handleLandingNext = () => {
    console.log('handleLandingNext called');
    handlePageTransition('ageSelection');
  };

  const handleAgeSelection = (age) => {
    console.log('handleAgeSelection called with:', age);
    handlePageTransition('third', age);
  };

  const handleThirdNext = () => {
    console.log('handleThirdNext called');
    handlePageTransition('fourth');
  };

  const handleFourthNext = (data) => {
    console.log('handleFourthNext called with:', data);
    handlePageTransition('fifth', data);
  };

  const handleBackToLanding = () => {
    console.log('handleBackToLanding called');
    handlePageTransition('landing');
    // Clear stored data when going back to start
    setSelectedAge(null);
    setFifthPageData(null);
  };

  const handleBackToAgeSelection = () => {
    console.log('handleBackToAgeSelection called');
    handlePageTransition('ageSelection');
  };

  const handleBackToThird = () => {
    console.log('handleBackToThird called');
    handlePageTransition('third');
  };

  const handleBackToFourth = () => {
    console.log('handleBackToFourth called');
    handlePageTransition('fourth');
    // Clear fifth page data when going back
    setFifthPageData(null);
  };

  return (
    <div className="font-sans relative">
      {/* Debug info */}
      <div className="fixed top-4 left-4 bg-red-500 text-white p-2 text-xs z-50">
        Current Page: {currentPage}
        {fifthPageData && (
          <div className="mt-1 text-xs">
            Fifth Data: {fifthPageData.fromWebcam ? 'Webcam' : 'Moon'}
          </div>
        )}
      </div>

      {/* Background Music Manager - Always persistent */}
      <AudioManager currentPage={currentPage} audioFile="/Date.mp3" />
      
      {/* Page Content */}
      {currentPage === 'landing' && (
        <LandingPage key={`landing-${pageKey}`} onNext={handleLandingNext} />
      )}
      {currentPage === 'ageSelection' && (
        <AgeSelectionPage 
          key="age-selection-persistent"
          onNext={handleAgeSelection} 
          onBack={handleBackToLanding} 
        />
      )}
      {currentPage === 'third' && (
        <ThirdPage 
          key={`third-${pageKey}`}
          selectedAge={selectedAge} 
          onBack={handleBackToAgeSelection}
          onNext={handleThirdNext}
        />
      )}
      {currentPage === 'fourth' && (
        <FourthPage 
          key={`fourth-${pageKey}`}
          onBack={handleBackToThird}
          onNext={handleFourthNext}
        />
      )}
      {currentPage === 'fifth' && (
        <FifthPage 
          key={`fifth-${pageKey}`}
          onBack={handleBackToFourth}
          fromWebcam={fifthPageData?.fromWebcam || false}
          videoRef={fifthPageData?.videoRef || null}
          streamRef={fifthPageData?.streamRef || null}
        />
      )}
    </div>
  );
};

export default App;