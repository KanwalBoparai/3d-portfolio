import React, { useEffect, useState } from 'react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          size: Math.random() * 6 + 3,
          duration: Math.random() * 8 + 18,
          delay: Math.random() * 20,
          color: [
            'rgba(103, 232, 249, 0.6)',
            'rgba(167, 243, 208, 0.5)',
            'rgba(125, 211, 252, 0.6)',
            'rgba(251, 113, 133, 0.4)',
            'rgba(6, 182, 212, 0.6)',
            'rgba(20, 184, 166, 0.5)'
          ][Math.floor(Math.random() * 6)]
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            animationName: 'bubbleFloat',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
