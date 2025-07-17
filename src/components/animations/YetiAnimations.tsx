import React from 'react';
import { RiveScrollController } from './RiveScrollController';

// YetiLogo Component with Rive integration
interface YetiLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export const YetiLogo: React.FC<YetiLogoProps> = ({ 
  size = 40, 
  className = "", 
  animated = true 
}) => {
  if (animated) {
    return (
      <RiveScrollController
        src="/animations/yeti-logo.riv"
        stateMachine="Logo State Machine"
        artboard="Logo"
        width={size}
        height={size}
        scrollBound={false}
        className={`yeti-logo ${className}`}
        onLoad={() => console.log('YETI logo loaded')}
      />
    );
  }

  // Fallback static logo
  return (
    <div 
      className={`yeti-logo-fallback ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="yeti-text">YETI</div>
    </div>
  );
};

// YetiAnimation Component for various animation states
interface YetiAnimationProps {
  type: 'loading' | 'thinking' | 'success' | 'error' | 'idle';
  size?: number;
  className?: string;
}

export const YetiAnimation: React.FC<YetiAnimationProps> = ({ 
  type, 
  size = 60, 
  className = "" 
}) => {
  const getAnimationConfig = () => {
    switch (type) {
      case 'loading':
        return {
          src: "/animations/mountain-loading.riv",
          stateMachine: "Loading State Machine",
          artboard: "Loading"
        };
      case 'thinking':
        return {
          src: "/animations/yeti-logo.riv",
          stateMachine: "Thinking State Machine", 
          artboard: "Thinking"
        };
      case 'success':
        return {
          src: "/animations/mountain-loading.riv",
          stateMachine: "Success State Machine",
          artboard: "Success"
        };
      case 'error':
        return {
          src: "/animations/mountain-loading.riv",
          stateMachine: "Error State Machine",
          artboard: "Error"
        };
      default:
        return {
          src: "/animations/yeti-logo.riv",
          stateMachine: "Idle State Machine",
          artboard: "Idle"
        };
    }
  };

  const config = getAnimationConfig();

  return (
    <RiveScrollController
      src={config.src}
      stateMachine={config.stateMachine}
      artboard={config.artboard}
      width={size}
      height={size}
      scrollBound={false}
      className={`yeti-animation yeti-${type} ${className}`}
      onLoad={() => console.log(`YETI ${type} animation loaded`)}
    />
  );
};