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
  isActive?: boolean;
  className?: string;
  onSpeedChange?: (speed: number) => void;
  onSnowChange?: (intensity: number) => void;
  onClose?: () => void;
}

export const MountainSkiing: React.FC<MountainSkiingProps> = ({ 
  isActive = true, 
  onClose,
  className = "",
  onSpeedChange,
  onSnowChange 
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
  className = "",
  size = "default"
}) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  
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
      console.log('✅ AI Loading animation loaded successfully');
      setIsLoaded(true);
      setShowFallback(false);
      setDebugInfo("Loaded successfully");
    },
    onLoadError: (error) => {
      console.error('❌ Failed to load AI loading animation:', error);
      console.error('File path attempted:', "/assets/untitled.riv");
      setShowFallback(true);
      setIsLoaded(false);
      setDebugInfo(`Load error: ${error instanceof Error ? error.message : String(error) || 'Unknown error'}`);
    },
    onStateChange: (event) => {
      console.log('🔄 Rive state changed:', event);
    }
  });

  // Log Rive instance status
  useEffect(() => {
    console.log('🔍 Rive instance status:', {
      rive: !!rive,
      isLoaded,
      showFallback,
      src: "/assets/untitled.riv"
    });
  }, [rive, isLoaded, showFallback]);

  // Enhanced state machine control with null checks
  const loadingInput = useStateMachineInput(
    rive, 
    "State Machine 1", 
    "isLoading"
  );
  const speedInput = useStateMachineInput(
    rive, 
    "State Machine 1", 
    "speed"
  );

  useEffect(() => {
    // Only try to control inputs if rive is loaded and inputs exist
    if (rive && isLoaded) {
      try {
        console.log('🎮 Attempting to control state machine inputs:', {
          loadingInput: !!loadingInput,
          speedInput: !!speedInput,
          isLoading
        });
        
        if (loadingInput) {
          loadingInput.value = isLoading;
          console.log('✅ Set loading input to:', isLoading);
        } else {
          console.warn('⚠️ Loading input not found');
        }
        
        if (speedInput) {
          const speed = isLoading ? 1.0 : 0.5;
          speedInput.value = speed;
          console.log('✅ Set speed input to:', speed);
        } else {
          console.warn('⚠️ Speed input not found');
        }
      } catch (error) {
        console.error('❌ Error controlling Rive state machine inputs:', error);
        setDebugInfo(`State machine error: ${error instanceof Error ? error.message : 'Unknown'}`);
      }
    }
  }, [isLoading, loadingInput, speedInput, rive, isLoaded]);

  // Show fallback immediately if there's an error or while loading
  if (showFallback) {
    return (
      <div className={`ai-loading-fallback ${config.containerClass} ${className}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-2 p-4">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-xs text-gray-600 text-center font-medium">
            {message}
          </div>
          <div className="text-xs text-red-500 text-center">
            Rive Error: {debugInfo}
          </div>
          <div className="text-xs text-gray-400 text-center">
            Using CSS fallback
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while Rive is initializing
  if (!isLoaded) {
    return (
      <div className={`ai-loading-initializing ${config.containerClass} ${className}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xs text-gray-600 text-center">
            Loading Rive animation...
          </div>
          <div className="text-xs text-gray-400 text-center">
            {debugInfo || "Initializing"}
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
        {/* Debug info overlay (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-1 left-1 text-xs text-gray-500 bg-white/80 px-1 rounded z-20">
            Rive: {isLoaded ? '✅' : '❌'}
          </div>
        )}
        
        {/* Rive Animation Container with proper scaling */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            transform: 'scale(1)',
          }}
        >
          {RiveComponent && rive && (
            <RiveComponent 
              width={config.width}
              height={config.height}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          )}
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