"use client";

import React, { useState, useEffect } from "react";
import AnimatedNavLink from "../ui/AnimatedNavLink";

const menuItems = ["Inicio", "Proyectos", "About"];

export default function NavBar() {
    const [isWhiteBackground, setIsWhiteBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const currentPath = window.location.pathname;

            // Si estamos en páginas con fondo blanco, siempre usar texto negro
            if (currentPath === '/proyectos' || currentPath === '/bisiona2026' || currentPath === '/nars' || currentPath === '/about') {
                setIsWhiteBackground(true);
            } else {
                // Detectar cuando el fondo cambia a blanco (aproximadamente cuando el ScrollReveal está en pantalla)
                if (scrollY > windowHeight * 0.5) {
                    setIsWhiteBackground(true);
                } else {
                    setIsWhiteBackground(false);
                }
            }
        };

        // Ejecutar inmediatamente para detectar la página actual
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
            <nav
                className={`backdrop-blur-sm border transition-all duration-300 ${isWhiteBackground
                    ? 'bg-white/10 border-black/20'
                    : 'bg-transparent border-white/10'
                    }`}
                style={{
                    width: '350px',
                    height: '48px',
                    borderRadius: '30px',
                }}
            >
                <div className="h-full flex justify-center items-center px-3">
                    <ul className="flex space-x-6">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <AnimatedNavLink text={item} isWhiteBackground={isWhiteBackground} />
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
}
