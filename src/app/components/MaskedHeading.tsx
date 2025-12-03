"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugins solo una vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);
  CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
}

interface MaskedHeadingProps {
  text: string;
  className?: string;
}

export default function MaskedHeading({ text, className = "" }: MaskedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const split = SplitText.create(heading, {
      type: "lines",
      mask: "lines",
      linesClass: "line"
    });

    const lines = heading.querySelectorAll(".line");

    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "osmo-ease",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
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
    <h2
      ref={headingRef}
      data-split="heading"
      className={className}
    >
      {text}
    </h2>
  );
} 