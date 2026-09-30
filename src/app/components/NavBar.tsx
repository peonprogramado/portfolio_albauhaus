"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedNavLink from "../ui/AnimatedNavLink";
import { useLanguage, type Language } from "../context/LanguageContext";

const menuItems = [
    { href: "/", es: "Inicio", en: "Home" },
    { href: "/proyectos", es: "Proyectos", en: "Projects" },
    { href: "/about", es: "Sobre mí", en: "About me" },
];

export default function NavBar() {
    const [isWhiteBackground, setIsWhiteBackground] = useState(false);
    const [isInFooter, setIsInFooter] = useState(false);
    const { language, setLanguage } = useLanguage();
    const shouldReduceMotion = useReducedMotion();
    const isLightNavigation = isWhiteBackground && !isInFooter;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const currentPath = window.location.pathname;

            // Detectar si estamos en el footer
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const navBar = document.querySelector('nav');
                if (navBar) {
                    const navBarRect = navBar.getBoundingClientRect();
                    // Verificar si el navbar está intersectando con el footer
                    const isIntersecting = navBarRect.bottom > footerRect.top && navBarRect.top < footerRect.bottom;
                    setIsInFooter(isIntersecting);
                }
            }

            // Si estamos en páginas con fondo blanco, siempre usar texto negro
            if (currentPath === '/proyectos' || currentPath === '/bisiona2026' || currentPath === '/nars' || currentPath === '/about' || currentPath === '/pilab5' || currentPath === '/duneinfografia' || currentPath === '/scifiart' || currentPath === '/sileo') {
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
        <div className="fixed md:top-4 bottom-6 md:bottom-auto left-1/2 transform -translate-x-1/2 z-[9999]">
            <nav
                className={`backdrop-blur-sm border transition-all duration-300 ${isWhiteBackground
                    ? 'bg-white/10 border-black/20'
                    : 'bg-transparent border-white/10'
                    }`}
                style={{
                    width: 'min(460px, calc(100vw - 24px))',
                    height: '48px',
                    borderRadius: '30px',
                }}
            >
                <div className="flex h-full items-center justify-center px-2 sm:px-3">
                    <ul className="flex items-center gap-1 sm:gap-2">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                <AnimatedNavLink
                                    href={item.href}
                                    text={language === "es" ? item.es : item.en}
                                    isWhiteBackground={isWhiteBackground}
                                    isInFooter={isInFooter}
                                />
                            </li>
                        ))}
                        <li
                            className={`relative ml-1 flex items-center rounded-full border p-[3px] text-[11px] font-semibold tracking-[-0.01em] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 sm:ml-2 ${
                                isLightNavigation
                                    ? "border-black/[0.08] bg-black/[0.055] shadow-[inset_0_1px_1px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.8)]"
                                    : "border-white/[0.16] bg-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_1px_4px_rgba(0,0,0,0.12)]"
                            }`}
                            role="radiogroup"
                            aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}
                        >
                            {(["es", "en"] as Language[]).map((option) => (
                                <motion.button
                                    key={option}
                                    type="button"
                                    role="radio"
                                    aria-checked={language === option}
                                    aria-label={option === "es" ? "Español" : "English"}
                                    onClick={() => setLanguage(option)}
                                    whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                                    transition={{ type: "spring", stiffness: 650, damping: 32, mass: 0.55 }}
                                    className={`curzr-hover relative isolate min-w-[30px] rounded-full px-2 py-1 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-1 ${
                                        language === option
                                            ? "text-black"
                                            : isLightNavigation
                                              ? "text-black/45 hover:text-black/70"
                                              : "text-white/55 hover:text-white/85"
                                    }`}
                                >
                                    {language === option && (
                                        <motion.span
                                            layoutId="language-segment-selection"
                                            initial={false}
                                            transition={
                                                shouldReduceMotion
                                                    ? { duration: 0 }
                                                    : { type: "spring", stiffness: 520, damping: 34, mass: 0.7 }
                                            }
                                            className={`absolute inset-0 -z-10 rounded-full ${
                                                isLightNavigation
                                                    ? "bg-white/85 shadow-[0_1px_3px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                                    : "bg-white/95 shadow-[0_1px_4px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,1)]"
                                            }`}
                                        />
                                    )}
                                    <span className="relative z-10">{option.toUpperCase()}</span>
                                </motion.button>
                            ))}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
