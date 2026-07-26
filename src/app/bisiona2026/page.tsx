"use client";

import React from "react";
import ProjectDetailLayout from "../components/ProjectDetailLayout";

const processSections = [
  {
    title: "Contexto",
    lead:
      "Bisiona conecta cada año el entorno académico con la realidad profesional a través de conferencias, talleres y actividades en torno al diseño.",
    body:
      "Su novena edición plantea la oportunidad de crear una identidad vinculada directamente con la comunidad que da forma a la escuela: su alumnado.",
  },
  {
    title: "Problema",
    lead:
      "Frente al enfoque de ediciones anteriores, el reto consistía en acercar Bisiona a quienes habitan la escuela, creando una identidad desarrollada por y para su comunidad.",
    body:
      "Frente al enfoque de ediciones anteriores, el reto consistía en acercar Bisiona a quienes habitan la escuela, creando una identidad desarrollada por y para su comunidad.",
  },
  {
    title: "Objetivo",
    lead:
      "Inspirar al alumnado mostrando cómo la conexión entre disciplinas abre nuevas oportunidades en el mundo profesional.",
    body:
      "",
    compact: true,
  },
  {
    title: "Investigación",
    lead:
      "El proceso parte del análisis de las distintas disciplinas que conviven en la escuela y de cómo su diversidad podía traducirse en un lenguaje visual común. Cada disciplina se representa mediante una variable del sistema, permitiendo generar resultados diferentes sin perder la coherencia de la identidad.",
    body: (
      <>
        Como parte de la exploración de la experiencia digital de Bisiona, se
        diseñó en{" "}
        <strong className="font-semibold text-black">
          Figma un prototipo interactivo para la consulta del programa y la
          reserva de entradas
        </strong>
        , explorando la arquitectura de información, los flujos de navegación y
        la interacción con el evento.
      </>
    ),
    image: {
      src: "/images/bisiona/wireframes.png",
      alt: "Wireframes del prototipo interactivo de Bisiona diseñado en Figma",
    },
  },
  {
    title: "Interacción",
    lead: (
        "La identidad se construye a través de la participación."
     ),
    body: (
      <>
        <span className="block">
          Mediante códigos QR distribuidos por la escuela, el alumnado accede a{" "}
          <em>Crea o teu Bisiona</em>, una herramienta interactiva donde puede
          experimentar con distintas variables y generar su propia composición.
        </span>
        <span className="mt-5 block">
          Cada parámetro representa una de las disciplinas de la escuela,
          convirtiendo cada interacción en una expresión única dentro de un
          mismo sistema visual. Las creaciones pueden compartirse bajo{" "}
          <strong className="font-semibold text-black">#bisiona</strong>, haciendo
          que la participación individual pase a formar parte de una identidad
          colectiva en constante evolución. Los pasos del usuario en la herramienta son los siguientes:
        </span>
        <ul className="mt-6 list-disc space-y-2 pl-5 marker:text-black">
          <li>
            <strong className="font-semibold text-black">Explora:</strong>{" "}
            modifica las variables que definen el sistema visual.
          </li>
          <li>
            <strong className="font-semibold text-black">Crea:</strong> combina
            los parámetros para generar una composición única.
          </li>
          <li>
            <strong className="font-semibold text-black">Comparte:</strong>{" "}
            publica tu creación bajo{" "}
            <strong className="font-semibold text-black">#bisiona</strong> y
            contribuye a la identidad colectiva del evento.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Crea tu Bisiona",
    lead:
      "Cada participante crea su propio identificador Bisiona y lo incorpora a la identidad común.",
    body:
      "Herramienta interactiva y responsive desarrollada con HTML, CSS y JavaScript, que utiliza shaders para que el alumnado genere composiciones únicas modificando distintos parámetros visuales. El acceso se realiza mediante códigos QR generados con una herramienta propia en Python, evitando la dependencia de servicios externos.",
    image: {
      src: "/images/bisiona/bisionaexplicacion.png",
      alt: "Variaciones de la identidad de Bisiona para las disciplinas de la escuela",
    },
  },
  {
    title: "Prospectiva",
    lead:
      "El sistema puede crecer como un archivo vivo de la comunidad y sus sucesivas ediciones.",
    body:
      "La lógica generativa permite sumar nuevas variables, disciplinas y formatos sin perder reconocimiento, haciendo que la identidad evolucione junto a la escuela.",
  },
];

export default function Bisiona2026Page() {
  return (
    <ProjectDetailLayout
      title="BISIONA"
      client="EASD Pablo Picasso A Coruña"
      tags={["Identidad Viva", "Generativo"]}
      projectTitle="Identidad IX Jornadas de Arte y Diseño EASDPP"
      processSections={processSections}
      description={
        <div>
          <p>
            Bisiona es el encuentro anual de diseño de la EASD Pablo Picasso.
            Para su novena edición, se propone una identidad dinámica que
            evoluciona con la participación activa del alumnado. Cada
            intervención genera una composición única que pasa a formar parte de
            una identidad colectiva y cambiante.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://peonprogramado.github.io/Crea-o-teu-Bisiona/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between gap-5 rounded-full border border-black px-5 py-3 text-base font-normal text-black transition-colors hover:bg-black hover:text-white sm:text-lg lg:w-3/4"
            >
              <span>Crea tu Bisiona</span>
              <img
                src="/svg/arrow_right_alt_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0 transition-[filter,transform] group-hover:translate-x-1 group-hover:invert"
              />
            </a>
            <a
              href="https://www.figma.com/design/LkqkWGva3U0XSY1Q4Bt70k/proyectoappbisiona_albaanton?node-id=870-4292&t=lg0VacgaIEZle4mb-1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between gap-5 rounded-full border border-black px-5 py-3 text-base font-normal text-black transition-colors hover:bg-black hover:text-white sm:text-lg lg:w-3/4"
            >
              <span>Prototipo Figma</span>
              <img
                src="/svg/arrow_right_alt_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0 transition-[filter,transform] group-hover:translate-x-1 group-hover:invert"
              />
            </a>
          </div>
        </div>
      }
    >
      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/10]">
        <video
          className="block h-full w-full object-cover"
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/video/videobisionasi.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/bisiona/mockupcartelesbisiona.jpg"
            alt="Mockup carteles Bisiona"
            className="h-full w-full object-cover"
            style={{ objectPosition: "35% center" }}
          />
        </div>
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/bisiona/mockuptotebagvariante.jpg"
            alt="Mockup tote bag Bisiona"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/9]">
        <img
          src="/images/bisiona/MockupIDcardbisionafondonegro.jpg"
          alt="Mockup ID card Bisiona fondo negro"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/9]">
        <img
          src="/images/bisiona/wristband_bisiona_final.png"
          alt="Wristband Bisiona"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <video
          className="block h-auto w-full"
          controls
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source
            src="/video/Grabación de pantalla 2025-12-31 a las 0.10.31.mov"
            type="video/mp4"
          />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/bisiona/bisionaapp.png"
          alt="Mockup de la aplicación móvil de Bisiona"
          className="block h-auto w-full"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <video
          className="block h-auto w-full"
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="/images/bisiona/bisiona-interaccion.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </ProjectDetailLayout>
  );
}
