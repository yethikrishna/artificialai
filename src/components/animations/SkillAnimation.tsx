import React from 'react';
import { motion } from 'framer-motion';
import { 
  EditOutlined, PictureOutlined, SoundOutlined, StarOutlined,
  SearchOutlined, ExperimentOutlined, BarChartOutlined, FireOutlined,
  TranslationOutlined, PhoneOutlined, VideoCameraOutlined, MailOutlined,
  CodeOutlined, BulbOutlined, RobotOutlined, ThunderboltOutlined
} from '@ant-design/icons';

interface SkillAnimationProps {
  skillId: string;
  isActive?: boolean;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  onClick?: () => void;
}

// Skill configurations with enhanced animations and colors
const SKILL_CONFIGS = {
  // Creative Services
  writing: {
    icon: EditOutlined,
    color: '#3b82f6',
    bgGradient: 'from-blue-400 to-blue-600',
    animation: 'writing',
    label: 'Writing Assistant',
    description: 'Creative writing and editing'
  },
  image: {
    icon: PictureOutlined,
    color: '#8b5cf6',
    bgGradient: 'from-purple-400 to-purple-600',
    animation: 'image-gen',
    label: 'Image Generation',
    description: 'AI-powered image creation'
  },
  music: {
    icon: SoundOutlined,
    color: '#10b981',
    bgGradient: 'from-green-400 to-green-600',
    animation: 'music',
    label: 'Music Creation',
    description: 'Compose and generate music'
  },
  design: {
    icon: StarOutlined,
    color: '#ec4899',
    bgGradient: 'from-pink-400 to-pink-600',
    animation: 'design',
    label: 'Design Assistant',
    description: 'UI/UX and graphic design'
  },
  
  // Research & Analysis
  search: {
    icon: SearchOutlined,
    color: '#f97316',
    bgGradient: 'from-orange-400 to-orange-600',
    animation: 'search',
    label: 'AI Search',
    description: 'Intelligent web search'
  },
  research: {
    icon: ExperimentOutlined,
    color: '#ef4444',
    bgGradient: 'from-red-400 to-red-600',
    animation: 'research',
    label: 'Academic Research',
    description: 'Research papers and analysis'
  },
  data: {
    icon: BarChartOutlined,
    color: '#06b6d4',
    bgGradient: 'from-cyan-400 to-cyan-600',
    animation: 'data-analysis',
    label: 'Data Analysis',
    description: 'Analyze and visualize data'
  },
  summary: {
    icon: FireOutlined,
    color: '#eab308',
    bgGradient: 'from-yellow-400 to-yellow-600',
    animation: 'summary',
    label: 'Content Summary',
    description: 'Summarize documents'
  },
  
  // Communication
  translate: {
    icon: TranslationOutlined,
    color: '#84cc16',
    bgGradient: 'from-lime-400 to-lime-600',
    animation: 'translate',
    label: 'Translation',
    description: 'Translate 100+ languages'
  },
  voice: {
    icon: PhoneOutlined,
    color: '#d946ef',
    bgGradient: 'from-fuchsia-400 to-fuchsia-600',
    animation: 'voice',
    label: 'Voice Calls',
    description: 'Voice-based AI conversations'
  },
  meeting: {
    icon: VideoCameraOutlined,
    color: '#f43f5e',
    bgGradient: 'from-rose-400 to-rose-600',
    animation: 'meeting',
    label: 'Meeting Recording',
    description: 'Record and transcribe meetings'
  },
  email: {
    icon: MailOutlined,
    color: '#6366f1',
    bgGradient: 'from-indigo-400 to-indigo-600',
    animation: 'email',
    label: 'Email Assistant',
    description: 'Draft and optimize emails'
  },
  
  // Technical Support
  code: {
    icon: CodeOutlined,
    color: '#8b5cf6',
    bgGradient: 'from-violet-400 to-violet-600',
    animation: 'coding',
    label: 'Programming',
    description: 'Code generation and debugging'
  },
  debug: {
    icon: BulbOutlined,
    color: '#f97316',
    bgGradient: 'from-amber-400 to-amber-600',
    animation: 'debug',
    label: 'Problem Solving',
    description: 'Debug issues and solutions'
  },
  ai: {
    icon: RobotOutlined,
    color: '#3b82f6',
    bgGradient: 'from-sky-400 to-sky-600',
    animation: 'ai-consultation',
    label: 'AI Consultation',
    description: 'AI strategy and implementation'
  },
  optimize: {
    icon: ThunderboltOutlined,
    color: '#ef4444',
    bgGradient: 'from-red-400 to-red-600',
    animation: 'optimize',
    label: 'Performance',
    description: 'Optimize code and systems'
  }
};

export const SkillAnimation: React.FC<SkillAnimationProps> = ({
  skillId,
  isActive = false,
  size = 'medium',
  showLabel = true,
  onClick
}) => {
  const config = SKILL_CONFIGS[skillId as keyof typeof SKILL_CONFIGS];
  
  if (!config) {
    return <div>Unknown skill: {skillId}</div>;
  }

  const IconComponent = config.icon;
  
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const iconSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <motion.div
      className={`skill-animation-container ${sizeClasses[size]} cursor-pointer`}
      onClick={onClick}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Skill Icon with Animation */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${config.bgGradient} shadow-lg overflow-hidden`}
        animate={isActive ? {
          boxShadow: [
            `0 0 0 0 ${config.color}40`,
            `0 0 0 10px ${config.color}20`,
            `0 0 0 20px ${config.color}10`,
            `0 0 0 0 ${config.color}00`
          ]
        } : {}}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
      >
        {/* Background Animation Pattern */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="w-full h-full"
            animate={{
              background: [
                `radial-gradient(circle at 20% 20%, ${config.color}40 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 80%, ${config.color}40 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 80%, ${config.color}40 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 20%, ${config.color}40 0%, transparent 50%)`
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Skill Icon */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            animate={isActive ? {
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            <IconComponent 
              className={`${iconSizes[size]} text-white drop-shadow-lg`}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
            />
          </motion.div>
        </div>

        {/* Floating Particles */}
        {isActive && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: '100%',
                  opacity: 0 
                }}
                animate={{
                  y: '-20%',
                  opacity: [0, 1, 0],
                  x: `${Math.random() * 20 - 10}%`
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </>
        )}

        {/* Skill-Specific Animation Overlays */}
        {skillId === 'writing' && isActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white text-xs font-mono">{'</>'}</div>
          </motion.div>
        )}

        {skillId === 'music' && isActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="text-white text-lg">♪</div>
          </motion.div>
        )}

        {skillId === 'code' && isActive && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-white text-xs opacity-30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="font-mono">{'{}'}</div>
          </motion.div>
        )}
      </motion.div>

      {/* Skill Label */}
      {showLabel && (
        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {config.label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {config.description}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Enhanced Skill Grid Component
interface SkillGridProps {
  skills: string[];
  activeSkill?: string;
  onSkillSelect?: (skillId: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export const SkillGrid: React.FC<SkillGridProps> = ({
  skills,
  activeSkill,
  onSkillSelect,
  size = 'medium'
}) => {
  return (
    <div className="skill-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {skills.map((skillId, index) => (
        <motion.div
          key={skillId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkillAnimation
            skillId={skillId}
            isActive={activeSkill === skillId}
            size={size}
            onClick={() => onSkillSelect?.(skillId)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SkillAnimation;