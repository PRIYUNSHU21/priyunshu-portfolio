import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SlideTabsProps {
  activeSection: string;
  onTabClick: (section: string) => void;
  className?: string;
}

export const SlideTabs: React.FC<SlideTabsProps> = ({ 
  activeSection, 
  onTabClick, 
  className = "" 
}) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className={`relative mx-auto flex w-fit rounded-full border-2 border-accent/20 bg-background/80 backdrop-blur-md p-1 shadow-lg ${className}`}
    >
      {navItems.map((item) => (
        <Tab 
          key={item.id}
          setPosition={setPosition}
          isActive={activeSection === item.id}
          onClick={() => onTabClick(item.id)}
        >
          {item.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{
    left: number;
    width: number;
    opacity: number;
  }>>;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, setPosition, isActive, onClick }) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={`relative z-10 block cursor-pointer px-3 py-2 text-xs uppercase font-medium transition-all duration-300 rounded-full md:px-5 md:py-3 md:text-sm hover:scale-105 ${
        isActive 
          ? 'text-black dark:text-white font-semibold' 
          : 'text-muted-foreground hover:text-accent'
      }`}
    >
      {children}
    </li>
  );
};

interface CursorProps {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
      className="absolute z-0 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg md:h-11"
    />
  );
};
