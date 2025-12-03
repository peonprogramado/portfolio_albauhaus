"use client";

import React from "react";
import { motion } from "framer-motion";

const socials = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Linkedin", href: "https://linkedin.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "Github", href: "https://github.com" },
];

const footerLinks = [
    { label: "Inicio", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Proyectos", href: "/proyectos" },
];

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black text-white mt-40 pb-16 pt-20">
            <div className="w-full max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <div className="space-y-8 max-w-[900px]">
                    <div className="space-y-6">
                        <h2 className="text-[40px] md:text-[56px] leading-none font-semibold">
                            ¿Tienes una idea?
                        </h2>
                        <div className="flex items-center gap-6 md:gap-8">
                            <p className="text-[24px] md:text-[32px] lg:text-[40px] leading-none font-medium tracking-wider">
                                HAGAMOS MAGIA JUNTOS
                            </p>
                            <button
                                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white curzr-hover hover:bg-white hover:text-black transition-all duration-300 flex-shrink-0"
                                type="button"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="translate-x-[1px]"
                                >
                                    <path
                                        d="M5 12h14m-7-7l7 7-7 7"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6">
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
                </div>

                <div className="flex flex-col items-start md:items-end gap-4 text-right text-sm uppercase tracking-[0.18em]">
                    {footerLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="curzr-hover text-white/80 hover:text-white transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Línea con espacio lateral de 90px de cada lado */}
            <div className="w-full px-[90px] mt-10">
                <div className="h-px bg-white/60" />
            </div>
        </footer>
    );
};

export default Footer;
