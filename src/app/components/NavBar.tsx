"use client";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiWhiteBalanceSunny } from "@mdi/js";
import AnimatedNavLink from "../ui/AnimatedNavLink";
import { useLanguage, type Language } from "../context/LanguageContext";

const menuItems = [
    { href: "/", es: "Inicio", en: "Home" },
    { href: "/proyectos", es: "Proyectos", en: "Projects" },
    { href: "/about", es: "Sobre mí", en: "About me" },
];

type ContrastMode = "soft" | "high" | "dark";

const contrastOptions: Array<{
    value: ContrastMode;
    es: string;
    en: string;
    ratio: string;
    dotClass: string;
}> = [
    { value: "soft", es: "Suave", en: "Soft", ratio: "17.6:1", dotClass: "bg-[#707070]" },
    { value: "high", es: "Contraste máximo", en: "Maximum contrast", ratio: "21:1", dotClass: "bg-black" },
    { value: "dark", es: "Oscuro", en: "Dark", ratio: "18.4:1", dotClass: "bg-[#202020]" },
];

const isContrastMode = (value: string | null): value is ContrastMode =>
    contrastOptions.some((option) => option.value === value);

export default function NavBar() {
    const [isWhiteBackground, setIsWhiteBackground] = useState(false);
    const [contrastMode, setContrastMode] = useState<ContrastMode>("soft");
    const [isContrastOpen, setIsContrastOpen] = useState(false);
    const contrastControlRef = useRef<HTMLDivElement>(null);
    const { language, setLanguage } = useLanguage();
    const isDarkContrast = contrastMode === "dark";

    useEffect(() => {
        const savedContrast = window.localStorage.getItem("portfolio-contrast");
        const initialContrast: ContrastMode = isContrastMode(savedContrast)
            ? savedContrast
            : savedContrast === "standard"
              ? "soft"
              : "soft";

        setContrastMode(initialContrast);
        document.documentElement.dataset.contrast = initialContrast;
        if (savedContrast && !isContrastMode(savedContrast)) {
            window.localStorage.setItem("portfolio-contrast", "soft");
        }
    }, []);

    useEffect(() => {
        if (!isContrastOpen) return;

        const closeOnOutsideClick = (event: PointerEvent) => {
            if (!contrastControlRef.current?.contains(event.target as Node)) {
                setIsContrastOpen(false);
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsContrastOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isContrastOpen]);

    const selectContrast = (mode: ContrastMode) => {
        setContrastMode(mode);
        document.documentElement.dataset.contrast = mode;
        window.localStorage.setItem("portfolio-contrast", mode);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const currentPath = window.location.pathname;
            const lightPages = [
                "/proyectos", "/bisiona2026", "/nars", "/about", "/pilab5",
                "/duneinfografia", "/scifiart", "/sileo",
            ];

            setIsWhiteBackground(
                lightPages.includes(currentPath) || scrollY > windowHeight * 0.5,
            );
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const useLightControls = isDarkContrast || !isWhiteBackground;

    return (
        <>
            <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 md:bottom-auto md:top-4">
                <nav
                    className={`w-[calc(100vw-24px)] max-w-[360px] border backdrop-blur-sm transition-all duration-300 md:w-fit ${
                        isDarkContrast
                            ? "border-white/25 bg-black/70"
                            : isWhiteBackground
                              ? "border-black/20 bg-white/10"
                              : "border-white/10 bg-transparent"
                    }`}
                    style={{ height: "48px", borderRadius: "30px" }}
                >
                    <div className="flex h-full items-center justify-center px-2 sm:px-3 md:px-2">
                        <ul className="flex items-center gap-1 sm:gap-2">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <AnimatedNavLink
                                        href={item.href}
                                        text={language === "es" ? item.es : item.en}
                                        isWhiteBackground={isDarkContrast ? false : isWhiteBackground}
                                        isInFooter={isDarkContrast}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

            <div className={`fixed right-3 top-3 z-[9999] flex items-center gap-3 sm:right-4 sm:top-4 ${useLightControls ? "text-white" : "text-black"}`}>
                <div className="flex items-center gap-1 text-xs font-medium tracking-[0.02em] sm:text-sm" role="radiogroup" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
                    {(["es", "en"] as Language[]).map((option, index) => (
                        <React.Fragment key={option}>
                            {index > 0 && <span aria-hidden="true" className="opacity-30">/</span>}
                            <button
                                type="button"
                                role="radio"
                                aria-checked={language === option}
                                aria-label={option === "es" ? "Español" : "English"}
                                onClick={() => setLanguage(option)}
                                className={`curzr-hover py-2 underline-offset-4 transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:underline ${language === option ? "underline" : "opacity-40"}`}
                            >
                                {option.toUpperCase()}
                            </button>
                        </React.Fragment>
                    ))}
                </div>

                <div ref={contrastControlRef} className="relative h-12 w-12">
                    <button
                        type="button"
                        aria-expanded={isContrastOpen}
                        aria-haspopup="true"
                        aria-label={language === "es" ? "Ajustar contraste" : "Adjust contrast"}
                        onClick={() => setIsContrastOpen((isOpen) => !isOpen)}
                        className={`contrast-glass-trigger curzr-hover relative z-20 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-300 hover:scale-[1.04] active:scale-95 ${
                            isDarkContrast
                                ? "border-white/25 bg-black/70 text-white"
                                : isWhiteBackground
                                  ? "border-black/20 bg-white/10 text-black"
                                  : "border-white/10 bg-transparent text-white"
                        } ${isContrastOpen ? "contrast-glass-trigger--open" : ""}`}
                    >
                        <Icon path={mdiWhiteBalanceSunny} size={1.05} aria-hidden="true" />
                    </button>

                    {isContrastOpen && (
                        <div
                            className="contrast-glass-panel absolute right-0 top-0 z-10 flex w-12 flex-col items-center gap-4 overflow-hidden rounded-[28px] pb-4 pt-16 text-black"
                            role="radiogroup"
                            aria-label={language === "es" ? "Nivel de contraste" : "Contrast level"}
                        >
                            {contrastOptions.map((option, index) => {
                                const isActive = contrastMode === option.value;
                                const label = language === "es" ? option.es : option.en;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="radio"
                                        aria-checked={isActive}
                                        aria-label={`${label}, ${option.ratio}`}
                                        onClick={() => selectContrast(option.value)}
                                        className="contrast-glass-option curzr-hover group relative z-10 flex h-5 w-5 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
                                        style={{ animationDelay: `${90 + index * 45}ms` }}
                                    >
                                        <span className={`block rounded-full transition-[width,height,box-shadow] duration-200 ${option.dotClass} ${isActive ? "h-3 w-3 shadow-[0_0_0_3px_rgba(255,255,255,0.8)]" : "h-2 w-2 opacity-50 group-hover:opacity-100"}`} />
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
