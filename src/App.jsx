// src/App.js
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import AgeSelectionPage from './pages/AgeSelectionPage/AgeSelectionPage.jsx';
import ThirdPage from './pages/ThirdPage/ThirdPage.jsx';
import FourthPage from './pages/FourthPage/FourthPage.jsx';
import FifthPage from './pages/FifthPage/FifthPage.jsx';
import SixthPage from './pages/SixthPage/SixthPage.jsx';
import SeventhPage from './pages/SeventhPage/SeventhPage.jsx';
import EighthPage from './pages/EighthPage/EighthPage.jsx';
import NinthPage from './pages/NinthPage/NinthPage.jsx';
import TenthPage from './pages/TenthPage/TenthPage.jsx';
import EleventhPage from './pages/EleventhPage/EleventhPage.jsx';
import TwelfthPage from './pages/TwelfthPage/TwelfthPage.jsx';
import AudioManager from './components/AudioManager/AudioManager.jsx';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedAge, setSelectedAge] = useState(null);
  const [pageKey, setPageKey] = useState(0);
  const [fifthPageData, setFifthPageData] = useState(null);

  console.log('App rendering, currentPage:', currentPage);

  const handlePageTransition = (newPage, data = null) => {
    console.log('handlePageTransition called with:', newPage, data);
    setCurrentPage(newPage);

    if (data) {
      if (typeof data === 'number') {
        setSelectedAge(data);
      } else if (typeof data === 'object') {
        setFifthPageData(data);
      }
    }

    // Only increment pageKey for pages that need it (exclude ageSelection and pages that might cause audio issues)
    if (newPage !== 'ageSelection') {
      setPageKey(prev => prev + 1);
    }
  };

  // Forward navigation
  const handleLandingNext = () => handlePageTransition('ageSelection');
  const handleAgeSelection = (age) => handlePageTransition('third', age);
  const handleThirdNext = () => handlePageTransition('fourth');
  const handleFourthNext = (data) => handlePageTransition('fifth', data);
  const handleFifthNext = () => handlePageTransition('sixth');
  const handleSixthNext = () => handlePageTransition('seventh');
  const handleSeventhNext = () => handlePageTransition('eighth');
  const handleEighthNext = () => handlePageTransition('ninth');
  const handleNinthNext = () => handlePageTransition('tenth');
  const handleTenthNext = () => handlePageTransition('eleventh');
  const handleEleventhNext = () => handlePageTransition('twelfth');
  const handleTwelfthNext = () => {
    console.log('handleTwelfthNext called - end of journey');
    // Reset to beginning or show completion message
    handlePageTransition('landing');
    setSelectedAge(null);
    setFifthPageData(null);
  };

  // Backward navigation
  const handleBackToLanding = () => {
    handlePageTransition('landing');
    setSelectedAge(null);
    setFifthPageData(null);
  };
  const handleBackToAgeSelection = () => handlePageTransition('ageSelection');
  const handleBackToThird = () => handlePageTransition('third');
  const handleBackToFourth = () => {
    handlePageTransition('fourth');
    setFifthPageData(null);
  };
  const handleBackToFifth = () => handlePageTransition('fifth');
  const handleBackToSixth = () => handlePageTransition('sixth');
  const handleBackToSeventh = () => handlePageTransition('seventh');
  const handleBackToEighth = () => handlePageTransition('eighth');
  const handleBackToNinth = () => handlePageTransition('ninth');
  const handleBackToTenth = () => handlePageTransition('tenth');
  const handleBackToEleventh = () => handlePageTransition('eleventh');

  // Determine audio file based on current page
  const getAudioFile = () => {
    switch(currentPage) {
      case 'twelfth':
        return '/TwelfthSong.mp3';
      case 'landing':
      case 'ageSelection':
      case 'third':
      case 'fourth':
      case 'fifth':
      case 'sixth':
      case 'seventh':
      case 'eighth':
      case 'ninth':
      case 'tenth':
      case 'eleventh':
      default:
        return '/Blue.mp3';
    }
  };

  return (
    <div className="font-sans relative">
      {/* Debug info */}
      <div className="fixed top-4 left-4 bg-red-500 text-white p-2 text-xs z-50 rounded">
        <div>Current Page: {currentPage}</div>
        <div>Page Key: {pageKey}</div>
        {selectedAge && <div>Selected Age: {selectedAge}</div>}
        {fifthPageData && (
          <div className="mt-1 text-xs">
            Fifth Data: {fifthPageData.fromWebcam ? 'Webcam' : 'Moon'}
          </div>
        )}
      </div>

      {/* Background Music Manager - persistent with stable key */}
      <AudioManager 
        key="persistent-audio-manager" // Stable key to prevent re-mounting
        currentPage={currentPage} 
        audioFile={getAudioFile()}
        autoPlay={true} // Ensure autoplay is enabled
        loop={true} // Keep music looping
      />
      
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
          onNext={handleFifthNext}
          fromWebcam={fifthPageData?.fromWebcam || false}
          videoRef={fifthPageData?.videoRef || null}
          streamRef={fifthPageData?.streamRef || null}
        />
      )}
      {currentPage === 'sixth' && (
        <SixthPage 
          key={`sixth-${pageKey}`}
          onBack={handleBackToFifth}
          onNext={handleSixthNext}
        />
      )}
      {currentPage === 'seventh' && (
        <SeventhPage 
          key={`seventh-${pageKey}`}
          onBack={handleBackToSixth}
          onNext={handleSeventhNext}
        />
      )}
      {currentPage === 'eighth' && (
        <EighthPage 
          key={`eighth-${pageKey}`}
          onBack={handleBackToSeventh}
          onNext={handleEighthNext}
        />
      )}
      {currentPage === 'ninth' && (
        <NinthPage 
          key={`ninth-${pageKey}`}
          onBack={handleBackToEighth}
          onNext={handleNinthNext}
        />
      )}
      {currentPage === 'tenth' && (
        <TenthPage 
          key={`tenth-${pageKey}`}
          onBack={handleBackToNinth}
          onNext={handleTenthNext}
        />
      )}
      {currentPage === 'eleventh' && (
        <EleventhPage 
          key={`eleventh-${pageKey}`}
          onBack={handleBackToTenth}
          onNext={handleEleventhNext}
        />
      )}
      {currentPage === 'twelfth' && (
        <TwelfthPage 
          key={`twelfth-${pageKey}`}
          onBack={handleBackToEleventh}
          onNext={handleTwelfthNext}
        />
      )}
    </div>
  );
};

export default App;