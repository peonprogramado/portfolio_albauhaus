'use client';

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
    <div
        className={`scroll-stack-card relative w-full h-auto my-8 p-0 box-border origin-top will-change-transform ${itemClassName}`.trim()}
        style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
        }}
    >
        {children}
    </div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '50%',
    scaleEndPosition = '30%',
    baseScale = 0.9,
}) => {
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef(new Map<number, any>());

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length) return;

        const scrollTop = window.scrollY;
        const containerHeight = window.innerHeight;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const cardTop = rect.top + window.scrollY;
            const triggerStart = cardTop - stackPositionPx;

            let translateY = 0;
            let scale = 1;

            if (scrollTop >= triggerStart) {
                translateY = Math.min((scrollTop - triggerStart) * 0.1, itemStackDistance * i);
                scale = Math.max(baseScale - (i * itemScale), 0.7);
            }

            const transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;

            if (card.style.transform !== transform) {
                card.style.transform = transform;
            }
        });
    }, [stackPosition, itemStackDistance, itemScale, baseScale, parsePercentage]);

    const handleScroll = useCallback(() => {
        requestAnimationFrame(updateCardTransforms);
    }, [updateCardTransforms]);

    useLayoutEffect(() => {
        const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
        cardsRef.current = cards;

        cards.forEach((card, i) => {
            card.style.willChange = 'transform';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
        });

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateCardTransforms();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cardsRef.current = [];
            lastTransformsRef.current.clear();
        };
    }, [itemDistance, handleScroll, updateCardTransforms]);

    return (
        <div className={`relative w-full ${className}`.trim()}>
            {children}
        </div>
    );
};

export default ScrollStack;
