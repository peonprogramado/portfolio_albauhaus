"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { FocusCards } from '@/components/ui/focus-cards';
import { useLanguage } from '../context/LanguageContext';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 6,
        title: "Sileo App",
        subtitle: "Identidad visual e interfaz de una aplicación de productividad accesible",
        category: "Identidad • UI/UX",
        typology: ["Identidad", "UI/UX"],
        year: "2026",
        image: "/images/sileo/16 - iPhone 15 - Isometric Style Rightblur 1.jpg",
        color: "from-gray-100 to-white"
    },
    {
        id: 7,
        title: "Kinetik — Plugin Figma",
        subtitle: "Plugin de Figma para crear y organizar Motion Design Tokens",
        category: "UI/UX • Desarrollo",
        typology: ["Plugin Figma", "Design Systems"],
        year: "2026",
        image: "/images/kinetik-cover.png",
        color: "from-black to-emerald-950"
    },
    {
        id: 8,
        title: "EyeCanvas Specs SmartGlasses app",
        subtitle: "Aplicación de canvas colaborativo diseñada para gafas inteligentes",
        category: "UI/UX",
        typology: ["UI/UX"],
        year: "2026",
        image: "/images/eyecanvas/thumbnailcuadrado.gif",
        color: "from-gray-900 to-black"
    },
    {
        id: 1,
        title: "Bisiona",
        subtitle: "Propuesta de Identidad para IX Jornadas de Arte y Diseño Gráfico",
        category: "Identidad • UI/UX",
        typology: ["Identidad", "UI/UX"],
        year: "2025",
        image: "/images/project1.jpg",
        color: "from-blue-500 to-purple-600"
    },
    {
        id: 2,
        title: "NARS",
        subtitle: "Propuesta Motion Graphics para redes sociales de NARS",
        category: "Motion Graphics",
        typology: ["Motion Graphics"],
        year: "2024",
        image: "/images/project2.jpg",
        color: "from-blue-600 to-indigo-700"
    },
    {
        id: 3,
        title: "Dune Infografía",
        subtitle: "Infografía sobre las películas de la saga DUNE",
        category: "Infografía",
        typology: ["Infografía"],
        year: "2025",
        image: "/images/project3.jpg",
        color: "from-gray-800 to-black"
    },
    {
        id: 4,
        title: "Pilab 5",
        subtitle: "Graficas publicitarias para campaña ficticia de una tienda de Raspberry Pi",
        category: "Identidad",
        typology: ["Identidad", "Motion Graphics"],
        year: "2025",
        image: "/images/project4.jpg",
        color: "from-gray-300 to-gray-500"
    },
    {
        id: 5,
        title: "SCI FI art",
        subtitle: "Infografía sobre la influencia de las vanguardias en el arte de ciencia ficción \"Sci Fi\"",
        category: "Infografía",
        typology: ["Infografía"],
        year: "2023",
        image: "/images/project5.jpg",
        color: "from-blue-300 to-purple-400"
    }
];

export default function ProyectosPage() {
    const router = useRouter();
    const { language, t } = useLanguage();
    const projectsGridRef = useRef<HTMLDivElement>(null);
    const introHeadingRef = useRef<HTMLHeadingElement>(null);
    const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set(['all']));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'text'>('grid');

    // Filtrar proyectos basado en las categorías seleccionadas
    const filteredProjects = projects.filter(project => project.id !== 4).filter(project => {
        if (selectedFilters.has('all') || selectedFilters.size === 0) return true;

        return Array.from(selectedFilters).some(filter => {
            if (filter === 'ui-ux') return project.category.includes('UI/UX');
            if (filter === 'motion') return project.category.includes('Motion Graphics');
            if (filter === 'identidad') return project.category.includes('Identidad');
            if (filter === 'infografia') return project.category.includes('Infografía');
            return false;
        });
    }).map((project) => ({
        ...project,
        title: project.id === 3
            ? t(project.title, 'Dune Infographic')
            : project.id === 7
              ? t(project.title, 'Kinetik — Figma Plugin')
              : project.title,
        subtitle: t(project.subtitle, ({
            1: 'Identity proposal for the 9th Art and Graphic Design Conference',
            2: 'Motion Graphics proposal for NARS social media',
            3: 'Infographic about the films in the DUNE saga',
            4: 'Advertising graphics for a fictional Raspberry Pi shop campaign',
            5: 'Infographic on the influence of the avant-garde on science-fiction art',
            6: 'Visual identity and interface for an accessible productivity app',
            7: 'Figma plugin for creating and organising Motion Design Tokens',
            8: 'Collaborative canvas app designed for smart glasses',
        } as Record<number, string>)[project.id]),
        typology: project.typology.map((type) => t(
            type,
            type === 'Identidad'
                ? 'Brand identity'
                : type === 'Infografía'
                  ? 'Infographic'
                  : type === 'Plugin Figma'
                    ? 'Figma Plugin'
                    : type
        )),
        cursorLabel: project.id === 8
            ? t('Ver caso de estudio', 'View case study')
            : t('Ver proyecto', 'View project'),
    }));

    console.log('selectedFilters actual:', selectedFilters);
    console.log('filteredProjects:', filteredProjects.length);

    // Opciones del filtro
    const filterOptions = [
        { value: 'all', label: t('Todos los proyectos', 'All projects') },
        { value: 'ui-ux', label: 'UI/UX' },
        { value: 'identidad', label: t('Identidad', 'Brand identity') },
        { value: 'infografia', label: t('Infografía', 'Infographic') },
        { value: 'motion', label: 'Motion Graphics' }
    ];

    // Obtener label de los filtros seleccionados
    const getSelectedLabel = () => {
        if (selectedFilters.has('all') || selectedFilters.size === 0) {
            return t('Todos los proyectos', 'All projects');
        }

        const selectedLabels = Array.from(selectedFilters)
            .map(filter => {
                const option = filterOptions.find(opt => opt.value === filter);
                return option ? option.label : '';
            })
            .filter(label => label !== '');

        return selectedLabels.join(', ');
    };

    // Manejar cambio de filtros
    const handleFilterChange = (keys: "all" | Set<React.Key>) => {
        console.log('Keys recibidas:', keys);

        if (keys === "all") {
            setSelectedFilters(new Set(['all']));
            return;
        }

        const newSelection = new Set(Array.from(keys).map(String));
        console.log('Nueva selección:', newSelection);

        // Si no hay selección, mostrar todos
        if (newSelection.size === 0) {
            setSelectedFilters(new Set(['all']));
            return;
        }

        // Si la nueva selección incluye "all" y otros filtros
        if (newSelection.has('all') && newSelection.size > 1) {
            // Si antes solo teníamos "all", significa que se agregó un filtro específico
            // Remover "all" y dejar solo los filtros específicos
            if (selectedFilters.has('all') && selectedFilters.size === 1) {
                newSelection.delete('all');
                setSelectedFilters(newSelection);
                return;
            }
            // Si se clickeó "all" cuando había otros filtros, solo dejar "all"
            setSelectedFilters(new Set(['all']));
            return;
        }

        // Si solo se seleccionó "all"
        if (newSelection.has('all') && newSelection.size === 1) {
            setSelectedFilters(new Set(['all']));
            return;
        }

        // Caso normal: actualizar con la nueva selección (sin "all")
        setSelectedFilters(newSelection);
    };

    // Manejar click en proyecto
    const handleProjectClick = (projectId: number) => {
        if (projectId === 7) {
            window.open(
                'https://www.figma.com/community/plugin/1677245855050443527/kinetik-motion-design-tokens',
                '_blank',
                'noopener,noreferrer'
            );
        } else if (projectId === 8) {
            window.open(
                'https://medium.com/@albaantondesign/is-it-possible-to-adapt-a-collaborative-canvas-for-smart-glasses-b418c4311364?sharedUserId=albaantondesign',
                '_blank',
                'noopener,noreferrer'
            );
        } else if (projectId === 1) {
            router.push('/bisiona2026');
        } else if (projectId === 2) {
            router.push('/nars');
        } else if (projectId === 3) {
            router.push('/duneinfografia');
        } else if (projectId === 4) {
            router.push('/pilab5');
        } else if (projectId === 5) {
            router.push('/scifiart');
        } else if (projectId === 6) {
            router.push('/sileo');
        }
    };

    useEffect(() => {
        const phrases = introHeadingRef.current?.querySelectorAll('.project-intro-phrase');

        if (!phrases?.length) return;

        const animation = gsap.fromTo(
            phrases,
            { yPercent: 115 },
            {
                yPercent: 0,
                duration: 0.85,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 0.1,
            }
        );

        return () => {
            animation.kill();
        };
    }, []);

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
    }, [selectedFilters, language, viewMode]); // Reanimar cuando cambian el filtro, el idioma o la vista

    return (
        <div className="min-h-screen bg-white">
            <NavBar />

            {/* Header Section */}
            <div className="pt-32 pb-16 px-8 max-w-6xl mx-auto xl-reduced-project-margins xxl-reduced-project-margins xxl-projects-page-container">
                <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.65fr)] lg:items-start lg:gap-16">
                    <h1
                        ref={introHeadingRef}
                        className="max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
                    >
                        <span className="block overflow-hidden">
                            <span className="project-intro-phrase block">
                            {t('Una selección de mis mejores proyectos.', 'A selection of my best projects.')}
                            </span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="project-intro-phrase block">
                            {t('Explorando la relación entre', 'Exploring the relationship between')}
                            </span>
                        </span>
                        <span className="block overflow-hidden text-gray-300">
                            <span className="project-intro-phrase block">
                            {t('identidad, diseño y tecnología.', 'identity, design and technology.')}
                            </span>
                        </span>
                    </h1>

                    <p className="max-w-md text-base leading-relaxed text-gray-500 sm:text-lg lg:pt-2">
                    {t('Proyectos que exploran distintas formas de conectar diseño y tecnología. Cada propuesta responde a un contexto y una forma de entender la interacción.', 'Projects that explore different ways of connecting design and technology. Each proposal responds to a context and a distinct way of understanding interaction.')}
                    </p>
                </div>

                {/* Filter Dropdown con HeroUI */}
                <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
                    <Dropdown onOpenChange={(open) => setIsDropdownOpen(open)} shouldBlockScroll={false}>
                        <DropdownTrigger>
                            <Button
                                className="backdrop-blur-sm bg-white/10 border border-black/20 rounded-3xl px-6 py-3 text-black font-medium hover:bg-white/20 transition-all duration-300 min-w-[220px]"
                                endContent={
                                    <Icon
                                        path={mdiChevronDown}
                                        size={0.72}
                                        aria-hidden="true"
                                        className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                }
                            >
                                {getSelectedLabel()}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label={t('Opciones de filtro', 'Filter options')}
                            onSelectionChange={handleFilterChange}
                            selectedKeys={selectedFilters}
                            selectionMode="multiple"
                            className="backdrop-blur-md bg-white/10 border border-black/20 rounded-2xl"
                        >
                            {filterOptions.map((option) => (
                                <DropdownItem
                                    key={option.value}
                                    className="text-black hover:text-gray-500 hover:scale-105 transition-all duration-200 px-6 py-3"
                                >
                                    {option.label}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>

                    <div
                        role="radiogroup"
                        aria-label={t('Vista de proyectos', 'Project view')}
                        className="relative grid grid-cols-2 rounded-full border border-black/5 bg-black/[0.035] p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                    >
                        <span
                            aria-hidden="true"
                            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                viewMode === 'text' ? 'translate-x-full' : 'translate-x-0'
                            }`}
                        />
                        <button
                            type="button"
                            role="radio"
                            aria-checked={viewMode === 'grid'}
                            onClick={() => setViewMode('grid')}
                            className={`curzr-hover relative z-10 min-w-[78px] rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                                viewMode === 'grid' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {t('Rejilla', 'Grid')}
                        </button>
                        <button
                            type="button"
                            role="radio"
                            aria-checked={viewMode === 'text'}
                            onClick={() => setViewMode('text')}
                            className={`curzr-hover relative z-10 min-w-[78px] rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
                                viewMode === 'text' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {t('Texto', 'Text')}
                        </button>
                    </div>
                </div>

                {/* Projects Grid / Text View */}
                <div ref={projectsGridRef} className="mb-20 xl-large-project-media xxl-large-project-media xxl-projects-grid-media">
                    {viewMode === 'grid' ? (
                        <FocusCards
                            cards={filteredProjects}
                            onCardClick={handleProjectClick}
                        />
                    ) : (
                        <div className="w-full overflow-hidden border-y border-gray-300">
                            <div
                                role="row"
                                className="hidden grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)_auto] items-center gap-10 border-b border-gray-300 px-2 py-5 text-base text-gray-400 md:grid"
                            >
                                <span role="columnheader">{t('Proyecto', 'Project')}</span>
                                <span role="columnheader">{t('Descripción', 'Description')}</span>
                                <span role="columnheader">{t('Servicios', 'Services')}</span>
                                <span role="columnheader" className="text-right">{t('Año', 'Year')}</span>
                            </div>

                            <div role="table" aria-label={t('Lista de proyectos', 'Project list')}>
                                {filteredProjects.map((project) => (
                                    <button
                                        key={project.id}
                                        type="button"
                                        role="row"
                                        aria-label={`${project.cursorLabel}: ${project.title}`}
                                        data-cursor-label={project.cursorLabel}
                                        onClick={() => handleProjectClick(project.id)}
                                        className="project-item curzr-hover group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-4 border-b border-gray-300 px-2 py-7 text-left transition-colors duration-300 last:border-b-0 hover:bg-black/[0.025] md:min-h-[104px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)_auto] md:gap-10 md:py-8"
                                    >
                                        <span role="cell" className="project-inner-element text-lg font-medium text-black md:text-[22px]">
                                            {project.title}
                                        </span>
                                        <span role="cell" className="project-inner-element col-span-2 row-start-2 text-[15px] leading-relaxed text-gray-500 md:col-span-1 md:row-start-auto md:text-lg">
                                            {project.subtitle}
                                        </span>
                                        <span role="cell" className="project-inner-element col-span-2 row-start-3 flex flex-wrap gap-1.5 md:col-span-1 md:row-start-auto">
                                            {project.typology.map((type) => (
                                                <span
                                                    key={type}
                                                    className="rounded-full bg-black/[0.045] px-3 py-1 text-sm text-black transition-colors duration-300 group-hover:bg-black/[0.075] md:text-[17px]"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </span>
                                        <span role="cell" className="project-inner-element col-start-2 row-start-1 text-base tabular-nums text-gray-500 md:col-start-auto md:row-start-auto md:text-right md:text-xl md:text-black">
                                            {project.year}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div >

            <Footer />
        </div >
    );
}
