import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SquishyCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hoverScale?: number;
  squishDuration?: number;
  backgroundElements?: React.ReactNode;
}

export const SquishyCard: React.FC<SquishyCardProps> = ({
  children,
  className,
  gradient = "from-accent to-secondary",
  hoverScale = 1.05,
  squishDuration = 1,
  backgroundElements
}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: squishDuration,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: hoverScale,
        },
      }}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-3xl p-6 sm:p-8",
        `bg-gradient-to-br ${gradient}`,
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
      {backgroundElements && (
        <div className="absolute inset-0 z-0">
          {backgroundElements}
        </div>
      )}
    </motion.div>
  );
};

interface SquishyContactCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SquishyContactCard: React.FC<SquishyContactCardProps> = ({ 
  children, 
  className 
}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 0.4,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.02,
          rotateX: 1,
          rotateY: 1,
        },
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl transform-gpu perspective-1000",
        className
      )}
    >
      <motion.div
        variants={{
          hover: {
            scale: 1.03,
            rotateX: -0.5,
          },
        }}
        transition={{
          duration: 0.4,
          ease: "backInOut",
        }}
        className="relative z-10 h-full w-full"
      >
        {children}
      </motion.div>
      <SquishyBackground />
    </motion.div>
  );
};

const SquishyBackground: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.15,
        },
      }}
      transition={{
        duration: 0.4,
        ease: "backInOut",
      }}
    >
      {/* More pronounced animated background shapes */}
      <motion.div
        variants={{
          hover: {
            scaleY: 0.3,
            scaleX: 1.4,
            y: -30,
            rotate: 20,
          },
        }}
        transition={{
          duration: 0.4,
          ease: "backInOut",
          delay: 0.02,
        }}
        className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white/10"
      />
      <motion.div
        variants={{
          hover: {
            scaleY: 3,
            scaleX: 0.6,
            y: -25,
            rotate: -12,
          },
        }}
        transition={{
          duration: 0.4,
          ease: "backInOut",
          delay: 0.05,
        }}
        className="absolute bottom-10 right-10 w-24 h-16 rounded-full bg-white/15"
      />
      <motion.div
        variants={{
          hover: {
            scale: 1.8,
            rotate: 30,
            x: 15,
            y: -15,
          },
        }}
        transition={{
          duration: 0.4,
          ease: "backInOut",
          delay: 0.08,
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-white/5"
      />
      <motion.div
        variants={{
          hover: {
            scaleX: 0.4,
            scaleY: 2,
            rotate: -25,
            x: -20,
          },
        }}
        transition={{
          duration: 0.4,
          ease: "backInOut",
          delay: 0.03,
        }}
        className="absolute top-1/4 right-1/4 w-20 h-28 rounded-2xl bg-white/8"
      />
    </motion.div>
  );
};

interface SquishyFormCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SquishyFormCard: React.FC<SquishyFormCardProps> = ({ 
  children, 
  className 
}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 0.5,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.04,
          rotateX: 2,
          rotateY: -1,
        },
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl",
        "transform-gpu perspective-1000",
        className
      )}
    >
      <motion.div
        variants={{
          hover: {
            scale: 1.06,
            rotateX: -1,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
        }}
        className="relative z-10 h-full w-full"
      >
        {children}
      </motion.div>
      <FormBackground />
    </motion.div>
  );
};

const FormBackground: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.3,
        },
      }}
      transition={{
        duration: 0.5,
        ease: "backInOut",
      }}
    >
      {/* Enhanced animated form background */}
      <motion.div
        variants={{
          hover: {
            scaleX: 0.6,
            scaleY: 1.4,
            y: -30,
            rotate: -12,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
          delay: 0.05,
        }}
        className="absolute top-10 right-10 w-32 h-32 rounded-3xl bg-white/6"
      />
      <motion.div
        variants={{
          hover: {
            scaleY: 2.8,
            scaleX: 0.8,
            x: -25,
            rotate: 18,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
          delay: 0.1,
        }}
        className="absolute bottom-16 left-10 w-16 h-28 rounded-full bg-white/10"
      />
      <motion.div
        variants={{
          hover: {
            scale: 1.8,
            rotate: -15,
            x: 15,
            y: 15,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
          delay: 0.08,
        }}
        className="absolute top-1/3 left-1/3 w-36 h-36 rounded-3xl bg-white/4"
      />
      <motion.div
        variants={{
          hover: {
            scaleX: 1.6,
            scaleY: 0.6,
            rotate: 25,
            y: -20,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "backInOut",
          delay: 0.12,
        }}
        className="absolute top-2/3 right-1/4 w-20 h-20 rounded-2xl bg-white/8"
      />
    </motion.div>
  );
};

export default SquishyCard;
