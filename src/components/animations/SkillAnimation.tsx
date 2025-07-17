import { YetiAnimation, YetiSkill } from './YetiAnimations';
import { MountainTheme } from './MountainTheme';

interface SkillAnimationProps {
  skillType: string;
  isActive?: boolean;
  isHovered?: boolean;
  size?: number;
  variant?: 'default' | 'yeti' | 'mountain';
  className?: string;
}

export function SkillAnimation({ 
  skillType, 
  isActive = false, 
  isHovered = false,
  size = 32,
  variant = 'yeti',
  className = "" 
}: SkillAnimationProps) {
  
  const getSkillState = () => {
    if (isActive) return 'active';
    if (isHovered) return 'hover';
    return 'idle';
  };

  const renderVariant = () => {
    switch (variant) {
      case 'mountain':
        return (
          <div style={{ width: size, height: size }}>
            <MountainTheme 
              variant="accent" 
              animated={isActive || isHovered}
              className={className} 
            />
          </div>
        );
      case 'yeti':
        return (
          <YetiSkill 
            skill={skillType}
            size={size}
            isActive={isActive}
            className={className}
          />
        );
      default:
        return (
          <YetiAnimation 
            type="skill"
            state={skillType}
            size={size}
            className={`${className} ${getSkillState()}`}
          />
        );
    }
  };

  return (
    <div className="skill-animation-container">
      {renderVariant()}
    </div>
  );
}