import React, { useEffect, useState } from 'react';
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
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: '/assets/choose_your_avatar.riv',
    autoplay: true,
    onLoad: () => {
      console.log('Avatar selector animation loaded');
      setShowFallback(false);
      setIsLoaded(true);
    },
    onLoadError: () => {
      console.error('Failed to load avatar selector animation');
      setShowFallback(true);
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
      {showFallback ? (
        <div className="avatar-fallback">Avatar animation failed to load</div>
      ) : (
        <div className="rive-avatar-animation">
          <RiveComponent />
        </div>
      )}
      <div className="avatar-controls">
        <button 
          className="avatar-btn"
          onMouseEnter={() => hoverInput && (hoverInput.value = true)}
          onMouseLeave={() => hoverInput && (hoverInput.value = false)}
          onClick={() => selectInput && selectInput.fire()}
          disabled={!isLoaded}
        >
          Choose Avatar
        </button>
      </div>
    </div>
  );
};

// Mountain Skiing Animation Component
interface MountainSkiingProps {
  isActive?: boolean;
  className?: string;
  onSpeedChange?: (speed: number) => void;
  onSnowChange?: (intensity: number) => void;
  onClose?: () => void;
}

export const MountainSkiing: React.FC<MountainSkiingProps> = ({ 
  isActive = true, 
  className = ""
}) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/assets/new_file.riv",
    stateMachines: "State Machine 1",
    artboard: "New Artboard",
    autoplay: isActive,
    onLoad: () => {
      console.log('Mountain skiing animation loaded');
      setShowFallback(false);
      setIsLoaded(true);
    },
    onLoadError: () => {
      console.error('Failed to load mountain skiing animation');
      setShowFallback(true);
    },
  });

  // State machine inputs with null checks
  const speedInput = useStateMachineInput(rive, "State Machine 1", "speed");
  const snowInput = useStateMachineInput(rive, "State Machine 1", "snowIntensity");

  useEffect(() => {
    if (rive && isLoaded && speedInput) {
      speedInput.value = isActive ? 1.0 : 0.0;
    }
    if (rive && isLoaded && snowInput) {
      snowInput.value = 0.8; // Medium snow intensity
    }
  }, [isActive, speedInput, snowInput, rive, isLoaded]);

  if (showFallback || !isLoaded) {
    return (
      <div className={`mountain-skiing-fallback ${className}`}>
        <div className="w-full h-full bg-gradient-to-b from-blue-200 via-white to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🏔️</div>
            <div className="text-sm text-gray-600">Mountain Skiing</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mountain-skiing-container ${className}`}>
      {RiveComponent && <RiveComponent />}
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
  size = "default",
  className = ""
}) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useRiveAnimation] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>('Initializing...');

  const sizeConfig = {
    small: { width: 120, height: 80, containerClass: 'text-xs' },
    default: { width: 200, height: 120, containerClass: 'text-sm' },
    large: { width: 280, height: 160, containerClass: 'text-base' }
  };

  const currentSize = sizeConfig[size as keyof typeof sizeConfig];
  const containerStyle = {
    width: currentSize.width,
    height: currentSize.height
  };

  const { rive, RiveComponent } = useRive({
    src: useRiveAnimation ? '/assets/untitled.riv' : '',
    stateMachines: useRiveAnimation ? 'State Machine 1' : undefined,
    artboard: useRiveAnimation ? 'New Artboard' : undefined,
    autoplay: true,
    onLoad: () => {
      console.log('✅ AI Loading animation loaded successfully');
      setIsLoaded(true);
      setShowFallback(false);
      setDebugInfo('Rive animation loaded successfully');
    },
    onLoadError: (error) => {
      console.error('❌ Failed to load AI loading animation:', error);
      setShowFallback(true);
      setIsLoaded(false);
      setDebugInfo(`Error: ${error instanceof Error ? error.message : String(error)}`);
    },
    onStateChange: (event) => {
      console.log('🔄 AI Loading state changed:', event);
      setDebugInfo(`State: ${JSON.stringify(event.data)}`);
    }
  });

  // Enhanced state machine control with better error handling
  const loadingInput = useStateMachineInput(rive, 'State Machine 1', 'loading');
  const speedInput = useStateMachineInput(rive, 'State Machine 1', 'speed');

  useEffect(() => {
    if (rive && isLoaded && useRiveAnimation) {
      try {
        if (loadingInput) {
          loadingInput.value = isLoading;
          console.log('🎛️ Loading input set to:', isLoading);
        } else {
          console.warn('⚠️ Loading input not found');
        }
        
        if (speedInput) {
          speedInput.value = 1.0;
          console.log('🎛️ Speed input set to: 1.0');
        } else {
          console.warn('⚠️ Speed input not found');
        }
      } catch (error) {
        console.warn('⚠️ Error controlling state machine inputs:', error);
      }
    }
  }, [rive, isLoaded, isLoading, loadingInput, speedInput, useRiveAnimation]);

  // Show fallback if error or not using Rive
  if (showFallback || !useRiveAnimation) {
    return (
      <div className={`ai-loading-container ${className} ${currentSize.containerClass}`} style={containerStyle}>
        <div className="ai-loading-fallback">
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg border border-blue-200 shadow-sm overflow-hidden">
            {/* Enhanced YETI Loading Animation */}
            <div className="relative flex flex-col items-center justify-center space-y-3">
              {/* Main YETI Logo with Breathing Animation */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm animate-pulse shadow-lg">
                  YETI
                </div>
                {/* Breathing Ring Effect */}
                <div className="absolute inset-0 w-12 h-12 border-2 border-blue-400 rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-0 w-12 h-12 border-2 border-purple-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              {/* Thinking Dots Animation */}
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              
              {/* AI Processing Indicator */}
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-6 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-7 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 h-4 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            {/* Message overlay with better positioning */}
            <div className="absolute bottom-2 left-0 right-0 text-center z-10">
              <div className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-200 shadow-sm">
                <span className="text-xs text-gray-700 font-medium">
                  {message}
                </span>
              </div>
            </div>
            
            {/* Mountain Theme Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-t from-blue-100 to-transparent"></div>
              {/* Simple mountain silhouette using CSS */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-300 to-transparent opacity-30" 
                   style={{ 
                     clipPath: 'polygon(0% 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)'
                   }}>
              </div>
            </div>
            
            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute top-1 left-1 text-xs text-gray-500 bg-white/80 px-1 rounded z-20">
                CSS Fallback ✅
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show initializing state while Rive is loading
  if (!isLoaded) {
    return (
      <div className={`ai-loading-container ${className} ${currentSize.containerClass}`} style={containerStyle}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
            <div className="text-xs text-gray-600">Loading YETI animation...</div>
          </div>
        </div>
      </div>
    );
  }

  // Main Rive component
  return (
    <div className={`ai-loading-container ${className} ${currentSize.containerClass}`} style={containerStyle}>
      <div className="relative w-full h-full">
        {/* Rive Animation */}
        <RiveComponent className="w-full h-full" />
        
        {/* Debug info overlay (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded">
            {debugInfo}
          </div>
        )}
        
        {/* Message overlay */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-xs text-gray-700 font-medium">{message}</span>
          </div>
        </div>
        
        {/* Loading indicator dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced YETI Logo using your mountain animation
interface EnhancedYetiLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const EnhancedYetiLogo: React.FC<EnhancedYetiLogoProps> = ({ 
  size = 50, 
  className = "" 
}) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: "/assets/new_file.riv", // Using the mountain skiing animation as logo background
    stateMachines: "State Machine 1",
    artboard: "New Artboard",
    autoplay: true,
    onLoad: () => {
      console.log('Enhanced YETI logo animation loaded');
      setShowFallback(false);
      setIsLoaded(true);
    },
    onLoadError: () => {
      console.error('Failed to load enhanced YETI logo animation');
      setShowFallback(true);
    },
  });

  const speedInput = useStateMachineInput(rive, "State Machine 1", "speed");

  useEffect(() => {
    if (rive && isLoaded && speedInput) {
      speedInput.value = 0.3; // Slow, subtle animation for logo
    }
  }, [speedInput, rive, isLoaded]);

  if (showFallback || !isLoaded) {
    return (
      <div 
        className={`enhanced-yeti-logo-fallback ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
          YETI
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`enhanced-yeti-logo-container ${className}`}
      style={{ width: size, height: size }}
    >
      {RiveComponent && (
        <RiveComponent 
          width={size}
          height={size}
        />
      )}
    </div>
  );
};