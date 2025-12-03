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

            <div ref={contentRef} className="pt-32 pb-16 px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <MaskedHeading
                        text="NARS"
                        className="text-[96px] md:text-[128px] font-bold text-black leading-none mb-4"
                    />
                </div>

                {/* Main Hero Image */}
                <div className="animate-element mb-12">
                    <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                        <img
                            src="/images/0229.png"
                            alt="NARS - Imagen principal"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div>

                {/* Grid de imágenes del proyecto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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

                    {/* Video Stories Reel */}
                    <div className="animate-element">
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                            <video
                                className="w-full h-full object-cover block"
                                controls
                                autoPlay
                                loop
                                muted={false}
                                playsInline
                                preload="metadata"
                            >
                                <source src="/video/storiereel2albaantongonzalez.mp4" type="video/mp4" />
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Wide Images */}
                <div className="space-y-8">
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

                        {/* Video Reel NARS */}
                        <div className="animate-element">
                            <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                                <video
                                    className="w-full h-full object-cover block"
                                    controls
                                    autoPlay
                                    loop
                                    muted={false}
                                    playsInline
                                    preload="metadata"
                                >
                                    <source src="/video/reel1albaantongonzalez.mp4" type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Project Details */}
                <div className="animate-element mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-black mb-4">Cliente</h2>
                        <p className="text-gray-600 mb-6">
                            NARS Cosmetics
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-normal text-black mb-4">Motion Graphics NARS</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Propuesta de motion graphics para la marca NARS Cosmetics, enfocada en transmitir la elegancia y el poder magnético del maquillaje.
                            <br /><br />
                            El proyecto explora la identidad visual de la marca a través de animaciones fluidas y transiciones cinematográficas que reflejan la sofisticación y modernidad de NARS.
                            <br /><br />
                            La propuesta incluye elementos gráficos dinámicos, tipografía cinética y una paleta de colores que evoca la sensualidad y el glamour característicos de la marca.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
