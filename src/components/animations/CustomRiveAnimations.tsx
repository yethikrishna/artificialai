import React, { useEffect, useRef } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

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
}

export const AILoading: React.FC<AILoadingProps> = ({ 
  isLoading = true, 
  message = "AI is thinking...",
  className = "" 
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/assets/untitled.riv',
    autoplay: isLoading,
    onLoad: () => {
      console.log('AI loading animation loaded');
    },
  });

  // State machine inputs for AI animation
  const loadingInput = useStateMachineInput(rive, 'AI State Machine', 'Loading');
  const thinkingInput = useStateMachineInput(rive, 'AI State Machine', 'Thinking');

  useEffect(() => {
    if (loadingInput) {
      loadingInput.value = isLoading;
    }
    if (thinkingInput) {
      thinkingInput.value = isLoading;
    }
  }, [isLoading, loadingInput, thinkingInput]);

  return (
    <div className={`ai-loading-container ${className}`}>
      <div className="rive-ai-animation">
        <RiveComponent />
      </div>
      {message && (
        <div className="loading-message">
          <p>{message}</p>
        </div>
      )}
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