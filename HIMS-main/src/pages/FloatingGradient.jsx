// src/components/FloatingGradient.jsx

import React, { useEffect, useRef } from 'react';

const FloatingGradient = () => {
  const gradientRef = useRef(null);

  const onMouseMove = (e) => {
    if (gradientRef.current) {
      gradientRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={gradientRef}
      className="floating-gradient"
    />
  );
};

export default FloatingGradient;
