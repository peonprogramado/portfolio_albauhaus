"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type ProjectCard = {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    typology: string[];
    year: string;
    image: string;
    color: string;
    src?: string;
    gif?: string;
};

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
    }: {
        card: ProjectCard;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
        onClick?: () => void;
        onMouseEnter?: (e: React.MouseEvent) => void;
        onMouseLeave?: () => void;
        onMouseMove?: (e: React.MouseEvent) => void;
    }) => {
        const getProjectMedia = () => {
            if (card.id === 1) return "/video/Adobe Express - animacionlogobisiona7sg.gif";
            if (card.id === 2) return "/images/nars/animacionfeedsi.gif";
            if (card.id === 3) return "/images/duneinfo.png";
            if (card.id === 4) return "/images/raspberrypi5icon.png";
            if (card.id === 5) return "/images/scifi/3.jpg";
            return card.src || card.image;
        };

        const handleMouseEnter = (e: React.MouseEvent) => {
            setHovered(index);
            onMouseEnter?.(e);
        };

        const handleMouseLeave = () => {
            setHovered(null);
            onMouseLeave?.();
        };

        return (
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={onMouseMove}
                onClick={onClick}
                className="relative overflow-hidden rounded-2xl aspect-square mb-4"
                style={{
                    transition: hovered !== null ? 'all 0.3s ease-out' : 'none',
                    filter: hovered !== null && hovered !== index ? 'blur(4px)' : 'none',
                    transform: hovered !== null && hovered !== index ? 'scale(0.98)' : 'scale(1)',
                }}
            >
                <img
                    src={getProjectMedia()}
                    alt={card.title}
                    className="project-inner-element absolute inset-0 w-full h-full object-cover rounded-2xl"
                />

                <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-none z-10">
                    {card.typology.map((type, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "backdrop-blur-sm bg-white/10 border text-xs font-medium px-4 py-2 rounded-full transition-opacity duration-300",
                                card.id === 1 || card.id === 4 ? 'border-black/20 text-black' : 'border-white/20 text-white',
                                hovered === index ? "opacity-100" : "opacity-70"
                            )}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

Card.displayName = "Card";

export function FocusCards({
    cards,
    onCardClick,
    onCardHover,
    onCardLeave,
    onCardMouseMove,
}: {
    cards: ProjectCard[];
    onCardClick?: (id: number) => void;
    onCardHover?: (id: number, e: React.MouseEvent) => void;
    onCardLeave?: () => void;
    onCardMouseMove?: (e: React.MouseEvent) => void;
}) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, index) => (
                <div key={card.id} className="project-item group cursor-pointer curzr-hover">
                    <Card
                        card={card}
                        index={index}
                        hovered={hovered}
                        setHovered={setHovered}
                        onClick={() => onCardClick?.(card.id)}
                        onMouseEnter={(e) => onCardHover?.(card.id, e)}
                        onMouseLeave={onCardLeave}
                        onMouseMove={onCardMouseMove}
                    />
                    <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-lg font-semibold text-black">{card.title}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{card.year}</p>
                        </div>
                        <p className="text-sm text-gray-600">{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
