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

export default function Bisiona2026Page() {
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
                        text="BISIONA 2026"
                        className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[128px] font-bold text-black leading-none mb-4"
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
                            <source src="/video/videobisionasi.mp4" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    </div>
                </div>

                {/* Grid de imágenes del proyecto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 xl-large-project-media xxl-large-project-media">
                    {/* Imagen mockup poster bus */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src="/images/bisiona/mockupcartelesbisiona.jpg"
                                alt="Mockup carteles Bisiona"
                                className="w-full h-full object-cover rounded-2xl"
                                style={{ objectPosition: '35% center' }}
                            />
                        </div>
                    </div>

                    {/* Imagen cartel bisiona escultura */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src="/images/bisiona/mockuptotebagvariante.jpg"
                                alt="Mockup tote bag Bisiona"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Wide Images */}
                <div className="space-y-8 xl-large-project-media xxl-large-project-media">
                    {/* Mockup ID Card Metal Azul */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
                            <img
                                src="/images/bisiona/MockupIDcardbisionafondonegro.jpg"
                                alt="Mockup ID card Bisiona fondo negro"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Wristband Bisiona */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
                            <img
                                src="/images/bisiona/wristband_bisiona_final.png"
                                alt="Wristband Bisiona"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Video Grabación de Pantalla Bisiona */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl">
                            <video
                                className="w-full h-auto block rounded-2xl"
                                controls
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                            >
                                <source src="/video/Grabación de pantalla 2025-12-31 a las 0.10.31.mov" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="animate-element mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 xl-project-text-separation xxl-project-text-separation">
                    <div className="client-section">
                        <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
                        <p className="text-gray-600 mb-6">
                            EASD Pablo Picasso A Coruña
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-5 py-2 border border-black rounded-full text-black text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                                Identidad Viva
                            </span>
                            <span className="px-5 py-2 border border-black rounded-full text-black text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                                Generativo
                            </span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h2 className="text-2xl font-normal text-black mb-4">Identidad IX Jornadas de Arte y Diseño EASDPP</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bisiona son las jornadas de referencia de la EASD Pablo Picasso, un evento anual que conecta la formación académica con la realidad profesional a través de conferencias y talleres. Para su novena edición, se propone una identidad dinámica y participativa que materializa el rastro del alumnado sobre la propia escuela. El proyecto revaloriza la singularidad individual de los alumnos como un motor transformador de la escuela, construyendo un sistema visual que evoluciona mediante la participación e intervención activa de los estudiantes.
                            <br /><br />
                            A través de un código QR distribuido por la escuela, los alumnos acceden a una plataforma interactiva (<a href="https://peonprogramado.github.io/Crea-o-teu-Bisiona/" target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:opacity-70 transition-opacity">Crea o teu Bisiona</a>) donde pueden experimentar con diferentes parámetros. Cada variable de la herramienta representa simbólicamente una de las disciplinas de la escuela. Finalmente bajo el #bisiona en redes sociales, se incita al alumnado y demás espectadores del evento a participar en la identidad compartiendo sus creaciones.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
