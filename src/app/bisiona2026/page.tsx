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

            <div ref={contentRef} className="pt-32 pb-16 px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <MaskedHeading
                        text="BISIONA 2026"
                        className="text-[96px] md:text-[128px] font-bold text-black leading-none mb-4"
                    />
                </div>

                {/* Main Hero Video */}
                <div className="animate-element mb-12">
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
                            <source src="/video/animacionpresentacionmotiongraphicsbisiona_albaantongonzalez.mp4" type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    </div>
                </div>

                {/* Grid de imágenes del proyecto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                <div className="space-y-8">
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

                    {/* Video Grabación de Pantalla */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl">
                            <video
                                className="w-full h-auto block"
                                style={{
                                    clipPath: 'inset(0 round 1rem)',
                                    transform: 'scale(1.01)'
                                }}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                            >
                                <source src="/video/pantallacreaoteubisiona.mov" type="video/quicktime" />
                                <source src="/video/pantallacreaoteubisiona.mov" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="animate-element mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
                        <p className="text-gray-600 mb-6">
                            EASD Pablo Picasso A Coruña
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-normal text-black mb-4">Identidad IX Jornadas de Arte y Diseño EASDPP</h2>
                        <p className="text-gray-600 leading-relaxed">
                            La propuesta consiste en una identidad gráfica variable en la que todo el alumnado participa activamente en su creación.
                            <br /><br />
                            El objetivo es inspirar a los estudiantes mostrando cómo la conexión entre diferentes disciplinas artísticas y de diseño puede generar nuevas oportunidades en el mundo laboral.
                            Para ello, se revaloriza la singularidad creativa de cada estudiante como un elemento transformador dentro de la escuela: cada aportación personal contribuye a construir un espacio vivo, en constante innovación.
                            <br /><br />
                            El sistema de identidad se basa en una herramienta generativa desarrollada con programación en HTML, CSS y JavaScript, que permite a los estudiantes experimentar visualmente y crear su propio identificador de las jornadas. A partir de una estructura gráfica común, cada usuario podrá modificar parámetros y plasmar su estilo individual.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
