"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import { useLoading } from "../components/SimpleLoadingProvider";

interface Props {
    href: string;
    text: string;
    isWhiteBackground?: boolean;
    isInFooter?: boolean;
}

export default function AnimatedNavLink({ href, text, isWhiteBackground = false, isInFooter = false }: Props) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    // const { showLoadingForNavigation } = useLoading();

    const handleClick = () => {
        if (href === "#contacto") {
            // Scroll to footer or contact section on current page
            const footer = document.querySelector('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If no footer on current page, navigate to home and then scroll
                router.push("/#contacto");
            }
        } else {
            router.push(href);
        }
    };

    // Determinar el color del texto: si está en el footer, usar blanco; si no, usar la lógica original
    const textColor = isInFooter ? 'text-white' : (isWhiteBackground ? 'text-black' : 'text-white');

    return (
        <span
            ref={containerRef}
            className={`relative inline-block cursor-pointer curzr-hover whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-300 px-2 py-2 rounded-full sm:px-3 sm:text-sm ${textColor}`}
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
