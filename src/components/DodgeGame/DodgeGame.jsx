// src/components/DodgeGame/DodgeGame.jsx
import React, { useState, useEffect, useRef } from 'react';

const DodgeGame = ({ trigger, onComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [collectedMessages, setCollectedMessages] = useState([]);
  const [characterPos, setCharacterPos] = useState(50);
  const [fallingObjects, setFallingObjects] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const gameAreaRef = useRef(null);
  const animationFrameRef = useRef(null);
  const gameIntervalRef = useRef(null);
  const bubblePopAudioRef = useRef(null);
  
  const messages = [
    "Hi cutie",
    "Tum kitna smart hai",
    "Tum kitna talented hai", 
    "Lock in hona tumse seekha",
    "Tum kitna pyaara hai",
    "Tum kitna gadha hai",
    "Tum kitna virtuous hai",
    "Tum kitna intelligent hai",
    "People look up to you",
    "Tum kitna cutie hai",
    "Tum kitna annoying hai",
    "Tum kitna bojua hai"
  ];

  // Initialize audio on component mount
  useEffect(() => {
    bubblePopAudioRef.current = new Audio('/bubble_pop.mp3');
    bubblePopAudioRef.current.preload = 'auto';
    bubblePopAudioRef.current.volume = 0.7;
    
    // Cleanup audio on unmount
    return () => {
      if (bubblePopAudioRef.current) {
        bubblePopAudioRef.current.pause();
        bubblePopAudioRef.current = null;
      }
    };
  }, []);

  const playBubblePopSound = () => {
    if (bubblePopAudioRef.current) {
      // Reset audio to beginning in case it's already played
      bubblePopAudioRef.current.currentTime = 0;
      bubblePopAudioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  };

  useEffect(() => {
    if (trigger && !gameStarted) {
      setTimeout(() => {
        setGameStarted(true);
        startGame();
      }, 500);
    }
  }, [trigger]);

  const startGame = () => {
    let timeLeft = 20;
    
    // Spawn objects every 800ms
    const spawnInterval = setInterval(() => {
      if (timeLeft > 0) {
        spawnObject();
      }
    }, 1000);

    // Game timer
    gameIntervalRef.current = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(spawnInterval);
        clearInterval(gameIntervalRef.current);
        endGame();
      }
    }, 1000);
  };

  const spawnObject = () => {
    const newObject = {
      id: Date.now() + Math.random(),
      text: messages[Math.floor(Math.random() * messages.length)],
      x: Math.random() * 80 + 10, // Random position between 10% and 90%
      y: -10,
      speed: Math.random() * 0.5 + 0.3
    };
    
    setFallingObjects(prev => [...prev, newObject]);
  };

  const updateObjects = () => {
    setFallingObjects(prev => 
      prev.map(obj => ({
        ...obj,
        y: obj.y + obj.speed
      })).filter(obj => obj.y < 110) // Allows objects to fall below character line
    );
    
    animationFrameRef.current = requestAnimationFrame(updateObjects);
  };

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      updateObjects();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, gameEnded]);

  const checkCollisions = () => {
    fallingObjects.forEach(obj => {
      // Fine-tuned collision detection to eliminate gap
      const objCenterY = obj.y;
      const objCenterX = obj.x;
      const charCenterY = 85; // Further adjusted for character's actual head position
      const charCenterX = characterPos;
      
      // Calculate distance between object center and character center
      const distance = Math.sqrt(
        Math.pow(objCenterX - charCenterX, 2) + 
        Math.pow(objCenterY - charCenterY, 2)
      );
      
      // Collision radius - fine-tuned to eliminate gap
      const collisionRadius = 18; // Increased slightly to close gap
      
      // Rectangular collision with tighter boundaries
      const objLeft = obj.x - 8;
      const objRight = obj.x + 8;
      const objTop = obj.y - 4;
      const objBottom = obj.y + 4;
      
      const charLeft = characterPos - 10;
      const charRight = characterPos + 10;
      const charTop = 65; // Moved higher to eliminate gap
      const charBottom = 105; // Extended lower boundary
      
      // Trigger collision if either distance OR rectangular collision is detected
      if (distance < collisionRadius || 
          (objRight > charLeft && objLeft < charRight && 
           objBottom > charTop && objTop < charBottom)) {
        handleCollision(obj);
      }
    });
  };

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      checkCollisions();
    }
  }, [fallingObjects, characterPos]);

  const handleCollision = (obj) => {
    const cleanMessage = obj.text.replace(/\n/g, ' ');
    if (!collectedMessages.includes(cleanMessage)) {
      setCollectedMessages(prev => [...prev, cleanMessage]);
      // Play bubble pop sound when collecting a new message
      playBubblePopSound();
    }
    setFallingObjects(prev => prev.filter(o => o.id !== obj.id));
  };

  const handleMouseDown = (e) => {
    if (!gameStarted || gameEnded) return;
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !gameAreaRef.current) return;
    e.preventDefault(); // Prevent text selection
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setCharacterPos(Math.max(5, Math.min(95, x)));
  };

  const handleMouseUp = (e) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(false);
  };

  const endGame = () => {
    setGameEnded(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Trigger completion callback after animation
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{
        opacity: trigger ? 1 : 0,
        transition: 'opacity 1s ease-in',
        fontFamily: 'Zen Loop, cursive',
        userSelect: 'none', // Prevent text selection on the entire container
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {/* Hidden audio element for preloading */}
      <audio
        ref={bubblePopAudioRef}
        preload="auto"
        className="hidden"
      >
        <source src="/bubble_pop.mp3" type="audio/mpeg" />
      </audio>

      {!gameEnded ? (
        <div 
          ref={gameAreaRef}
          className="relative"
          style={{
            width: '100%', // Take full width of container
            height: '100%', // Take full height of container
            minWidth: '600px', // Minimum width
            minHeight: '450px', // Minimum height
            maxWidth: '900px', // Maximum width to prevent too wide
            maxHeight: '600px', // Maximum height
            background: 'transparent', // Seamless with page background
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none', // Prevent text selection
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDragStart={(e) => e.preventDefault()} // Prevent drag and drop
          onSelectStart={(e) => e.preventDefault()} // Prevent text selection
        >
          {/* Collected messages sidebar - transparent background */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '200px', // Wider for better readability
            height: '100%',
            background: 'transparent', // Blend with page background
            padding: '15px',
            overflowY: 'auto',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}>
            {collectedMessages.map((msg, idx) => (
              <div key={idx} style={{
                padding: '12px',
                marginBottom: '8px',
                background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
                borderRadius: '12px',
                fontSize: '16px', // Larger font size
                fontWeight: '600', // Bold text
                color: '#2d3748',
                animation: 'fadeIn 0.5s ease-in',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}>
                {msg}
              </div>
            ))}
          </div>

          {/* Game area - adjusted margin for bigger sidebar */}
          <div style={{
            marginLeft: '200px', // Adjusted for wider sidebar
            height: '100%',
            position: 'relative',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}>
            {/* Falling objects */}
            {fallingObjects.map(obj => (
              <div
                key={obj.id}
                style={{
                  position: 'absolute',
                  left: `${obj.x}%`,
                  top: `${obj.y}%`,
                  transform: 'translate(-50%, -50%)',
                  padding: '12px 18px',
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 240, 240, 0.9))',
                  border: '2px solid rgba(224, 224, 224, 0.8)',
                  borderRadius: '20px',
                  fontSize: '18px', // Larger font size
                  fontWeight: '700', // Bold text
                  color: '#1a202c',
                  whiteSpace: 'nowrap',
                  opacity: obj.y < 10 ? obj.y / 10 : 1,
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none', // Prevent interaction with falling objects
                  zIndex: 5 // Below character but above background
                }}
              >
                {obj.text}
              </div>
            ))}

            {/* Character - moved way lower */}
            <div
              style={{
                position: 'absolute',
                left: `${characterPos}%`,
                bottom: '-20%', // Moved much lower (was -5%)
                transform: 'translateX(-50%)',
                width: '300px',
                height: '300px',
                cursor: 'grab',
                transition: isDragging ? 'none' : 'left 0.1s ease-out',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                zIndex: 10 // Ensure character is above falling objects
              }}
              onMouseDown={handleMouseDown}
              onDragStart={(e) => e.preventDefault()}
              onSelectStart={(e) => e.preventDefault()}
            >
              <img
                src="./dodge1.png"
                alt="Character"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none'
                }}
                draggable={false}
              />
            </div>

            {/* Instructions at top */}
            <div style={{
              position: 'absolute',
              top: '-10px', // Moved further up
              width: '100%',
              textAlign: 'center',
              fontSize: 'clamp(2.5rem, 4vw, 4rem)', // Same responsive size as main text
              color: '#1f2937', // Same color as main text
              fontStyle: 'normal',
              fontWeight: '400',
              fontFamily: 'Zen Loop, cursive',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}>
              drag to save her from the compliments
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          padding: '20px'
        }}>
          {/* Display collected messages in a vertical list */}
          <div style={{
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            {collectedMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px 24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '18px',
                  fontSize: '20px', // Bigger font size
                  fontWeight: '600', // Bold text
                  color: '#2d3748',
                  animation: `flyIn ${0.5 + idx * 0.1}s ease-out`,
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  minWidth: '300px',
                  textAlign: 'center'
                }}
              >
                {msg}
              </div>
            ))}
          </div>
          <p style={{
            fontSize: '28px', // Larger font size
            color: '#1f2937', // Same dark color as main text
            fontWeight: '600', // Bold text
            animation: 'fadeIn 1s ease-in 1.5s both',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}>
            {collectedMessages.length === 0 
              ? 'Whaa, sab se bachch gaya :)'
              : 'ye saare rakh lo :)'}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes flyIn {
          from { 
            opacity: 0; 
            transform: translate(-100px, 0) scale(0.8);
          }
          to { 
            opacity: 1; 
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DodgeGame;