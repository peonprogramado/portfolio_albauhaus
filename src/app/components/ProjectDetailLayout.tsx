"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MaskedHeading from "./MaskedHeading";
import { useLanguage } from "../context/LanguageContext";

type ProjectDetailLayoutProps = {
  title: string;
  client: string;
  clientLabel?: string;
  tags: string[];
  projectTitle: string;
  description: ReactNode;
  caseMeta?: {
    role: string;
    roleEn?: string;
    developmentTime: string;
    developmentTimeEn?: string;
    tools: string;
  };
  processSections?: {
    title: string;
    lead: ReactNode;
    body: ReactNode;
    compact?: boolean;
    image?: {
      src: string;
      alt: string;
      caption?: ReactNode;
    };
  }[];
  children: ReactNode;
};

export default function ProjectDetailLayout({
  title,
  client,
  clientLabel = "Cliente",
  tags,
  projectTitle,
  description,
  caseMeta,
  processSections = [],
  children,
}: ProjectDetailLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeProcessSection, setActiveProcessSection] = useState(0);
  const { t } = useLanguage();

  const translateNode = (node: ReactNode): ReactNode => {
    if (typeof node === "string") return t(node);
    if (Array.isArray(node)) {
      return React.Children.map(node, (child) => translateNode(child));
    }
    if (!React.isValidElement<Record<string, unknown>>(node)) return node;

    const translatedProps: Record<string, unknown> = {};
    const props = node.props;

    if (typeof props.alt === "string") translatedProps.alt = t(props.alt);
    if (typeof props.title === "string") translatedProps.title = t(props.title);
    if (typeof props["aria-label"] === "string") {
      translatedProps["aria-label"] = t(props["aria-label"] as string);
    }
    if ("children" in props) {
      translatedProps.children = translateNode(props.children as ReactNode);
    }

    return React.cloneElement(node, translatedProps);
  };

  useEffect(() => {
    const media = contentRef.current?.querySelectorAll(".animate-element");

    if (!media?.length) return;

    const animation = gsap.fromTo(
      media,
      { opacity: 0, y: 36, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.12,
      },
    );

    return () => {
      animation.kill();
    };
  }, []);

  useEffect(() => {
    if (!processSections.length) return;

    const sections = processSections
      .map((_, index) => document.getElementById(`project-process-${index}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          )[0];

        if (!visibleSection) return;

        const sectionIndex = Number(
          visibleSection.target.getAttribute("data-process-index"),
        );

        if (!Number.isNaN(sectionIndex)) {
          setActiveProcessSection(sectionIndex);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [processSections]);

  const scrollToProcessSection = (index: number) => {
    setActiveProcessSection(index);
    document.getElementById(`project-process-${index}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="project-detail-layout min-h-screen bg-white">
      <NavBar />

      <main
        ref={contentRef}
        className="mx-auto max-w-[1600px] px-5 pb-8 pt-28 sm:px-8 lg:pt-32"
      >
        <div className="items-start gap-8 lg:grid lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] xl:gap-12 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)]">
          <aside className="mb-12 lg:sticky lg:top-28 lg:mb-0 lg:flex lg:h-[calc(100vh-8rem)] lg:flex-col lg:overflow-hidden">
            <div className="lg:shrink-0 lg:pr-4">
              <MaskedHeading
                text={title}
                className="mb-5 text-[30px] font-bold leading-[0.9] text-black sm:text-[36px] lg:text-[42px] xl:text-[48px]"
              />

              <div className="mb-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-default rounded-full border border-gray-400 px-3 py-1.5 text-xs text-gray-500"
                  >
                    {t(tag)}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-info-scroll lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pb-6 lg:pr-4">
              <section className="max-w-xl">
                <div className="text-[15px] leading-relaxed text-gray-600">
                  {translateNode(description)}
                </div>
              </section>
            </div>

            <div className="mt-8 border-t border-black/15 bg-white pt-5 lg:mt-0 lg:shrink-0 lg:pr-4">
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-gray-400">
                {t(clientLabel)}
              </p>
              <p className="text-sm text-black">{t(client)}</p>
            </div>
          </aside>

          <div className="min-w-0 space-y-8">{translateNode(children)}</div>
        </div>

        {processSections.length > 0 && (
          <section
            className="mt-16 sm:mt-20 lg:mt-28"
            aria-labelledby="project-process-title"
          >
            <header className="grid gap-5 pb-12 sm:pb-16 lg:grid-cols-[minmax(13rem,0.4fr)_minmax(0,1.6fr)] lg:gap-12 xl:grid-cols-[minmax(16rem,0.38fr)_minmax(0,1.62fr)]">
              <p className="pt-1 text-xs uppercase tracking-[0.18em] text-gray-400">
                {t("Caso de estudio")}
              </p>
              <h2
                id="project-process-title"
                className="max-w-5xl text-3xl font-normal leading-[1.08] tracking-[-0.025em] text-black sm:text-4xl lg:text-5xl"
              >
                {t(projectTitle)}
              </h2>
            </header>

            {caseMeta && (
              <div className="project-case-meta mb-12 grid gap-7 border-t border-black/10 px-6 py-7 text-center sm:grid-cols-3 sm:px-8 lg:mb-16 lg:px-10 lg:py-8">
                <div>
                  <p className="mb-2 text-base text-gray-500 sm:text-lg">
                    {t("Rol", "Role")}
                  </p>
                  <p className="text-base text-black sm:text-lg">
                    {t(caseMeta.role, caseMeta.roleEn)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-base text-gray-500 sm:text-lg">
                    {t("Tiempo de desarrollo", "Development time")}
                  </p>
                  <p className="text-base text-black sm:text-lg">
                    {t(caseMeta.developmentTime, caseMeta.developmentTimeEn)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-base text-gray-500 sm:text-lg">
                    {t("Herramientas", "Tools")}
                  </p>
                  <p className="text-base text-black sm:text-lg">
                    {caseMeta.tools}
                  </p>
                </div>
              </div>
            )}

            <div className="lg:grid lg:grid-cols-[minmax(13rem,0.4fr)_minmax(0,1.6fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(16rem,0.38fr)_minmax(0,1.62fr)]">
              <nav
                aria-label={t("Índice del caso de estudio", "Case study index")}
                className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:mb-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
              >
                {processSections.map((section, index) => {
                  const isActive = activeProcessSection === index;

                  return (
                    <button
                      key={section.title}
                      type="button"
                      aria-current={isActive ? "step" : undefined}
                      onClick={() => scrollToProcessSection(index)}
                      className={`curzr-hover shrink-0 px-5 py-2 text-left text-sm transition-colors duration-300 lg:w-full lg:px-6 lg:py-2 lg:text-base ${
                        isActive
                          ? "font-medium text-black"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {index + 1}. {t(section.title)}
                    </button>
                  );
                })}
              </nav>

              <div className="min-w-0">
                {processSections.map((section, index) => (
                  <article
                    id={`project-process-${index}`}
                    data-process-index={index}
                    key={section.title}
                    className={`scroll-mt-28 pb-20 sm:pb-24 lg:min-h-[70vh] lg:pb-32 ${
                      index > 0 ? "pt-4 lg:pt-8" : ""
                    }`}
                  >
                    <h3 className="mb-8 text-3xl font-normal leading-tight tracking-[-0.025em] text-black sm:text-4xl lg:mb-10 lg:text-[42px]">
                      {index + 1}. {t(section.title)}
                    </h3>

                    <div className="project-process-copy flex max-w-5xl flex-col gap-7">
                      <p className="project-section-lead rounded-[12px] px-5 py-4 text-[17px] font-normal leading-[1.75] text-gray-600 sm:px-6 sm:py-5 sm:text-lg lg:text-xl lg:leading-[1.75]">
                        {translateNode(section.lead)}
                      </p>

                      {section.body && (
                        <div className="max-w-4xl text-[16px] leading-[1.8] text-gray-500 sm:text-lg">
                          {translateNode(section.body)}
                        </div>
                      )}

                      {section.image && (
                        <div className="mt-4 w-full">
                          <div className="overflow-hidden rounded-[28px] bg-black/[0.025]">
                            <img
                              src={section.image.src}
                              alt={t(section.image.alt)}
                              className="block h-auto w-full"
                            />
                          </div>
                          {section.image.caption && (
                            <p className="mt-5 max-w-4xl text-[16px] leading-[1.8] text-gray-500 sm:text-lg">
                              {translateNode(section.image.caption)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer compactTopSpacing />
    </div>
  );
}
