import React, { useEffect, useRef } from 'react';

const ShootingStarAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const startAnimation = () => {
      const star = starRef.current;
      const container = containerRef.current;
      if (!star || !container) return;

      let trailPoints = [];
      const startX = container.offsetWidth - 100;
      const startY = 50;
      const endX = 100;
      const endY = container.offsetHeight - 100;

      // Clear any existing trail points
      const existingPoints = container.querySelectorAll('.trail-point');
      existingPoints.forEach(point => point.remove());
      trailPoints = [];

      // Set initial position
      star.style.left = (startX - 4) + 'px';
      star.style.top = (startY - 4) + 'px';
      star.style.display = 'block';

      let progress = 0;
      const duration = 500;
      const startTime = Date.now();
      isAnimatingRef.current = true;

      const updateTrailPoints = () => {
        const now = Date.now();
        trailPoints = trailPoints.filter(point => {
          const age = now - point.createdAt;
          const maxAge = 1400;

          if (age > maxAge) {
            if (point.element && point.element.parentNode) {
              point.element.remove();
            }
            return false;
          } else {
            const fadeProgress = age / maxAge;
            const opacity = (1 - fadeProgress) * 0.9;
            if (point.element) {
              point.element.style.opacity = opacity;
            }
            return true;
          }
        });
      };

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = elapsed / duration;

        if (progress <= 1 && isAnimatingRef.current) {
          const x = startX + (endX - startX) * progress;
          const parabolaFactor = 4 * progress * (1 - progress);
          const y = startY + (endY - startY) * progress - parabolaFactor * 100;

          star.style.left = (x - 4) + 'px';
          star.style.top = (y - 4) + 'px';

          // Create dense trail points
          if (trailPoints.length === 0 || 
              Math.abs(x - trailPoints[trailPoints.length - 1].x) > 0.8) {

            const trailElement = document.createElement('div');
            trailElement.className = 'trail-point';
            trailElement.style.cssText = `
              position: fixed;
              width: 4px;
              height: 4px;
              background: radial-gradient(circle, #ffffff 0%, #ffffff 60%, #87ceeb 80%, transparent 100%);
              border-radius: 50%;
              pointer-events: none;
              z-index: 9;
              left: ${x - 2}px;
              top: ${y - 2}px;
              opacity: 0.9;
            `;

            container.appendChild(trailElement);

            trailPoints.push({
              x: x,
              y: y,
              element: trailElement,
              createdAt: Date.now()
            });
          }

          updateTrailPoints();
          requestAnimationFrame(animate);
        } else {
          isAnimatingRef.current = false;
          star.style.display = 'none';

          // Fade out remaining trail
          const fadeOut = () => {
            updateTrailPoints();
            if (trailPoints.length > 0) {
              requestAnimationFrame(fadeOut);
            } else {
              if (onComplete) onComplete();
            }
          };
          fadeOut();
        }
      };

      animate();
    };

    const timer = setTimeout(startAnimation, 100);
    return () => {
      clearTimeout(timer);
      isAnimatingRef.current = false;
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <div
        ref={starRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, #ffffff 0%, #ffffff 30%, #87ceeb 60%, #4169e1 100%)',
          borderRadius: '50%',
          zIndex: 10,
          display: 'none'
        }}
      />
    </div>
  );
};

export default ShootingStarAnimation;