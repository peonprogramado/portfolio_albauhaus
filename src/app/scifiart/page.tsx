"use client";

import React from "react";
import ProjectDetailLayout from "../components/ProjectDetailLayout";

const processSections = [
  {
    title: "Contexto",
    lead:
      "El proyecto parte de una conexión: gran parte del imaginario futurista de la ciencia ficción comparte principios visuales con las vanguardias del siglo XX.",
    body:
      "Geometría, abstracción, tecnología y dinamismo se analizan a través de más de 400 obras, construyendo un sistema de relaciones entre movimientos históricos y diferentes representaciones del futuro.",
  },
  {
    title: "Problema",
    lead:
      "¿Cómo hacer visibles las conexiones entre movimientos artísticos separados por el tiempo, pero unidos por un mismo lenguaje visual?",
    body:
      "Las influencias entre las vanguardias y la ciencia ficción no siempre son explícitas. El reto consiste en organizar estas relaciones para poder identificar patrones, recurrencias e influencias estéticas dentro de un conjunto amplio de referencias.",
  },
  {
    title: "Objetivo",
    lead:
      "Transformar estas relaciones en un sistema visual capaz de conectar arte, tiempo e influencia.",
    body:
      "La propuesta busca hacer visible cómo los principios de las vanguardias evolucionan y reaparecen en el imaginario sci-fi, desde la arquitectura y la tecnología hasta la robótica y la representación de espacios futuros.",
  },

];

export default function SciFiArtPage() {
  return (
    <ProjectDetailLayout
      title="SCI FI ART"
      client="Proyecto Académico"
      tags={["Experimental"]}
      projectTitle="Infografía sobre la influencia de las vanguardias en el arte de ciencia ficción"
      processSections={processSections}
      description={
        <p>
         Una exploración visual sobre la influencia de las vanguardias históricas en el imaginario de la ciencia ficción. A partir del análisis de más de 400 obras de ilustración sci-fi, el proyecto relaciona movimientos artísticos, referentes y características visuales para descubrir patrones e influencias a lo largo del tiempo.
          <br />
          <br />
          La visualización principal, desarrollada con p5.js, transforma estas conexiones en un mapa visual que combina investigación, programación y diseño de información.
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
          <source src="/video/scifi/posterhzHD 2.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="animate-element overflow-hidden rounded-2xl aspect-[3/4]">
          <img
            src="/images/scifi/Mesa de trabajo 2 copia.png"
            alt="SCI FI art infografía 1"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="animate-element flex items-center justify-center overflow-hidden rounded-2xl bg-black aspect-[3/4]">
          <video
            className="block h-full w-auto object-contain"
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/video/scifi/posterrollup (1).mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>

      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/9]">
        <img
          src="/images/scifi/3.jpg"
          alt="SCI FI art infografía 3"
          className="h-full w-full object-cover"
        />
      </div>
    </ProjectDetailLayout>
  );
}
