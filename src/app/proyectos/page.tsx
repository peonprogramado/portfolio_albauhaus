"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import MaskedHeading from "../components/MaskedHeading";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Bisiona 2026",
        subtitle: "IX Jornadas de Arte y Diseño Gráfico",
        category: "Identidad • UI/UX",
        image: "/images/project1.jpg",
        color: "from-blue-500 to-purple-600"
    },
    {
        id: 2,
        title: "NARS",
        subtitle: "Propuesta Motion Graphics NARS",
        category: "Motion Graphics",
        image: "/images/project2.jpg",
        color: "from-blue-600 to-indigo-700"
    },
    {
        id: 3,
        title: "Dune Infografía",
        subtitle: "Infografía de las películas de la saga DUNE",
        category: "Infografía",
        image: "/images/project3.jpg",
        color: "from-gray-800 to-black"
    },
    {
        id: 4,
        title: "Raspberry Pi 5",
        subtitle: "Campaña ficticia para una tienda de Raspberry Pi",
        category: "Identidad",
        image: "/images/project4.jpg",
        color: "from-gray-300 to-gray-500"
    },
    {
        id: 5,
        title: "SCI FI art in data",
        subtitle: "Infografía sobre la influencia de las vanguardias en el arte de ciencia ficción \"Sci Fi\"",
        category: "Infografía",
        image: "/images/project5.jpg",
        color: "from-blue-300 to-purple-400"
    }
];

export default function ProyectosPage() {
    const router = useRouter();
    const projectsGridRef = useRef<HTMLDivElement>(null);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Filtrar proyectos basado en la categoría seleccionada
    const filteredProjects = projects.filter(project => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'ui-ux') return project.category.includes('UI/UX');
        if (selectedFilter === 'motion') return project.category.includes('Motion Graphics');
        if (selectedFilter === 'identidad') return project.category.includes('Identidad');
        if (selectedFilter === 'infografia') return project.category.includes('Infografía');
        return true;
    });

    // Opciones del filtro
    const filterOptions = [
        { value: 'all', label: `Todos los proyectos (${filteredProjects.length})` },
        { value: 'ui-ux', label: 'UI/UX' },
        { value: 'identidad', label: 'Identidad' },
        { value: 'infografia', label: 'Infografía' },
        { value: 'motion', label: 'Motion Graphics' }
    ];

    // Obtener label del filtro seleccionado
    const getSelectedLabel = () => {
        const option = filterOptions.find(opt => opt.value === selectedFilter);
        return option ? option.label : 'Todos los proyectos';
    };

    // Manejar cambio de filtro
    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        setIsDropdownOpen(false);
    };

    // Manejar click en proyecto
    const handleProjectClick = (projectId: number) => {
        if (projectId === 1) {
            router.push('/bisiona2026');
        } else if (projectId === 2) {
            router.push('/nars');
        }
        // Aquí se pueden agregar más navegaciones para otros proyectos
    };

    useEffect(() => {
        // Pequeño delay para asegurar que el DOM esté listo
        const timer = setTimeout(() => {
            const projectElements = projectsGridRef.current?.querySelectorAll('.project-item');

            console.log('Proyectos encontrados:', projectElements?.length);

            if (projectElements && projectElements.length > 0) {
                // Configurar estado inicial para todos los proyectos
                gsap.set(projectElements, {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    filter: "blur(4px)", // Blur ligero inicial
                    transformOrigin: "center center"
                });

                // Configurar estado inicial para elementos internos
                projectElements.forEach((project, index) => {
                    const innerElements = project.querySelectorAll('.project-inner-element');
                    if (innerElements.length > 0) {
                        gsap.set(innerElements, {
                            opacity: 0,
                            scale: 0.9,
                            filter: "blur(4px)", // Mismo blur que el contenedor
                            rotation: 0,
                            y: 80 // Mismo desplazamiento Y que el contenedor
                        });
                    }
                });


                // VERSIÓN ORIGINAL QUE FUNCIONABA: Animación inmediata
                console.log('🚀 Iniciando animación de prueba inmediata');

                // Timeline simple para probar (EXACTAMENTE como funcionaba antes)
                const testTimeline = gsap.timeline({ delay: 1 }); // 1 segundo de delay para ver el efecto

                projectElements.forEach((project, index) => {
                    console.log(`📦 Configurando proyecto ${index + 1}`);

                    // Animar cada proyecto con delay progresivo
                    testTimeline.to(project, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        onStart: () => console.log(`✨ Proyecto ${index + 1} apareciendo`),
                        onComplete: () => console.log(`✅ Proyecto ${index + 1} completado`)
                    }, index * 0.4); // 0.4 segundos entre cada proyecto

                    // Deblur rápido separado (0.3 segundos)
                    testTimeline.to(project, {
                        filter: "blur(0px)",
                        duration: 0.3,
                        ease: "power2.out"
                    }, index * 0.4); // Al mismo tiempo que la animación principal

                    // Animar elementos internos
                    const innerElements = project.querySelectorAll('.project-inner-element');
                    if (innerElements.length > 0) {
                        console.log(`🎯 Elementos internos encontrados en proyecto ${index + 1}:`, innerElements.length);
                        testTimeline.to(innerElements, {
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        }, index * 0.4); // Mismo tiempo que el contenedor

                        // Deblur rápido para elementos internos (0.3 segundos)
                        testTimeline.to(innerElements, {
                            filter: "blur(0px)",
                            duration: 0.3,
                            ease: "power2.out"
                        }, index * 0.4); // Al mismo tiempo que el contenedor
                    }
                });
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [selectedFilter]); // Solo re-animar cuando cambie el filtro seleccionado, no cuando se abra/cierre el dropdown

    return (
        <div className="min-h-screen bg-white">
            <CustomCursor />
            <NavBar />

            {/* Header Section */}
            <div className="pt-32 pb-16 px-8 max-w-6xl mx-auto">
                <div className="mb-16">
                    <MaskedHeading
                        text="PROYECTOS"
                        className="text-[80px] md:text-[120px] font-bold text-black leading-none mb-4"
                    />
                </div>

                {/* Filter Dropdown Personalizado */}
                <div className="mb-12 relative inline-block">
                    {/* Botón principal */}
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-white/10 backdrop-blur-md border-2 border-black/20 rounded-3xl px-6 py-3 text-black font-medium focus:outline-none hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-between w-auto min-w-[220px] gap-4"
                    >
                        <span>{getSelectedLabel()}</span>
                        <img
                            src="/svg/Vector.svg"
                            alt="Arrow"
                            className={`w-3 h-3 transition-transform duration-300 ease-in-out ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </button>

                    {/* Dropdown menu - se superpone al contenido pero mantiene el botón visible */}
                    {isDropdownOpen && (
                        <div className="absolute top-0 left-0 w-full bg-white/10 backdrop-blur-md border-2 border-black/20 rounded-3xl shadow-lg z-40 overflow-hidden">
                            {/* Botón principal repetido para mantener la flecha visible */}
                            <button
                                onClick={() => setIsDropdownOpen(false)}
                                className="w-full px-6 py-3 flex items-center justify-between bg-white/5 border-b border-black/10 hover:bg-white/20 transition-colors"
                            >
                                <span className="font-medium text-black">{getSelectedLabel()}</span>
                                <img
                                    src="/svg/Vector.svg"
                                    alt="Arrow"
                                    className="w-3 h-3 rotate-180"
                                />
                            </button>
                            {/* Opciones del dropdown */}
                            {filterOptions.map((option) => {
                                // Si la opción actual es la seleccionada, no la mostramos
                                if (option.value === selectedFilter) return null;

                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleFilterChange(option.value)}
                                        className="w-full text-left px-6 py-3 hover:bg-white/20 transition-colors text-black/70 font-normal"
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Overlay para cerrar dropdown al hacer click fuera */}
                    {isDropdownOpen && (
                        <div
                            className="fixed inset-0 z-0"
                            onClick={() => setIsDropdownOpen(false)}
                        />
                    )}
                </div>

                {/* Projects Grid */}
                <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-item group cursor-pointer curzr-hover ${project.id === 5 ? 'md:col-span-1' : ''}`}
                            onClick={() => handleProjectClick(project.id)}
                        >
                            <div className="relative overflow-hidden rounded-2xl aspect-square mb-4">
                                {/* Fondo de gradiente solo para proyectos que no tienen contenido específico */}
                                {project.id !== 1 && project.id !== 2 && project.id !== 3 && project.id !== 4 && project.id !== 5 && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90`} />
                                )}

                                {/* GIF como fondo completo del primer proyecto (Bisiona con logo) */}
                                {project.id === 1 && (
                                    <img
                                        src="/video/Adobe Express - animacionlogobisiona7sg.gif"
                                        alt="Animación Logo Bisiona"
                                        className="project-inner-element absolute inset-0 w-full h-full object-cover rounded-2xl"
                                    />
                                )}

                                {/* GIF como fondo completo del segundo proyecto (NARS) */}
                                {project.id === 2 && (
                                    <img
                                        src="/video/Adobe Express - animaciónidentificador_feed_antongonzalezalba.gif"
                                        alt="Animación Identificador Feed"
                                        className="project-inner-element absolute inset-0 w-full h-full object-cover rounded-2xl"
                                    />
                                )}

                                {/* Imagen como fondo completo del tercer proyecto (Dune) */}
                                {project.id === 3 && (
                                    <img
                                        src="/images/duneinfo.png"
                                        alt="Dune Info"
                                        className="project-inner-element absolute inset-0 w-full h-full object-cover rounded-2xl"
                                        style={{ imageOrientation: 'from-image', transform: 'rotate(0deg)' }}
                                    />
                                )}

                                {/* Imagen como fondo completo del cuarto proyecto (Raspberry Pi) */}
                                {project.id === 4 && (
                                    <img
                                        src="/images/raspberrypi5icon.png"
                                        alt="Raspberry Pi 5"
                                        className="project-inner-element absolute inset-0 w-full h-full object-cover rounded-2xl"
                                    />
                                )}

                                {/* GIF como fondo completo del quinto proyecto (Nucleate) */}
                                {project.id === 5 && (
                                    <img
                                        src="/video/Adobe Express - postervr.gif"
                                        alt="Nucleate Poster VR"
                                        className="project-inner-element absolute inset-0 w-full h-full object-cover rounded-2xl"
                                    />
                                )}

                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Project content based on design */}
                                    {project.id === 1 && (
                                        <div className="project-inner-element"></div>
                                    )}
                                    {project.id === 2 && (
                                        <div className="project-inner-element"></div>
                                    )}
                                    {project.id === 5 && (
                                        <div className="project-inner-element"></div>
                                    )}
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{project.category}</p>
                                </div>
                                <p className="text-sm text-gray-600">{project.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

            <Footer />
        </div >
    );
}
