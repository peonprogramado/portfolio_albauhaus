"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Language = "es" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (spanish: string, english?: string) => string;
};

const translations: Record<string, string> = {
  "Inicio": "Home",
  "Proyectos": "Projects",
  "Sobre mí": "About me",
  "Cliente": "Client",
  "Caso de estudio": "Case study",
  "Contexto": "Context",
  "Problema": "Problem",
  "Objetivo": "Goal",
  "Investigación": "Research",
  "Interacción": "Interaction",
  "Prospectiva": "Outlook",
  "Identidad": "Brand identity",
  "Infografía": "Infographic",
  "DUNE INFOGRAFÍA": "DUNE INFOGRAPHIC",
  "Identidad Viva": "Living Identity",
  "Generativo": "Generative",
  "Informativo": "Informative",
  "Inspirador": "Inspirational",
  "Exploratorio": "Exploratory",
  "Proyecto Personal": "Personal Project",
  "Proyecto Académico": "Academic Project",
  "Trabajo Fin de Grado": "Bachelor's Final Project",
  "Sensorial": "Sensory",
  "Provocador": "Provocative",
  "Retrofuturista": "Retrofuturist",
  "Experimental": "Experimental",
  "Tu navegador no soporta el elemento de video.": "Your browser does not support the video element.",
  "Crea tu Bisiona": "Create your Bisiona",
  "Crea o teu Bisiona": "Create your Bisiona",
  "Prototipo Figma": "Figma Prototype",
  "Asistente Ora": "Ora Assistant",
  "Identidad visual": "Visual identity",
  "Integración con Notion": "Notion integration",
  "Análisis de mercado": "Market analysis",
  "Encuestas a usuarios": "User surveys",
  "Concepto": "Concept",
  "Diseño": "Design",
  "Expresiones": "Expressions",
  "Guías de Estilo": "Style Guidelines",

  "Bisiona conecta cada año el entorno académico con la realidad profesional a través de conferencias, talleres y actividades en torno al diseño.": "Every year, Bisiona connects the academic environment with professional practice through talks, workshops and design-related activities.",
  "Su novena edición plantea la oportunidad de crear una identidad vinculada directamente con la comunidad que da forma a la escuela: su alumnado.": "Its ninth edition presented an opportunity to create an identity directly connected to the community that shapes the school: its students.",
  "Frente al enfoque de ediciones anteriores, el reto consistía en acercar Bisiona a quienes habitan la escuela, creando una identidad desarrollada por y para su comunidad.": "Unlike previous editions, the challenge was to bring Bisiona closer to the people who inhabit the school, creating an identity developed by and for its community.",
  "Inspirar al alumnado mostrando cómo la conexión entre disciplinas abre nuevas oportunidades en el mundo profesional.": "Inspire students by showing how connections between disciplines open up new opportunities in the professional world.",
  "El proceso parte del análisis de las distintas disciplinas que conviven en la escuela y de cómo su diversidad podía traducirse en un lenguaje visual común. Cada disciplina se representa mediante una variable del sistema, permitiendo generar resultados diferentes sin perder la coherencia de la identidad.": "The process began by analysing the different disciplines within the school and how their diversity could be translated into a shared visual language. Each discipline is represented by a system variable, producing different results without losing the identity's consistency.",
  "Como parte de la exploración de la experiencia digital de Bisiona, se diseñó en": "As part of the exploration of Bisiona's digital experience, an interactive prototype was designed in",
  "Figma un prototipo interactivo para la consulta del programa y la reserva de entradas": "Figma for browsing the programme and booking tickets",
  ", explorando la arquitectura de información, los flujos de navegación y la interacción con el evento.": ", exploring the information architecture, navigation flows and interaction with the event.",
  "La identidad se construye a través de la participación.": "The identity is built through participation.",
  "Mediante códigos QR distribuidos por la escuela, el alumnado accede a": "Through QR codes placed around the school, students access",
  ", una herramienta interactiva donde puede experimentar con distintas variables y generar su propia composición.": ", an interactive tool where they can experiment with different variables and generate their own composition.",
  "Cada parámetro representa una de las disciplinas de la escuela, convirtiendo cada interacción en una expresión única dentro de un mismo sistema visual. Las creaciones pueden compartirse bajo": "Each parameter represents one of the school's disciplines, turning every interaction into a unique expression within the same visual system. Creations can be shared under",
  ", haciendo que la participación individual pase a formar parte de una identidad colectiva en constante evolución. Los pasos del usuario en la herramienta son los siguientes:": ", making each individual contribution part of an ever-evolving collective identity. The steps in the tool are:",
  "Explora:": "Explore:",
  "modifica las variables que definen el sistema visual.": "adjust the variables that define the visual system.",
  "Crea:": "Create:",
  "combina los parámetros para generar una composición única.": "combine the parameters to generate a unique composition.",
  "Comparte:": "Share:",
  "publica tu creación bajo": "publish your creation under",
  "y contribuye a la identidad colectiva del evento.": "and contribute to the event's collective identity.",
  "Cada participante crea su propio identificador Bisiona y lo incorpora a la identidad común.": "Each participant creates their own Bisiona identifier and adds it to the shared identity.",
  "Herramienta interactiva y responsive desarrollada con HTML, CSS y JavaScript, que utiliza shaders para que el alumnado genere composiciones únicas modificando distintos parámetros visuales. El acceso se realiza mediante códigos QR generados con una herramienta propia en Python, evitando la dependencia de servicios externos.": "An interactive, responsive tool built with HTML, CSS and JavaScript. It uses shaders so students can create unique compositions by changing visual parameters. Access is provided through QR codes generated by a custom Python tool, avoiding reliance on external services.",
  "El sistema puede crecer como un archivo vivo de la comunidad y sus sucesivas ediciones.": "The system can grow into a living archive of the community and its future editions.",
  "La lógica generativa permite sumar nuevas variables, disciplinas y formatos sin perder reconocimiento, haciendo que la identidad evolucione junto a la escuela.": "Its generative logic makes it possible to add new variables, disciplines and formats while remaining recognisable, allowing the identity to evolve alongside the school.",
  "Identidad IX Jornadas de Arte y Diseño EASDPP": "Identity for the 9th EASDPP Art and Design Conference",
  "Bisiona es el encuentro anual de diseño de la EASD Pablo Picasso. Para su novena edición, se propone una identidad dinámica que evoluciona con la participación activa del alumnado. Cada intervención genera una composición única que pasa a formar parte de una identidad colectiva y cambiante.": "Bisiona is the annual design gathering at EASD Pablo Picasso. Its ninth edition proposes a dynamic identity that evolves through active student participation. Each contribution generates a unique composition that becomes part of a collective, ever-changing identity.",

  "Una pieza conceptual para presentar dos iconos de NARS en formatos sociales.": "A conceptual piece presenting two NARS icons in social media formats.",
  "Proyecto ficticio de Motion Graphics para NARS Explicit Lipstick y Climax Mascara, concebido para formatos digitales de Stories y Feed. La propuesta combina modelado y animación 3D en Blender con simulaciones físicas, logotipo y tipografía animada en After Effects.": "A fictional Motion Graphics project for NARS Explicit Lipstick and Climax Mascara, created for digital Stories and Feed formats. The proposal combines 3D modelling and animation in Blender with physical simulations, plus animated logos and typography in After Effects.",
  "¿Cómo utilizar el movimiento para despertar la atracción del público hacia el producto?": "How can motion spark the audience's attraction to the product?",
  "La duración reducida y el consumo rápido de las plataformas exigían una imagen inmediata, pero también una revelación progresiva que evitase una presentación convencional.": "Short runtimes and fast-paced platforms demanded an immediate image, but also a progressive reveal that avoided a conventional presentation.",
  "Crear una pieza capaz de transformar el producto en el centro de una experiencia visual basada en la atracción.": "Create a piece that turns the product into the focus of a visual experience built around attraction.",
  "Traducir la atracción en un recurso visual, utilizando el magnetismo, el movimiento y la tensión para despertar el interés y dirigir la atención hacia el producto.": "Translate attraction into a visual device, using magnetism, movement and tension to spark interest and direct attention towards the product.",
  "El sistema visual puede extenderse a otros productos y campañas digitales, utilizando diferentes comportamientos físicos como recurso narrativo.": "The visual system can extend to other products and digital campaigns, using different physical behaviours as a narrative device.",
  "La propuesta podría evolucionar hacia piezas interactivas, experiencias web o contenidos generativos donde el movimiento responda a la interacción del usuario.": "The concept could evolve into interactive pieces, web experiences or generative content where movement responds to user interaction.",
  "Gráficas animadas para redes sociales de la marca NARS": "Animated social media graphics for NARS",
  "Proyecto ficticio de Motion Graphics para NARS Explicit Lipstick y Climax Mascara. La propuesta utiliza simulaciones físicas y magnetismo para presentar los productos como objetos de deseo, construyendo una narrativa visual basada en la atracción, el misterio y la tensión.": "A fictional Motion Graphics project for NARS Explicit Lipstick and Climax Mascara. The proposal uses physical simulations and magnetism to present the products as objects of desire, building a visual narrative around attraction, mystery and tension.",

  "El proyecto nace como una infografía sobre el universo narrativo de Dune, combinando una estética inspirada en su imaginario retrofuturista con información extraída directamente de los guiones.": "The project began as an infographic about Dune's narrative universe, combining an aesthetic inspired by its retrofuturist imagery with information extracted directly from the screenplays.",
  "Para construirla, se desarrolló un proceso propio de extracción, análisis y visualización de datos con Python, utilizando Matplotlib para representar gráficamente las relaciones y patrones encontrados.": "A custom data extraction, analysis and visualisation process was built in Python, using Matplotlib to represent the relationships and patterns uncovered.",
  "¿Cómo transformar la complejidad narrativa de Dune en información que pueda explorarse y comprenderse visualmente?": "How can Dune's narrative complexity be transformed into information that can be explored and understood visually?",
  "La cantidad de personajes, relaciones y acontecimientos dificulta percibir patrones que no son evidentes al seguir únicamente la narrativa de las películas.": "The number of characters, relationships and events makes it difficult to perceive patterns that are not apparent from following the films' narrative alone.",
  "Transformar los guiones de Dune en datos estructurados y visualizaciones comprensibles, haciendo visibles las relaciones, apariciones y relevancia de sus personajes.": "Transform the Dune screenplays into structured data and understandable visualisations, revealing the characters' relationships, appearances and relevance.",
  "La propuesta busca combinar el análisis computacional con el diseño para ofrecer una nueva forma de explorar su universo narrativo.": "The proposal combines computational analysis and design to offer a new way to explore its narrative universe.",
  "La infografía estática evoluciona hacia una serie de visualizaciones interactivas desarrolladas con Python, que permiten explorar los datos de forma más dinámica..": "The static infographic evolves into a series of interactive visualisations developed with Python, allowing the data to be explored more dynamically.",
  "El usuario puede descubrir patrones, comparar personajes y visualizar sus relaciones desde diferentes perspectivas, convirtiendo la información original en una experiencia más explorable.": "Users can discover patterns, compare characters and view their relationships from different perspectives, turning the source information into a richer exploratory experience.",
  "El sistema podría ampliarse incorporando nuevos guiones y películas, creando una base de datos evolutiva del universo de Dune.": "The system could be expanded with new screenplays and films, creating an evolving database of the Dune universe.",
  "La herramienta de análisis también podría adaptarse a otras obras, automatizando el proceso desde el guion hasta la visualización y permitiendo comparar estructuras narrativas, personajes y relaciones.": "The analysis tool could also be adapted to other works, automating the process from screenplay to visualisation and enabling comparisons between narrative structures, characters and relationships.",
  "Infografía y visualización de datos con Python de la saga Dune": "Infographic and Python data visualisation of the Dune saga",
  "Una exploración visual del universo de Dune a partir de sus datos. Se desarrolló en Python una herramienta para analizar los guiones de las películas, identificando patrones en la aparición de personajes, coincidencias en pantalla, número de diálogos y menciones. Los datos obtenidos se transforman en visualizaciones que combinan programación, análisis de datos y diseño de información para hacer más comprensible la complejidad de su narrativa.": "A visual exploration of the Dune universe through its data. A Python tool was developed to analyse the film screenplays, identifying patterns in character appearances, shared screen time, dialogue counts and mentions. The resulting data is transformed into visualisations that combine programming, data analysis and information design to make its narrative complexity easier to understand.",

  "PiLab 5 imagina una tienda tecnológica donde una Raspberry es el inicio de mil proyectos.": "PiLab 5 imagines a technology shop where one Raspberry is the beginning of a thousand projects.",
  "La campaña vive en soportes exteriores, prensa y canales digitales, acompañada por una programación de talleres, charlas y demostraciones.": "The campaign lives across outdoor media, press and digital channels, supported by a programme of workshops, talks and demonstrations.",
  "La tecnología creativa puede percibirse como compleja y reservada a perfiles expertos.": "Creative technology can feel complex and reserved for experts.",
  "Esa barrera convierte a muchas personas en consumidoras pasivas antes de que descubran qué pueden construir por sí mismas.": "That barrier turns many people into passive consumers before they discover what they can build themselves.",
  "Despertar la curiosidad y transformar la intimidación tecnológica en impulso creador.": "Spark curiosity and turn technological intimidation into a creative drive.",
  "La comunicación debía presentar el producto como una herramienta accesible, abierta y capaz de materializar ideas muy distintas.": "The communication needed to present the product as an accessible, open tool capable of bringing many different ideas to life.",
  "El concepto nace del contraste entre la pequeña escala del dispositivo y la amplitud de sus usos.": "The concept stems from the contrast between the device's small scale and its vast range of uses.",
  "Se analizaron proyectos maker, motivaciones de aprendizaje y puntos de contacto publicitarios para construir mensajes claros, inspiradores y accionables.": "Maker projects, learning motivations and advertising touchpoints were analysed to build clear, inspiring and actionable messages.",
  "La campaña continúa en PiSkills, PiTalk y demos donde el público pasa a hacer.": "The campaign continues through PiSkills, PiTalk and demos where the audience starts making.",
  "Cada formato dirige hacia una experiencia práctica: aprender una habilidad, escuchar a la comunidad o probar el producto en el propio espacio de la tienda.": "Each format leads to a hands-on experience: learning a skill, listening to the community or trying the product in the shop itself.",
  "PiLab 5 puede evolucionar de campaña comercial a plataforma de aprendizaje compartido.": "PiLab 5 can evolve from a commercial campaign into a shared learning platform.",
  "Nuevos talleres, retos y proyectos de la comunidad ampliarían el relato y mantendrían activa la relación con el público más allá de una acción puntual.": "New workshops, challenges and community projects could expand the story and keep the relationship with the audience active beyond a one-off campaign.",
  "PiLab 5 - Gráficas publicitarias": "PiLab 5 — Advertising graphics",
  "Serie de gráficas publicitarias para la campaña de la tienda ficticia PiLab 5 se concibe como una llamada a experimentar con la tecnología en un laboratorio creativo bajo el motto \"Mil proyectos, una Raspberry\". La propuesta visual en soportes exteriores, prensa y canales digitales busca motivar al espectador para que abandone su rol de consumidor pasivo y descubra su potencial como creador activo. Se plantea la organización de talleres PiSkills, charlas PiTalk y demos in situ. En ellos se anima al público a aprender y materializar las infinitas posibilidades tecnológicas del producto, demostrando que cualquiera puede fabricar sus propias ideas.": "This series of advertising graphics for the fictional PiLab 5 shop is conceived as an invitation to experiment with technology in a creative laboratory under the motto “A thousand projects, one Raspberry”. Across outdoor media, press and digital channels, the visual proposal encourages viewers to leave behind their role as passive consumers and discover their potential as active creators. PiSkills workshops, PiTalk sessions and in-store demos invite the public to learn and bring the product's endless technological possibilities to life, showing that anyone can build their own ideas.",

  "El proyecto parte de una conexión: gran parte del imaginario futurista de la ciencia ficción comparte principios visuales con las vanguardias del siglo XX.": "The project begins with a connection: much of science fiction's futuristic imagery shares visual principles with the 20th-century avant-garde.",
  "Geometría, abstracción, tecnología y dinamismo se analizan a través de más de 400 obras, construyendo un sistema de relaciones entre movimientos históricos y diferentes representaciones del futuro.": "Geometry, abstraction, technology and dynamism are analysed across more than 400 works, building a system of relationships between historical movements and different representations of the future.",
  "¿Cómo hacer visibles las conexiones entre movimientos artísticos separados por el tiempo, pero unidos por un mismo lenguaje visual?": "How can we reveal the connections between artistic movements separated by time but united by the same visual language?",
  "Las influencias entre las vanguardias y la ciencia ficción no siempre son explícitas. El reto consiste en organizar estas relaciones para poder identificar patrones, recurrencias e influencias estéticas dentro de un conjunto amplio de referencias.": "The influences between the avant-garde and science fiction are not always explicit. The challenge is to organise these relationships in order to identify patterns, recurrences and aesthetic influences within a broad set of references.",
  "Transformar estas relaciones en un sistema visual capaz de conectar arte, tiempo e influencia.": "Transform these relationships into a visual system capable of connecting art, time and influence.",
  "La propuesta busca hacer visible cómo los principios de las vanguardias evolucionan y reaparecen en el imaginario sci-fi, desde la arquitectura y la tecnología hasta la robótica y la representación de espacios futuros.": "The proposal reveals how avant-garde principles evolve and reappear in sci-fi imagery, from architecture and technology to robotics and representations of future spaces.",
  "Infografía sobre la influencia de las vanguardias en el arte de ciencia ficción": "Infographic on the influence of the avant-garde on science-fiction art",
  "Una exploración visual sobre la influencia de las vanguardias históricas en el imaginario de la ciencia ficción. A partir del análisis de más de 400 obras de ilustración sci-fi, el proyecto relaciona movimientos artísticos, referentes y características visuales para descubrir patrones e influencias a lo largo del tiempo.": "A visual exploration of the influence of historical avant-garde movements on science-fiction imagery. Through the analysis of more than 400 sci-fi illustrations, the project connects artistic movements, references and visual characteristics to uncover patterns and influences over time.",
  "La visualización principal, desarrollada con p5.js, transforma estas conexiones en un mapa visual que combina investigación, programación y diseño de información.": "The main visualisation, developed with p5.js, turns these connections into a visual map combining research, programming and information design.",

  "Muchas herramientas de productividad añaden complejidad justo cuando deberían reducirla.": "Many productivity tools add complexity precisely when they should reduce it.",
  "El proceso estudia cómo se construyen las rutinas y qué elementos generan fricción durante la planificación cotidiana.": "The process examines how routines are formed and which elements create friction in everyday planning.",
  "La interfaz guía de forma progresiva y ofrece control sin saturar de decisiones.": "The interface provides progressive guidance and control without overwhelming users with decisions.",
  "Aplicación de productividad accesible Sileo": "Sileo accessible productivity app",
  "Sileo es una aplicación de productividad y gestión de tareas que integra inteligencia artificial con un enfoque centrado en la accesibilidad. Diseñada y desarrollada con React Native y Expo, combina experiencia de usuario y tecnología en un sistema escalable y adaptable a múltiples plataformas.": "Sileo is a productivity and task-management app that integrates artificial intelligence with an accessibility-centred approach. Designed and developed with React Native and Expo, it combines user experience and technology in a scalable system that adapts to multiple platforms.",
  "Sileo nace en un contexto donde las herramientas de productividad buscan adaptarse cada vez más a las necesidades y hábitos de cada usuario, combinando": "Sileo emerged in a context where productivity tools increasingly seek to adapt to each user's needs and habits, combining",
  "organización, inteligencia artificial y personalización": "organisation, artificial intelligence and personalisation",
  "para facilitar la gestión del día a día.": "to make everyday planning easier.",
  "El logotipo de Sileo está diseñado para transmitir una identidad": "The Sileo logo is designed to convey a",
  "minimalista, humana y equilibrada": "minimal, human and balanced identity",
  ". Sus formas y proporciones buscan reflejar el ritmo visual calmado e intencional que caracteriza la experiencia de la aplicación.": ". Its forms and proportions reflect the calm, intentional visual rhythm that defines the app experience.",
  "La identidad cuenta con dos versiones: el": "The identity has two versions: the",
  "imagotipo completo": "full combination mark",
  ", acompañado del": ", accompanied by Sileo's",
  "de Sileo, y el": "wordmark, and the",
  "símbolo independiente": "standalone symbol",
  ", construido a partir de la característica forma de la": ", built from the distinctive shape of the",
  ", que funciona como un elemento reconocible y recurrente en todo el sistema visual de la marca.": ", which works as a recognisable, recurring element throughout the brand's visual system.",
  "Sileo se plantea como una posible": "Sileo is conceived as a potential",
  "integración dentro del ecosistema de Notion": "integration within the Notion ecosystem",
  ", complementando sus herramientas de productividad con una experiencia centrada en la organización de tareas, la inteligencia artificial y la personalización, permitiendo conectar ambos entornos y ampliar las posibilidades de gestión del día a día.": ", complementing its productivity tools with an experience focused on task organisation, artificial intelligence and personalisation, connecting both environments and expanding everyday planning options.",
  "La acumulación de funciones, las jerarquías poco claras y las notificaciones constantes pueden aumentar la carga cognitiva y dificultar la creación de rutinas sostenibles.": "An accumulation of features, unclear hierarchies and constant notifications can increase cognitive load and make sustainable routines harder to build.",
  "El objetivo principal de Sileo es": "Sileo's main goal is to",
  "hacer que la aplicación se adapte al usuario, y no que el usuario tenga que adaptarse a ella": "make the app adapt to the user, rather than forcing the user to adapt to it",
  ". A través de la personalización, la inteligencia artificial y una experiencia accesible, Sileo busca reducir las barreras durante la organización y facilitar la gestión del día a día.": ". Through personalisation, artificial intelligence and an accessible experience, Sileo aims to reduce planning barriers and make everyday management easier.",
  "Con ello, se pretende": "This aims to",
  "aumentar la tasa de tareas completadas": "increase the task completion rate",
  ", adaptando la experiencia a las necesidades, preferencias y forma de organizarse de cada usuario.": ", adapting the experience to every user's needs, preferences and way of organising.",
  "Se realizó un análisis de las principales": "An analysis was conducted of the leading",
  "aplicaciones de productividad y organización actuales": "productivity and organisation apps",
  ", estudiando sus funcionalidades, estructura y experiencia de usuario para identificar patrones, oportunidades y aspectos diferenciadores aplicables a Sileo.": ", examining their features, structure and user experience to identify patterns, opportunities and differentiating aspects relevant to Sileo.",
  "Posteriormente, se realizaron": "Next,",
  "encuestas a posibles usuarios": "potential users were surveyed",
  "para conocer sus hábitos de organización, necesidades y dificultades al utilizar herramientas de productividad. A partir de los resultados se seleccionaron": "to understand their organisational habits, needs and difficulties when using productivity tools. Based on the results,",
  "7 perfiles clave": "7 key profiles were selected",
  "representativos del público objetivo.": "to represent the target audience.",
  "Con los 7 perfiles seleccionados se realizó un": "A closed",
  "Card Sorting cerrado": "card sorting exercise",
  "para comprobar cómo los usuarios comprendían y organizaban las funcionalidades propuestas. Los resultados permitieron": "was conducted with the 7 selected profiles to assess how users understood and organised the proposed features. The results made it possible to",
  "detectar problemas y reajustar varias funciones y elementos de la estructura de Sileo": "identify problems and readjust several features and structural elements in Sileo",
  ", adaptando la aplicación a las necesidades identificadas durante la investigación.": ", adapting the app to the needs identified during the research.",
  "A partir de los resultados obtenidos en la investigación, se desarrollaron": "Based on the research findings,",
  "wireframes de media fidelidad de todas las pantallas de la aplicación": "mid-fidelity wireframes were developed for every screen in the app",
  ", definiendo su estructura, jerarquía de contenidos y principales flujos de navegación antes de avanzar al diseño visual final.": ", defining their structure, content hierarchy and main navigation flows before moving on to the final visual design.",
  "Sileo está diseñada siguiendo un nivel de accesibilidad": "Sileo is designed to meet",
  "AA bajo las WCAG": "WCAG AA accessibility standards",
  ", por lo que muchas de sus interacciones están planteadas para ofrecer una experiencia más accesible y adaptable.": ", so many of its interactions are designed to provide a more accessible and adaptable experience.",
  "La aplicación incorpora": "The app includes",
  "modo de alto contraste, gestos simplificados y touch targets amplios": "high-contrast mode, simplified gestures and large touch targets",
  ", facilitando la navegación y reduciendo posibles barreras durante su uso.": ", making navigation easier and reducing potential barriers during use.",
  "Como elemento destacado, incorpora": "One standout feature is",
  ", una funcionalidad de iOS que permite adaptar automáticamente el tamaño del texto y la interfaz según las preferencias de accesibilidad del usuario, especialmente útil para personas con dificultades visuales.": ", an iOS feature that automatically adjusts text and interface size to the user's accessibility preferences, especially useful for people with visual impairments.",
  "10.000 descargas": "10,000 downloads",
  "La idea central es que sea": "The central idea is for",
  "Sileo quien se adapte al usuario": "Sileo to adapt to the user",
  ", ofreciendo una experiencia lo más cómoda, personalizada y accesible posible.": ", providing the most comfortable, personalised and accessible experience possible.",
  "es el asistente de inteligencia artificial de Sileo, diseñado para acompañar y ayudar al usuario durante la organización y planificación de sus tareas. Su nombre proviene del latín": "is Sileo's AI assistant, designed to support users as they organise and plan their tasks. Its name comes from the Latin",
  ", relacionado con": ", related to",
  "hablar o comunicar": "speaking or communicating",
  ", reflejando su función como una guía cercana, calmada y útil dentro de la aplicación.": ", reflecting its role as a friendly, calm and useful guide within the app.",
  "Su identidad visual está inspirada parcialmente en el": "Its visual identity is partly inspired by the",
  "símbolo musical del silencio de negra": "quarter-rest musical symbol",
  ", una referencia al silencio, la calma y la concentración que se refleja sutilmente en sus rasgos. Su diseño y comunicación buscan transmitir": ", a reference to silence, calm and focus that is subtly reflected in its features. Its design and communication seek to convey",
  "cercanía, claridad y simplicidad": "warmth, clarity and simplicity",
  ", integrándose de forma natural en la experiencia de Sileo.": ", integrating naturally into the Sileo experience.",
  "Ora cuenta con diferentes": "Ora has different",
  "expresiones y estados visuales": "expressions and visual states",
  "que responden a cada interacción, como curiosidad, gratitud, búsqueda de una respuesta o guiños. Esto permite comunicar lo que está ocurriendo de forma más visual e intuitiva, haciendo que la interacción con la IA se sienta": "that respond to each interaction, such as curiosity, gratitude, searching for an answer or winking. This communicates what is happening in a more visual, intuitive way, making interaction with the AI feel",
  "más natural, cercana y humana": "more natural, friendly and human",
  "A nivel técnico, Sileo plantea el uso de": "Technically, Sileo proposes using",
  "como base de datos y sistema de gestión de la información, junto con": "as its database and information management system, together with",
  "para gestionar los pagos y futuras suscripciones dentro de la plataforma.": "to manage payments and future subscriptions within the platform.",
  "El crecimiento del proyecto se estructura por": "The project's growth is structured around",
  "fases y objetivos de adopción": "phases and adoption targets",
  ". Tras consolidar inicialmente la aplicación en iOS y alcanzar las": ". After first consolidating the app on iOS and reaching",
  ", se plantea como siguiente etapa su expansión a": ", the next stage is expansion to",
  ", permitiendo escalar Sileo a un público más amplio.": ", allowing Sileo to scale to a wider audience.",
  "Esta estrategia permite que la infraestructura y las funcionalidades de la aplicación evolucionen progresivamente en función del crecimiento y las necesidades reales de sus usuarios.": "This strategy allows the app's infrastructure and features to evolve progressively according to growth and users' real needs.",
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("portfolio-language");
    if (storedLanguage === "es" || storedLanguage === "en") {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (spanish: string, english?: string) => {
      if (language === "es") return spanish;
      return english ?? translations[normalize(spanish)] ?? spanish;
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
