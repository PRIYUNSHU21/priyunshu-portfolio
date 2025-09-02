import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SpringCardProps {
  children: React.ReactNode;
  className?: string;
  springStrength?: number; // Spring bounce strength (0-1)
  magneticStrength?: number; // Magnetic attraction strength (0-1)
  distance?: number; // Magnetic field distance in pixels
}

export const SpringCard: React.FC<SpringCardProps> = ({
  children,
  className,
  springStrength = 0.6,
  magneticStrength = 0.15,
  distance = 80,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const distanceFromCenter = Math.sqrt(
        Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2)
      );

      // Check if mouse is within magnetic field
      if (distanceFromCenter <= distance) {
        const magneticForce = Math.max(0, 1 - distanceFromCenter / distance);
        const translateX = (e.clientX - cardCenterX) * magneticStrength * magneticForce;
        const translateY = (e.clientY - cardCenterY) * magneticStrength * magneticForce;
        
        setMousePosition({ x: translateX, y: translateY });
        setIsHovered(true);
      } else {
        setMousePosition({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
      setIsPressed(false);
    };

    // Add global mouse move listener
    document.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticStrength, distance]);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative transform-gpu cursor-pointer select-none',
        'transition-all duration-300 ease-out',
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        transform: `
          translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) 
          scale(${isPressed ? 0.98 : isHovered ? 1.02 : 1})
        `,
        transition: isPressed 
          ? 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)' 
          : `transform ${isHovered ? '0.2s' : '0.4s'} cubic-bezier(${springStrength}, 0, 0.2, 1)`,
      }}
    >
      {children}
    </div>
  );
};

export default SpringCard;
