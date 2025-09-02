import React, { useRef, useEffect } from 'react';

interface MagneticTickerProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticTicker: React.FC<MagneticTickerProps> = ({ 
  children, 
  strength = 0.3, 
  className = '' 
}) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ticker.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      // Check if mouse is near the ticker
      const distance = Math.abs(y - (rect.top + rect.height / 2));
      const maxDistance = 100; // pixels
      
      if (distance < maxDistance) {
        const intensity = 1 - (distance / maxDistance);
        const pullY = (rect.top + rect.height / 2 - y) * strength * intensity;
        
        ticker.style.transform = `translateY(${pullY}px)`;
        ticker.style.filter = `brightness(${1 + intensity * 0.2})`;
      } else {
        ticker.style.transform = 'translateY(0px)';
        ticker.style.filter = 'brightness(1)';
      }
    };

    const handleMouseLeave = () => {
      ticker.style.transform = 'translateY(0px)';
      ticker.style.filter = 'brightness(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div 
      ref={tickerRef}
      className={`transition-all duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
};
