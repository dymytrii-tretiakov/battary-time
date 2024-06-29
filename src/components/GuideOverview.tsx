import React, { FC, useEffect } from 'react';
import '../assets/css/guide.css';

export interface GuideOverviewProps {
  element: React.RefObject<HTMLElement>;
  text: string;
  onNext?: () => void;
}

const GuideOverview: FC<GuideOverviewProps> = ({ element, text, onNext }) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const arrowRef = React.useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  useEffect(() => {
    let zIndex: string;
    if (element.current) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        element.current.style.outline = '2px solid var(--color-text)';
      }
      zIndex = element.current.style.zIndex;
      element.current.style.zIndex = '3';
      element.current.style.pointerEvents = 'none';

      const resizeObserver = new ResizeObserver(() => {
        const { bottom, top } = element.current!.getBoundingClientRect();
        if (bottom > window.innerHeight / 2) {
          arrowRef.current!.style.transform = 'rotate(180deg) translateX(50%)';
          arrowRef.current!.style.top = `${top - 45}px`;
          textRef.current!.style.top = `${top - 65 - textRef.current!.getBoundingClientRect().height}px`;
        } else {
          arrowRef.current!.style.top = `${bottom + 20}px`;
          textRef.current!.style.top = `${bottom + 65}px`;
        }
      });

      resizeObserver.observe(window.document.body);

      return () => {
        if (element.current) {
          element.current.style.zIndex = zIndex;
          element.current.style.pointerEvents = 'auto';
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            element.current.style.outline = 'none';
          }
        }
        resizeObserver.disconnect();
      };
    }
  }, [element]);

  return (
    <div className="guide" onClick={handleNext}>
      <div className="guide-arrow" ref={arrowRef}></div>
      <div className="guide-text" ref={textRef}>
        {text}
      </div>
    </div>
  );
};

export default GuideOverview;
