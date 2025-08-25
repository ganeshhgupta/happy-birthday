// src/components/Moon/Moon.jsx
import React, { useState, useEffect } from 'react';

const Moon = ({ show }) => {
  const [moonVisible, setMoonVisible] = useState(false);
  const [moonGlow, setMoonGlow] = useState(false);
  const [moonGlowIntensity, setMoonGlowIntensity] = useState(0);
  const [moonShiftUp, setMoonShiftUp] = useState(false);

  useEffect(() => {
    if (show) {
      // Start as tiny dot, then grow after delay
      setTimeout(() => {
        console.log('Moon starting to grow from tiny dot');
        setMoonVisible(true);
        
        // After moon finishes growing, start glow animation
        setTimeout(() => {
          console.log('Moon starting gradual glow animation');
          setMoonGlow(true);
          
          // Gradually increase glow intensity
          const glowInterval = setInterval(() => {
            setMoonGlowIntensity(prev => {
              if (prev >= 1) {
                clearInterval(glowInterval);
                
                // After reaching full glow, start fade out after delay
                setTimeout(() => {
                  console.log('Moon glow gradually receding');
                  const fadeInterval = setInterval(() => {
                    setMoonGlowIntensity(prev => {
                      if (prev <= 0) {
                        clearInterval(fadeInterval);
                        setMoonGlow(false);
                        return 0;
                      }
                      return prev - 0.02;
                    });
                  }, 50);
                }, 5000); // Glow at full intensity for 5 seconds
                
                return 1;
              }
              return prev + 0.02;
            });
          }, 50); // Update every 50ms for smooth animation
          
        }, 5000); // Wait for moon zoom to complete (4s) + 1s delay
        
      }, 1500); // 1.5s delay before starting the grow animation
    } else {
      setMoonVisible(false);
      setMoonGlow(false);
      setMoonGlowIntensity(0);
      setMoonShiftUp(false);
    }
  }, [show]);

  // Calculate glow values based on intensity
  const glowBoxShadow = moonGlowIntensity > 0
    ? `0px 0px ${8 + (52 * moonGlowIntensity)}px ${2 + (10 * moonGlowIntensity)}px rgba(235, 235, 231, ${0.301 + (0.599 * moonGlowIntensity)}), 
       0px 0px ${20 + (100 * moonGlowIntensity)}px ${4 + (20 * moonGlowIntensity)}px rgba(235, 235, 231, ${0.2 * moonGlowIntensity}), 
       0px 0px ${40 + (160 * moonGlowIntensity)}px ${8 + (32 * moonGlowIntensity)}px rgba(235, 235, 231, ${0.1 * moonGlowIntensity})`
    : '0px 0px 8px 2px rgba(235, 235, 231, 0.301)';

  const glowBackground = moonGlowIntensity > 0
    ? `radial-gradient(circle, rgba(235, 235, 231, ${0.15 + (0.25 * moonGlowIntensity)}) 0%, rgba(235, 235, 231, ${0.08 + (0.12 * moonGlowIntensity)}) 40%, transparent 70%)`
    : 'radial-gradient(circle, rgba(235, 235, 231, 0.15) 0%, rgba(235, 235, 231, 0.08) 40%, transparent 70%)';

  return (
    <div className="moon-outer">
      <div 
        className={`moon transform transition-all duration-[4000ms] ease-out ${
          moonVisible ? 'scale-100 opacity-100' : 'scale-[0.02] opacity-20'
        }`}
        style={{
          width: 'var(--moon-size)',
          height: 'var(--moon-size)',
          borderRadius: '50%',
          backgroundColor: 'rgb(230, 224, 224)',
          boxShadow: glowBoxShadow,
          position: 'relative',
          overflow: 'hidden',
          animation: moonVisible ? 'moonShine 4s ease-in-out infinite' : 'none',
          transition: 'transform 4000ms ease-out, opacity 4000ms ease-out, translate 2000ms ease-in-out',
          '--moon-size': '320px'
        }}
      >
        {/* Base details layer */}
        <div 
          className="details"
          style={{
            width: 'var(--moon-size)',
            height: 'var(--moon-size)',
            borderRadius: '50%',
            backgroundColor: 'rgba(165, 165, 165, 0.089)',
          }}
        ></div>

        {/* Crater one */}
        <div 
          className="details one"
          style={{
            position: 'absolute',
            top: '60px',
            left: '120px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            boxShadow: 'inset 6px 0 12px rgba(167, 167, 167, 0.685)',
          }}
        ></div>

        {/* Crater two */}
        <div 
          className="details two"
          style={{
            position: 'absolute',
            top: '180px',
            left: '48px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            boxShadow: 'inset -6px 0 12px rgba(167, 167, 167, 0.685)',
          }}
        ></div>

        {/* Crater three */}
        <div 
          className="details three"
          style={{
            position: 'absolute',
            top: '210px',
            left: '210px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            boxShadow: 'inset 6px 0 12px rgba(167, 167, 167, 0.685)',
          }}
        ></div>

        {/* Small crater four */}
        <div 
          className="details four small"
          style={{
            position: 'absolute',
            top: '120px',
            left: '180px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            boxShadow: 'inset 6px 0 12px rgba(167, 167, 167, 0.585)',
          }}
        ></div>

        {/* Additional small crater */}
        <div 
          style={{
            position: 'absolute',
            top: '80px',
            left: '80px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            boxShadow: 'inset -3px 0 6px rgba(167, 167, 167, 0.485)',
          }}
        ></div>
      </div>
      
      {/* Outer glow effect */}
      <div 
        className={`absolute inset-0 rounded-full blur-2xl transform transition-all duration-[4000ms] ease-out ${
          moonVisible ? 'scale-110 opacity-100' : 'scale-[0.02] opacity-0'
        } ${moonShiftUp ? 'translate-y-[-40px]' : 'translate-y-0'}`}
        style={{
          width: 'var(--moon-size)',
          height: 'var(--moon-size)',
          background: glowBackground,
          transition: 'transform 4000ms ease-out, opacity 4000ms ease-out, translate 2000ms ease-in-out',
          '--moon-size': '320px'
        }}
      ></div>

      <style jsx>{`
        .moon-outer {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        @keyframes moonShine {
          0% { 
            box-shadow: ${moonGlow 
              ? `0px 0px ${60 * moonGlowIntensity}px ${12 * moonGlowIntensity}px rgba(235, 235, 231, ${0.9 * moonGlowIntensity}), 0px 0px ${120 * moonGlowIntensity}px ${24 * moonGlowIntensity}px rgba(235, 235, 231, ${0.6 * moonGlowIntensity}), 0px 0px ${200 * moonGlowIntensity}px ${40 * moonGlowIntensity}px rgba(235, 235, 231, ${0.3 * moonGlowIntensity})`
              : '0px 0px 8px 2px rgba(235, 235, 231, 0.301)'
            }; 
          }
          50% { 
            box-shadow: ${moonGlow 
              ? `0px 0px ${80 * moonGlowIntensity}px ${16 * moonGlowIntensity}px rgba(235, 235, 231, ${1.0 * moonGlowIntensity}), 0px 0px ${160 * moonGlowIntensity}px ${32 * moonGlowIntensity}px rgba(235, 235, 231, ${0.7 * moonGlowIntensity}), 0px 0px ${240 * moonGlowIntensity}px ${48 * moonGlowIntensity}px rgba(235, 235, 231, ${0.4 * moonGlowIntensity})`
              : '0px 0px 16px 4px rgba(235, 235, 231, 0.501)'
            }; 
          }
          100% { 
            box-shadow: ${moonGlow 
              ? `0px 0px ${60 * moonGlowIntensity}px ${12 * moonGlowIntensity}px rgba(235, 235, 231, ${0.9 * moonGlowIntensity}), 0px 0px ${120 * moonGlowIntensity}px ${24 * moonGlowIntensity}px rgba(235, 235, 231, ${0.6 * moonGlowIntensity}), 0px 0px ${200 * moonGlowIntensity}px ${40 * moonGlowIntensity}px rgba(235, 235, 231, ${0.3 * moonGlowIntensity})`
              : '0px 0px 8px 2px rgba(235, 235, 231, 0.301)'
            }; 
          }
        }
      `}</style>
    </div>
  );
};

export default Moon;