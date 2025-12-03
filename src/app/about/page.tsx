"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import TiltedCard from "../../components/TiltedCard";
import MaskedHeading from "../components/MaskedHeading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
    const router = useRouter();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const elements = document.querySelectorAll('.animate-element');
            if (elements.length > 0) {
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

            <div ref={contentRef} className="pt-32 pb-16 px-8 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <MaskedHeading
                        text="ABOUT"
                        className="text-[128px] md:text-[128px] font-bold text-black leading-none mb-8"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column - Text Content */}
                    <div className="space-y-12">
                        {/* Introduction */}
                        <div className="animate-element">
                            <h2 className="text-3xl font-normal text-black mb-6 flex items-center">
                                Hola 👋, soy Alba
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Me especializo en diseño gráfico y 3D/VFX, y estoy desarrollando
                                mis habilidades como desarrolladora web y de aplicaciones. Soy
                                una persona creativa que ama todo lo relacionado con la
                                tecnología y disfruta expresando ideas a través del lenguaje
                                gráfico y entornos interactivos.
                            </p>
                        </div>

                        {/* Skills Section */}
                        <div className="animate-element">
                            <h3 className="text-2xl font-normal text-black mb-6">
                                Sé usar estos programas
                            </h3>
                            <div className="flex flex-wrap gap-3 mb-8">
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Figma
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Adobe
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Blender
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    TouchDesigner
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Premiere
                                </span>
                            </div>
                        </div>

                        {/* Programming Section */}
                        <div className="animate-element">
                            <h3 className="text-2xl font-normal text-black mb-6">
                                A veces programo en...
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    React
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Flutter
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    HTML/CSS
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Javascript
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Python
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Card */}
                    <div className="animate-element">
                        <div className="space-y-6">
                            {/* TiltedCard with Profile Image and Overlay */}
                            <div className="w-full">
                                <TiltedCard
                                    imageSrc="/images/imagenlinkedin1.jpg"
                                    altText="Alba Antón - Foto de perfil"
                                    captionText="Alba Antón"
                                    containerHeight="400px"
                                    containerWidth="100%"
                                    imageHeight="400px"
                                    imageWidth="100%"
                                    scaleOnHover={1.05}
                                    rotateAmplitude={8}
                                    showMobileWarning={false}
                                    showTooltip={true}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <div className="w-full h-full flex items-start justify-end p-4">
                                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full shadow-lg whitespace-nowrap">
                                                <span className="font-medium text-lg">Alba Antón</span>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>

                            {/* Education Info */}
                            <div className="text-black">
                                <h4 className="text-2xl font-bold mb-2">
                                    Grado en Diseño Gráfico
                                </h4>
                                <p className="text-xl mb-4">
                                    EASD Pablo Picasso
                                </p>
                                <p className="text-lg">
                                    2022 - 2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
