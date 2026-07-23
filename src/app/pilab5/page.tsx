"use client";

import React from "react";
import ProjectDetailLayout from "../components/ProjectDetailLayout";

const processSections = [
  {
    title: "Contexto",
    lead:
      "PiLab 5 imagina una tienda tecnológica donde una Raspberry es el inicio de mil proyectos.",
    body:
      "La campaña vive en soportes exteriores, prensa y canales digitales, acompañada por una programación de talleres, charlas y demostraciones.",
  },
  {
    title: "Problema",
    lead:
      "La tecnología creativa puede percibirse como compleja y reservada a perfiles expertos.",
    body:
      "Esa barrera convierte a muchas personas en consumidoras pasivas antes de que descubran qué pueden construir por sí mismas.",
  },
  {
    title: "Objetivo",
    lead:
      "Despertar la curiosidad y transformar la intimidación tecnológica en impulso creador.",
    body:
      "La comunicación debía presentar el producto como una herramienta accesible, abierta y capaz de materializar ideas muy distintas.",
  },
  {
    title: "Investigación",
    lead:
      "El concepto nace del contraste entre la pequeña escala del dispositivo y la amplitud de sus usos.",
    body:
      "Se analizaron proyectos maker, motivaciones de aprendizaje y puntos de contacto publicitarios para construir mensajes claros, inspiradores y accionables.",
  },
  {
    title: "Interacción",
    lead:
      "La campaña continúa en PiSkills, PiTalk y demos donde el público pasa a hacer.",
    body:
      "Cada formato dirige hacia una experiencia práctica: aprender una habilidad, escuchar a la comunidad o probar el producto en el propio espacio de la tienda.",
  },
  {
    title: "Prospectiva",
    lead:
      "PiLab 5 puede evolucionar de campaña comercial a plataforma de aprendizaje compartido.",
    body:
      "Nuevos talleres, retos y proyectos de la comunidad ampliarían el relato y mantendrían activa la relación con el público más allá de una acción puntual.",
  },
];

export default function PiLab5Page() {
  return (
    <ProjectDetailLayout
      title="PILAB 5"
      client="Proyecto Personal"
      tags={["Inspirador", "Exploratorio"]}
      projectTitle="PiLab 5 - Gráficas publicitarias"
      processSections={processSections}
      description={
        <p>
          Serie de gráficas publicitarias para la campaña de la tienda ficticia
          PiLab 5 se concibe como una llamada a experimentar con la tecnología
          en un laboratorio creativo bajo el motto "Mil proyectos, una
          Raspberry". La propuesta visual en soportes exteriores, prensa y
          canales digitales busca motivar al espectador para que abandone su rol
          de consumidor pasivo y descubra su potencial como creador activo. Se
          plantea la organización de talleres PiSkills, charlas PiTalk y demos
          in situ. En ellos se anima al público a aprender y materializar las
          infinitas posibilidades tecnológicas del producto, demostrando que
          cualquiera puede fabricar sus propias ideas.
        </p>
      }
    >
      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/10]">
        <img
          src="/images/Free1_Outdoor_Banner_Mockup.jpg"
          alt="PiLab 5 Outdoor Banner Mockup"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/bus-stop-mockup.jpg"
            alt="PiLab 5 Bus Stop Mockup"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="animate-element overflow-hidden rounded-2xl bg-white aspect-[3/4]">
          <video
            className="h-full w-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/video/pilab/pilabverticalb.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/9]">
        <img
          src="/images/pilab5/postssinstagram.jpg"
          alt="PiLab 5 Instagram Posts"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/9]">
        <img
          src="/images/Billboard_Mockup_2.jpg"
          alt="PiLab 5 Billboard Mockup"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <video
          className="block h-auto w-full"
          style={{ clipPath: "inset(0 round 1rem)", transform: "scale(1.01)" }}
          controls
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/pilab/Mopie mockup.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/pilab5/157.png"
          alt="Mockup Digital"
          className="block h-auto w-full"
          style={{ clipPath: "inset(0 round 1rem)", transform: "scale(1.01)" }}
        />
      </div>
    </ProjectDetailLayout>
  );
}
