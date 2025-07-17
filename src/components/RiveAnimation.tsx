import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface RiveAnimationProps {
  src: string;
  stateMachines?: string;
  autoplay?: boolean;
  className?: string;
  onLoad?: () => void;
  onStateChange?: (stateName: string) => void;
}

export function RiveAnimation({ 
  src, 
  stateMachines, 
  autoplay = true, 
  className = "",
  onLoad,
  onStateChange 
}: RiveAnimationProps) {
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines,
    autoplay,
    onLoad: () => {
      console.log('Rive animation loaded');
      onLoad?.();
    },
    onStateChange: (event) => {
      console.log('State changed:', event);
      if (event.data && Array.isArray(event.data) && event.data.length > 0) {
        onStateChange?.(String(event.data[0]));
      }
    },
  });

  // Example of controlling state machine inputs
  const hoverInput = useStateMachineInput(rive, stateMachines || '', 'Hover');
  const clickInput = useStateMachineInput(rive, stateMachines || '', 'Click');

  useEffect(() => {
    if (rive) {
      console.log('Rive instance ready');
    }
  }, [rive]);

  return (
    <div 
      className={`rive-container ${className}`}
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => hoverInput && (hoverInput.value = false)}
      onClick={() => clickInput && clickInput.fire()}
    >
      <RiveComponent />
    </div>
  );
}