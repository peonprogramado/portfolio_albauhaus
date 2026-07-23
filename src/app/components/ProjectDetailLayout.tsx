"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import MaskedHeading from "./MaskedHeading";

type ProjectDetailLayoutProps = {
  title: string;
  client: string;
  clientLabel?: string;
  tags: string[];
  projectTitle: string;
  description: ReactNode;
  processSections?: {
    title: string;
    lead: ReactNode;
    body: ReactNode;
    compact?: boolean;
    image?: {
      src: string;
      alt: string;
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
  processSections = [],
  children,
}: ProjectDetailLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <NavBar />

      <main
        ref={contentRef}
        className="mx-auto max-w-[1600px] px-5 pb-20 pt-28 sm:px-8 lg:pt-32"
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-info-scroll lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pb-6 lg:pr-4">
              <section className="max-w-xl">
                <div className="text-[15px] leading-relaxed text-gray-600">
                  {description}
                </div>
              </section>
            </div>

            <div className="mt-8 border-t border-black/15 bg-white pt-5 lg:mt-0 lg:shrink-0 lg:pr-4">
              <p className="mb-1 text-xs uppercase tracking-[0.18em] text-gray-400">
                {clientLabel}
              </p>
              <p className="text-sm text-black">{client}</p>
            </div>
          </aside>

          <div className="min-w-0 space-y-8">{children}</div>
        </div>

        {processSections.length > 0 && (
          <section
            className="mt-12 border-t border-black sm:mt-16 lg:mt-20"
            aria-labelledby="project-process-title"
          >
          <header className="grid gap-4 border-b border-black/15 py-8 sm:py-10 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:gap-8 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)] xl:gap-12">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              Caso de estudio
            </p>
            <h2
              id="project-process-title"
              className="max-w-3xl text-2xl font-normal leading-tight text-black lg:text-3xl xl:text-4xl"
            >
              {projectTitle}
            </h2>
          </header>

          <div>
            {processSections.map((section) => (
              <article
                key={section.title}
                className={`grid gap-8 border-b border-black/15 py-14 sm:py-16 lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:gap-8 xl:grid-cols-[minmax(22rem,0.72fr)_minmax(0,1.28fr)] xl:gap-12 ${
                  section.compact
                    ? "lg:min-h-[18rem] lg:py-16"
                    : "lg:min-h-[22rem] lg:py-20"
                }`}
              >
                <div className="lg:pr-4">
                  <h3 className="text-2xl font-bold leading-tight text-black lg:text-3xl xl:text-4xl">
                    {section.title}
                  </h3>
                </div>

                <div className="flex max-w-4xl flex-col gap-8">
                  <p className="text-[15px] font-medium leading-relaxed text-black">
                    {section.lead}
                  </p>

                  {section.body && (
                    <div className="max-w-3xl text-[15px] leading-relaxed text-gray-600">
                      {section.body}
                    </div>
                  )}
                </div>

                {section.image && (
                  <div className="max-w-3xl overflow-hidden rounded-2xl lg:col-start-2">
                    <img
                      src={section.image.src}
                      alt={section.image.alt}
                      className="block h-auto w-full"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
