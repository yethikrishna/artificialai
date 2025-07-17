import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface MessageAnimationProps {
  className?: string;
  messageType?: 'user' | 'ai' | 'system';
  isVisible?: boolean;
}

export function MessageAnimation({ 
  className = "", 
  messageType = 'user',
  isVisible = true
}: MessageAnimationProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/message.riv', // We'll create this
    stateMachines: 'MessageState',
    autoplay: isVisible,
    onLoad: () => {
      console.log('Message animation loaded');
    },
  });

  const visibilityInput = useStateMachineInput(rive, 'MessageState', 'isVisible');
  const typeInput = useStateMachineInput(rive, 'MessageState', 'messageType');

  useEffect(() => {
    if (visibilityInput) {
      visibilityInput.value = isVisible;
    }
  }, [visibilityInput, isVisible]);

  useEffect(() => {
    if (typeInput) {
      const typeValue = messageType === 'user' ? 0 : messageType === 'ai' ? 1 : 2;
      typeInput.value = typeValue;
    }
  }, [typeInput, messageType]);

  return (
    <div className={`message-animation ${className}`}>
      <RiveComponent />
    </div>
  );
}
