"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useLoading } from "../components/SimpleLoadingProvider";

interface Props {
    text: string;
    isWhiteBackground?: boolean;
}

export default function AnimatedNavLink({ text, isWhiteBackground = false }: Props) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    // const { showLoadingForNavigation } = useLoading();

    const handleClick = () => {
        if (text === "Proyectos") {
            router.push("/proyectos");
        } else if (text === "Inicio") {
            router.push("/");
        } else if (text === "About") {
            router.push("/about");
        } else if (text === "Contacto") {
            // Scroll to footer or contact section on current page
            const footer = document.querySelector('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If no footer on current page, navigate to home and then scroll
                router.push("/#contacto");
            }
        }
    };

    return (
        <span
            ref={containerRef}
            className={`relative inline-block cursor-pointer curzr-hover text-sm font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full ${isWhiteBackground ? 'text-black' : 'text-white'
                }`}
            style={{
                backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                boxShadow: isHovered
                    ? 'inset 1px 1px 3px rgba(0, 0, 0, 0.1), inset -1px -1px 3px rgba(255, 255, 255, 0.05), 0 1px 5px rgba(0, 0, 0, 0.05)'
                    : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {text}
        </span>
    );
}
