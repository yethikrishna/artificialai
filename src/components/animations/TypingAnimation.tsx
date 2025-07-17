import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface TypingAnimationProps {
  className?: string;
  isTyping?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
}

export function TypingAnimation({ 
  className = "", 
  isTyping = false,
  speed = 'medium'
}: TypingAnimationProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/typing.riv', // We'll create this
    stateMachines: 'TypingState',
    autoplay: isTyping,
    onLoad: () => {
      console.log('Typing animation loaded');
    },
  });

  const typingInput = useStateMachineInput(rive, 'TypingState', 'isTyping');
  const speedInput = useStateMachineInput(rive, 'TypingState', 'speed');

  useEffect(() => {
    if (typingInput) {
      typingInput.value = isTyping;
    }
  }, [typingInput, isTyping]);

  useEffect(() => {
    if (speedInput) {
      const speedValue = speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1;
      speedInput.value = speedValue;
    }
  }, [speedInput, speed]);

  return (
    <div className={`typing-animation ${className}`}>
      <RiveComponent />
    </div>
  );
}
