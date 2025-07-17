import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface LoadingAnimationProps {
  className?: string;
  size?: number;
  isLoading?: boolean;
}

export function LoadingAnimation({ 
  className = "", 
  size = 60,
  isLoading = true 
}: LoadingAnimationProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/loading.riv', // We'll create this
    stateMachines: 'LoadingState',
    autoplay: isLoading,
    onLoad: () => {
      console.log('Loading animation loaded');
    },
  });

  const loadingInput = useStateMachineInput(rive, 'LoadingState', 'isLoading');

  useEffect(() => {
    if (loadingInput) {
      loadingInput.value = isLoading;
    }
  }, [loadingInput, isLoading]);

  return (
    <div 
      className={`loading-animation ${className}`}
      style={{ width: size, height: size }}
    >
      <RiveComponent />
    </div>
  );
}
