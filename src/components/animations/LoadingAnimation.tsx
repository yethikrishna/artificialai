import { YetiAnimation, YetiLoader } from './YetiAnimations';
import { MountainTheme } from './MountainTheme';

interface LoadingAnimationProps {
  isLoading: boolean;
  size?: number;
  variant?: 'default' | 'mountain' | 'yeti';
  className?: string;
}

export function LoadingAnimation({ 
  isLoading, 
  size = 40, 
  variant = 'yeti',
  className = "" 
}: LoadingAnimationProps) {
  if (!isLoading) return null;

  const renderVariant = () => {
    switch (variant) {
      case 'mountain':
        return (
          <div style={{ width: size, height: size }}>
            <MountainTheme variant="loading" className={className} />
          </div>
        );
      case 'yeti':
        return <YetiLoader size={size} className={className} />;
      default:
        return <YetiAnimation type="loading" size={size} className={className} />;
    }
  };

  return (
    <div className="loading-animation-container">
      {renderVariant()}
    </div>
  );
}