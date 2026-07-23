"use client";

import React from "react";
import ProjectDetailLayout from "../components/ProjectDetailLayout";

const processSections = [
  {
    title: "Contexto",
    lead:
      "Una pieza conceptual para presentar dos iconos de NARS en formatos sociales.",
    body:
      "Proyecto ficticio de Motion Graphics para NARS Explicit Lipstick y Climax Mascara, concebido para formatos digitales de Stories y Feed. La propuesta combina modelado y animación 3D en Blender con simulaciones físicas, logotipo y tipografía animada en After Effects.",
  },
  {
    title: "Problema",
    lead:
      "¿Cómo utilizar el movimiento para despertar la atracción del público hacia el producto?",
    body:
      "La duración reducida y el consumo rápido de las plataformas exigían una imagen inmediata, pero también una revelación progresiva que evitase una presentación convencional.",
  },
  {
    title: "Objetivo",
    lead:
      "Crear una pieza capaz de transformar el producto en el centro de una experiencia visual basada en la atracción.",
    body:
      "Traducir la atracción en un recurso visual, utilizando el magnetismo, el movimiento y la tensión para despertar el interés y dirigir la atención hacia el producto.",
  },
  {
    title: "Prospectiva",
    lead:
      "El sistema visual puede extenderse a otros productos y campañas digitales, utilizando diferentes comportamientos físicos como recurso narrativo.",
    body:
      "La propuesta podría evolucionar hacia piezas interactivas, experiencias web o contenidos generativos donde el movimiento responda a la interacción del usuario.",
  },
];

export default function NarsPage() {
  return (
    <ProjectDetailLayout
      title="NARS"
      client="Proyecto Personal"
      tags={["Sensorial", "Provocador", "3D"]}
      projectTitle="Gráficas animadas para redes sociales de la marca NARS"
      processSections={processSections}
      description={
        <p>
          Proyecto ficticio de Motion Graphics para NARS Explicit Lipstick y Climax Mascara. La propuesta utiliza simulaciones físicas y magnetismo para presentar los productos como objetos de deseo, construyendo una narrativa visual basada en la atracción, el misterio y la tensión.
        </p>
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
          <source src="/video/nars/mockupsi.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/0068.png"
            alt="NARS - Primera imagen del grid"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/nars/0013 (1).png"
            alt="NARS Stories"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="animate-element overflow-hidden rounded-2xl bg-white aspect-[16/9]">
        <img
          src="/images/aketchreels.png"
          alt="NARS - Sketch Reels"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/0110 (1).png"
            alt="NARS - Imagen 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/nars/animacionfeedsi.gif"
            alt="NARS Reel Animation"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </ProjectDetailLayout>
  );
}
