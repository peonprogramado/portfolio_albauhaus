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

export default function SciFiArtPage() {
    const router = useRouter();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
                        text="SCI FI ART"
                        className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[120px] font-bold text-black leading-none mb-4"
                    />
                </div>

                {/* Main Hero Video */}
                <div className="animate-element mb-12 xl-large-project-media xxl-large-project-media">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                        <video
                            className="w-full h-full object-cover block"
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/video/scifi/posterhzHD 2.mp4" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    </div>
                </div>

                {/* Grid de imágenes del proyecto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 xl-large-project-media xxl-large-project-media">
                    {/* Primera imagen */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src="/images/scifi/Mesa de trabajo 2 copia.png"
                                alt="SCI FI art infografía 1"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Segunda imagen - Video */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-black flex items-center justify-center">
                            <video
                                className="h-full w-auto object-contain block rounded-2xl"
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                            >
                                <source src="/video/scifi/posterrollup (1).mp4" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Wide Image */}
                <div className="animate-element mb-12 xl-large-project-media xxl-large-project-media">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
                        <img
                            src="/images/scifi/3.jpg"
                            alt="SCI FI art infografía 3"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>

                {/* Project Details */}
                <div className="animate-element mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 xl-project-text-separation xxl-project-text-separation">
                    <div className="client-section">
                        <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
                        <p className="text-gray-600 mb-6">
                            Proyecto Académico
                        </p>
                    </div>

                    <div className="description-section">
                        <h2 className="text-2xl font-normal text-black mb-4">Infografía sobre la influencia de las vanguardias en el arte de ciencia ficción</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Esta infografía cualitativa explora la conexión estética entre las vanguardias históricas y el arte de la ciencia ficción, analizando cómo la ruptura visual del siglo XX configuró el imaginario futurista. El proyecto muestra cómo la experimentación geométrica y el énfasis en el dinamismo tecnológico de estos movimientos sentaron las bases para la representación de la arquitectura, la robótica y los espacios propios del género especulativo.
                            <br /><br />
                            La gráfica principal fue desarrollada mediante p5.js, y establece una correlación visual entre las distintas vanguardias y más de 400 obras representativas del género sci-fi en el ámbito de la ilustración, permitiendo identificar patrones formales, influencias estéticas y recurrencias visuales a lo largo del tiempo.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
