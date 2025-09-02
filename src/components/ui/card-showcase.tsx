/**
 * 3D Card Showcase - Demonstrates all enhanced card variants
 * Features premium 3D effects, organic shapes, and polished animations
 */

import { TiltCard } from './tilt-card';
import { Card, CardContent } from './card';

export const CardShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* 3D Soft Card */}
      <TiltCard variant="3d-soft" className="p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">💎</div>
          <h3 className="text-lg font-bold text-foreground">3D Soft</h3>
          <p className="text-muted-foreground text-sm">Subtle depth with elegant shadows</p>
        </div>
      </TiltCard>

      {/* 3D Premium Card */}
      <TiltCard variant="3d-premium" className="p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">✨</div>
          <h3 className="text-lg font-bold text-foreground">3D Premium</h3>
          <p className="text-muted-foreground text-sm">Enhanced depth with layered effects</p>
        </div>
      </TiltCard>

      {/* Organic Card */}
      <TiltCard variant="organic" className="p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">🌿</div>
          <h3 className="text-lg font-bold text-foreground">Organic</h3>
          <p className="text-muted-foreground text-sm">Natural curves and flowing shapes</p>
        </div>
      </TiltCard>

      {/* Floating Card */}
      <TiltCard variant="floating" className="p-6">
        <div className="text-center space-y-4">
          <div className="text-4xl">🎈</div>
          <h3 className="text-lg font-bold text-foreground">Floating</h3>
          <p className="text-muted-foreground text-sm">Gentle floating animation</p>
        </div>
      </TiltCard>
    </div>
  );
};

// Card variant descriptions for documentation
export const cardVariants = {
  '3d-soft': {
    description: 'Gentle 3D effect with soft shadows and subtle gradients',
    bestFor: 'Content cards, skill displays, information panels',
    features: ['Subtle depth', 'Soft shadows', 'Elegant gradients', 'Smooth hover']
  },
  '3d-premium': {
    description: 'Enhanced 3D effect with layered shadows and premium feel',
    bestFor: 'Featured content, important information, call-to-action cards',
    features: ['Enhanced depth', 'Layered shadows', 'Premium gradients', 'Advanced hover']
  },
  'organic': {
    description: 'Asymmetric rounded corners for a natural, organic appearance',
    bestFor: 'Creative portfolios, artistic content, unique layouts',
    features: ['Organic shapes', 'Asymmetric corners', 'Natural feel', 'Creative design']
  },
  'floating': {
    description: 'Gentle floating animation with 3D movement',
    bestFor: 'Interactive elements, services, feature highlights',
    features: ['Floating animation', 'Gentle movement', 'Eye-catching', 'Playful interaction']
  }
};
