"use client";

import React, { useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import TiltedCard from "../../components/TiltedCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const designTools = [
    'Figma',
    'Adobe Illustrator',
    'Adobe After Effects',
    'Adobe Photoshop',
    'Adobe InDesign',
    'Blender',
    'TouchDesigner',
    'WordPress',
];

const developmentTools = [
    'React',
    'Flutter',
    'HTML/CSS',
    'JavaScript',
    'Python',
    'React Native',
    'Angular',
];

const studies = [
    {
        period: '2022 – 2026',
        title: 'Grado en Diseño Gráfico → EASD Pablo Picasso',
    },
    {
        period: '2026 –',
        title: 'Grado en Ingeniería Informática → UNED',
    },
    {
        period: '',
        title: 'Máster Universitario en Diseño de Interacción y Experiencia de Usuario (UX) → UOC',
    },
];

const courses = [
    {
        title: 'Marketing Digital e Inteligencia Artificial orientado al crecimiento de tu empresa → UNED',
        href: null,
    },
    {
        title: 'Retos de la Ciberseguridad en la Sociedad Digital Actual → UNED',
        href: null,
    },
    {
        title: 'Meta Front-End Developer → Meta',
        href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/313SWB0TT07X',
    },
];

function ScrollFillLine({ text }: { text: string }) {
    const words = text.split(' ');

    return (
        <>
            {words.map((word, wordIndex) => (
                <span
                    key={`${word}-${wordIndex}`}
                    className={`inline-block whitespace-nowrap ${wordIndex < words.length - 1 ? 'mr-[0.28em]' : ''}`}
                >
                    {Array.from(word).map((letter, letterIndex) => (
                        <span
                            key={`${letter}-${wordIndex}-${letterIndex}`}
                            className="about-intro-letter"
                        >
                            {letter}
                        </span>
                    ))}
                </span>
            ))}
        </>
    );
}

export default function AboutPage() {
    const contentRef = useRef<HTMLDivElement>(null);
    const introHeadingRef = useRef<HTMLHeadingElement>(null);
    const studiesTimelineRef = useRef<HTMLDivElement>(null);
    const studiesMobileTextRef = useRef<HTMLDivElement>(null);
    const studiesDesktopTextRef = useRef<HTMLDivElement>(null);
    const coursesTextRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const heading = introHeadingRef.current;
        const phrases = heading?.querySelectorAll('.about-intro-phrase');

        if (!heading || !phrases?.length) return;

        const revealAnimation = gsap.fromTo(
            phrases,
            { yPercent: 115 },
            {
                yPercent: 0,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            revealAnimation.scrollTrigger?.kill();
            revealAnimation.kill();
        };
    }, []);

    useEffect(() => {
        const timeline = studiesTimelineRef.current;

        if (!timeline) return;

        const animation = gsap.fromTo(
            timeline,
            { clipPath: 'inset(0 0 100% 0)' },
            {
                clipPath: 'inset(0 0 0% 0)',
                ease: 'none',
                scrollTrigger: {
                    trigger: timeline,
                    start: 'top 85%',
                    end: 'bottom 45%',
                    scrub: true,
                },
            }
        );

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, []);

    useEffect(() => {
        const media = gsap.matchMedia();

        const animateStudyTexts = (container: HTMLDivElement | null) => {
            const phrases = container?.querySelectorAll('.study-text-phrase');

            if (!container || !phrases?.length) return;

            const animation = gsap.fromTo(
                phrases,
                { yPercent: 115 },
                {
                    yPercent: 0,
                    duration: 0.85,
                    stagger: 0.16,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 82%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            return () => {
                animation.scrollTrigger?.kill();
                animation.kill();
            };
        };

        media.add('(max-width: 639px)', () => animateStudyTexts(studiesMobileTextRef.current));
        media.add('(min-width: 640px)', () => animateStudyTexts(studiesDesktopTextRef.current));

        return () => media.revert();
    }, []);

    useEffect(() => {
        const container = coursesTextRef.current;
        const phrases = container?.querySelectorAll('.course-text-phrase');

        if (!container || !phrases?.length) return;

        const animation = gsap.fromTo(
            phrases,
            { yPercent: 115 },
            {
                yPercent: 0,
                duration: 0.85,
                stagger: 0.16,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <CustomCursor />
            <NavBar />

            <main
                ref={contentRef}
                className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 xl-reduced-project-margins xxl-reduced-project-margins"
            >
                {/* Presentación */}
                <section className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)] lg:gap-20">
                    <div className="max-w-xl">
                        <p className="mb-4 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm">
                            Sobre mí
                        </p>

                        <h1
                            ref={introHeadingRef}
                            className="mb-7 text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
                        >
                            <span className="block overflow-hidden">
                                <span className="about-intro-phrase block">
                                    <ScrollFillLine text="Hola 👋, soy Alba" />
                                </span>
                            </span>
                        </h1>

                        <div className="max-w-lg space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                            <p className="animate-element">
                                Soy diseñadora gráfica, situada en A Coruña. Actualmente estudio Ingeniería Informática y un Máster Universitario en Diseño de Interacción y Experiencia de Usuario (UX). Diseño interfaces y sistemas de diseño con criterio técnico, enfoque visual y coherencia.
                            </p>
                            <p className="animate-element">
                                Me interesa construir experiencias digitales claras, escalables y cuidadas hasta el último detalle.
                            </p>
                        </div>
                    </div>

                    <div className="animate-element w-full max-w-[440px] justify-self-center lg:justify-self-end">
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
                                <div className="flex h-full w-full items-start justify-end p-4">
                                    <div className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur-sm">
                                        <span className="text-lg font-medium">Alba Antón</span>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </section>

                {/* Perfil y experiencia */}
                <div className="mt-28 border-b border-gray-200 lg:mt-40">
                    <section className="border-t border-gray-200 py-10 md:grid md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.5fr)] md:gap-12 lg:py-12">
                        <h2 className="mb-7 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm md:mb-0">
                            Estudios
                        </h2>
                        <div ref={studiesMobileTextRef} className="space-y-7 sm:hidden">
                            {studies.map((study) => (
                                <div key={study.title}>
                                    {study.period && (
                                        <p className="mb-2 text-sm font-medium text-gray-500">{study.period}</p>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="study-text-phrase text-base leading-relaxed text-black">
                                            {study.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden min-h-[190px] grid-cols-[7.5rem_1.25rem_minmax(0,1fr)] gap-x-6 sm:grid">
                            <div className="grid grid-rows-3 gap-y-4">
                                {studies.map((study) => (
                                    <p key={study.title} className="text-sm font-medium text-gray-500">
                                        {study.period || '\u00a0'}
                                    </p>
                                ))}
                            </div>

                            <div className="relative flex h-full min-h-[190px] justify-center" aria-hidden="true">
                                <img
                                    src="/svg/Group 1.svg"
                                    alt=""
                                    className="absolute inset-y-0 h-full w-[18px] opacity-20"
                                />
                                <div
                                    ref={studiesTimelineRef}
                                    className="absolute inset-0 flex justify-center overflow-hidden will-change-[clip-path]"
                                >
                                    <img
                                        src="/svg/Group 1.svg"
                                        alt=""
                                        className="h-full w-[18px]"
                                    />
                                </div>
                            </div>

                            <div ref={studiesDesktopTextRef} className="grid grid-rows-3 gap-y-4">
                                {studies.map((study) => (
                                    <div key={study.title} className="overflow-hidden">
                                        <p className="study-text-phrase text-base leading-relaxed text-black sm:text-lg">
                                            {study.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="animate-element border-t border-gray-200 py-10 md:grid md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.5fr)] md:gap-12 lg:py-12">
                        <h2 className="mb-7 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm md:mb-0">
                            Software de diseño
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {designTools.map((tool) => (
                                <span
                                    key={tool}
                                    className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="animate-element border-t border-gray-200 py-10 md:grid md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.5fr)] md:gap-12 lg:py-12">
                        <h2 className="mb-7 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm md:mb-0">
                            Tecnologías de desarrollo
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {developmentTools.map((tool) => (
                                <span
                                    key={tool}
                                    className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="border-t border-gray-200 py-10 md:grid md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.5fr)] md:gap-12 lg:py-12">
                        <h2 className="mb-7 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm md:mb-0">
                            Cursos y certificados
                        </h2>
                        <div ref={coursesTextRef} className="space-y-3">
                            {courses.map(({ title, href }) => (
                                <div key={title} className="overflow-hidden">
                                    {href ? (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="course-text-phrase curzr-hover inline-block cursor-pointer text-base leading-relaxed text-black transition-opacity hover:opacity-60 sm:text-lg"
                                        >
                                            {title}
                                        </a>
                                    ) : (
                                        <p className="course-text-phrase text-base leading-relaxed text-black sm:text-lg">
                                            {title}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
