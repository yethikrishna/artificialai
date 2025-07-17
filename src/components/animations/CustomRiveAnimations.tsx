import React, { useEffect, useRef, useState } from 'react';
import { useRive, useStateMachineInput, Fit, Alignment } from '@rive-app/react-canvas';

// Avatar Selection Component
interface AvatarSelectorProps {
  onAvatarSelect?: (avatarId: string) => void;
  className?: string;
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  onAvatarSelect, 
  className = "" 
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/choose_your_avatar.riv',
    autoplay: true,
    onLoad: () => {
      console.log('Avatar selector animation loaded');
    },
    onStateChange: (event) => {
      console.log('Avatar state changed:', event);
      // Handle avatar selection events
      if (event.data && Array.isArray(event.data) && event.data.length > 0 && onAvatarSelect) {
        onAvatarSelect(String(event.data[0]));
      }
    },
  });

  // State machine inputs for avatar selection
  const selectInput = useStateMachineInput(rive, 'Avatar State Machine', 'Select');
  const hoverInput = useStateMachineInput(rive, 'Avatar State Machine', 'Hover');

  return (
    <div className={`avatar-selector-container ${className}`}>
      <div className="rive-avatar-animation">
        <RiveComponent />
      </div>
      <div className="avatar-controls">
        <button 
          className="avatar-btn"
          onMouseEnter={() => hoverInput && (hoverInput.value = true)}
          onMouseLeave={() => hoverInput && (hoverInput.value = false)}
          onClick={() => selectInput && selectInput.fire()}
        >
          Choose Avatar
        </button>
      </div>
    </div>
  );
};

// Mountain Skiing Animation Component
interface MountainSkiingProps {
  autoplay?: boolean;
  className?: string;
  onAnimationComplete?: () => void;
}

export const MountainSkiing: React.FC<MountainSkiingProps> = ({ 
  autoplay = true, 
  className = "",
  onAnimationComplete 
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/new_file.riv',
    autoplay,
    onLoad: () => {
      console.log('Mountain skiing animation loaded');
    },
    onLoop: () => {
      console.log('Skiing animation loop completed');
      onAnimationComplete?.();
    },
  });

  // Control inputs for skiing animation
  const speedInput = useStateMachineInput(rive, 'Skiing State Machine', 'Speed');
  const snowInput = useStateMachineInput(rive, 'Skiing State Machine', 'Snow');

  useEffect(() => {
    // Set default animation speed and snow intensity
    if (speedInput) speedInput.value = 1.0;
    if (snowInput) snowInput.value = 0.8;
  }, [speedInput, snowInput]);

  return (
    <div className={`mountain-skiing-container ${className}`}>
      <div className="rive-skiing-animation">
        <RiveComponent />
      </div>
      <div className="skiing-controls">
        <div className="control-group">
          <label>Speed:</label>
          <input 
            type="range" 
            min="0.5" 
            max="2.0" 
            step="0.1" 
            defaultValue="1.0"
            onChange={(e) => speedInput && (speedInput.value = parseFloat(e.target.value))}
          />
        </div>
        <div className="control-group">
          <label>Snow:</label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            defaultValue="0.8"
            onChange={(e) => snowInput && (snowInput.value = parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

// AI Loading Animation Component
interface AILoadingProps {
  isLoading?: boolean;
  message?: string;
  className?: string;
  size?: 'small' | 'default' | 'large';
}

export const AILoading: React.FC<AILoadingProps> = ({ 
  isLoading = true, 
  message = "YETI is thinking...", 
  className = "",
  size = "default"
}) => {
  const [showFallback, setShowFallback] = useState(false);
  
  // Size configurations for better scaling
  const sizeConfig = {
    small: { width: 120, height: 80, containerClass: "w-32 h-20" },
    default: { width: 200, height: 120, containerClass: "w-52 h-32" },
    large: { width: 280, height: 160, containerClass: "w-72 h-40" }
  };
  
  const config = sizeConfig[size as keyof typeof sizeConfig];

  const { rive, RiveComponent } = useRive({
    src: "/assets/untitled.riv",
    stateMachines: "State Machine 1",
    artboard: "New Artboard",
    autoplay: isLoading,
    onLoad: () => {
      console.log('AI Loading animation loaded');
      setShowFallback(false);
    },
    onLoadError: () => {
      console.error('Failed to load AI loading animation');
      setShowFallback(true);
    },
  });

  // Enhanced state machine control
  const loadingInput = useStateMachineInput(rive, "State Machine 1", "isLoading");
  const speedInput = useStateMachineInput(rive, "State Machine 1", "speed");

  useEffect(() => {
    if (loadingInput) {
      loadingInput.value = isLoading;
    }
    if (speedInput) {
      speedInput.value = isLoading ? 1.0 : 0.5; // Adjust animation speed
    }
  }, [isLoading, loadingInput, speedInput]);

  if (showFallback) {
    return (
      <div className={`ai-loading-fallback ${config.containerClass} ${className}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-xs text-gray-600 text-center font-medium">
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ai-loading-container ${config.containerClass} ${className}`}>
      <div 
        className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 shadow-sm overflow-hidden"
        style={{ 
          minWidth: config.width,
          minHeight: config.height
        }}
      >
        {/* Rive Animation Container with proper scaling */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            transform: 'scale(1)', // Ensure no scaling conflicts
          }}
        >
          <RiveComponent 
            width={config.width}
            height={config.height}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ensure proper fitting
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          />
        </div>
        
        {/* Message overlay with better positioning */}
        <div className="absolute bottom-2 left-0 right-0 text-center z-10">
          <div className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-200 shadow-sm">
            <span className="text-xs text-gray-700 font-medium">
              {message}
            </span>
          </div>
        </div>
        
        {/* Loading indicator dots */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

// Enhanced YETI Logo using your mountain animation
export const EnhancedYetiLogo: React.FC<{ size?: number; className?: string }> = ({ 
  size = 60, 
  className = "" 
}) => {
  return (
    <div className={`enhanced-yeti-logo ${className}`} style={{ width: size, height: size }}>
      <MountainSkiing 
        autoplay={true}
        className="logo-mountain-bg"
        onAnimationComplete={() => console.log('Logo animation cycle complete')}
      />
      <div className="yeti-logo-overlay">
        <div className="yeti-text">YETI</div>
        <div className="ai-text">AI</div>
      </div>
    </div>
  );
};