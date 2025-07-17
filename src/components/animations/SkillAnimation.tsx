import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

interface SkillAnimationProps {
  className?: string;
  skillType?: string;
  isActive?: boolean;
  isHovered?: boolean;
}

export function SkillAnimation({ 
  className = "", 
  skillType = 'general',
  isActive = false,
  isHovered = false
}: SkillAnimationProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/skill.riv', // We'll create this
    stateMachines: 'SkillState',
    autoplay: true,
    onLoad: () => {
      console.log('Skill animation loaded');
    },
  });

  const activeInput = useStateMachineInput(rive, 'SkillState', 'isActive');
  const hoverInput = useStateMachineInput(rive, 'SkillState', 'isHovered');
  const skillInput = useStateMachineInput(rive, 'SkillState', 'skillType');

  useEffect(() => {
    if (activeInput) {
      activeInput.value = isActive;
    }
  }, [activeInput, isActive]);

  useEffect(() => {
    if (hoverInput) {
      hoverInput.value = isHovered;
    }
  }, [hoverInput, isHovered]);

  useEffect(() => {
    if (skillInput) {
      // Map skill types to animation states
      const skillMap: Record<string, number> = {
        'writing': 0,
        'code': 1,
        'image': 2,
        'translate': 3,
        'research': 4,
        'general': 5
      };
      skillInput.value = skillMap[skillType] || 5;
    }
  }, [skillInput, skillType]);

  return (
    <div className={`skill-animation ${className}`}>
      <RiveComponent />
    </div>
  );
}
