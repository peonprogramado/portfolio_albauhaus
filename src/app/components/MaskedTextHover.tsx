"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText, CustomEase);
    CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
}

interface MaskedTextHoverProps {
    text: string;
    className?: string;
    isVisible: boolean;
    delay?: number;
}

export default function MaskedTextHover({
    text,
    className = "",
    isVisible,
    delay = 0
}: MaskedTextHoverProps) {
    const textRef = useRef<HTMLDivElement | null>(null);
    const splitRef = useRef<any>(null);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        // Crear split text
        if (!splitRef.current) {
            splitRef.current = SplitText.create(element, {
                type: "lines,words",
                linesClass: "line-mask",
                wordsClass: "word-mask"
            });
        }

        const words = element.querySelectorAll(".word-mask");

        if (isVisible) {
            // Animar entrada
            gsap.fromTo(
                words,
                { yPercent: 100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.03,
                    ease: "osmo-ease",
                    delay: delay
                }
            );
        } else {
            // Animar salida
            gsap.to(words, {
                yPercent: -100,
                opacity: 0,
                duration: 0.4,
                stagger: 0.02,
                ease: "power2.in"
            });
        }

        return () => {
            if (splitRef.current && !isVisible) {
                splitRef.current.revert();
                splitRef.current = null;
            }
        };
    }, [isVisible, delay]);

    return (
        <div
            ref={textRef}
            className={className}
            style={{
                overflow: 'hidden'
            }}
        >
            {text}
        </div>
    );
}
