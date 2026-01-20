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

export default function PiLab5Page() {
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
                        text="PILAB 5"
                        className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[128px] font-bold text-black leading-none mb-4"
                    />
                </div>

                {/* Outdoor Banner Mockup - Full Width */}
                <div className="animate-element mb-12 xl-large-project-media xxl-large-project-media">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                        <img
                            src="/images/Free1_Outdoor_Banner_Mockup.jpg"
                            alt="PiLab 5 Outdoor Banner Mockup"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>

                {/* Grid de imágenes del proyecto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 xl-large-project-media xxl-large-project-media">
                    {/* Bus Stop Mockup */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src="/images/bus-stop-mockup.jpg"
                                alt="PiLab 5 Bus Stop Mockup"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Stories Piskills Video */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-white">
                            <video
                                className="w-full h-full object-cover rounded-2xl"
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                            >
                                <source src="/video/pilab/pilabverticalb.mp4" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Wide Images */}
                <div className="space-y-8 xl-large-project-media xxl-large-project-media">
                    {/* Posts Instagram */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
                            <img
                                src="/images/pilab5/postssinstagram.jpg"
                                alt="PiLab 5 Instagram Posts"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Billboard Mockup */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/9]">
                            <img
                                src="/images/Billboard_Mockup_2.jpg"
                                alt="PiLab 5 Billboard Mockup"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Mopie Mockup Video */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl">
                            <video
                                className="w-full h-auto block"
                                style={{
                                    clipPath: 'inset(0 round 1rem)',
                                    transform: 'scale(1.01)'
                                }}
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                            >
                                <source src="/video/pilab/Mopie mockup.mp4" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </div>

                    {/* Mockup Digital Image */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src="/images/pilab5/157.png"
                                alt="Mockup Digital"
                                className="w-full h-auto block"
                                style={{
                                    clipPath: 'inset(0 round 1rem)',
                                    transform: 'scale(1.01)'
                                }}
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
                                Inspirador
                            </span>
                            <span className="px-5 py-2 border border-black rounded-full text-black text-sm hover:bg-black hover:text-white transition-colors cursor-default">
                                Exploratorio
                            </span>
                        </div>
                    </div>

                    <div className="description-section">
                        <h2 className="text-2xl font-normal text-black mb-4">PiLab 5 - Gráficas publicitarias</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Serie de gráficas publicitarias para la campaña de la tienda ficticia PiLab 5 se concibe como una llamada a experimentar con la tecnología en un laboratorio creativo bajo el motto "Mil proyectos, una Raspberry". La propuesta visual en soportes exteriores, prensa y canales digitales busca motivar al espectador para que abandone su rol de consumidor pasivo y descubra su potencial como creador activo. Se plantea la organización de talleres PiSkills, charlas PiTalk y demos in situ. En ellos se anima al público a aprender y materializar las infinitas posibilidades tecnológicas del producto, demostrando que cualquiera puede fabricar sus propias ideas.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
