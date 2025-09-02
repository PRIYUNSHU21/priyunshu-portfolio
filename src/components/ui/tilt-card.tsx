import React, { forwardRef } from 'react';
import { useTilt, useTiltSubtle, useTiltDynamic, useTiltGlow, useTiltStandard } from '../../hooks/use-tilt';
import { cn } from '../../lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'standard' | 'dynamic' | 'glow' | '3d-soft' | '3d-premium' | 'organic' | 'floating';
  children: React.ReactNode;
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ variant = 'standard', className, children, ...props }, forwardedRef) => {
    // Select the appropriate tilt hook based on variant
    const tiltRef = variant === 'subtle' ? useTiltSubtle() :
                   variant === 'dynamic' ? useTiltDynamic() :
                   variant === 'glow' ? useTiltGlow() :
                   variant === '3d-soft' ? useTiltSubtle() :
                   variant === '3d-premium' ? useTiltDynamic() :
                   variant === 'organic' ? useTiltGlow() :
                   variant === 'floating' ? useTiltSubtle() :
                   useTiltStandard();

    // Combine refs if forwardedRef is provided
    const ref = forwardedRef ? forwardedRef : tiltRef;

    return (
      <div
        ref={ref || tiltRef}
        className={cn(
          'transform-gpu transition-all duration-300 ease-out',
          variant === 'subtle' && 'tilt-card-subtle',
          variant === 'dynamic' && 'tilt-card-dynamic', 
          variant === 'glow' && 'tilt-card-glow',
          variant === 'standard' && 'tilt-card',
          variant === '3d-soft' && 'card-3d-soft',
          variant === '3d-premium' && 'card-3d-premium',
          variant === 'organic' && 'card-organic',
          variant === 'floating' && 'card-floating',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TiltCard.displayName = 'TiltCard';

export { TiltCard };
export type { TiltCardProps };
