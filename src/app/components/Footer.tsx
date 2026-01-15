"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import VariableProximity from '../../components/VariableProximity';
import Image from 'next/image';
import MaskedHeading from './MaskedHeading';

const socials = [
    { label: "Instagram", href: "https://www.instagram.com/albauhaus/" },
    { label: "Linkedin", href: "https://www.linkedin.com/in/alba-antón-8b1a80351" },
    { label: "Behance", href: "https://www.behance.net/albaanton1/projects" },
    { label: "Github", href: "https://github.com/albauhaus" },
];

const footerLinks = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/about" },
    { label: "Proyectos", href: "/proyectos" },
];

const Footer: React.FC = () => {
    const router = useRouter();
    const footerRef = useRef<HTMLElement>(null);

    const handleNavigation = (href: string, label: string) => {
        if (label === "Inicio") {
            router.push("/");
        } else if (label === "Sobre mí") {
            router.push("/about");
        } else if (label === "Proyectos") {
            router.push("/proyectos");
        }
    };

    return (
        <footer ref={footerRef} className="w-full bg-black text-white mt-40 pb-16 pt-20">
            <div className="w-full max-w-[1200px] mx-auto px-8 xl-reduced-project-margins xxl-reduced-project-margins">
                {/* Mobile Layout */}
                <div className="md:hidden">
                    <div className="text-left mb-6">
                        <MaskedHeading
                            text="¿Tienes alguna idea?¿Dudas?"
                            className="text-[20px] font-normal text-white"
                        />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-[48px] leading-none font-bold tracking-tight mb-6">
                            <VariableProximity
                                label="TRABAJEMOS JUNTOS"
                                fromFontVariationSettings="'wght' 400, 'wdth' 100"
                                toFontVariationSettings="'wght' 900, 'wdth' 150"
                                containerRef={footerRef}
                                radius={120}
                                falloff="exponential"
                                style={{ fontFamily: 'inherit' }}
                            />
                        </h2>
                        <button
                            className="curzr-hover hover:opacity-60 transition-opacity duration-300"
                            type="button"
                            onClick={() => window.location.href = 'mailto:albaantondesign@gmail.com'}
                            aria-label="Enviar email"
                        >
                            <Image
                                src="/svg/flechafooter.svg"
                                alt="Contactar"
                                width={60}
                                height={60}
                                className="w-16 h-16"
                            />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 mb-8">
                        {socials.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="curzr-hover inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/70 text-base hover:bg-white hover:text-black transition-colors w-full"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <p className="text-white/60 text-xs mb-12">
                        Diseño gráfico en A Coruña · Web · UI/UX ·<br />
                        Motion Graphics · 3D
                    </p>

                    <div className="space-y-1">
                        <p className="text-white text-[48px] font-medium leading-tight">
                            ©2026
                        </p>
                        <p className="text-white text-[48px] font-medium leading-tight">
                            Alba Antón
                        </p>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="text-center mb-8">
                        <MaskedHeading
                            text="¿Tienes alguna idea?¿Dudas?"
                            className="text-[28px] font-normal text-white"
                        />
                    </div>

                    <div className="mb-6 xl-large-project-media xxl-large-project-media">
                        <div className="flex items-center justify-center gap-4 md:gap-6">
                            <h2 className="leading-none font-bold tracking-tight" style={{ fontSize: 'clamp(60px, 8vw, 110px)' }}>
                                <VariableProximity
                                    label="TRABAJEMOS JUNTOS"
                                    fromFontVariationSettings="'wght' 400, 'wdth' 100"
                                    toFontVariationSettings="'wght' 900, 'wdth' 150"
                                    containerRef={footerRef}
                                    radius={120}
                                    falloff="exponential"
                                    style={{ fontFamily: 'inherit' }}
                                />
                            </h2>
                            <button
                                className="curzr-hover flex-shrink-0 hover:opacity-60 transition-opacity duration-300"
                                type="button"
                                onClick={() => window.location.href = 'mailto:albaantondesign@gmail.com'}
                                aria-label="Enviar email"
                            >
                                <Image
                                    src="/svg/flechafooter.svg"
                                    alt="Contactar"
                                    width={60}
                                    height={60}
                                    className="w-12 h-12 md:w-16 md:h-16"
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-start gap-2 mb-12 mt-[40px] xl-project-text-separation xxl-project-text-separation">
                        {socials.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="curzr-hover inline-flex items-center px-5 py-2 rounded-full border border-white/70 text-sm hover:bg-white hover:text-black transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="w-full mb-8">
                        <div className="h-px bg-white/30" />
                    </div>

                    <div className="flex flex-row justify-between items-start gap-6 xl-project-text-separation xxl-project-text-separation">
                        <div className="space-y-1 client-section">
                            <p className="text-white text-[48px] font-medium leading-tight">
                                ©2026
                            </p>
                            <p className="text-white text-[48px] font-medium leading-tight">
                                Alba Antón
                            </p>
                            <p className="text-white/60 text-xs md:text-sm mt-[54px]">
                                Diseño gráfico en A Coruña · Web ·<br />
                                UI/UX · Motion Graphics · 3D
                            </p>
                        </div>

                        <div className="flex flex-col items-start gap-3 description-section">
                            {footerLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavigation(link.href, link.label)}
                                    className="curzr-hover text-white text-[24px] font-normal hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0 font-inherit text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
