'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from './components/NavBar';
import TextPressure from './components/TextPressure';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVelocity from './components/ScrollVelocity';
import Threads from './components/Threads';
import { motion } from 'framer-motion';
import MaskedLine from './components/MaskedLine';
import MaskedTextHover from './components/MaskedTextHover';
import ImageTooltip from './components/ImageTooltip';
import Footer from './components/Footer';
import HorizontalScrollGallery from '../components/HorizontalScrollGallery';
import GradualBlur from '../components/GradualBlur';
// import { useLoading } from './components/SimpleLoadingProvider';

gsap.registerPlugin(ScrollTrigger);

const homeIntroLines = [
  'Diseño innovador, sintético y accesible.',
  'Un lenguaje visual creativo enfocado',
  'en la funcionalidad.',
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
  const mobileCarouselRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredCarousel, setHoveredCarousel] = useState<number | null>(null);
  const [showCarouselTooltip, setShowCarouselTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const { showLoadingForNavigation } = useLoading();

  useEffect(() => {
    if (!backgroundRef.current || !revealRef.current) return;

    gsap.to(backgroundRef.current, {
      backgroundColor: '#ffffff',
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
        letter.style.color = index < filledLetters ? '#000000' : '#d1d5db';
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
  }, []);

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
      <main className="relative min-h-screen flex flex-col items-center overflow-hidden">
        {/* Fondo animado */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-[-1]"
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
            textColor="#FFFFFF"
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
              textColor="#FFFFFF"
            />
          </div>
          <div style={{ width: '100%', height: '200px' }}>
            <TextPressure
              text="ANTÓN"
              fontFamily="Roboto Flex"
              minFontSize={100}
              textColor="#FFFFFF"
            />
          </div>
        </div>

        {/* Texto introductorio */}
        <div ref={revealRef} className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mt-[100px] md:mt-[200px] mb-[40px]">
          <div className="flex flex-col items-start xl:flex-row xl:items-end xl:justify-between xl:gap-12">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm">
                Enfoque y valores
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
              <span>Empezar un proyecto</span>
              <img
                src="/svg/arrow_right_alt_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 transition-[filter] duration-300 group-hover:invert"
              />
            </a>
          </div>
        </div>

        {/* Botones de especialidades */}
        <div className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mb-[140px]">
          <div className="flex flex-wrap gap-2">
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              Arquitectura de Información
            </span>
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              Producto Digital
            </span>
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              Sistemas Visuales
            </span>
            <span className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500">
              Desarrollo
            </span>
          </div>
        </div>

        {/* ESPECIALIDADES */}
        <div className="w-full px-[20px] md:px-[50px] lg:px-[80px] xl:px-[120px] mt-[10px] mb-12 md:mb-[65px]">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.04em] text-gray-500 sm:text-sm">
            Especialidades
          </p>

          <h2
            ref={specialtiesHeadingRef}
            className="max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
          >
            <span className="block overflow-hidden">
              <span className="home-section-heading-phrase block">
                Áreas que definen mi práctica.
              </span>
            </span>
          </h2>
        </div>

        {/* Línea superior animada */}
        <div
          ref={lineRefTop}
          className="h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
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
              DISEÑO INTERACCIÓN
            </p>
          </div>
        </ImageTooltip>

        {/* Línea inferior animada */}
        <div
          ref={lineRefBottom}
          className="h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* MOTION GRAPHICS */}
        <ImageTooltip imageSrc="/video/white.gif" alt="Desarrollo web y app">
          <div
            className="h-[104px] hidden lg:flex items-center cursor-pointer curzr-hover w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px] pl-[29px] pr-[824px] lg:pl-[2%] lg:pr-[60%] xl:pl-[2.5%] xl:pr-[65%]"
            style={{ textAlign: 'left', ...getBlurStyle('motion') }}
            onMouseEnter={() => setHovered('motion')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={motionRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
            DESARROLLO WEB Y APP
            </p>
          </div>
        </ImageTooltip>

        {/* Línea extra animada */}
        <div
          ref={lineRefExtra}
          className="h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
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
              MOTION DESIGN
            </p>
          </div>
        </ImageTooltip>

        {/* Nueva línea animada */}
        <div
          ref={lineRefNew}
          className="h-[2px] bg-black origin-left hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* BRANDING */}
        <ImageTooltip imageSrc="/video/Adobe Express - animacionlogobisiona7sg.gif" alt="Design Systems">
          <div
            className="h-[104px] hidden lg:flex items-center cursor-pointer curzr-hover w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px] pl-[29px] pr-[824px] lg:pl-[2%] lg:pr-[60%] xl:pl-[2.5%] xl:pr-[65%]"
            style={{ textAlign: 'left', ...getBlurStyle('desarrollo2') }}
            onMouseEnter={() => setHovered('desarrollo2')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={desarrollo2Ref} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              DESIGN SYSTEMS
            </p>
          </div>
        </ImageTooltip>

        {/* Línea final animada */}
        <div
          ref={lineRefFinal}
          className="h-[2px] bg-black origin-left mb-[100px] hidden lg:block w-[999px] lg:w-[70vw] xl:w-[65vw] max-w-[1200px]"
        />

        {/* Mobile Layout - Visible only on small screens */}
        <div className="block lg:hidden px-4">
          <div className="space-y-0">
            {/* DISEÑO INTERACCIÓN */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  Diseño<br />
                  Interacción
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/Adobe Express - feed_synthminddesign (1).gif"
                  alt="Diseño Interacción"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* DESARROLLO WEB Y APP */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  Desarrollo<br />
                  Web y App
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/white.gif"
                  alt="Desarrollo web y app"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* MOTION DESIGN */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  Motion<br />
                  Design
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/Adobe Express - audioreactivsisi12con audio.gif"
                  alt="Motion Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* DESIGN SYSTEMS */}
            <div className="flex items-center justify-between py-8 border-b border-gray-300">
              <div className="flex-1">
                <p className="text-black text-[24px] font-medium">
                  Design<br />
                  Systems
                </p>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden ml-12">
                <img
                  src="/video/Adobe Express - animacionlogobisiona7sg.gif"
                  alt="Design Systems"
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
            Trabajos destacados
          </p>

          <h2
            ref={featuredHeadingRef}
            className="max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.025em] text-black lg:text-3xl xl:text-4xl"
          >
            <span className="block overflow-hidden">
              <span className="home-section-heading-phrase block">
                Proyectos que conectan diseño y tecnología.
              </span>
            </span>
          </h2>
        </div>
      </main>

      {/* Scroll horizontal de imágenes con efecto - Desktop */}
      <div ref={carouselRef} className="hidden md:block">
        <HorizontalScrollGallery itemCount={3}>
          <div className="relative w-screen h-full flex-shrink-0 flex items-center justify-center" style={{ paddingRight: '16px' }}>
            <div
              onClick={() => router.push('/sileo')}
              onMouseEnter={(e) => {
                setHoveredCarousel(0);
                setShowCarouselTooltip(true);
                setMousePosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => {
                setHoveredCarousel(null);
                setShowCarouselTooltip(false);
              }}
              onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
              className="w-[1200px] h-[700px] md:w-[85vw] md:h-[50vw] lg:w-[88vw] lg:h-[52vw] xl:w-[80vw] xl:h-[48vw] max-w-[1600px] max-h-[900px]"
              style={{
                borderRadius: '50px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                cursor: 'pointer',
                isolation: 'isolate',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                transition: 'all 0.3s ease'
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
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  zIndex: 0
                }}
              />

              <div
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)',
                  opacity: hoveredCarousel === 0 ? 1 : 0,
                  zIndex: 20
                }}
              >
                <div className="absolute top-10 left-10 right-32">
                  <MaskedTextHover
                    text="Sileo App"
                    className="text-white text-4xl font-bold mb-3 leading-tight"
                    isVisible={hoveredCarousel === 0}
                    delay={0}
                  />
                  <MaskedTextHover
                    text="Identidad visual e interfaz de una aplicación de productividad accesible"
                    className="text-white/90 text-base leading-snug"
                    isVisible={hoveredCarousel === 0}
                    delay={0.1}
                  />
                </div>

                <div className="absolute top-10 right-10">
                  <MaskedTextHover
                    text="2026"
                    className="text-white text-xl font-medium"
                    isVisible={hoveredCarousel === 0}
                    delay={0.15}
                  />
                </div>
              </div>

              <div className="absolute bottom-10 left-6 right-6 pointer-events-none" style={{ zIndex: 30 }}>
                <div className="flex gap-3">
                  <div className="backdrop-blur-sm bg-black/5 border border-black/20 rounded-full px-4 py-2">
                    <span className="text-black text-sm font-medium">Identidad</span>
                  </div>
                  <div className="backdrop-blur-sm bg-black/5 border border-black/20 rounded-full px-4 py-2">
                    <span className="text-black text-sm font-medium">UI/UX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-screen h-full flex-shrink-0 flex items-center justify-center" style={{ paddingRight: '16px' }}>
            <div
              onClick={() => window.location.href = '/bisiona2026'}
              onMouseEnter={(e) => {
                setHoveredCarousel(1);
                setShowCarouselTooltip(true);
                setMousePosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => {
                setHoveredCarousel(null);
                setShowCarouselTooltip(false);
              }}
              onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
              className="w-[1200px] h-[700px] md:w-[85vw] md:h-[50vw] lg:w-[88vw] lg:h-[52vw] xl:w-[80vw] xl:h-[48vw] max-w-[1600px] max-h-[900px]"
              style={{
                borderRadius: '50px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                cursor: 'pointer',
                isolation: 'isolate',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                transition: 'all 0.3s ease'
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
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  zIndex: 0
                }}
              />

              {/* Hover Overlay - Gradient */}
              <div
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)',
                  opacity: hoveredCarousel === 1 ? 1 : 0,
                  zIndex: 20
                }}
              >
                {/* Top Left: Title and Subtitle */}
                <div className="absolute top-10 left-10 right-32">
                  <MaskedTextHover
                    text="Bisiona"
                    className="text-white text-4xl font-bold mb-3 leading-tight"
                    isVisible={hoveredCarousel === 1}
                    delay={0}
                  />
                  <MaskedTextHover
                    text="Identidad IX Jornadas de Arte y Diseño EASDPP"
                    className="text-white/90 text-base leading-snug"
                    isVisible={hoveredCarousel === 1}
                    delay={0.1}
                  />
                </div>

                {/* Top Right: Year */}
                <div className="absolute top-10 right-10">
                  <MaskedTextHover
                    text="2025"
                    className="text-white text-xl font-medium"
                    isVisible={hoveredCarousel === 1}
                    delay={0.15}
                  />
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="absolute bottom-10 left-6 right-6 pointer-events-none" style={{ zIndex: 30 }}>
                <div className="flex gap-3">
                  <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-4 py-2">
                    <span className="text-white text-sm font-medium">Branding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-screen h-full flex-shrink-0 flex items-center justify-center" style={{ paddingRight: '16px' }}>
            <div
              onClick={() => router.push('/nars')}
              onMouseEnter={(e) => {
                setHoveredCarousel(2);
                setShowCarouselTooltip(true);
                setMousePosition({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => {
                setHoveredCarousel(null);
                setShowCarouselTooltip(false);
              }}
              onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
              className="w-[1200px] h-[700px] md:w-[85vw] md:h-[50vw] lg:w-[88vw] lg:h-[52vw] xl:w-[80vw] xl:h-[48vw] max-w-[1600px] max-h-[900px]"
              style={{
                borderRadius: '50px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                cursor: 'pointer',
                isolation: 'isolate',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                transition: 'all 0.3s ease'
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
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  zIndex: 0
                }}
              />

              {/* Hover Overlay - Gradient */}
              <div
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)',
                  opacity: hoveredCarousel === 2 ? 1 : 0,
                  zIndex: 20
                }}
              >
                {/* Top Left: Title and Subtitle */}
                <div className="absolute top-10 left-10 right-32">
                  <MaskedTextHover
                    text="NARS"
                    className="text-white text-4xl font-bold mb-3 leading-tight"
                    isVisible={hoveredCarousel === 2}
                    delay={0}
                  />
                  <MaskedTextHover
                    text="Propuesta Motion Graphics para redes sociales de NARS"
                    className="text-white/90 text-base leading-snug"
                    isVisible={hoveredCarousel === 2}
                    delay={0.1}
                  />
                </div>

                {/* Top Right: Year */}
                <div className="absolute top-10 right-10">
                  <MaskedTextHover
                    text="2024"
                    className="text-white text-xl font-medium"
                    isVisible={hoveredCarousel === 2}
                    delay={0.15}
                  />
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="absolute bottom-10 left-6 right-6 pointer-events-none" style={{ zIndex: 30 }}>
                <div className="flex gap-3">
                  <div className="backdrop-blur-sm bg-white/20 border border-white/30 rounded-full px-4 py-2">
                    <span className="text-white text-sm font-medium">Motion Graphics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </HorizontalScrollGallery>
      </div>

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
                <span className="text-black text-xs font-medium">Identidad</span>
              </div>
              <div className="backdrop-blur-sm bg-black/5 border border-black/20 rounded-full px-3 py-1.5">
                <span className="text-black text-xs font-medium">UI/UX</span>
              </div>
            </div>
          </div>
          <p className="text-black text-sm font-normal mt-3">
            Identidad visual e interfaz de una aplicación de productividad accesible
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
          <p className="text-black text-sm font-normal mt-3">Identidad IX Jornadas de Arte y Diseño EASDPP</p>
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
          <p className="text-black text-sm font-normal mt-3">Propuesta Motion Graphics para redes sociales de NARS</p>
        </div>

      </div>

      <main className="relative min-h-screen flex flex-col items-center overflow-hidden">

        {/* Texto final */}
        <div className="w-full pt-0 pb-4 mt-[40px]" style={{ lineHeight: 0.8 }}>

          {/* Botón encima del ScrollVelocity */}
          <div
            className="w-full flex justify-center mb-20"
            style={{
              position: 'relative',
              zIndex: 15,
            }}
          >
            <button
              className="curzr-hover flex items-center gap-4 px-8 py-4 bg-white text-black font-medium rounded-full border-2 border-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 ease-in-out group"
              style={{
                fontSize: '18px',
                letterSpacing: '0.3px',
              }}
              onClick={() => {
                window.location.href = '/proyectos';
              }}
              onMouseEnter={(e) => {
                const svg = e.currentTarget.querySelector('img');
                if (svg) svg.style.filter = 'brightness(0) invert(1)';
              }}
              onMouseLeave={(e) => {
                const svg = e.currentTarget.querySelector('img');
                if (svg) svg.style.filter = 'invert(0)';
              }}
            >
              <img
                src="/svg/mas.svg"
                alt="+"
                className="w-5 h-5 transition-all duration-300"
                style={{
                  filter: 'invert(0)',
                  transition: 'filter 0.3s ease-in-out'
                }}
              />
              Proyectos
            </button>
          </div>

          <ScrollVelocity
            texts={["BRANDING UIUX MOTION GRAPHICS APP", "BRANDING UIUX MOTION GRAPHICS APP"]}
            velocity={100}
            className="text-[90px] text-black font-bold text-center whitespace-nowrap"
            numCopies={2}
          />
        </div>

        <Footer />

      </main >

      {/* Tooltip para carrusel */}
      {showCarouselTooltip && hoveredCarousel && (
        <motion.figcaption
          className="pointer-events-none fixed left-0 top-0 rounded-[12px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[100] hidden sm:block"
          style={{
            x: mousePosition.x + 10,
            y: mousePosition.y - 30,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          Ver proyecto
        </motion.figcaption>
      )}
    </>
  );
}
