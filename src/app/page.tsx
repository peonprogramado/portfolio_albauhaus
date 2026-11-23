'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from './components/NavBar';
import TextPressure from './components/TextPressure';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Threads from './components/Threads';
import { motion } from 'framer-motion';
import MaskedLine from './components/MaskedLine';
import ImageTooltip from './components/ImageTooltip';
import Footer from './components/Footer';
import GradualBlur from '../components/GradualBlur';
import { useLanguage } from './context/LanguageContext';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
// import { useLoading } from './components/SimpleLoadingProvider';

gsap.registerPlugin(ScrollTrigger);

function ScrollFillLine({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className={`inline-block whitespace-nowrap ${wordIndex < words.length - 1 ? 'mr-[0.28em]' : ''}`}
        >
          {word.split('').map((letter, letterIndex) => (
            <span
              key={`${letter}-${wordIndex}-${letterIndex}`}
              className="home-intro-letter"
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const homeIntroLines = language === 'es'
    ? [
        'Diseño innovador, sintético y accesible.',
        'Un lenguaje visual creativo enfocado',
        'en la funcionalidad.',
      ]
    : [
        'Innovative, concise and accessible design.',
        'A creative visual language focused',
        'on functionality.',
      ];
  const backgroundRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const homeIntroRef = useRef<HTMLHeadingElement>(null);
  const specialtiesHeadingRef = useRef<HTMLHeadingElement>(null);
  const featuredHeadingRef = useRef<HTMLHeadingElement>(null);
  const serviciosRef = useRef<HTMLHeadingElement>(null);

  const diseñoRef = useRef<HTMLParagraphElement>(null);
  const motionRef = useRef<HTMLParagraphElement>(null);
  const desarrolloRef = useRef<HTMLParagraphElement>(null);
  const desarrollo2Ref = useRef<HTMLParagraphElement>(null);

  const lineRefTop = useRef<HTMLDivElement>(null);
  const lineRefBottom = useRef<HTMLDivElement>(null);
  const lineRefExtra = useRef<HTMLDivElement>(null);
  const lineRefFinal = useRef<HTMLDivElement>(null);
  const lineRefNew = useRef<HTMLDivElement>(null);
  const extraTextRef = useRef<HTMLHeadingElement>(null); // Ref actualizado para h2
  const imageRef = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const imageRef3 = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const featuredDragRef = useRef({
    isDragging: false,
    hasMoved: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredCarousel, setHoveredCarousel] = useState<number | null>(null);
  const [featuredProgress, setFeaturedProgress] = useState(0);
  const [featuredActiveIndex, setFeaturedActiveIndex] = useState(0);
  const featuredProjects = [
    {
      id: 0,
      title: 'Sileo App',
      description: t(
        'Identidad visual e interfaz de una aplicación de productividad accesible',
        'Visual identity and interface for an accessible productivity app'
      ),
      year: '2026',
      image: '/images/sileo/16 - iPhone 15 - Isometric Style Rightblur 1.jpg',
      alt: 'Sileo App',
      href: '/sileo',
      categories: ['identity', 'uiux'],
      tags: [t('Identidad', 'Brand identity'), 'UI/UX'],
    },
    {
      id: 1,
      title: 'Bisiona',
      description: t(
        'Identidad IX Jornadas de Arte y Diseño EASDPP',
        'Identity for the 9th EASDPP Art and Design Conference'
      ),
      year: '2025',
      image: '/video/pegatinas.gif',
      alt: 'Destacados',
      href: '/bisiona2026',
      categories: ['identity'],
      tags: ['Branding'],
    },
    {
      id: 2,
      title: 'NARS',
      description: t(
        'Propuesta Motion Graphics para redes sociales de NARS',
        'Motion Graphics proposal for NARS social media'
      ),
      year: '2024',
      image: '/images/nars/0.png',
      alt: 'SynthMind Design',
      href: '/nars',
      categories: ['motion'],
      tags: ['Motion Graphics'],
    },
    {
      id: 3,
      title: t('Kinetik — Plugin Figma', 'Kinetik — Figma Plugin'),
      description: t(
        'Plugin de Figma para crear y organizar Motion Design Tokens',
        'Figma plugin for creating and organising Motion Design Tokens'
      ),
      year: '2026',
      image: '/images/kinetik-cover.png',
      alt: 'Kinetik — Figma Plugin',
      href: 'https://www.figma.com/community/plugin/1677245855050443527/kinetik-motion-design-tokens',
      categories: ['uiux'],
      tags: [t('Plugin Figma', 'Figma Plugin'), t('Sistemas de diseño', 'Design Systems')],
      external: true,
    },
  ];
  const visibleFeaturedProjects = featuredProjects;
  const featuredProgressWidth = visibleFeaturedProjects.length > 0
    ? ((featuredProgress * Math.max(visibleFeaturedProjects.length - 1, 0) + 1) / visibleFeaturedProjects.length) * 100
    : 0;

  const updateFeaturedProgress = () => {
    const container = featuredScrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-featured-card]'));
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setFeaturedProgress(Math.min(Math.max(progress, 0), 1));
    setFeaturedActiveIndex(closestIndex);
  };

  const startFeaturedDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !featuredScrollRef.current) return;

    featuredDragRef.current = {
      isDragging: true,
      hasMoved: false,
      startX: event.clientX,
      startScrollLeft: featuredScrollRef.current.scrollLeft,
    };
  };

  const moveFeaturedDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = featuredScrollRef.current;
    const drag = featuredDragRef.current;
    if (!container || !drag.isDragging) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4 && !drag.hasMoved) {
      drag.hasMoved = true;
      container.setPointerCapture(event.pointerId);
    }
    container.scrollLeft = drag.startScrollLeft - distance;
  };

  const stopFeaturedDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!featuredScrollRef.current || !featuredDragRef.current.isDragging) return;

    featuredDragRef.current.isDragging = false;
    if (featuredScrollRef.current.hasPointerCapture(event.pointerId)) {
      featuredScrollRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleFeaturedEdgeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = featuredScrollRef.current;
    if (!container || featuredDragRef.current.hasMoved) return;

    const rect = container.getBoundingClientRect();
    const edgeZone = Math.min(180, rect.width * 0.18);
    const maxScroll = container.scrollWidth - container.clientWidth;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-featured-card]')
    );
    const firstSnapPosition = cards[0]?.offsetLeft ?? 0;
    const canMoveLeft = container.scrollLeft > firstSnapPosition + 2;
    const canMoveRight = container.scrollLeft < maxScroll - 2;
    const direction = event.clientX <= rect.left + edgeZone && canMoveLeft
      ? 'left'
      : event.clientX >= rect.right - edgeZone && canMoveRight
        ? 'right'
        : null;

    if (!direction) return;

    event.preventDefault();
    event.stopPropagation();

    const currentScroll = container.scrollLeft;
    const nextPosition = direction === 'right'
      ? cards.find((card) => card.offsetLeft > currentScroll + 4)?.offsetLeft ?? maxScroll
      : [...cards]
          .reverse()
          .find((card) => card.offsetLeft < currentScroll - 4)?.offsetLeft ?? firstSnapPosition;

    container.scrollTo({
      left: Math.min(Math.max(nextPosition, firstSnapPosition), maxScroll),
      behavior: 'smooth',
    });
  };

  // const { showLoadingForNavigation } = useLoading();

  useEffect(() => {
    const container = featuredScrollRef.current;
    if (!container) return;

    container.scrollTo({ left: 0, behavior: 'auto' });
    setFeaturedProgress(0);
    setFeaturedActiveIndex(0);
  }, []);

  useEffect(() => {
    const container = featuredScrollRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const canScrollLeft = event.deltaY < 0 && container.scrollLeft > 0;
      const canScrollRight = event.deltaY > 0 && container.scrollLeft < maxScroll - 1;

      if (canScrollLeft || canScrollRight) {
        event.preventDefault();
        container.scrollLeft += event.deltaY * 1.15;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (!backgroundRef.current || !revealRef.current) return;

    gsap.to(backgroundRef.current, {
      backgroundColor: '#fdfdfd',
      ease: 'none',
      scrollTrigger: {
        trigger: revealRef.current,
        start: 'top bottom',
        end: 'top center',
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
    const letters = Array.from(
      homeIntroRef.current?.querySelectorAll<HTMLElement>('.home-intro-letter') ?? []
    );
    const phrases = homeIntroRef.current?.querySelectorAll('.home-intro-phrase');

    if (!letters.length || !phrases?.length || !homeIntroRef.current) return;

    const revealAnimation = gsap.fromTo(
      phrases,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: homeIntroRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const updateFill = (progress: number) => {
      const filledLetters = Math.floor(progress * (letters.length + 1));

      letters.forEach((letter, index) => {
        letter.style.color = index < filledLetters
          ? 'var(--home-intro-filled)'
          : 'var(--home-intro-unfilled)';
      });
    };

    updateFill(0);

    const trigger = ScrollTrigger.create({
      trigger: homeIntroRef.current,
      start: 'top 82%',
      end: 'bottom 35%',
      onUpdate: (self) => updateFill(self.progress),
    });

    return () => {
      trigger.kill();
      revealAnimation.scrollTrigger?.kill();
      revealAnimation.kill();
      letters.forEach((letter) => {
        letter.style.removeProperty('color');
      });
    };
  }, [language]);

  useEffect(() => {
    const headings = [specialtiesHeadingRef.current, featuredHeadingRef.current].filter(
      (heading): heading is HTMLHeadingElement => Boolean(heading)
    );

    const animations = headings.map((heading) =>
      gsap.fromTo(
        heading.querySelectorAll('.home-section-heading-phrase'),
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    );

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, []);

  useEffect(() => {
    if (!serviciosRef.current) return;

    gsap.fromTo(
      serviciosRef.current,
      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: serviciosRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);


  useEffect(() => {
    const texts = [diseñoRef.current, motionRef.current, desarrolloRef.current, desarrollo2Ref.current];
    texts.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 80,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    if (
      !lineRefTop.current ||
      !lineRefBottom.current ||
      !lineRefExtra.current ||
      !lineRefFinal.current ||
      !lineRefNew.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: lineRefTop.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      [lineRefTop.current, lineRefBottom.current, lineRefExtra.current, lineRefFinal.current, lineRefNew.current],
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power2.out', stagger: 0 }
    );
  }, []);

  useEffect(() => {
    if (!extraTextRef.current) return;

    gsap.fromTo(
      extraTextRef.current,
      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: extraTextRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!carouselRef.current) return;

    gsap.fromTo(
      carouselRef.current,
      {
        opacity: 0,
        y: 100,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // Mobile carousel fade animation
  useEffect(() => {
    if (!mobileCarouselRef.current) return;

    const mobileImages = mobileCarouselRef.current.querySelectorAll('.mobile-carousel-item');

    if (mobileImages.length > 0) {
      // Set initial state
      gsap.set(mobileImages, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        filter: "blur(4px)",
        transformOrigin: "center center"
      });

      // Create timeline animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mobileCarouselRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      mobileImages.forEach((image, index) => {
        timeline.to(image, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }, index * 0.3);

        timeline.to(image, {
          filter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out"
        }, index * 0.3);
      });
    }
  }, []);

  useEffect(() => {
    gsap.fromTo(
      extraTextRef.current,
      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: extraTextRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);


  const getBlurStyle = (key: string) => {
    if (hovered === null) return {};
    return hovered === key
      ? { filter: 'none', transition: 'filter 0.3s ease' }
      : { filter: 'blur(5px)', transition: 'filter 0.3s ease' };
  };

  return (
    <>
      <NavBar />
      <div style={{ width: '100%', height: '600px', position: 'absolute', top: '-100px', left: 0, zIndex: 1, pointerEvents: 'none' }}>
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>
      <main className="home-main relative flex flex-col items-center overflow-hidden">
        {/* Fondo animado */}
        <div
          ref={backgroundRef}
          className="home-background absolute inset-0 z-[-1]"
          style={{ backgroundColor: '#000000' }}
        />

        {/* ALBA ANTÓN */}
        {/* Desktop version */}
        <div
          className="hidden md:flex w-full p-8 lg:p-12 xl:p-16 justify-center items-center"
          style={{ minHeight: '400px', maxWidth: '1200px', marginTop: '340px' }}
        >
          <TextPressure
            text="ALBA ANTÓN"
            fontFamily="Roboto Flex"
            minFontSize={320}
            textColor="#FDFDFD"
          />
        </div>

        {/* Mobile version */}
        <div
          className="flex md:hidden w-full p-8 justify-center items-center flex-col gap-0"
          style={{ minHeight: '400px', maxWidth: '1200px', marginTop: '340px' }}
        >
          <div style={{ width: '80%', height: '200px' }}>
            <TextPressure
              text="ALBA"
              fontFamily="Roboto Flex"
              minFontSize={100}
              textColor="#FDFDFD"
            />
          </div>
          <div style={{ width: '100%', height: '200px' }}>
            <TextPressure
              text="ANTÓN"
              fontFamily="Roboto Flex"
              minFontSize={100}
              textColor="#FDFDFD"
            />
          </div>
        </div>

        {/* Texto introductorio */}
        <div ref={revealRef} className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mt-[100px] md:mt-[200px] mb-[40px]">
          <div className="flex flex-col items-start xl:flex-row xl:items-end xl:justify-between xl:gap-12">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm">
                {t('Enfoque y valores', 'Approach and values')}
              </p>

              <h2
                ref={homeIntroRef}
                className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
              >
                {homeIntroLines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span className="home-intro-phrase block">
                      <ScrollFillLine text={line} />
                    </span>
                  </span>
                ))}
              </h2>
            </div>

            <a
              href="mailto:albaantondesign@gmail.com"
              className="curzr-hover group mt-8 inline-flex w-full items-center justify-between gap-8 rounded-full border border-black bg-white px-5 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white sm:w-[260px] xl:mt-0 xl:flex-shrink-0"
            >
              <span>{t('Empezar un proyecto', 'Start a project')}</span>
              <Icon path={mdiArrowRight} size={0.9} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Botones de especialidades */}
        <div className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mb-[140px]">
          <div className="flex flex-wrap gap-2">
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              {t('Arquitectura de Información', 'Information Architecture')}
            </span>
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              {t('Producto Digital', 'Digital Product')}
            </span>
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              {t('Sistemas Visuales', 'Visual Systems')}
            </span>
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              {t('Desarrollo', 'Development')}
            </span>
          </div>
        </div>

        {/* ESPECIALIDADES */}
        <div className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mt-[10px] mb-12 md:mb-[65px]">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm">
            {t('Especialidades', 'Expertise')}
          </p>

          <h2
            ref={specialtiesHeadingRef}
            className="max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
          >
            <span className="block overflow-hidden">
              <span className="home-section-heading-phrase block">
                {t('Áreas que definen mi práctica.', 'Areas that define my practice.')}
              </span>
            </span>
          </h2>
        </div>

        {/* Línea superior animada */}
        <div
          ref={lineRefTop}
          className="home-specialty-divider h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* DISEÑO UI/UX */}
        <ImageTooltip imageSrc="/video/Adobe Express - feed_synthminddesign (1).gif" alt="Diseño UI/UX">
          <div
            className="h-[104px] hidden lg:flex items-center cursor-pointer curzr-hover w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px] pl-[29px] pr-[824px] lg:pl-[2%] lg:pr-[60%] xl:pl-[2.5%] xl:pr-[65%]"
            style={{ textAlign: 'left', ...getBlurStyle('diseño') }}
            onMouseEnter={() => setHovered('diseño')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={diseñoRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              {t('DISEÑO DE INTERACCIÓN', 'INTERACTION DESIGN')}
            </p>
          </div>
        </ImageTooltip>

        {/* Línea inferior animada */}
        <div
          ref={lineRefBottom}
          className="home-specialty-divider h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* MOTION GRAPHICS */}
        <ImageTooltip imageSrc="/video/white.gif" alt={t('Desarrollo frontend', 'Frontend development')}>
          <div
            className="h-[104px] hidden lg:flex items-center cursor-pointer curzr-hover w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px] pl-[29px] pr-[824px] lg:pl-[2%] lg:pr-[60%] xl:pl-[2.5%] xl:pr-[65%]"
            style={{ textAlign: 'left', ...getBlurStyle('motion') }}
            onMouseEnter={() => setHovered('motion')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={motionRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
            {t('DESARROLLO FRONTEND', 'FRONTEND DEVELOPMENT')}
            </p>
          </div>
        </ImageTooltip>

        {/* Línea extra animada */}
        <div
          ref={lineRefExtra}
          className="home-specialty-divider h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* PROGRAMACION CREATIVA */}
        <ImageTooltip imageSrc="/video/Adobe Express - audioreactivsisi12con audio.gif" alt="Programación Creativa">
          <div
            className="h-[104px] hidden lg:flex items-center cursor-pointer curzr-hover w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px] pl-[29px] pr-[824px] lg:pl-[2%] lg:pr-[60%] xl:pl-[2.5%] xl:pr-[65%]"
            style={{ textAlign: 'left', ...getBlurStyle('desarrollo') }}
            onMouseEnter={() => setHovered('desarrollo')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={desarrolloRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              {t('DISEÑO DE MOVIMIENTO', 'MOTION DESIGN')}
            </p>
          </div>
        </ImageTooltip>

        {/* Nueva línea animada */}
        <div
          ref={lineRefNew}
          className="home-specialty-divider h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* BRANDING */}
        <ImageTooltip imageSrc="/video/Adobe Express - animacionlogobisiona7sg.gif" alt={t('Sistemas de diseño', 'Design Systems')}>
          <div
            className="h-[104px] hidden lg:flex items-center cursor-pointer curzr-hover w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px] pl-[29px] pr-[824px] lg:pl-[2%] lg:pr-[60%] xl:pl-[2.5%] xl:pr-[65%]"
            style={{ textAlign: 'left', ...getBlurStyle('desarrollo2') }}
            onMouseEnter={() => setHovered('desarrollo2')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={desarrollo2Ref} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              {t('SISTEMAS DE DISEÑO', 'DESIGN SYSTEMS')}
            </p>
          </div>
        </ImageTooltip>

        {/* Línea final animada */}
        <div
          ref={lineRefFinal}
          className="home-specialty-divider h-[2px] bg-black origin-left mb-[100px] hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* Mobile Layout - Visible only on small screens */}
        <div className="block lg:hidden px-4">
          <div className="space-y-0">
            {/* DISEÑO DE INTERACCIÓN */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  {t('Diseño de', 'Interaction')}<br />
                  {t('Interacción', 'Design')}
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/Adobe Express - feed_synthminddesign (1).gif"
                  alt={t('Diseño de interacción', 'Interaction design')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* DESARROLLO FRONTEND */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  {t('Desarrollo', 'Frontend')}<br />
                  {t('Frontend', 'Development')}
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/white.gif"
                  alt={t('Desarrollo frontend', 'Frontend development')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* DISEÑO DE MOVIMIENTO */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  {t('Diseño de', 'Motion')}<br />
                  {t('movimiento', 'Design')}
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/Adobe Express - audioreactivsisi12con audio.gif"
                  alt={t('Diseño de movimiento', 'Motion Design')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* SISTEMAS DE DISEÑO */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  {t('Sistemas de', 'Design')}<br />
                  {t('diseño', 'Systems')}
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/Adobe Express - animacionlogobisiona7sg.gif"
                  alt={t('Sistemas de diseño', 'Design Systems')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-[100px]"></div>
        </div>

        {/* MIS TRABAJOS DESTACADOS */}
        <div className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mt-[100px] mb-[60px]">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm">
            {t('Trabajos destacados', 'Featured work')}
          </p>

          <h2
            ref={featuredHeadingRef}
            className="max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
          >
            <span className="block overflow-hidden">
              <span className="home-section-heading-phrase block">
                {t('Proyectos que conectan diseño y tecnología.', 'Projects connecting design and technology.')}
              </span>
            </span>
          </h2>
        </div>
      </main>

      {/* Trabajos destacados con scroll horizontal - Desktop */}
      <section ref={carouselRef} className="hidden pb-8 md:block">
        <div
          ref={featuredScrollRef}
          data-cursor-carousel
          onScroll={updateFeaturedProgress}
          onClickCapture={handleFeaturedEdgeClick}
          onPointerDown={startFeaturedDrag}
          onPointerMove={moveFeaturedDrag}
          onPointerUp={stopFeaturedDrag}
          onPointerCancel={stopFeaturedDrag}
          className="snap-x snap-mandatory cursor-grab select-none overflow-x-auto overscroll-x-contain scroll-smooth pl-[56px] pr-[50px] pb-3 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pl-[88px] lg:pr-[80px] xl:pl-[128px] xl:pr-[120px]"
        >
          <div className="flex w-max items-start gap-6">
            {visibleFeaturedProjects.map((project) => {
              const isSingleProject = visibleFeaturedProjects.length === 1;
              const widthClass = isSingleProject
                ? 'w-[calc(100vw-100px)] lg:w-[calc(100vw-160px)] xl:w-[calc(100vw-240px)]'
                : project.id === 0
                  ? 'w-[50vw] min-w-[500px] max-w-[700px]'
                  : project.id === 1
                    ? 'w-[46vw] min-w-[480px] max-w-[650px]'
                    : project.id === 2
                      ? 'w-[38vw] min-w-[420px] max-w-[560px]'
                      : 'w-[34vw] min-w-[380px] max-w-[500px]';
              const usesDarkTag = project.id === 0;

              return (
                <article
                  key={project.id}
                  data-featured-card
                  className={`flex-none snap-start first:scroll-ml-[56px] lg:first:scroll-ml-[88px] xl:first:scroll-ml-[128px] ${widthClass}`}
                  style={{
                    transition: 'filter 0.3s ease-out, transform 0.3s ease-out',
                    filter:
                      hoveredCarousel !== null && hoveredCarousel !== project.id
                        ? 'blur(4px)'
                        : 'none',
                    transform:
                      hoveredCarousel !== null && hoveredCarousel !== project.id
                        ? 'scale(0.985)'
                        : 'scale(1)',
                  }}
                >
                  <button
                    type="button"
                    data-cursor-label={t('Ver proyecto', 'View project')}
                    aria-label={t(`Ver ${project.title}`, `View ${project.title}`)}
                    onClick={() => {
                      if (featuredDragRef.current.hasMoved) {
                        featuredDragRef.current.hasMoved = false;
                        return;
                      }
                      if ('external' in project && project.external) {
                        window.open(project.href, '_blank', 'noopener,noreferrer');
                      } else {
                        router.push(project.href);
                      }
                    }}
                    onMouseEnter={() => {
                      setHoveredCarousel(project.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredCarousel(null);
                    }}
                    className="curzr-hover group relative block h-[clamp(290px,32vw,460px)] w-full overflow-hidden rounded-[28px] text-left shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
                    style={{
                      isolation: 'isolate',
                      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      draggable={false}
                      className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />

                    <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border bg-white/10 px-4 py-2 text-xs font-medium opacity-75 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 ${
                            usesDarkTag
                              ? 'border-black/20 text-black'
                              : 'border-white/20 text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>

                  <div className="mt-4 space-y-1">
                    <div className="flex items-baseline justify-between gap-8">
                      <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                      <p className="text-xs uppercase tracking-wider text-gray-500">{project.year}</p>
                    </div>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 px-[50px] text-sm text-black lg:px-[80px] xl:px-[120px]">
          <span className="min-w-[4.75rem] tabular-nums">
            {String(Math.min(featuredActiveIndex + 1, visibleFeaturedProjects.length)).padStart(2, '0')} / {String(visibleFeaturedProjects.length).padStart(2, '0')}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-black/15">
            <div
              className="absolute inset-y-0 left-0 bg-black transition-[width] duration-150 ease-out"
              style={{ width: `${featuredProgressWidth}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => router.push('/proyectos')}
            className="curzr-hover underline decoration-1 underline-offset-4 transition-opacity hover:opacity-50"
          >
            {t('Todos los proyectos', 'All work')}
          </button>
        </div>
      </section>

      {/* Imágenes apiladas verticalmente - Mobile */}
      <div ref={mobileCarouselRef} className="block md:hidden px-4 py-8 space-y-6">
        <div className="mobile-carousel-item relative w-full">
          <div
            onClick={() => router.push('/sileo')}
            style={{
              width: '100%',
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <img
              src="/images/sileo/16 - iPhone 15 - Isometric Style Rightblur 1.jpg"
              alt="Sileo App"
              className="cursor-pointer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '24px',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
            <div className="absolute bottom-8 left-4 flex gap-2 pointer-events-none">
              <div className="backdrop-blur-sm bg-black/5 border border-black/20 rounded-full px-3 py-1.5">
                <span className="text-black text-xs font-medium">{t('Identidad', 'Brand identity')}</span>
              </div>
              <div className="backdrop-blur-sm bg-black/5 border border-black/20 rounded-full px-3 py-1.5">
                <span className="text-black text-xs font-medium">UI/UX</span>
              </div>
            </div>
          </div>
          <p className="text-black text-sm font-normal mt-3">
            {t('Identidad visual e interfaz de una aplicación de productividad accesible', 'Visual identity and interface for an accessible productivity app')}
          </p>
        </div>

        <div className="mobile-carousel-item relative w-full">
          <div
            onClick={() => window.location.href = '/bisiona2026'}
            style={{
              width: '100%',
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <img
              src="/video/pegatinas.gif"
              alt="Destacados"
              className="cursor-pointer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '24px',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
            <div className="absolute bottom-8 left-4 flex gap-2 pointer-events-none">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                <span className="text-white text-xs font-medium">Branding</span>
              </div>
            </div>
          </div>
          <p className="text-black text-sm font-normal mt-3">{t('Identidad IX Jornadas de Arte y Diseño EASDPP', 'Identity for the 9th EASDPP Art and Design Conference')}</p>
        </div>

        <div className="mobile-carousel-item relative w-full">
          <div
            style={{
              width: '100%',
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              position: 'relative'
            }}
          >
            <img
              src="/images/nars/0.png"
              alt="SynthMind Design"
              className="cursor-pointer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: '24px',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            />
            <div className="absolute bottom-8 left-4 flex gap-2 pointer-events-none">
              <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                <span className="text-white text-xs font-medium">Motion Graphics</span>
              </div>
            </div>
          </div>
          <p className="text-black text-sm font-normal mt-3">{t('Propuesta Motion Graphics para redes sociales de NARS', 'Motion Graphics proposal for NARS social media')}</p>
        </div>

      </div>

      <Footer compactTopSpacing />

    </>
  );
}
