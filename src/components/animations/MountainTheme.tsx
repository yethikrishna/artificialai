import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MountainThemeProps {
  variant: 'background' | 'accent' | 'loading' | 'success';
  animated?: boolean;
  className?: string;
}

// Mountain-themed SVG components
const MountainBackground = ({ animated = true }: { animated?: boolean }) => (
  <motion.svg
    viewBox="0 0 800 400"
    className="w-full h-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Sky gradient */}
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="100%" stopColor="#E0F6FF" />
      </linearGradient>
      <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A5568" />
        <stop offset="100%" stopColor="#2D3748" />
      </linearGradient>
      <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F7FAFC" />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="800" height="400" fill="url(#skyGradient)" />
    
    {/* Mountains */}
    <motion.path
      d="M0,400 L0,200 L200,100 L400,150 L600,80 L800,120 L800,400 Z"
      fill="url(#mountainGradient)"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    
    {/* Snow caps */}
    <motion.path
      d="M150,120 L200,100 L250,120 Z"
      fill="url(#snowGradient)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    />
    <motion.path
      d="M550,100 L600,80 L650,100 Z"
      fill="url(#snowGradient)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    />
    
    {/* Animated snow particles */}
    {animated && Array.from({ length: 20 }).map((_, i) => (
      <motion.circle
        key={i}
        cx={Math.random() * 800}
        cy={Math.random() * 200}
        r={Math.random() * 3 + 1}
        fill="white"
        opacity={0.7}
        animate={{
          y: [0, 400],
          x: [0, Math.random() * 100 - 50],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </motion.svg>
);

const MountainAccent = () => (
  <motion.svg
    viewBox="0 0 100 60"
    className="w-full h-full"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <defs>
      <linearGradient id="accentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    <path
      d="M10,50 L30,20 L50,30 L70,15 L90,25 L90,50 Z"
      fill="url(#accentGradient)"
    />
    <path
      d="M25,25 L30,20 L35,25 Z"
      fill="white"
      opacity={0.8}
    />
    <path
      d="M65,20 L70,15 L75,20 Z"
      fill="white"
      opacity={0.8}
    />
  </motion.svg>
);

const MountainLoader = () => {
  const [currentPeak, setCurrentPeak] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPeak(prev => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.svg
      viewBox="0 0 120 80"
      className="w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    >
      <defs>
        <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      {/* Three mountain peaks that light up in sequence */}
      {[0, 1, 2].map((peak) => (
        <motion.path
          key={peak}
          d={`M${20 + peak * 30},60 L${30 + peak * 30},30 L${40 + peak * 30},60 Z`}
          fill={currentPeak === peak ? "#FFFFFF" : "url(#loaderGradient)"}
          animate={{
            scale: currentPeak === peak ? 1.1 : 1,
            opacity: currentPeak === peak ? 1 : 0.6,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
      
      {/* Snow caps */}
      {[0, 1, 2].map((peak) => (
        <motion.path
          key={`snow-${peak}`}
          d={`M${25 + peak * 30},35 L${30 + peak * 30},30 L${35 + peak * 30},35 Z`}
          fill="white"
          animate={{
            opacity: currentPeak === peak ? 1 : 0.8,
          }}
        />
      ))}
    </motion.svg>
  );
};

const MountainSuccess = () => (
  <motion.svg
    viewBox="0 0 100 100"
    className="w-full h-full"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <defs>
      <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    
    {/* Mountain with flag on top */}
    <path
      d="M20,80 L50,20 L80,80 Z"
      fill="url(#successGradient)"
    />
    <path
      d="M45,25 L50,20 L55,25 Z"
      fill="white"
    />
    
    {/* Flag pole */}
    <motion.line
      x1="50"
      y1="20"
      x2="50"
      y2="10"
      stroke="#374151"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
    
    {/* Flag */}
    <motion.path
      d="M50,10 L65,15 L50,20 Z"
      fill="#EF4444"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    />
    
    {/* Celebration particles */}
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.circle
        key={i}
        cx={50 + Math.cos(i * Math.PI / 4) * 30}
        cy={50 + Math.sin(i * Math.PI / 4) * 30}
        r="2"
        fill="#FCD34D"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1, 0], 
          opacity: [0, 1, 0],
          x: Math.cos(i * Math.PI / 4) * 20,
          y: Math.sin(i * Math.PI / 4) * 20,
        }}
        transition={{ 
          duration: 1, 
          delay: 0.7 + i * 0.1,
          repeat: Infinity,
          repeatDelay: 2
        }}
      />
    ))}
  </motion.svg>
);

export function MountainTheme({ variant, animated = true, className = "" }: MountainThemeProps) {
  const renderVariant = () => {
    switch (variant) {
      case 'background':
        return <MountainBackground animated={animated} />;
      case 'accent':
        return <MountainAccent />;
      case 'loading':
        return <MountainLoader />;
      case 'success':
        return <MountainSuccess />;
      default:
        return <MountainAccent />;
    }
  };

  return (
    <div className={`mountain-theme ${className}`}>
      {renderVariant()}
    </div>
  );
}

// CSS for mountain theme animations
export const mountainThemeStyles = `
  @keyframes snowfall {
    0% { transform: translateY(-100vh) translateX(0); }
    100% { transform: translateY(100vh) translateX(100px); }
  }
  
  @keyframes mountainPulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  
  @keyframes peakGlow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
  }
  
  .mountain-theme {
    position: relative;
    overflow: hidden;
  }
  
  .mountain-theme.animated::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1));
    animation: mountainPulse 3s ease-in-out infinite;
    z-index: -1;
  }
`;
