// src/pages/LandingPage/LandingPage.js
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import BackgroundDoodles from '../../components/BackgroundDoodles/BackgroundDoodles';

const LandingPage = ({ onNext }) => {
  const [visibleHellos, setVisibleHellos] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const particleCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    // Reset states when component mounts
    setVisibleHellos(0);
    setShowButton(false);
    setFadeOut(false);
    
    // Initialize particle system
    initParticles();
    
    // Animate hellos appearing one by one
    const timers = [
      setTimeout(() => setVisibleHellos(1), 500),
      setTimeout(() => setVisibleHellos(2), 1000),
      setTimeout(() => setVisibleHellos(3), 1500),
      setTimeout(() => setShowButton(true), 2500),
    ];

    return () => {
      timers.forEach(clearTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const initParticles = () => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create stars
    const stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        drift: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        }
      });
    }
    starsRef.current = stars;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Update star position (subtle drift)
        star.x += star.drift.x;
        star.y += star.drift.y;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Update twinkling
        star.phase += star.twinkleSpeed;
        const twinkle = Math.sin(star.phase) * 0.3 + 0.7;

        // Draw star
        ctx.save();
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = '#ffffff';

        // Draw 4-pointed star
        ctx.translate(star.x, star.y);
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 2);
          ctx.moveTo(0, -star.size);
          ctx.lineTo(0, star.size);
        }
        ctx.stroke();

        // Draw center dot
        ctx.beginPath();
        ctx.arc(0, 0, star.size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  const HelloText = ({ index, children }) => (
    <div
      className={`transform transition-all duration-700 ${
        visibleHellos >= index
          ? 'translate-y-0 opacity-100 animate-bounce'
          : 'translate-y-10 opacity-0'
      }`}
      style={{
        animationDelay: `${(index - 1) * 0.2}s`,
        animationDuration: '0.8s',
        animationFillMode: 'forwards',
        animationIterationCount: visibleHellos >= index ? '1' : '0',
      }}
    >
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-0 tracking-wider font-mono cute-font">
        {children}
      </h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Particle Canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Background Doodles with reduced size */}
      <div className="absolute inset-0 z-5" style={{ transform: 'scale(0.6)', opacity: 0.4 }}>
        <BackgroundDoodles />
      </div>

      <div className={`text-center z-10 px-4 transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          <HelloText index={1}>Hello</HelloText>
          <HelloText index={2}>Hello</HelloText>
          <HelloText index={3}>Hello</HelloText>
        </div>

        {/* Button appears after all hellos */}
        <div
          className={`mt-12 transform transition-all duration-1000 ${
            showButton
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          <button
            onClick={handleNext}
            className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-400 hover:shadow-white/40 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-3 text-lg md:text-xl tracking-wider font-mono cute-font">
              Kyaa chahiye tumko?
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Enhanced hover glow effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
            <div className="absolute -inset-1 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;