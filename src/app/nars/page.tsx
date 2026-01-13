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

export default function NarsPage() {
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
                        text="NARS"
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
                            <source src="/video/nars/mockupsi.mp4" type="video/mp4" />
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
                                src="/images/0068.png"
                                alt="NARS - Primera imagen del grid"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* Stories Image */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <img
                                src="/images/nars/0013 (1).png"
                                alt="NARS Stories"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Wide Images */}
                <div className="space-y-8 xl-large-project-media xxl-large-project-media">
                    {/* Sketch Reels Image */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] bg-white">
                            <img
                                src="/images/aketchreels.png"
                                alt="NARS - Sketch Reels"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Grid de contenedores adicionales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Primera imagen NARS */}
                        <div className="animate-element">
                            <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                                <img
                                    src="/images/0110 (1).png"
                                    alt="NARS - Imagen 1"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* GIF Reel NARS */}
                        <div className="animate-element">
                            <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                                <img
                                    src="/images/nars/animacionfeedsi.gif"
                                    alt="NARS Reel Animation"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
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
                    </div>

                    <div className="description-section">
                        <h2 className="text-2xl font-normal text-black mb-4">Motion Graphics NARS</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Este proyecto ficticio de Motion Graphics emplea simulaciones físicas de magnetismo para presentar NARS Explicit Lipstick y Climax Mascara como auténticos objetos de deseo. La narrativa se inicia entre sombras que construyen una atmósfera de misterio, capturando la atención del espectador a través de la tensión visual. En el clímax de la pieza, se revela la silueta de ambos productos, dando lugar a una composición de alto impacto, concebida para maximizar el engagement en formatos de Stories y Feed.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
