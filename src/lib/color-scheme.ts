/**
 * Pantone-Inspired Color Utilities for Light Mode
 * Professional color grading and synchronization
 */

export const colorScheme = {
  // Primary Pantone-inspired colors
  primary: {
    main: 'hsl(263 70% 50%)', // Rich royal purple
    light: 'hsl(263 70% 60%)',
    dark: 'hsl(263 70% 40%)',
    foreground: 'hsl(0 0% 100%)'
  },
  
  secondary: {
    main: 'hsl(194 100% 39%)', // Professional teal
    light: 'hsl(194 100% 49%)',
    dark: 'hsl(194 100% 29%)',
    foreground: 'hsl(0 0% 100%)'
  },
  
  accent: {
    main: 'hsl(35 100% 55%)', // Warm amber
    light: 'hsl(35 100% 65%)',
    dark: 'hsl(35 100% 45%)',
    foreground: 'hsl(0 0% 100%)'
  },
  
  // Neutral tones
  background: {
    main: 'hsl(210 20% 98%)', // Soft white with blue undertone
    muted: 'hsl(210 20% 94%)',
    card: 'hsl(0 0% 100%)'
  },
  
  text: {
    primary: 'hsl(215 28% 17%)', // Deep navy
    secondary: 'hsl(215 15% 40%)', // Medium gray
    muted: 'hsl(215 10% 60%)'
  },
  
  // Professional gradients
  gradients: {
    primary: 'linear-gradient(135deg, hsl(263 70% 50%), hsl(194 100% 39%), hsl(35 100% 55%))',
    subtle: 'linear-gradient(180deg, hsl(210 20% 98%), hsl(210 20% 94%))',
    card: 'linear-gradient(145deg, hsl(0 0% 100%), hsl(210 20% 97%))',
    accent: 'linear-gradient(135deg, hsl(35 100% 55%), hsl(35 100% 48%))'
  },
  
  // Enhanced shadow system
  shadows: {
    elegant: '0 8px 32px -8px hsl(263 70% 50% / 0.12)',
    soft: '0 4px 16px -4px hsl(194 100% 39% / 0.08)',
    accent: '0 4px 20px -4px hsl(35 100% 55% / 0.15)',
    card: '0 1px 3px 0 hsl(215 28% 17% / 0.05), 0 1px 2px 0 hsl(215 28% 17% / 0.06)'
  }
};

// Utility functions for consistent color application
export const getColorClass = (color: 'primary' | 'secondary' | 'accent', variant: 'main' | 'light' | 'dark' = 'main') => {
  return colorScheme[color][variant];
};

export const getGradientClass = (type: 'primary' | 'subtle' | 'card' | 'accent') => {
  return colorScheme.gradients[type];
};

export const getShadowClass = (type: 'elegant' | 'soft' | 'accent' | 'card') => {
  return colorScheme.shadows[type];
};
