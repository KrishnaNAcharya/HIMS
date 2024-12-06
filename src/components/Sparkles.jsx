import React from 'react';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const Sparkle = ({ style }) => {
  return (
    <div 
      className="absolute animate-sparkle dark:bg-white dark:shadow-white bg-blue-400 shadow-blue-400"
      style={{
        ...style,
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        boxShadow: '0 0 4px 1px currentColor',
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