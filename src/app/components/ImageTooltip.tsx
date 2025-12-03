"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageTooltipProps {
  children: React.ReactNode;
  imageSrc: string;
  alt?: string;
}

export default function ImageTooltip({ children, imageSrc, alt = "Tooltip image" }: ImageTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left + 20, // Offset para que no tape el cursor
        y: e.clientY - rect.top - 100   // Offset hacia arriba
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isVisible) {
        updatePosition(e);
      }
    };

    if (isVisible) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    updatePosition(e.nativeEvent);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
              <img
                src={imageSrc}
                alt={alt}
                className="w-[200px] h-[200px] object-cover"
                style={{
                  width: '200px',
                  height: '200px',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
