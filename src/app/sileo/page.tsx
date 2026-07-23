"use client";

import React from "react";
import ProjectDetailLayout from "../components/ProjectDetailLayout";

const processSections = [
  {
    title: "Contexto",
    lead: (
      <>
        Sileo nace en un contexto donde las herramientas de productividad buscan
        adaptarse cada vez más a las necesidades y hábitos de cada usuario,
        combinando{" "}
        <strong className="font-semibold text-black">
          organización, inteligencia artificial y personalización
        </strong>{" "}
        para facilitar la gestión del día a día.
      </>
    ),
    body: (
      <div className="space-y-5">
        <div>
          <h4 className="font-semibold text-black">Identidad visual</h4>
          <p className="mt-2">
            El logotipo de Sileo está diseñado para transmitir una identidad{" "}
            <strong className="font-semibold text-black">
              minimalista, humana y equilibrada
            </strong>
            . Sus formas y proporciones buscan reflejar el ritmo visual calmado
            e intencional que caracteriza la experiencia de la aplicación.
          </p>
        </div>

        <p>
          La identidad cuenta con dos versiones: el{" "}
          <strong className="font-semibold text-black">
            imagotipo completo
          </strong>
          , acompañado del <em>wordmark</em> de Sileo, y el{" "}
          <strong className="font-semibold text-black">
            símbolo independiente
          </strong>
          , construido a partir de la característica forma de la{" "}
          <strong className="font-semibold text-black">“O”</strong>, que funciona
          como un elemento reconocible y recurrente en todo el sistema visual de
          la marca.
        </p>

        <div className="overflow-hidden rounded-2xl">
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
              src="/images/sileo/Proyecto Convertir a MP4 - 23 de julio de 2026 a las 20.14.03.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>

        <div>
          <h4 className="font-semibold text-black">Integración con Notion</h4>
          <p className="mt-2">
            Sileo se plantea como una posible{" "}
            <strong className="font-semibold text-black">
              integración dentro del ecosistema de Notion
            </strong>
            , complementando sus herramientas de productividad con una
            experiencia centrada en la organización de tareas, la inteligencia
            artificial y la personalización, permitiendo conectar ambos entornos
            y ampliar las posibilidades de gestión del día a día.
          </p>
        </div>

      </div>
    ),
  },
  {
    title: "Problema",
    lead:
      "Muchas herramientas de productividad añaden complejidad justo cuando deberían reducirla.",
    body: (
      <div className="space-y-7">
        <p>
          La acumulación de funciones, las jerarquías poco claras y las
          notificaciones constantes pueden aumentar la carga cognitiva y
          dificultar la creación de rutinas sostenibles.
        </p>

        <div className="overflow-hidden rounded-2xl">
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
              src="/images/sileo/animacionespresentacion_2.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    ),
  },
  {
    title: "Objetivo",
    lead: (
      <>
        El objetivo principal de Sileo es{" "}
        <strong className="font-semibold text-black">
          hacer que la aplicación se adapte al usuario, y no que el usuario tenga
          que adaptarse a ella
        </strong>
        . A través de la personalización, la inteligencia artificial y una
        experiencia accesible, Sileo busca reducir las barreras durante la
        organización y facilitar la gestión del día a día.
      </>
    ),
    body: (
      <p>
        Con ello, se pretende{" "}
        <strong className="font-semibold text-black">
          aumentar la tasa de tareas completadas
        </strong>
        , adaptando la experiencia a las necesidades, preferencias y forma de
        organizarse de cada usuario.
      </p>
    ),
  },
  {
    title: "Investigación",
    lead:
      "El proceso estudia cómo se construyen las rutinas y qué elementos generan fricción durante la planificación cotidiana.",
    body: (
      <div className="space-y-7">
        <div>
          <h4 className="font-semibold text-black">Análisis de mercado</h4>
          <p className="mt-2">
            Se realizó un análisis de las principales{" "}
            <strong className="font-semibold text-black">
              aplicaciones de productividad y organización actuales
            </strong>
            , estudiando sus funcionalidades, estructura y experiencia de
            usuario para identificar patrones, oportunidades y aspectos
            diferenciadores aplicables a Sileo.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/sileo/mercado2.png"
            alt="Análisis de aplicaciones de productividad y organización para Sileo"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>

        <div>
          <h4 className="font-semibold text-black">Encuestas a usuarios</h4>
          <p className="mt-2">
            Posteriormente, se realizaron{" "}
            <strong className="font-semibold text-black">
              encuestas a posibles usuarios
            </strong>{" "}
            para conocer sus hábitos de organización, necesidades y
            dificultades al utilizar herramientas de productividad. A partir
            de los resultados se seleccionaron{" "}
            <strong className="font-semibold text-black">
              7 perfiles clave
            </strong>{" "}
            representativos del público objetivo.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/sileo/mercado.png"
            alt="Resultados de las encuestas realizadas a usuarios de aplicaciones de productividad"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>

        <div>
          <h4 className="font-semibold text-black">Card Sorting</h4>
          <p className="mt-2">
            Con los 7 perfiles seleccionados se realizó un{" "}
            <strong className="font-semibold text-black">
              Card Sorting cerrado
            </strong>{" "}
            para comprobar cómo los usuarios comprendían y organizaban las
            funcionalidades propuestas. Los resultados permitieron{" "}
            <strong className="font-semibold text-black">
              detectar problemas y reajustar varias funciones y elementos de
              la estructura de Sileo
            </strong>
            , adaptando la aplicación a las necesidades identificadas durante
            la investigación.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-black">Wireframes</h4>
          <p className="mt-2">
            A partir de los resultados obtenidos en la investigación, se
            desarrollaron{" "}
            <strong className="font-semibold text-black">
              wireframes de media fidelidad de todas las pantallas de la
              aplicación
            </strong>
            , definiendo su estructura, jerarquía de contenidos y principales
            flujos de navegación antes de avanzar al diseño visual final.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/sileo/wireframes.png"
            alt="Wireframes de media fidelidad de las pantallas de Sileo"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Interacción",
    lead:
      "La interfaz guía de forma progresiva y ofrece control sin saturar de decisiones.",
    body: (
      <div className="space-y-5">
        <p>
          Sileo está diseñada siguiendo un nivel de accesibilidad{" "}
          <strong className="font-semibold text-black">
            AA bajo las WCAG
          </strong>
          , por lo que muchas de sus interacciones están planteadas para ofrecer
          una experiencia más accesible y adaptable.
        </p>

        <p>
          La aplicación incorpora{" "}
          <strong className="font-semibold text-black">
            modo de alto contraste, gestos simplificados y touch targets amplios
          </strong>
          , facilitando la navegación y reduciendo posibles barreras durante su
          uso.
        </p>

        <p>
          Como elemento destacado, incorpora{" "}
          <strong className="font-semibold text-black">Dynamic Type</strong>, una
          funcionalidad de iOS que permite adaptar automáticamente el tamaño del
          texto y la interfaz según las preferencias de accesibilidad del
          usuario, especialmente útil para personas con dificultades visuales.
        </p>

        <p>
          La idea central es que sea{" "}
          <strong className="font-semibold text-black">
            Sileo quien se adapte al usuario
          </strong>
          , ofreciendo una experiencia lo más cómoda, personalizada y accesible
          posible.
        </p>

        <div className="grid gap-4 pt-3">
          <div className="overflow-hidden rounded-2xl">
            <video
              className="block h-auto w-full"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/images/sileo/onboarding.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <video
              className="block h-auto w-full"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/images/sileo/features.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <video
              className="block h-auto w-full"
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/images/sileo/feature1.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Asistente Ora",
    lead: "",
    body: (
      <div className="space-y-7">
        <div>
          <h4 className="font-semibold text-black">Concepto</h4>
          <p className="mt-2">
            <strong className="font-semibold text-black">Ora</strong> es el
            asistente de inteligencia artificial de Sileo, diseñado para
            acompañar y ayudar al usuario durante la organización y planificación
            de sus tareas. Su nombre proviene del latín <em>“Ora”</em>, relacionado
            con{" "}
            <strong className="font-semibold text-black">
              hablar o comunicar
            </strong>
            , reflejando su función como una guía cercana, calmada y útil dentro
            de la aplicación.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/sileo/presentacion7.gif"
            alt="Presentación animada del asistente Ora"
            className="block h-auto w-full"
            loading="lazy"
          />
        </div>

        <div>
          <h4 className="font-semibold text-black">Diseño</h4>
          <p className="mt-2">
            Su identidad visual está inspirada parcialmente en el{" "}
            <strong className="font-semibold text-black">
              símbolo musical del silencio de negra
            </strong>
            , una referencia al silencio, la calma y la concentración que se
            refleja sutilmente en sus rasgos. Su diseño y comunicación buscan
            transmitir{" "}
            <strong className="font-semibold text-black">
              cercanía, claridad y simplicidad
            </strong>
            , integrándose de forma natural en la experiencia de Sileo.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-black">Expresiones</h4>
          <p className="mt-2">
            Ora cuenta con diferentes{" "}
            <strong className="font-semibold text-black">
              expresiones y estados visuales
            </strong>{" "}
            que responden a cada interacción, como curiosidad, gratitud,
            búsqueda de una respuesta o guiños. Esto permite comunicar lo que
            está ocurriendo de forma más visual e intuitiva, haciendo que la
            interacción con la IA se sienta{" "}
            <strong className="font-semibold text-black">
              más natural, cercana y humana
            </strong>
            .
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <video
            className="block h-auto w-full"
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/images/sileo/allwriting.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    ),
  },
  {
    title: "Prospectiva",
    lead: (
      <>
        A nivel técnico, Sileo plantea el uso de{" "}
        <strong className="font-semibold text-black">Supabase</strong> como base
        de datos y sistema de gestión de la información, junto con{" "}
        <strong className="font-semibold text-black">Stripe</strong> para
        gestionar los pagos y futuras suscripciones dentro de la plataforma.
      </>
    ),
    body: (
      <div className="space-y-5">
        <p>
          El crecimiento del proyecto se estructura por{" "}
          <strong className="font-semibold text-black">
            fases y objetivos de adopción
          </strong>
          . Tras consolidar inicialmente la aplicación en iOS y alcanzar las{" "}
          <strong className="font-semibold text-black">10.000 descargas</strong>,
          se plantea como siguiente etapa su expansión a{" "}
          <strong className="font-semibold text-black">Android</strong>,
          permitiendo escalar Sileo a un público más amplio.
        </p>

        <p>
          Esta estrategia permite que la infraestructura y las funcionalidades de
          la aplicación evolucionen progresivamente en función del crecimiento y
          las necesidades reales de sus usuarios.
        </p>

        <div className="pt-8 md:pt-12">
          <div className="w-full overflow-hidden rounded-2xl md:w-[88%] lg:w-[78%]">
            <img
              src="/images/sileo/cronograma.png"
              alt="Cronograma de desarrollo y crecimiento de Sileo"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    ),
  },
];

export default function SileoPage() {
  return (
    <ProjectDetailLayout
      title="SILEO APP"
      client="Trabajo Fin de Grado"
      clientLabel="Cliente"
      tags={["Identidad", "UI/UX"]}
      projectTitle="Aplicación de productividad accesible Sileo"
      processSections={processSections}
      description={
        <div>
          <p>
            Sileo es una aplicación de productividad y gestión de tareas que integra inteligencia artificial con un enfoque centrado en la accesibilidad. Diseñada y desarrollada con React Native y Expo, combina experiencia de usuario y tecnología en un sistema escalable y adaptable a múltiples plataformas.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://sileo-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between gap-5 rounded-full border border-black px-5 py-3 text-base font-normal text-black transition-colors hover:bg-black hover:text-white sm:text-lg lg:w-3/4"
            >
              <span>Landing Page</span>
              <img
                src="/svg/arrow_right_alt_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0 transition-[filter,transform] group-hover:translate-x-1 group-hover:invert"
              />
            </a>

            <a
              href="https://sileobrandguidelines.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between gap-5 rounded-full border border-black px-5 py-3 text-base font-normal text-black transition-colors hover:bg-black hover:text-white sm:text-lg lg:w-3/4"
            >
              <span>Guías de Estilo</span>
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
      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/16 - iPhone 15 - Isometric Style Rightblur 1.jpg"
          alt="Diseño de identidad e interfaces móviles de Sileo App"
          className="block h-auto w-full"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/07 - iPhone 15 - Isometric Leftblur 1.jpg"
          alt="Interfaz de Sileo mostrada en un iPhone"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/Mockup1.png"
          alt="Sileo adaptado a móvil, reloj, portátil y escritorio"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/posts.png"
          alt="Diseños de publicaciones para redes sociales de Sileo"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/mockup11.png"
          alt="Mockup de las interfaces móviles de Sileo"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/mockup7.png"
          alt="Presentación de Sileo en una ficha de App Store"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div className="animate-element overflow-hidden rounded-2xl">
        <img
          src="/images/sileo/mockup5.png"
          alt="Diseños de historias para redes sociales de Sileo"
          className="block h-auto w-full"
          loading="lazy"
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
            src="/images/sileo/Grabación de pantalla 2026-07-23 a las 19.09.11.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

    </ProjectDetailLayout>
  );
}
