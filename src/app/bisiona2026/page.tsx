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
                                src="/images/mockupposterbus.jpg"
                                alt="Mockup poster bus Bisiona"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Imagen cartel bisiona escultura */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src="/images/cartelbisiona_escultura.png"
                                alt="Cartel Bisiona escultura"
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
                                src="/images/MockupIDcardmetalazul.jpg"
                                alt="Mockup ID card metal azul Bisiona"
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
                            Para la novena edición de Bisiona, presento una propuesta de identidad dinámica y participativa que sitúa el rastro del alumnado como el motor transformador de la EASD Pablo Picasso. El concepto se aleja de una imagen estática para construir un sistema visual vivo que evoluciona mediante la intervención directa de los estudiantes, revalorizando su singularidad individual y convirtiéndola en la base del lenguaje gráfico del evento.
                            <br /><br />
                            La propuesta se materializa a través de la herramienta digital interactiva <a href="https://peonprogramado.github.io/Crea-o-teu-Bisiona/" target="_blank" rel="noopener noreferrer" className="text-black font-semibold hover:opacity-70 transition-opacity">Crea o teu Bisiona</a>, donde cada alumno puede customizar el identificador de las jornadas. Mediante parámetros que simbolizan las distintas disciplinas del centro, los estudiantes utilizan los conceptos aprendidos en el aula para generar un resultado único, permitiendo que la identidad de las jornadas sea, en realidad, una suma de sus talentos personales.
                            <br /><br />
                            Finalmente, el diseño rinde homenaje a la riqueza técnica de la escuela mediante el uso de texturas específicas para cada especialidad, reforzando el vínculo entre la materia y la formación. Estas piezas individuales se comparten bajo el hashtag #bisiona, construyendo una imagen colectiva en redes sociales que conecta de forma coherente la realidad académica con la proyección profesional de la comunidad educativa.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
