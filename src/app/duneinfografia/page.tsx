"use client";

import React from "react";
import ProjectDetailLayout from "../components/ProjectDetailLayout";

const processSections = [
  {
    title: "Contexto",
    lead:
      "El proyecto nace como una infografía sobre el universo narrativo de Dune, combinando una estética inspirada en su imaginario retrofuturista con información extraída directamente de los guiones.",
    body:
      "Para construirla, se desarrolló un proceso propio de extracción, análisis y visualización de datos con Python, utilizando Matplotlib para representar gráficamente las relaciones y patrones encontrados.",
  },
  {
    title: "Problema",
    lead:
      "¿Cómo transformar la complejidad narrativa de Dune en información que pueda explorarse y comprenderse visualmente?",
    body:
      "La cantidad de personajes, relaciones y acontecimientos dificulta percibir patrones que no son evidentes al seguir únicamente la narrativa de las películas.",
  },
  {
    title: "Objetivo",
    lead:
      "Transformar los guiones de Dune en datos estructurados y visualizaciones comprensibles, haciendo visibles las relaciones, apariciones y relevancia de sus personajes.",
    body:
      "La propuesta busca combinar el análisis computacional con el diseño para ofrecer una nueva forma de explorar su universo narrativo.",
  },
  {
    title: "Interacción",
    lead:
      "La infografía estática evoluciona hacia una serie de visualizaciones interactivas desarrolladas con Python, que permiten explorar los datos de forma más dinámica..",
    body:
      "El usuario puede descubrir patrones, comparar personajes y visualizar sus relaciones desde diferentes perspectivas, convirtiendo la información original en una experiencia más explorable.",
  },
  {
    title: "Prospectiva",
    lead:
      "El sistema podría ampliarse incorporando nuevos guiones y películas, creando una base de datos evolutiva del universo de Dune.",
    body:
      "La herramienta de análisis también podría adaptarse a otras obras, automatizando el proceso desde el guion hasta la visualización y permitiendo comparar estructuras narrativas, personajes y relaciones.",
  },
];

export default function DuneInfografiaPage() {
  return (
    <ProjectDetailLayout
      title="DUNE INFOGRAFÍA"
      client="Proyecto Personal"
      tags={["Retrofuturista", "Informativo"]}
      projectTitle="Infografía y visualización de datos con Python de la saga Dune"
      processSections={processSections}
      description={
        <p>
          Una exploración visual del universo de Dune a partir de sus datos. Se desarrolló en Python una herramienta para analizar los guiones de las películas, identificando patrones en la aparición de personajes, coincidencias en pantalla, número de diálogos y menciones.

Los datos obtenidos se transforman en visualizaciones que combinan programación, análisis de datos y diseño de información para hacer más comprensible la complejidad de su narrativa.
        </p>
      }
    >
      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/10]">
        <img
          src="/images/mockupinfografiadune.jpg"
          alt="Dune Infografía - Mockup"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl aspect-[16/11]">
        <img
          src="/images/graficacomplementaria_af.jpg"
          alt="Dune Infografía - Gráfica Complementaria"
          className="h-full w-full object-cover"
        />
      </div>
    </ProjectDetailLayout>
  );
}
