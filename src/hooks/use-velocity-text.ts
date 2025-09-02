import { useEffect, useState, useRef } from 'react';

export const useVelocityText = (speed: number = 1) => {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate transform based on scroll position and element position
      const offset = (scrollY - elementTop + windowHeight) * speed * 0.5;
      
      // Only apply transform when element is near viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        element.style.transform = `translateY(${offset}px)`;
      }
    }
  }, [scrollY, speed]);

  return elementRef;
};

export const useParallaxText = (speed: number = 0.5, direction: 'up' | 'down' = 'up') => {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only apply transform when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = scrollY * speed * (direction === 'up' ? -1 : 1);
        element.style.transform = `translateY(${offset}px)`;
        element.style.willChange = 'transform';
      }
    }
  }, [scrollY, speed, direction]);

  return elementRef;
};
