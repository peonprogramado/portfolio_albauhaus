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

            <div ref={contentRef} className="pt-32 pb-16 px-8 max-w-6xl mx-auto xl-reduced-project-margins xxl-reduced-project-margins">
                {/* Header */}
                <div className="mb-16">
                    <MaskedHeading
                        text="SOBRE MÍ"
                        className="text-[42px] sm:text-[56px] md:text-[80px] lg:text-[128px] font-bold text-black leading-none mb-8"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-24 xl-project-text-separation xxl-project-text-separation">
                    {/* Left Column - Text Content */}
                    <div className="space-y-12 description-section">
                        {/* Introduction */}
                        <div className="animate-element">
                            <h2 className="text-3xl font-normal text-black mb-6 flex items-center">
                                Hola 👋, soy Alba
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Estoy terminando mis estudios de Diseño Gráfico en A Coruña, una formación que complemento con el desarrollo frontend autodidacta para dominar el proceso desde la idea hasta la implementación. Como diseñadora multidisciplinar, uno estructura lógica y sensibilidad visual para crear entornos interactivos funcionales.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                Mis áreas de interés son el diseño de producto digital, la animación 2D/3D y los efectos visuales.
                            </p>
                        </div>

                        {/* Skills Section */}
                        <div className="animate-element">
                            <h3 className="text-2xl font-normal text-black mb-6">
                                Software de Diseño
                            </h3>
                            <div className="flex flex-wrap gap-3 mb-8">
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Figma
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Adobe Illustrator
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Adobe After Effects
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Adobe Photoshop
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Adobe Indesign
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Blender
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    TouchDesigner
                                </span>
                                <span className="curzr-hover px-4 py-2 border-2 border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition-colors cursor-pointer">
                                    Wordpress
                                </span>
                            </div>
                        </div>

                        {/* Programming Section */}
                        <div className="animate-element">
                            <h3 className="text-2xl font-normal text-black mb-6">
                                Tecnologías de Desarrollo
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
                    <div className="animate-element client-section xl-large-project-media xxl-large-project-media">
                        <div className="space-y-6">
                            {/* TiltedCard with Profile Image and Overlay */}
                            <div className="w-full">
                                <div className="tilted-card-container">
                                    <TiltedCard
                                        imageSrc="/images/imagenlinkedin1.jpg"
                                        altText="Alba Antón - Foto de perfil"
                                        captionText="Yo"
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
