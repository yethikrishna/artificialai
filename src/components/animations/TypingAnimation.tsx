import { YetiAnimation } from './YetiAnimations';

interface TypingAnimationProps {
  isTyping: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  size?: number;
  variant?: 'default' | 'yeti' | 'mountain';
  className?: string;
}

export function TypingAnimation({ 
  isTyping, 
  speed = 'medium', 
  size = 24,
  variant = 'yeti',
  className = "" 
}: TypingAnimationProps) {
  if (!isTyping) return null;

  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow': return '2s';
      case 'fast': return '0.8s';
      default: return '1.2s';
    }
  };

  if (variant === 'yeti') {
    return <YetiAnimation type="thinking" size={size} className={className} />;
  }

  // Fallback typing dots animation
  return (
    <div className={`typing-animation ${className}`} style={{ fontSize: size / 2 }}>
      <span 
        className="typing-dot" 
        style={{ animationDuration: getAnimationDuration() }}
      >
        •
      </span>
      <span 
        className="typing-dot" 
        style={{ 
          animationDuration: getAnimationDuration(),
          animationDelay: '0.2s'
        }}
      >
        •
      </span>
      <span 
        className="typing-dot" 
        style={{ 
          animationDuration: getAnimationDuration(),
          animationDelay: '0.4s'
        }}
      >
        •
      </span>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .typing-animation {
            display: inline-flex;
            align-items: center;
            gap: 2px;
          }
          
          .typing-dot {
            opacity: 0.4;
            animation: typingPulse ${getAnimationDuration()} ease-in-out infinite;
          }
          
          @keyframes typingPulse {
            0%, 60%, 100% { opacity: 0.4; }
            30% { opacity: 1; }
          }
        `
      }} />
    </div>
  );
}