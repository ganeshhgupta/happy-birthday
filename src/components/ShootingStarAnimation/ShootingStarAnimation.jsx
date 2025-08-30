import React, { useEffect, useRef } from 'react';

const ShootingStarAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const starRef = useRef(null);
  const trailPointsRef = useRef([]);
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
      trailPoints.forEach(point => {
        if (point.element && point.element.parentNode) {
          point.element.parentNode.removeChild(point.element);
        }
        if (point.lineElement && point.lineElement.parentNode) {
          point.lineElement.parentNode.removeChild(point.lineElement);
        }
      });
      trailPoints = [];

      // Set initial position
      star.style.left = (startX - 3) + 'px';
      star.style.top = (startY - 3) + 'px';
      star.style.display = 'block';

      let progress = 0;
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      isAnimatingRef.current = true;

      const updateTrailPoints = () => {
        trailPoints = trailPoints.filter(point => {
          const age = Date.now() - point.createdAt;
          const maxAge = 400;

          if (age > maxAge) {
            // Remove expired trail point and its line
            if (point.element && point.element.parentNode) {
              point.element.parentNode.removeChild(point.element);
            }
            if (point.lineElement && point.lineElement.parentNode) {
              point.lineElement.parentNode.removeChild(point.lineElement);
            }
            return false;
          } else {
            // Fade out the trail point and its connecting line
            const fadeProgress = age / maxAge;
            const opacity = (1 - fadeProgress) * 0.8;
            point.element.style.opacity = opacity;

            if (point.lineElement) {
              point.lineElement.style.opacity = opacity;
            }
            return true;
          }
        });
      };

      const fadeOutTrail = () => {
        updateTrailPoints();

        if (trailPoints.length > 0) {
          // Continue fading if there are still trail points
          requestAnimationFrame(fadeOutTrail);
        } else {
          // All trail points have faded, animation complete
          if (onComplete) {
            onComplete();
          }
        }
      };

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = elapsed / duration;

        if (progress <= 1 && isAnimatingRef.current) {
          // Calculate current position
          const x = startX + (endX - startX) * progress;
          const parabolaFactor = 4 * progress * (1 - progress);
          const y = startY + (endY - startY) * progress - parabolaFactor * 100;

          // Update star position (centered properly)
          star.style.left = (x - 3) + 'px';
          star.style.top = (y - 3) + 'px';

          // Add new trail point every few frames
          if (trailPoints.length === 0 || 
              Math.abs(x - trailPoints[trailPoints.length - 1].x) > 3 || 
              Math.abs(y - trailPoints[trailPoints.length - 1].y) > 3) {

            const trailElement = document.createElement('div');
            trailElement.className = 'trail-point';
            trailElement.style.position = 'fixed';
            trailElement.style.width = '2px';
            trailElement.style.height = '2px';
            trailElement.style.background = 'radial-gradient(circle, #ffffff 0%, #87ceeb 70%, transparent 100%)';
            trailElement.style.borderRadius = '50%';
            trailElement.style.boxShadow = '0 0 4px rgba(255, 255, 255, 0.4), 0 0 8px rgba(135, 206, 235, 0.2)';
            trailElement.style.pointerEvents = 'none';
            trailElement.style.zIndex = '9';
            trailElement.style.left = (x - 1) + 'px';
            trailElement.style.top = (y - 1) + 'px';
            container.appendChild(trailElement);

            const trailPoint = {
              x: x,
              y: y,
              element: trailElement,
              createdAt: Date.now(),
              opacity: 0.8
            };

            trailPoints.push(trailPoint);

            // Connect to previous point with a line
            if (trailPoints.length > 1) {
              const prevPoint = trailPoints[trailPoints.length - 2];
              const lineElement = document.createElement('div');
              lineElement.className = 'trail-line';
              lineElement.style.position = 'fixed';
              lineElement.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(135, 206, 235, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)';
              lineElement.style.height = '2px';
              lineElement.style.borderRadius = '1px';
              lineElement.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.2)';
              lineElement.style.pointerEvents = 'none';
              lineElement.style.zIndex = '8';
              lineElement.style.transformOrigin = 'left center';

              // Calculate line properties
              const dx = x - prevPoint.x;
              const dy = y - prevPoint.y;
              const length = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx) * 180 / Math.PI;

              lineElement.style.left = (prevPoint.x) + 'px';
              lineElement.style.top = (prevPoint.y - 1) + 'px';
              lineElement.style.width = length + 'px';
              lineElement.style.transform = `rotate(${angle}deg)`;

              container.appendChild(lineElement);

              trailPoint.lineElement = lineElement;
            }
          }

          // Update existing trail points - fade them out over time
          updateTrailPoints();

          requestAnimationFrame(animate);
        } else {
          // Animation ended - stop creating new trail points
          isAnimatingRef.current = false;
          star.style.display = 'none';

          // Continue updating trail points until they all fade out
          fadeOutTrail();
        }
      };

      animate();
    };

    // Start animation after a brief delay
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
        className="shooting-star"
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          background: 'radial-gradient(circle, #ffffff 0%, #87ceeb 50%, #4169e1 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(135, 206, 235, 0.6), 0 0 40px rgba(65, 105, 225, 0.4)',
          zIndex: 10,
          display: 'none'
        }}
      />
    </div>
  );
};

export default ShootingStarAnimation;