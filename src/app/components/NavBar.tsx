"use client";

import React, { useState, useEffect } from "react";
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
                            className={`ml-1 flex items-center rounded-full border p-0.5 text-[11px] font-semibold transition-colors sm:ml-2 ${
                                isInFooter
                                    ? "border-white/35 text-white"
                                    : isWhiteBackground
                                      ? "border-black/25 text-black"
                                      : "border-white/25 text-white"
                            }`}
                            aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}
                        >
                            {(["es", "en"] as Language[]).map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    aria-pressed={language === option}
                                    aria-label={option === "es" ? "Español" : "English"}
                                    onClick={() => setLanguage(option)}
                                    className={`curzr-hover rounded-full px-2 py-1 transition-all ${
                                        language === option
                                            ? isInFooter || !isWhiteBackground
                                                ? "bg-white text-black"
                                                : "bg-gray-200/70 text-black"
                                            : "opacity-55 hover:opacity-100"
                                    }`}
                                >
                                    {option.toUpperCase()}
                                </button>
                            ))}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
