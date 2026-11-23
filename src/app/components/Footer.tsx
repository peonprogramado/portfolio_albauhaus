"use client";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowTopRight, mdiArrowUp } from "@mdi/js";
import VariableProximity from "../../components/VariableProximity";
import { useLanguage } from "../context/LanguageContext";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/albauhaus/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alba-antón-8b1a80351",
  },
  { label: "Behance", href: "https://www.behance.net/albaanton1/projects" },
  { label: "GitHub", href: "https://github.com/albauhaus" },
];

type FooterProps = {
  compactTopSpacing?: boolean;
};

const Footer: React.FC<FooterProps> = ({ compactTopSpacing = false }) => {
  const { t } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Europe/Madrid",
        }).format(new Date()),
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 30_000);

    return () => window.clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className={`w-full bg-white text-[#171717] ${
        compactTopSpacing ? "mt-16" : "mt-24 lg:mt-32"
      }`}
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="border-t border-black/15">
          <div className="grid gap-12 py-14 sm:py-20 lg:min-h-[18rem] lg:grid-cols-[minmax(0,1.5fr)_minmax(13rem,0.7fr)_minmax(10rem,0.35fr)] lg:items-center lg:gap-10 lg:py-10 xl:gap-16">
            <a
              href="mailto:albaantondesign@gmail.com?subject=Portfolio%20brief"
              className="curzr-hover group inline-flex w-fit items-center gap-3 sm:gap-4"
              aria-label={t("Contactar para trabajar juntos", "Get in touch to work together")}
            >
              <h2 className="max-w-3xl text-[clamp(2.5rem,4vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.04em]">
                <VariableProximity
                  label={t("Trabajemos juntos", "Let's work together")}
                  fromFontVariationSettings="'wght' 400, 'wdth' 100"
                  toFontVariationSettings="'wght' 900, 'wdth' 150"
                  containerRef={footerRef}
                  radius={120}
                  falloff="exponential"
                  style={{ fontFamily: "inherit" }}
                />
              </h2>
              <span
                aria-hidden="true"
                className="flex shrink-0 items-center justify-center bg-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                <Icon
                  path={mdiArrowTopRight}
                  className="contrast-invert-icon h-[clamp(2rem,3.1vw,3.5rem)] w-[clamp(2rem,3.1vw,3.5rem)] text-black"
                />
              </span>
            </a>

            <p className="max-w-[17rem] text-base leading-[1.65] text-black/45 sm:text-lg lg:justify-self-center lg:text-[17px]">
              {t(
                "Diseño gráfico en A Coruña · Web · UI/UX · Motion Graphics · 3D",
                "Graphic design in A Coruña · Web · UI/UX · Motion Graphics · 3D",
              )}
            </p>

            <div className="text-lg sm:text-xl lg:justify-self-end lg:text-right">
              <p className="mb-2 text-base text-black/45 sm:text-lg">
                {t("A Coruña, España", "A Coruña, Spain")}
              </p>
              <p className="tabular-nums" aria-label={t("Hora local", "Local time")}>
                {localTime || "--:--"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-7 pb-8 text-sm text-black/45 sm:pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-5 lg:text-base">
            <p>© {new Date().getFullYear()} Alba Antón</p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="curzr-hover transition-colors hover:text-black"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="curzr-hover inline-flex w-fit items-center gap-1 transition-colors hover:text-black"
            >
              {t("Volver arriba", "Back to top")}
              <Icon path={mdiArrowUp} size={0.72} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
