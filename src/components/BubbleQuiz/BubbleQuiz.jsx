// src/components/BubbleQuiz/BubbleQuiz.jsx
import React, { useState, useEffect } from 'react';
import './BubbleQuiz.css';

const BubbleQuiz = ({ onComplete, trigger }) => {
  const wordsAndClues = [
    { word: "Chh Chh", clue: "When she's trying to call/bother you:" },
    { word: "Huehuehue", clue: "How she laughs:" },
    { word: "Laah", clue: "When she's let down:" },
    { word: "Buhahaha", clue: "How she laughs (2):" },
    { word: "Hello Hello Hello", clue: "When she calls you (in a good mood):" },
    { word: "Chopa ho gaya", clue: "When something failed:" },
    { word: "Bruh", clue: "Her goto interjection:" },
    { word: "Nope Nope Nope", clue: "When she says No (but cute):" },
    { word: "Whaaa", clue: "When she's amazed:" },
    { word: "Grrr", clue: "Even Idk why she does this:" },
    { word: "Stoop", clue: "When she's calling you stupid:" },
    { word: "Oh my Goodness", clue: "When she's pleasantly surprised:" },
    { word: "Khatchh 🔪", clue: "When she's trying to stab you:" },
    { word: "irri mat karo", clue: "When she's irritated:" },
    { word: "Chicken", clue: "What I call her :):" }
  ];

  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [showClue, setShowClue] = useState(false);
  const [bubblesVisible, setBubblesVisible] = useState([]);
  const [clickedBubbles, setClickedBubbles] = useState([]);
  const [correctBubbles, setCorrectBubbles] = useState([]);
  const [wrongBubbles, setWrongBubbles] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [bubblePositions, setBubblePositions] = useState([]);
  const [showInstruction, setShowInstruction] = useState(false);
  const [remainingClues, setRemainingClues] = useState([...Array(wordsAndClues.length).keys()]);

  // Create pop sound effect
  const playPopSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Generate random positions for bubbles
  useEffect(() => {
    if (!trigger) return;

    const generatePositions = () => {
      const positions = [];
      const containerWidth = 600;
      const containerHeight = 500;
      const minDistance = 120;
      const maxAttempts = 500;
      
      for (let i = 0; i < wordsAndClues.length; i++) {
        let position = null;
        let attempts = 0;
        
        while (!position && attempts < maxAttempts) {
          const x = 80 + Math.random() * (containerWidth - 160);
          const y = 120 + Math.random() * (containerHeight - 200);
          
          let validPosition = true;
          for (let j = 0; j < positions.length; j++) {
            const dx = positions[j].x - x;
            const dy = positions[j].y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < minDistance) {
              validPosition = false;
              break;
            }
          }
          
          if (validPosition) {
            position = { x, y };
          }
          
          attempts++;
        }
        
        if (!position) {
          position = { 
            x: 80 + Math.random() * (containerWidth - 160),
            y: 120 + Math.random() * (containerHeight - 200)
          };
        }
        
        positions.push(position);
      }
      
      return positions;
    };

    setBubblePositions(generatePositions());
  }, [trigger, wordsAndClues.length]);

  // Start game sequence when triggered
  useEffect(() => {
    if (!trigger || bubblePositions.length === 0) return;

    // Show clue after a delay (this will be triggered by parent)
    setTimeout(() => {
      setShowClue(true);
    }, 100);

    // Show bubbles one by one after clue appears
    const bubbleTimers = [];
    wordsAndClues.forEach((_, index) => {
      const timer = setTimeout(() => {
        setBubblesVisible(prev => [...prev, index]);
      }, 1000 + index * 150);
      bubbleTimers.push(timer);
    });

    // Show instruction text
    setTimeout(() => {
      setShowInstruction(true);
    }, 1000 + wordsAndClues.length * 150 + 500);

    return () => {
      bubbleTimers.forEach(timer => clearTimeout(timer));
    };
  }, [trigger, bubblePositions, wordsAndClues.length]);

  const handleBubbleClick = (index) => {
    const clickedWord = wordsAndClues[index].word;
    const currentClue = wordsAndClues[remainingClues[currentClueIndex]];
    
    if (clickedWord === currentClue.word) {
      // Correct answer
      playPopSound();
      setCorrectBubbles(prev => [...prev, index]);
      
      // Remove this clue from remaining clues
      const newRemainingClues = remainingClues.filter((_, i) => i !== currentClueIndex);
      setRemainingClues(newRemainingClues);
      
      // After green flash, remove bubble
      setTimeout(() => {
        setClickedBubbles(prev => [...prev, index]);
        
        if (newRemainingClues.length > 0) {
          // Move to next clue (stay at same index or wrap around)
          const nextIndex = currentClueIndex >= newRemainingClues.length ? 0 : currentClueIndex;
          setCurrentClueIndex(nextIndex);
        } else {
          // Game complete
          setGameComplete(true);
          setShowInstruction(false);
          if (onComplete) {
            setTimeout(() => onComplete(), 1000);
          }
        }
      }, 200); // Brief delay for green flash
    } else {
      // Wrong answer - only cycle if there are remaining clues
      if (remainingClues.length > 0) {
        setWrongBubbles(prev => [...prev, index]);
        
        // Cycle to next clue
        const nextIndex = (currentClueIndex + 1) % remainingClues.length;
        setCurrentClueIndex(nextIndex);
        
        setTimeout(() => {
          setWrongBubbles(prev => prev.filter(i => i !== index));
        }, 500);
      }
    }
  };

  if (!trigger) return null;

  return (
    <div className="bubble-quiz-container">
      {/* Clue display */}
      <div className={`bubble-quiz-clue ${showClue ? 'visible' : ''}`}>
        {!gameComplete && remainingClues.length > 0 && remainingClues[currentClueIndex] !== undefined && 
         wordsAndClues[remainingClues[currentClueIndex]].clue}
      </div>

      {/* Bubbles */}
      <div className="bubble-quiz-bubbles">
        {wordsAndClues.map((item, index) => {
          // Don't render bubbles that have been clicked correctly
          if (clickedBubbles.includes(index)) {
            return null;
          }
          
          return (
            <div
              key={index}
              className={`
                bubble-quiz-bubble 
                ${bubblesVisible.includes(index) ? 'visible' : ''} 
                ${correctBubbles.includes(index) ? 'correct' : ''}
                ${wrongBubbles.includes(index) ? 'wrong' : ''}
              `}
              style={{
                left: bubblePositions[index]?.x + 'px',
                top: bubblePositions[index]?.y + 'px',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 5}s`
              }}
              onClick={() => handleBubbleClick(index)}
            >
              {item.word}
            </div>
          );
        })}
      </div>

      {/* Instruction text */}
      {showInstruction && !gameComplete && (
        <div className="bubble-quiz-instruction">
          (pop the correct bubble)
        </div>
      )}

      {/* Completion message */}
      {gameComplete && (
        <div className="bubble-quiz-complete">
          Good job!
        </div>
      )}
    </div>
  );
};

export default BubbleQuiz;