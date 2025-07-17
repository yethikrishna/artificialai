import { motion } from 'framer-motion';
import { RiveScrollController } from './RiveScrollController';
import { usePersonalization } from '@/components/enhanced/PersonalizationProvider';

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
  size = 40,
  className = '' 
}: SkillAnimationProps) {
  const { settings } = usePersonalization();
  
  // Skill-specific Rive files
  const skillRiveFiles: Record<string, string> = {
    writing: '/animations/skills/writing.riv',
    image: '/animations/skills/image.riv',
    music: '/animations/skills/music.riv',
    search: '/animations/skills/search.riv',
    code: '/animations/skills/code.riv',
    translate: '/animations/skills/translate.riv',
    // ... add all 16 skills
  };

  const riveFile = skillRiveFiles[skillType] || '/animations/skill-animations.riv';
  
  return (
    <div className={`skill-animation skill-${skillType} ${className}`}>
      <RiveScrollController
        src={riveFile}
        stateMachine="Skill State Machine"
        artboard={skillType}
        width={size}
        height={size}
        scrollBound={false}
        className={`skill-animation-rive ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
        onLoad={() => console.log(`Skill ${skillType} animation loaded`)}
      />
      
      {/* Enhanced fallback animations */}
      <div className="skill-animation-fallback" style={{ display: 'none' }}>
        <motion.div
          className={`skill-fallback skill-${skillType}-fallback`}
          style={{ width: size, height: size }}
          animate={settings.animationsEnabled ? {
            scale: isActive ? 1.1 : isHovered ? 1.05 : 1,
            rotate: isActive ? [0, 5, -5, 0] : 0,
            opacity: isActive ? 1 : isHovered ? 0.8 : 0.6
          } : {}}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          {getSkillFallbackIcon(skillType, size)}
        </motion.div>
      </div>
    </div>
  );
}

function getSkillFallbackIcon(skillType: string, size: number) {
  const iconSize = size * 0.6;
  
  const skillIcons: Record<string, React.ReactElement> = {
    writing: (
      <motion.svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        <motion.path
          d="M5 19h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.svg>
    ),
    // Add more skill-specific icons...
  };
  
  return skillIcons[skillType] || (
    <div className="generic-skill-icon" style={{ width: iconSize, height: iconSize }}>
      <motion.div
        className="skill-circle"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
    </div>
  );
}