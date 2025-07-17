import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

interface RiveScrollControllerProps {
  src: string;
  stateMachine?: string;
  artboard?: string;
  width?: number;
  height?: number;
  scrollBound?: boolean;
  className?: string;
  onLoadError?: (error: string) => void;
  onLoad?: () => void;
}

export const RiveScrollController: React.FC<RiveScrollControllerProps> = ({
  src,
  stateMachine = "State Machine 1",
  artboard = "New Artboard",
  width = 400,
  height = 300,
  scrollBound = false,
  className = "",
  onLoadError,
  onLoad,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riveInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced error handling for missing .riv files
  const handleLoadError = useCallback((error: any) => {
    console.error('Rive animation load error:', error);
    setError(error?.message || 'Failed to load animation');
    onLoadError?.(error?.message || 'Failed to load animation');
  }, [src, onLoadError]);

  // Rive hook with error handling
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    artboard,
    autoplay: !scrollBound,
    onLoad: () => {
      console.log('Rive animation loaded successfully');
      setIsLoaded(true);
      onLoad?.();
    },
    onLoadError: (error: any) => {
      console.error('Rive load error:', error);
      onLoadError?.(`Failed to load animation: ${error?.message || 'Unknown error'}`);
      handleLoadError(error);
    },
  });

  // State machine input for scroll control
  const progressInput = useStateMachineInput(
    rive,
    stateMachine || '',
    'progress'
  );

  // Throttle utility
  const throttle = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return (...args: Parameters<T>) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func(...args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  // Check if any modal is open to pause scroll binding
  useEffect(() => {
    const checkModalState = () => {
      const hasModal = document.querySelector('[role="dialog"]') || 
                      document.querySelector('.ant-modal-mask') ||
                      document.body.style.overflow === 'hidden';
      setIsModalOpen(!!hasModal);
    };

    // Check initially
    checkModalState();

    // Set up observer for modal changes
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => observer.disconnect();
  }, []);

  // Enhanced scroll progress tracking with modal awareness
  useEffect(() => {
    if (!scrollBound || !progressInput || isModalOpen) return;

    const throttle = (func: Function, limit: number) => {
      let inThrottle: boolean;
      return function(this: any, ...args: any[]) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      if (isModalOpen) return; // Don't handle scroll when modal is open
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressValue = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      
      if (progressInput && typeof progressInput.value === 'number') {
        progressInput.value = progressValue;
      }
      
      setProgress(progressValue);
    }, 16); // ~60fps

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollBound, progressInput, isModalOpen]);

  // Enhanced intersection observer with modal awareness
  useEffect(() => {
    if (!canvasRef.current || isModalOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (rive && !rive.isPlaying) {
              rive.play();
            }
          } else {
            setIsVisible(false);
            if (rive && rive.isPlaying) {
              rive.pause();
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(canvasRef.current);

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, [rive, isModalOpen]);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    if (!scrollBound || !isVisible || !progressInput) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    const progress = Math.min(
      Math.max((scrollY / (documentHeight - windowHeight)) * 100, 0),
      100
    );
    
    setProgress(progress);
    progressInput.value = progress;
  }, [scrollBound, isVisible, progressInput]);

  // Scroll listener
  useEffect(() => {
    if (!scrollBound) return;

    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [scrollBound, handleScroll, throttle]);

  // Resize handler
  useEffect(() => {
    if (!rive) return;

    const handleResize = throttle(() => {
      rive.resizeDrawingSurfaceToCanvas();
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [rive, throttle]);

  // Enhanced fallback rendering
  if (hasError || !src.endsWith('.riv')) {
    return (
      <div 
        className={`rive-fallback ${className}`}
        style={{ width, height }}
      >
        {/* Custom fallback based on animation type */}
        {src.includes('yeti-logo') && (
          <div className="yeti-logo-fallback">
            <div className="mountain-silhouette"></div>
            <div className="yeti-text">YETI</div>
            <div className="snow-particles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`snow-particle snow-${i + 1}`}></div>
              ))}
            </div>
          </div>
        )}
        
        {src.includes('mountain-loading') && (
          <div className="mountain-loading-fallback">
            <div className="mountain-range">
              <div className="peak peak-1"></div>
              <div className="peak peak-2"></div>
              <div className="peak peak-3"></div>
            </div>
            <div className="loading-aurora"></div>
            <div className="progress-indicator" style={{ width: `${progress * 100}%` }}></div>
          </div>
        )}
        
        {src.includes('skill-animations') && (
          <div className="skill-animation-fallback">
            <div className="skill-icon-placeholder">
              <div className="skill-glow"></div>
              <div className="skill-pulse"></div>
            </div>
          </div>
        )}
        
        {/* Generic fallback for other animations */}
        {!src.includes('yeti-logo') && !src.includes('mountain-loading') && !src.includes('skill-animations') && (
          <div className="generic-animation-fallback">
            <div className="placeholder-icon"></div>
            <div className="placeholder-glow"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`rive-container ${className}`} style={{ width, height }}>
      {isLoading && (
        <div className="rive-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ 
          width: '100%', 
          height: '100%',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
}