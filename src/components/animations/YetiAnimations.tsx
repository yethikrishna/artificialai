import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface YetiAnimationProps {
  type: 'logo' | 'loading' | 'thinking' | 'success' | 'error' | 'skill';
  state?: string;
  size?: number;
  className?: string;
  onStateChange?: (state: string) => void;
}

// Animation configurations for different types
const ANIMATION_CONFIGS = {
  logo: {
    src: '/animations/yeti-logo.riv',
    stateMachine: 'LogoStateMachine',
    autoplay: true,
    states: ['idle', 'hover', 'pulse']
  },
  loading: {
    src: '/animations/yeti-loading.riv',
    stateMachine: 'LoadingStateMachine',
    autoplay: true,
    states: ['spinning', 'pulsing', 'breathing']
  },
  thinking: {
    src: '/animations/yeti-thinking.riv',
    stateMachine: 'ThinkingStateMachine',
    autoplay: true,
    states: ['idle', 'processing', 'complete']
  },
  success: {
    src: '/animations/yeti-success.riv',
    stateMachine: 'SuccessStateMachine',
    autoplay: false,
    states: ['idle', 'celebrate', 'complete']
  },
  error: {
    src: '/animations/yeti-error.riv',
    stateMachine: 'ErrorStateMachine',
    autoplay: false,
    states: ['idle', 'shake', 'warning']
  },
  skill: {
    src: '/animations/yeti-skills.riv',
    stateMachine: 'SkillStateMachine',
    autoplay: true,
    states: ['writing', 'coding', 'image', 'translate', 'research', 'music']
  }
};

// Fallback CSS animations when Rive files are not available
const FallbackAnimation = ({ type, state, size = 40, className = "" }: YetiAnimationProps) => {
  const getAnimationStyle = () => {
    switch (type) {
      case 'logo':
        return {
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #1E40AF)',
          borderRadius: '50%',
          animation: state === 'hover' ? 'pulse 1s infinite' : 'rotate 6s linear infinite'
        };
      case 'loading':
        return {
          background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #1E40AF, #3B82F6)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        };
      case 'thinking':
        return {
          background: 'linear-gradient(45deg, #60A5FA, #A78BFA)',
          borderRadius: '50%',
          animation: 'breathe 2s ease-in-out infinite'
        };
      case 'success':
        return {
          background: 'linear-gradient(135deg, #10B981, #34D399)',
          borderRadius: '50%',
          animation: state === 'celebrate' ? 'bounce 0.5s ease-in-out 3' : 'none'
        };
      case 'error':
        return {
          background: 'linear-gradient(135deg, #EF4444, #F87171)',
          borderRadius: '50%',
          animation: state === 'shake' ? 'shake 0.5s ease-in-out 3' : 'none'
        };
      case 'skill':
        return {
          background: getSkillGradient(state || 'writing'),
          borderRadius: '50%',
          animation: 'skillPulse 2s ease-in-out infinite'
        };
      default:
        return {
          background: '#3B82F6',
          borderRadius: '50%'
        };
    }
  };

  const getSkillGradient = (skill: string) => {
    const gradients: Record<string, string> = {
      writing: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
      coding: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      image: 'linear-gradient(135deg, #10B981, #059669)',
      translate: 'linear-gradient(135deg, #F59E0B, #D97706)',
      research: 'linear-gradient(135deg, #EF4444, #DC2626)',
      music: 'linear-gradient(135deg, #06B6D4, #0891B2)'
    };
    return gradients[skill] || gradients.writing;
  };

  return (
    <motion.div
      className={`yeti-animation-fallback ${className}`}
      style={{
        width: size,
        height: size,
        ...getAnimationStyle()
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export function YetiAnimation({ type, state, size = 40, className = "", onStateChange }: YetiAnimationProps) {
  const [useRiveAnimation, setUseRiveAnimation] = useState(true);
  const config = ANIMATION_CONFIGS[type];

  const { rive, RiveComponent } = useRive({
    src: config.src,
    stateMachines: config.stateMachine,
    autoplay: config.autoplay,
    onLoad: () => {
      console.log(`Rive animation loaded: ${type}`);
      setUseRiveAnimation(true);
    },
    onLoadError: (error) => {
      console.warn(`Rive animation failed to load: ${type}`, error);
      setUseRiveAnimation(false);
    },
    onStateChange: (event) => {
      if (event.data && Array.isArray(event.data) && event.data.length > 0) {
        const newState = String(event.data[0]);
        onStateChange?.(newState);
      }
    },
  });

  // State machine inputs for controlling animations
  const stateInput = useStateMachineInput(rive, config.stateMachine, 'State');
  const triggerInput = useStateMachineInput(rive, config.stateMachine, 'Trigger');

  // Update state when prop changes
  useEffect(() => {
    if (stateInput && state && config.states.includes(state)) {
      stateInput.value = config.states.indexOf(state);
    }
  }, [state, stateInput, config.states]);

  // Trigger animations
  const triggerAnimation = (trigger: string) => {
    if (triggerInput) {
      triggerInput.fire();
    }
  };

  // If Rive animation fails to load, use fallback
  if (!useRiveAnimation) {
    return <FallbackAnimation type={type} state={state} size={size} className={className} />;
  }

  return (
    <div 
      className={`yeti-rive-animation ${className}`}
      style={{ width: size, height: size }}
      onClick={() => triggerAnimation('click')}
      onMouseEnter={() => triggerAnimation('hover')}
    >
      <RiveComponent />
    </div>
  );
}

// Specialized components for common use cases
export function YetiLogo({ size = 40, animated = true, className = "" }: { 
  size?: number; 
  animated?: boolean; 
  className?: string; 
}) {
  return (
    <YetiAnimation
      type="logo"
      state={animated ? 'pulse' : 'idle'}
      size={size}
      className={className}
    />
  );
}

export function YetiLoader({ size = 40, className = "" }: { 
  size?: number; 
  className?: string; 
}) {
  return (
    <YetiAnimation
      type="loading"
      state="spinning"
      size={size}
      className={className}
    />
  );
}

export function YetiThinking({ size = 40, isThinking = true, className = "" }: { 
  size?: number; 
  isThinking?: boolean; 
  className?: string; 
}) {
  return (
    <YetiAnimation
      type="thinking"
      state={isThinking ? 'processing' : 'idle'}
      size={size}
      className={className}
    />
  );
}

export function YetiSkill({ skill, size = 40, isActive = false, className = "" }: { 
  skill: string; 
  size?: number; 
  isActive?: boolean; 
  className?: string; 
}) {
  return (
    <YetiAnimation
      type="skill"
      state={skill}
      size={size}
      className={`${className} ${isActive ? 'active' : ''}`}
    />
  );
}
