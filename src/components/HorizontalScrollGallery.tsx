"use client";

import { useEffect, useRef, ReactNode } from "react";

interface HorizontalScrollGalleryProps {
    children: ReactNode;
    itemCount: number;
}

export default function HorizontalScrollGallery({ children, itemCount }: HorizontalScrollGalleryProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        const getScrollAmount = () => {
            const containerWidth = container.scrollWidth;
            const viewportWidth = window.innerWidth;
            return containerWidth - viewportWidth;
        };

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const scrollAmount = getScrollAmount();

            const inView = rect.top <= 0 && rect.bottom >= window.innerHeight;

            if (inView) {
                const progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
                const clampedProgress = Math.max(0, Math.min(1, progress));

                const translateX = clampedProgress * scrollAmount;
                container.style.transform = `translateX(-${translateX}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={sectionRef}
            className="relative"
            style={{
                height: `${itemCount * 100}vh`,
            }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div
                    ref={containerRef}
                    className="flex h-full items-center will-change-transform px-[20px] md:px-[50px]"
                    style={{ width: `${itemCount * 100}vw` }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
