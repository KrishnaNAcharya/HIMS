import React from 'react';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const Sparkle = ({ style }) => {
  return (
    <div 
      className="absolute w-1 h-1 rounded-full animate-sparkle dark:text-white text-blue-400"
      style={{
        ...style,
        background: 'currentColor',
        boxShadow: '0 0 8px 2px currentColor',
      }}
    />
  );
};

const Sparkles = () => {
  const sparkles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    style: {
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
      animationDelay: `${random(0, 2000)}ms`,
    }
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map(sparkle => (
        <Sparkle key={sparkle.id} style={sparkle.style} />
      ))}
    </div>
  );
};

export default Sparkles;