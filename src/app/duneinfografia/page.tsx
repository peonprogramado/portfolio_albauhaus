"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import MaskedHeading from "../components/MaskedHeading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DuneInfografiaPage() {
    const router = useRouter();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animaciones de entrada
        const timer = setTimeout(() => {
            const elements = contentRef.current?.querySelectorAll('.animate-element');

            if (elements && elements.length > 0) {
                gsap.set(elements, {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                });

                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.2
                });
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <CustomCursor />
            <NavBar />

            <div ref={contentRef} className="pt-32 pb-16 px-8 max-w-7xl mx-auto xl-reduced-project-margins xxl-reduced-project-margins">
                {/* Header */}
                <div className="mb-16">
                    <MaskedHeading
                        text="DUNE INFOGRAFÍA"
                        className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[128px] font-bold text-black leading-none mb-4"
                    />
                </div>

                {/* Main Hero Image - Full Width */}
                <div className="animate-element mb-12 xl-large-project-media xxl-large-project-media">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                        <img
                            src="/images/mockupinfografiadune.jpg"
                            alt="Dune Infografía - Mockup"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>

                {/* Bottom Section - Wide Image */}
                <div className="space-y-8 xl-large-project-media xxl-large-project-media">
                    {/* Gráfica Complementaria */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/11]">
                            <img
                                src="/images/graficacomplementaria_af.jpg"
                                alt="Dune Infografía - Gráfica Complementaria"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="animate-element mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 xl-project-text-separation xxl-project-text-separation">
                    <div className="client-section">
                        <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
                        <p className="text-gray-600 mb-6">
                            Proyecto Personal
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-5 py-2 border border-black rounded-full text-black text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                                Retrofuturista
                            </span>
                            <span className="px-5 py-2 border border-black rounded-full text-black text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                                Informativo
                            </span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h2 className="text-2xl font-normal text-black mb-4">Dune - Infografía</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Esta infografía desglosa la densa mitología de Dune, transformando su compleja narrativa en un detallado mapa visual. El eje central es una gráfica generada con Python, que procesa el guion para vincular las apariciones individuales y conjuntas de los personajes. Con una estética inspirada en las portadas retrofuturistas originales y una paleta de colores desértica, la pieza equilibra el análisis de datos con una experiencia inmersiva para hacer comprensible la magnitud de esta epopeya de ciencia ficción.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
