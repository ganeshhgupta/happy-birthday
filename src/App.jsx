// src/App.js
import React, { useState, useEffect } from 'react';
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
import ThirteenthPage from './pages/ThirteenthPage/ThirteenthPage.jsx';
import FourteenthPage from './pages/FourteenthPage/FourteenthPage.jsx';
import FifteenthPage from './pages/FifteenthPage/FifteenthPage.jsx';
import SixteenthPage from './pages/SixteenthPage/SixteenthPage.jsx';
import SeventeenthPage from './pages/SeventeenthPage/SeventeenthPage.jsx';
import EighteenthPage from './pages/EighteenthPage/EighteenthPage.jsx';
import CloseOne from './pages/CloseOne/CloseOne.jsx';
import CloseTwo from './pages/CloseTwo/CloseTwo.jsx';
import AudioManager from './components/AudioManager/AudioManager.jsx';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedAge, setSelectedAge] = useState(null);
  const [pageKey, setPageKey] = useState(0);
  const [fifthPageData, setFifthPageData] = useState(null);

  // Page navigation array for keyboard shortcuts
  const pageOrder = [
    'landing', 'ageSelection', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
    'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth',
    'closeOne', 'closeTwo'
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      const currentIndex = pageOrder.indexOf(currentPage);
      
      // '1' key for previous page
      if (event.key === '1') {
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? pageOrder.length - 1 : currentIndex - 1;
        const prevPage = pageOrder[prevIndex];
        
        console.log(`Keyboard prev: ${currentPage} -> ${prevPage}`);
        handlePageTransition(prevPage);
      }
      
      // '2' key for next page
      if (event.key === '2') {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % pageOrder.length;
        const nextPage = pageOrder[nextIndex];
        
        console.log(`Keyboard next: ${currentPage} -> ${nextPage}`);
        handlePageTransition(nextPage);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

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
  const handleTwelfthNext = () => handlePageTransition('thirteenth');
  const handleThirteenthNext = () => handlePageTransition('fourteenth');
  const handleFourteenthNext = () => handlePageTransition('fifteenth');
  const handleFifteenthNext = () => handlePageTransition('sixteenth');
  const handleSixteenthNext = () => handlePageTransition('seventeenth');
  const handleSeventeenthNext = () => handlePageTransition('eighteenth');
  const handleEighteenthNext = () => handlePageTransition('closeOne');
  const handleCloseOneNext = () => handlePageTransition('closeTwo');
  const handleCloseTwoNext = () => {
    console.log('handleCloseTwoNext called - end of journey');
    // Reset to beginning
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
  const handleBackToTwelfth = () => handlePageTransition('twelfth');
  const handleBackToThirteenth = () => handlePageTransition('thirteenth');
  const handleBackToFourteenth = () => handlePageTransition('fourteenth');
  const handleBackToFifteenth = () => handlePageTransition('fifteenth');
  const handleBackToSixteenth = () => handlePageTransition('sixteenth');
  const handleBackToSeventeenth = () => handlePageTransition('seventeenth');
  const handleBackToEighteenth = () => handlePageTransition('eighteenth');
  const handleBackToCloseOne = () => handlePageTransition('closeOne');

  // Determine audio file based on current page
  const getAudioFile = () => {
    switch(currentPage) {
      case 'closeOne':
      case 'closeTwo':
        return './sparkle.m4a'; // Both CloseOne and CloseTwo use sparkle.m4a
      case 'twelfth':
      case 'thirteenth':
      case 'fourteenth':
      case 'fifteenth':
      case 'sixteenth':
      case 'seventeenth':
      case 'eighteenth':
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
        return './Blue.mp3';
    }
  };

  return (
    <div className="font-sans relative">
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
      {currentPage === 'thirteenth' && (
        <ThirteenthPage 
          key={`thirteenth-${pageKey}`}
          onBack={handleBackToTwelfth}
          onNext={handleThirteenthNext}
        />
      )}
      {currentPage === 'fourteenth' && (
        <FourteenthPage 
          key={`fourteenth-${pageKey}`}
          onBack={handleBackToThirteenth}
          onNext={handleFourteenthNext}
        />
      )}
      {currentPage === 'fifteenth' && (
        <FifteenthPage 
          key={`fifteenth-${pageKey}`}
          onBack={handleBackToFourteenth}
          onNext={handleFifteenthNext}
        />
      )}
      {currentPage === 'sixteenth' && (
        <SixteenthPage 
          key={`sixteenth-${pageKey}`}
          onBack={handleBackToFifteenth}
          onNext={handleSixteenthNext}
        />
      )}
      {currentPage === 'seventeenth' && (
        <SeventeenthPage 
          key={`seventeenth-${pageKey}`}
          onBack={handleBackToSixteenth}
          onNext={handleSeventeenthNext}
        />
      )}
      {currentPage === 'eighteenth' && (
        <EighteenthPage 
          key={`eighteenth-${pageKey}`}
          onBack={handleBackToSeventeenth}
          onNext={handleEighteenthNext}
        />
      )}
      {currentPage === 'closeOne' && (
        <CloseOne 
          key={`closeOne-${pageKey}`}
          onBack={handleBackToEighteenth}
          onNext={handleCloseOneNext}
        />
      )}
      {currentPage === 'closeTwo' && (
        <CloseTwo 
          key={`closeTwo-${pageKey}`}
          onBack={handleBackToCloseOne}
          onNext={handleCloseTwoNext}
        />
      )}
    </div>
  );
};

export default App;