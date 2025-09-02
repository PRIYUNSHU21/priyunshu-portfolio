import React from 'react';
import { motion } from 'framer-motion';

interface SkillSliderProps {
  value: number;
  onChange: (value: number) => void;
  skillName: string;
  className?: string;
}

export const SkillSlider: React.FC<SkillSliderProps> = ({ 
  value, 
  onChange, 
  skillName,
  className = "" 
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={`relative w-full py-3 ${className}`}>
      {/* Custom Horizontal Slider */}
      <div className="relative h-3 bg-muted rounded-full">
        {/* Filled Track */}
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
        
        {/* Large Black Slider Knob - Properly positioned */}
        <motion.div
          className="absolute top-1/2 w-6 h-6 bg-black rounded-full shadow-xl border-2 border-white cursor-pointer z-20"
          style={{
            left: `calc(${value}% - 12px)`, // Offset by half knob width
            transform: 'translateY(-50%)',
            marginLeft: value === 0 ? '0px' : value === 100 ? '-12px' : '12px' // Adjust for edge cases
          }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Inner white highlight */}
          <div className="absolute inset-1 bg-white/20 rounded-full" />
        </motion.div>
        
        {/* Range Input Overlay - Expanded for better interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          className="absolute w-full h-8 opacity-0 cursor-pointer z-30"
          style={{ 
            top: '-10px', // Center the expanded clickable area
            left: '0',
            right: '0'
          }}
          title={`${skillName}: ${value}%`}
        />
      </div>
    </div>
  );
};
