import React, { useEffect, useRef } from 'react';

interface InteractiveGridProps {
  className?: string;
}

export const InteractiveGrid: React.FC<InteractiveGridProps> = ({ className = '' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const lastMoveTimeRef = useRef<number>(0);
  const fadeTimeoutRef = useRef<NodeJS.Timeout>();
  const isAnimatingRef = useRef<boolean>(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cells: HTMLDivElement[] = [];
    
    // Optimized grid sizing for better performance
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const gridCols = screenWidth < 768 ? 15 : screenWidth < 1200 ? 20 : 25; // Reduced cell count
    const gridRows = screenHeight < 600 ? 12 : screenHeight < 900 ? 15 : 18;
    const cellSize = screenWidth / gridCols;

    // Create grid cells with optimized styling
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.style.cssText = `
          position: absolute;
          width: ${cellSize}px;
          height: ${cellSize}px;
          border: 1px solid rgba(167, 139, 250, 0.05);
          background-color: rgba(167, 139, 250, 0.01);
          transition: none;
          pointer-events: none;
          opacity: 0.3;
          will-change: transform, background-color, opacity;
          transform: translateZ(0);
          left: ${col * cellSize}px;
          top: ${row * cellSize}px;
        `;
        
        grid.appendChild(cell);
        cells.push(cell);
      }
    }

    // Highly optimized animation function
    const updateGrid = () => {
      const { x, y } = mouseRef.current;
      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - lastMoveTimeRef.current;
      
      // Fade effect if mouse hasn't moved for a while
      const fadeIntensity = Math.max(0, 1 - (timeSinceLastMove / 1500));
      const isMouseActive = timeSinceLastMove < 50; // Mouse is actively moving
      
      // Early exit if fade is complete and mouse is not active
      if (fadeIntensity <= 0.01 && !isMouseActive) {
        cells.forEach(cell => {
          cell.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
          cell.style.backgroundColor = 'rgba(167, 139, 250, 0.01)';
          cell.style.borderColor = 'rgba(167, 139, 250, 0.05)';
          cell.style.boxShadow = 'none';
          cell.style.opacity = '0.3';
        });
        isAnimatingRef.current = false;
        return;
      }
      
      const maxDistance = cellSize * 1.8;
      const maxDistanceSquared = maxDistance * maxDistance; // Avoid sqrt when possible
      
      cells.forEach((cell, index) => {
        const row = Math.floor(index / gridCols);
        const col = index % gridCols;
        const cellX = col * cellSize + cellSize / 2;
        const cellY = row * cellSize + cellSize / 2;
        
        const dx = x - cellX;
        const dy = y - cellY;
        const distanceSquared = dx * dx + dy * dy;
        
        if (distanceSquared < maxDistanceSquared && (fadeIntensity > 0 || isMouseActive)) {
          const distance = Math.sqrt(distanceSquared);
          const baseIntensity = Math.max(0, 1 - (distance / maxDistance));
          const intensity = isMouseActive ? baseIntensity : baseIntensity * fadeIntensity;
          
          // Simplified zones for better performance
          let scale, opacity, glow;
          
          if (distance < maxDistance * 0.3) {
            // Core area
            scale = 1 + intensity * 0.6;
            opacity = 0.6 + intensity * 0.4;
            glow = intensity * 20;
          } else {
            // Outer area
            scale = 1 + intensity * 0.2;
            opacity = 0.1 + intensity * 0.3;
            glow = intensity * 10;
          }
          
          // Use transform3d for hardware acceleration
          cell.style.transform = `scale3d(${scale}, ${scale}, 1) translateZ(0)`;
          cell.style.backgroundColor = `rgba(167, 139, 250, ${opacity})`;
          cell.style.boxShadow = glow > 0 ? `0 0 ${glow}px rgba(167, 139, 250, ${intensity * 0.8})` : 'none';
          cell.style.opacity = (0.7 + intensity * 0.3).toString();
          
        } else {
          // Reset to base state
          cell.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
          cell.style.backgroundColor = 'rgba(167, 139, 250, 0.01)';
          cell.style.boxShadow = 'none';
          cell.style.opacity = (0.3 * Math.max(fadeIntensity, 0.3)).toString();
        }
      });
      
      // Continue animation if mouse is active or fade is happening
      if (isMouseActive || fadeIntensity > 0.01) {
        animationFrameRef.current = requestAnimationFrame(updateGrid);
      } else {
        isAnimatingRef.current = false;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to viewport
      const x = e.clientX;
      const y = e.clientY;
      
      mouseRef.current = { x, y };
      lastMoveTimeRef.current = Date.now();
      
      // Clear any existing fade timeout
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      // Always update on mouse move for immediate hover effects
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isAnimatingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(updateGrid);
      
      // Start fade animation after 100ms of no movement
      fadeTimeoutRef.current = setTimeout(() => {
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true;
          updateGrid();
        }
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Simplified click effect for better performance
      cells.forEach((cell, index) => {
        const row = Math.floor(index / gridCols);
        const col = index % gridCols;
        const cellX = col * cellSize + cellSize / 2;
        const cellY = row * cellSize + cellSize / 2;
        
        const dx = x - cellX;
        const dy = y - cellY;
        const distanceSquared = dx * dx + dy * dy;
        const maxDistanceSquared = (cellSize * 2.5) * (cellSize * 2.5);
        
        if (distanceSquared < maxDistanceSquared) {
          const distance = Math.sqrt(distanceSquared);
          const maxDistance = cellSize * 2.5;
          const intensity = 1 - (distance / maxDistance);
          const delay = (distance / maxDistance) * 100;
          
          setTimeout(() => {
            cell.style.transition = 'transform 0.15s ease, background-color 0.15s ease';
            cell.style.transform = `scale3d(${1 + intensity * 0.4}, ${1 + intensity * 0.4}, 1) translateZ(0)`;
            cell.style.backgroundColor = `rgba(167, 139, 250, ${0.5 + intensity * 0.3})`;
            
            setTimeout(() => {
              cell.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
              cell.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
              cell.style.backgroundColor = 'rgba(167, 139, 250, 0.01)';
            }, 80);
          }, delay);
        }
      });
    };

    const handleMouseLeave = () => {
      lastMoveTimeRef.current = 0; // Reset timestamp to trigger immediate fade
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        updateGrid(); // Start fade animation
      }
    };

    // Listen on document instead of grid to catch all mouse movements
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clear any pending timeout
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      
      cells.forEach(cell => {
        if (grid.contains(cell)) {
          grid.removeChild(cell);
        }
      });
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{
        pointerEvents: 'none', // This prevents the grid from blocking interactions
        zIndex: 0, // Keep it behind content
      }}
    />
  );
};
