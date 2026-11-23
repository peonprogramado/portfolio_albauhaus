"use client";

import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase, ScrollTrigger);
  CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
}

interface MaskedLineProps {
  children: React.ReactNode;
  className?: string;
}

const MaskedLine = forwardRef<HTMLParagraphElement, MaskedLineProps>(
  ({ children, className = "" }, ref) => {
    const localRef = useRef<HTMLParagraphElement | null>(null);
    const contentRef = useRef<HTMLSpanElement | null>(null);
    const combinedRef = (node: HTMLParagraphElement) => {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLParagraphElement | null>).current = node;
      localRef.current = node;
    };

    useEffect(() => {
      const el = localRef.current;
      const content = contentRef.current;
      if (!el || !content) return;

      const animation = gsap.fromTo(
        content,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "osmo-ease",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    }, []);

    return (
      <p ref={combinedRef} className={`${className} overflow-hidden`}>
        <span ref={contentRef} className="block">
          {children}
        </span>
      </p>
    );
  }
);

export default MaskedLine;
