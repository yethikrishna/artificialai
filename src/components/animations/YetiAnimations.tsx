import React from 'react';

// Types for the animation components
export interface YetiLogoProps {
  size?: number;
  className?: string;
}

export interface YetiAnimationProps {
  type?: 'loading' | 'thinking' | 'success' | 'error' | 'idle';
  size?: number;
  className?: string;
}

// Enhanced CSS-based animations as primary system
export const YetiLogo: React.FC<YetiLogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div 
      className={`yeti-logo-container ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="yeti-logo-animation">
        <div className="mountain-peak"></div>
        <div className="snow-cap"></div>
        <div className="yeti-face">
          <div className="eye left"></div>
          <div className="eye right"></div>
          <div className="mouth"></div>
        </div>
        <div className="snow-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
    </div>
  );
};

export const YetiAnimation: React.FC<YetiAnimationProps> = ({ 
  type = "idle", 
  size = 60, 
  className = "" 
}) => {
  return (
    <div 
      className={`yeti-animation-container yeti-${type} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="yeti-main-animation">
        {type === "loading" && (
          <div className="loading-spinner">
            <div className="mountain-loader">
              <div className="peak-1"></div>
              <div className="peak-2"></div>
              <div className="peak-3"></div>
            </div>
            <div className="snow-fall">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`snowflake snowflake-${i + 1}`}>❄</div>
              ))}
            </div>
          </div>
        )}
        
        {type === "thinking" && (
          <div className="thinking-animation">
            <div className="yeti-head">
              <div className="thought-bubble">
                <div className="bubble bubble-1">💭</div>
                <div className="bubble bubble-2">🧠</div>
                <div className="bubble bubble-3">⚡</div>
              </div>
            </div>
          </div>
        )}
        
        {type === "success" && (
          <div className="success-animation">
            <div className="checkmark">✓</div>
            <div className="success-glow"></div>
            <div className="celebration-particles">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`particle particle-${i + 1}`}>⭐</div>
              ))}
            </div>
          </div>
        )}
        
        {type === "error" && (
          <div className="error-animation">
            <div className="error-icon">⚠️</div>
            <div className="error-shake"></div>
          </div>
        )}
        
        {type === "idle" && (
          <div className="idle-animation">
            <div className="yeti-breathing">
              <div className="mountain-silhouette"></div>
              <div className="aurora-lights">
                <div className="aurora aurora-1"></div>
                <div className="aurora aurora-2"></div>
                <div className="aurora aurora-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Mountain Theme Component
export const MountainTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mountain-theme-container">
      <div className="mountain-background">
        <div className="mountain-layer mountain-back"></div>
        <div className="mountain-layer mountain-mid"></div>
        <div className="mountain-layer mountain-front"></div>
      </div>
      <div className="aurora-background">
        <div className="aurora-strip aurora-1"></div>
        <div className="aurora-strip aurora-2"></div>
        <div className="aurora-strip aurora-3"></div>
      </div>
      <div className="snow-overlay">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`snow-particle snow-${i + 1}`}>❄</div>
        ))}
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
};

// Export mountain theme styles as a string for injection
export const mountainThemeStyles = `
  .mountain-theme-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .mountain-background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    z-index: 1;
  }
  
  .mountain-layer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  
  .mountain-back {
    background: linear-gradient(to top, #4a5568 0%, #718096 100%);
    clip-path: polygon(0% 100%, 15% 60%, 35% 80%, 50% 40%, 65% 70%, 85% 50%, 100% 100%);
    opacity: 0.6;
  }
  
  .mountain-mid {
    background: linear-gradient(to top, #2d3748 0%, #4a5568 100%);
    clip-path: polygon(0% 100%, 25% 70%, 45% 50%, 70% 60%, 90% 40%, 100% 100%);
    opacity: 0.8;
  }
  
  .mountain-front {
    background: linear-gradient(to top, #1a202c 0%, #2d3748 100%);
    clip-path: polygon(0% 100%, 20% 80%, 40% 60%, 60% 70%, 80% 50%, 100% 100%);
    opacity: 1;
  }
  
  .aurora-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    z-index: 2;
  }
  
  .aurora-strip {
    position: absolute;
    height: 3px;
    border-radius: 2px;
    animation: auroraFlow 8s ease-in-out infinite;
  }
  
  .aurora-1 {
    top: 20%;
    left: 10%;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(72, 187, 120, 0.6), transparent);
    animation-delay: 0s;
  }
  
  .aurora-2 {
    top: 35%;
    left: 30%;
    width: 50%;
    background: linear-gradient(90deg, transparent, rgba(66, 153, 225, 0.6), transparent);
    animation-delay: 2.5s;
  }
  
  .aurora-3 {
    top: 50%;
    left: 15%;
    width: 45%;
    background: linear-gradient(90deg, transparent, rgba(159, 122, 234, 0.6), transparent);
    animation-delay: 5s;
  }
  
  .snow-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    pointer-events: none;
  }
  
  .snow-particle {
    position: absolute;
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    animation: gentleSnowFall 15s linear infinite;
  }
  
  .content-overlay {
    position: relative;
    z-index: 4;
    width: 100%;
    height: 100%;
  }
  
  @keyframes gentleSnowFall {
    0% { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh) translateX(50px) rotate(360deg); opacity: 0; }
  }
  
  /* Distribute snow particles */
  .snow-1 { left: 5%; animation-delay: 0s; }
  .snow-2 { left: 15%; animation-delay: 2s; }
  .snow-3 { left: 25%; animation-delay: 4s; }
  .snow-4 { left: 35%; animation-delay: 6s; }
  .snow-5 { left: 45%; animation-delay: 8s; }
  .snow-6 { left: 55%; animation-delay: 10s; }
  .snow-7 { left: 65%; animation-delay: 12s; }
  .snow-8 { left: 75%; animation-delay: 14s; }
  .snow-9 { left: 85%; animation-delay: 1s; }
  .snow-10 { left: 95%; animation-delay: 3s; }
  .snow-11 { left: 10%; animation-delay: 5s; }
  .snow-12 { left: 20%; animation-delay: 7s; }
  .snow-13 { left: 30%; animation-delay: 9s; }
  .snow-14 { left: 40%; animation-delay: 11s; }
  .snow-15 { left: 50%; animation-delay: 13s; }
  .snow-16 { left: 60%; animation-delay: 1.5s; }
  .snow-17 { left: 70%; animation-delay: 3.5s; }
  .snow-18 { left: 80%; animation-delay: 5.5s; }
  .snow-19 { left: 90%; animation-delay: 7.5s; }
  .snow-20 { left: 2%; animation-delay: 9.5s; }
`;