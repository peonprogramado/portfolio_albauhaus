"use client";

import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);
  CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
}

interface MaskedLineProps {
  children: React.ReactNode;
  className?: string;
}

const MaskedLine = forwardRef<HTMLParagraphElement, MaskedLineProps>(
  ({ children, className = "" }, ref) => {
    const localRef = useRef<HTMLParagraphElement | null>(null);
    const combinedRef = (node: HTMLParagraphElement) => {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLParagraphElement | null>).current = node;
      localRef.current = node;
    };

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "line"
      });

      const lines = el.querySelectorAll(".line");

      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "osmo-ease",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        }
      );

      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, []);

    return (
      <p ref={combinedRef} className={className}>
        {children}
      </p>
    );
  }
);

export default MaskedLine; 