import { useRef, useEffect } from 'react';

interface TiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
  easing?: string;
  glare?: boolean;
  'max-glare'?: number;
  'glare-prerender'?: boolean;
  reverse?: boolean;
  'full-page-listening'?: boolean;
  gyroscope?: boolean;
  gyroscopeMinAngleX?: number;
  gyroscopeMaxAngleX?: number;
  gyroscopeMinAngleY?: number;
  gyroscopeMaxAngleY?: number;
  gyroscopeSamples?: number;
}

const defaultOptions: TiltOptions = {
  max: 15,
  scale: 1.05,
  speed: 300,
  perspective: 1000,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  glare: false,
  'max-glare': 1,
  'glare-prerender': false,
  reverse: false,
  'full-page-listening': false,
  gyroscope: false,
  gyroscopeMinAngleX: -45,
  gyroscopeMaxAngleX: 45,
  gyroscopeMinAngleY: -45,
  gyroscopeMaxAngleY: 45,
  gyroscopeSamples: 10,
};

export const useTilt = (options: TiltOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareElement = useRef<HTMLDivElement>(null);
  const settings = { ...defaultOptions, ...options };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let reverse = settings.reverse ? -1 : 1;

    const getValues = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const percentageX = ((x - centerX) / centerX) * 100;
      const percentageY = ((y - centerY) / centerY) * 100;
      
      const maxTilt = settings.max || 15;
      
      const tiltX = ((percentageY / 100) * maxTilt * reverse);
      const tiltY = ((percentageX / 100) * maxTilt * reverse * -1);
      
      const angle = Math.atan2(percentageX, percentageY);
      
      return {
        tiltX: tiltX,
        tiltY: tiltY,
        percentageX: percentageX,
        percentageY: percentageY,
        angle: angle,
      };
    };

    const updateTransform = (tiltX: number, tiltY: number, scale?: number) => {
      const transformValue = `perspective(${settings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale || 1}, ${scale || 1}, ${scale || 1})`;
      element.style.transform = transformValue;
    };

    const updateGlare = (percentageX: number, percentageY: number) => {
      if (!settings.glare || !glareElement.current) return;
      
      const glarePos = percentageX * percentageY / 100;
      glareElement.current.style.opacity = `${glarePos * (settings['max-glare'] || 1)}`;
      glareElement.current.style.background = `linear-gradient(${Math.atan2(percentageY, percentageX) * (180 / Math.PI)}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${settings['max-glare']}) 50%, rgba(255,255,255,0) 100%)`;
    };

    const onMouseEnter = () => {
      element.style.willChange = 'transform';
      element.style.transition = `${settings.speed}ms ${settings.easing}`;
    };

    const onMouseMove = (event: MouseEvent) => {
      const values = getValues(event);
      updateTransform(values.tiltX, values.tiltY, settings.scale);
      updateGlare(values.percentageX, values.percentageY);
    };

    const onMouseLeave = () => {
      element.style.transition = `${settings.speed}ms ${settings.easing}`;
      updateTransform(0, 0, 1);
      if (glareElement.current) {
        glareElement.current.style.opacity = '0';
      }
      
      setTimeout(() => {
        element.style.willChange = 'auto';
      }, settings.speed || 300);
    };

    // Create glare element if enabled
    if (settings.glare && !glareElement.current) {
      const glareEl = document.createElement('div');
      glareEl.classList.add('js-tilt-glare');
      glareEl.style.position = 'absolute';
      glareEl.style.top = '0';
      glareEl.style.left = '0';
      glareEl.style.width = '100%';
      glareEl.style.height = '100%';
      glareEl.style.borderRadius = 'inherit';
      glareEl.style.overflow = 'hidden';
      glareEl.style.pointerEvents = 'none';
      
      const glareInner = document.createElement('div');
      glareInner.classList.add('js-tilt-glare-inner');
      glareInner.style.position = 'absolute';
      glareInner.style.top = '50%';
      glareInner.style.left = '50%';
      glareInner.style.width = '200%';
      glareInner.style.height = '200%';
      glareInner.style.background = 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)';
      glareInner.style.transform = 'rotate(180deg) translate(-50%, -50%)';
      glareInner.style.transformOrigin = '0% 0%';
      glareInner.style.opacity = '0';
      glareInner.style.transition = `opacity ${settings.speed}ms ${settings.easing}`;
      
      glareEl.appendChild(glareInner);
      element.appendChild(glareEl);
      glareElement.current = glareInner;
    }

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [settings]);

  return ref;
};

// Preset configurations for different tilt effects
export const useTiltSubtle = () => useTilt({ max: 8, scale: 1.02, speed: 300 });
export const useTiltDynamic = () => useTilt({ max: 20, scale: 1.08, speed: 200 });
export const useTiltGlow = () => useTilt({ max: 15, scale: 1.05, speed: 250, glare: true, 'max-glare': 0.3 });
export const useTiltStandard = () => useTilt({ max: 12, scale: 1.03, speed: 300 });
