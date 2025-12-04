'use client';

import { useEffect, useRef, useState } from 'react';
import NavBar from './components/NavBar';
import TextPressure from './components/TextPressure';
import ScrollReveal from './components/ScrollReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollVelocity from './components/ScrollVelocity';
import Threads from './components/Threads';
import { motion } from 'framer-motion';
import MaskedHeading from './components/MaskedHeading';
import MaskedLine from './components/MaskedLine';
import ImageTooltip from './components/ImageTooltip';
import Footer from './components/Footer';
// import { useLoading } from './components/SimpleLoadingProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
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

  const [hovered, setHovered] = useState<string | null>(null);
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
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!imageRef2.current || !imageRef.current) return;

    gsap.fromTo(
      imageRef2.current,
      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
        rotation: 15,
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotation: 0,
        duration: 0.4,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: imageRef2.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.to(imageRef.current, {
              filter: 'blur(8px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          },
          onLeave: () => {
            gsap.to(imageRef.current, {
              filter: 'blur(0px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          },
          onEnterBack: () => {
            gsap.to(imageRef.current, {
              filter: 'blur(8px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(imageRef.current, {
              filter: 'blur(0px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          }
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!imageRef3.current || !imageRef2.current) return;

    gsap.fromTo(
      imageRef3.current,
      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
        rotation: 15,
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotation: 0,
        duration: 0.4,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: imageRef2.current,
          start: 'center center',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.to(imageRef2.current, {
              filter: 'blur(8px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          },
          onLeave: () => {
            gsap.to(imageRef2.current, {
              filter: 'blur(0px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          },
          onEnterBack: () => {
            gsap.to(imageRef2.current, {
              filter: 'blur(8px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          },
          onLeaveBack: () => {
            gsap.to(imageRef2.current, {
              filter: 'blur(0px)',
              duration: 0.4,
              ease: 'power1.out'
            });
          }
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
        <div
          className="w-full p-8 flex justify-center items-center"
          style={{ minHeight: '400px', maxWidth: '1200px', marginTop: '340px' }}
        >
          <TextPressure
            text="ALBA ANTÓN"
            fontFamily="Compressa VF"
            fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
            minFontSize={320}
            textColor="#FFFFFF"
          />
        </div>

        {/* ScrollReveal */}
        <div ref={revealRef} className="w-full px-[50px] mt-[200px] mb-[140px]">
          <ScrollReveal textClassName="text-black text-[64px] text-justify leading-snug">
            Una creativa multidisciplinar que fusiona el diseño en movimiento, el arte 3D y el desarrollo de aplicaciones en experiencias fluidas e interactivas.
          </ScrollReveal>
        </div>

        {/* SERVICIOS */}
        <MaskedHeading
          text="SERVICIOS"
          className="text-[36px] text-black font-bold pl-[220px] pr-[1020px] mb-[65px]"
        />

        {/* Línea superior animada */}
        <div
          ref={lineRefTop}
          className="h-[2px] bg-black origin-left"
          style={{ width: '999px' }}
        />

        {/* DISEÑO UI/UX */}
        <ImageTooltip imageSrc="/video/Adobe Express - feed_synthminddesign (1).gif" alt="Diseño UI/UX">
          <div
            className="h-[104px] flex items-center cursor-pointer curzr-hover"
            style={{ width: '999px', paddingLeft: '29px', paddingRight: '824px', textAlign: 'left', ...getBlurStyle('diseño') }}
            onMouseEnter={() => setHovered('diseño')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={diseñoRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              DISEÑO UI/UX
            </p>
          </div>
        </ImageTooltip>

        {/* Línea inferior animada */}
        <div
          ref={lineRefBottom}
          className="h-[2px] bg-black origin-left"
          style={{ width: '999px' }}
        />

        {/* MOTION GRAPHICS */}
        <ImageTooltip imageSrc="/video/Adobe Express - animacionlogobisiona7sg.gif" alt="Motion Graphics">
          <div
            className="h-[104px] flex items-center cursor-pointer curzr-hover"
            style={{ width: '999px', paddingLeft: '29px', paddingRight: '824px', textAlign: 'left', ...getBlurStyle('motion') }}
            onMouseEnter={() => setHovered('motion')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={motionRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              MOTION GRAPHICS
            </p>
          </div>
        </ImageTooltip>

        {/* Línea extra animada */}
        <div
          ref={lineRefExtra}
          className="h-[2px] bg-black origin-left"
          style={{ width: '999px' }}
        />

        {/* PROGRAMACION CREATIVA */}
        <ImageTooltip imageSrc="/video/Adobe Express - audioreactivsisi12con audio.gif" alt="Programación Creativa">
          <div
            className="h-[104px] flex items-center cursor-pointer curzr-hover"
            style={{ width: '999px', paddingLeft: '29px', paddingRight: '824px', textAlign: 'left', ...getBlurStyle('desarrollo') }}
            onMouseEnter={() => setHovered('desarrollo')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={desarrolloRef} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              PROGRAMACION CREATIVA
            </p>
          </div>
        </ImageTooltip>

        {/* Nueva línea animada */}
        <div
          ref={lineRefNew}
          className="h-[2px] bg-black origin-left"
          style={{ width: '999px' }}
        />

        {/* BRANDING */}
        <ImageTooltip imageSrc="/images/raspberrypi5icon.png" alt="Branding">
          <div
            className="h-[104px] flex items-center cursor-pointer curzr-hover"
            style={{ width: '999px', paddingLeft: '29px', paddingRight: '824px', textAlign: 'left', ...getBlurStyle('desarrollo2') }}
            onMouseEnter={() => setHovered('desarrollo2')}
            onMouseLeave={() => setHovered(null)}
          >
            <p ref={desarrollo2Ref} className="text-black text-[24px] font-medium" style={{ whiteSpace: 'nowrap' }}>
              BRANDING
            </p>
          </div>
        </ImageTooltip>

        {/* Línea final animada */}
        <div
          ref={lineRefFinal}
          className="h-[2px] bg-black origin-left mb-[100px]"
          style={{ width: '999px' }}
        />

        {/* MIS TRABAJOS DESTACADOS */}
        <div className="w-full max-w-[1300px]">
          <ScrollReveal textClassName="text-black font-bold pl-[50px] pr-[2000px] mt-[200px] mb-[60px] whitespace-nowrap" >
            Mis trabajos destacados...
          </ScrollReveal>
        </div>

        {/* Contenedor de imagen añadido */}
        <div
          style={{
            paddingLeft: '50px',
            paddingRight: '50px',
            marginTop: '80px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="/images/mockuppantallatren.jpg"
            alt="Destacados"
            className="curzr-hover cursor-pointer"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)'
            }}
            ref={imageRef}
          />
        </div>

        {/* Segundo contenedor de imagen superpuesto */}
        <div
          style={{
            paddingLeft: '50px',
            paddingRight: '50px',
            marginTop: '180px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <img
            ref={imageRef2}
            src="/images/Captura de pantalla 2025-11-14 a las 12.46.56.png"
            alt="SynthMind Design"
            className="curzr-hover cursor-pointer"
            style={{
              width: '100%',
              height: 'clamp(400px, 50vw, 600px)',
              objectFit: 'cover',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              position: 'relative',
              top: '-383px',
            }}
          />
        </div>

        {/* Tercer contenedor de imagen superpuesto */}
        <div
          style={{
            paddingLeft: '50px',
            paddingRight: '50px',
            marginTop: '180px',
            marginBottom: '0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <img
            ref={imageRef3}
            src="/images/mockupinfografiadune.jpg"
            alt="Destacados 3"
            className="curzr-hover cursor-pointer"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              position: 'relative',
              top: '-766px',
            }}
          />
        </div>

        {/* Texto final */}
        <div className="w-full pt-0 pb-4 mt-[-600px]" style={{ lineHeight: 0.8 }}>

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
    </>
  );
}
