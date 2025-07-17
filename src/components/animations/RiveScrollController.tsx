import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

interface RiveScrollControllerProps {
  src: string;
  stateMachine?: string;
  artboard?: string;
  width: number;
  height: number;
  scrollBound?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export function RiveScrollController({
  src,
  stateMachine = "State Machine",
  artboard = "New Artboard",
  width = 100,
  height = 100,
  scrollBound = false,
  className = "",
  onLoad,
  onError
}: RiveScrollControllerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riveInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Enhanced error handling for missing .riv files
  const handleLoadError = useCallback((error: any) => {
    console.warn(`Rive file not found: ${src}. Using fallback animation.`);
    setHasError(true);
    setIsLoading(false);
    onError?.(error);
  }, [src, onError]);

  // Rive hook with error handling
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    artboard,
    autoplay: !scrollBound,
    onLoad: () => {
      console.log(`Rive animation loaded: ${src}`);
      onLoad?.();
    },
    onLoadError: (error: any) => {
      console.error(`Failed to load Rive animation: ${src}`, error);
      onError?.(`Failed to load animation: ${error?.message || 'Unknown error'}`);
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

  // Intersection Observer for performance
  useEffect(() => {
    if (!scrollBound) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (!canvasRef.current) return;
    
    const cleanup = () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
    
    observer.observe(canvasRef.current);
    return cleanup;
  }, [scrollBound]);

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