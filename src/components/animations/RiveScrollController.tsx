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

export const RiveScrollController: React.FC<RiveScrollControllerProps> = ({
  src,
  stateMachine,
  artboard,
  width,
  height,
  scrollBound = false,
  className = '',
  onLoad,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

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
    
    setScrollProgress(progress);
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

  return (
    <div
      ref={containerRef}
      className={`rive-scroll-container ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {rive ? (
        <RiveComponent
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      ) : (
        <div 
          className="rive-loading-fallback"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.1)',
            borderRadius: '4px'
          }}
        >
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};