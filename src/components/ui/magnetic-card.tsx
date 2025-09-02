import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  distance?: number;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = '',
  strength = 0.3,
  distance = 100,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (dist < distance) {
        const force = (distance - dist) / distance;
        const moveX = deltaX * force * strength;
        const moveY = deltaY * force * strength;
        const rotateX = (deltaY * force * strength) / 2;
        const rotateY = -(deltaX * force * strength) / 2;
        
        card.style.transform = `
          translate3d(${moveX}px, ${moveY}px, 0)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${1 + force * 0.1})
        `;
        
        if (!isHovered) {
          setIsHovered(true);
        }
      } else {
        if (isHovered) {
          card.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)';
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      card.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) scale(1)';
      setIsHovered(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, distance, isHovered]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-all duration-300 ease-out will-change-transform',
        isHovered && 'z-10',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
};
