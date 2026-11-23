
"use client";

import { useEffect, useRef } from "react";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        class RingDot {
            root: HTMLElement;
            cursor: HTMLDivElement;
            dot: HTMLDivElement;
            label: HTMLSpanElement;
            arrow: HTMLSpanElement;
            pointerX: number;
            pointerY: number;
            cursorSize: number;
            cursorStyle: Partial<CSSStyleDeclaration>;
            dotStyle: Partial<CSSStyleDeclaration>;

            constructor(
                cursor: HTMLDivElement,
                dot: HTMLDivElement,
                label: HTMLSpanElement,
                arrow: HTMLSpanElement
            ) {
                this.root = document.body;
                this.cursor = cursor;
                this.dot = dot;
                this.label = label;
                this.arrow = arrow;

                this.pointerX = 0;
                this.pointerY = 0;
                this.cursorSize = 20;

                this.cursorStyle = {
                    boxSizing: "border-box",
                    position: "fixed",
                    display: "flex",
                    top: `${this.cursorSize / -2}px`,
                    left: `${this.cursorSize / -2}px`,
                    zIndex: "2147483647",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${this.cursorSize}px`,
                    height: `${this.cursorSize}px`,
                    backgroundColor: "#fff0",
                    boxShadow: "0 0 0 1.25px #111920, 0 0 0 2.25px #F2F5F8",
                    borderRadius: "50%",
                    transition: "width 0.35s cubic-bezier(0.22, 1, 0.36, 1), height 0.35s cubic-bezier(0.22, 1, 0.36, 1), top 0.35s cubic-bezier(0.22, 1, 0.36, 1), left 0.35s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, transform 0.08s ease-out",
                    userSelect: "none",
                    pointerEvents: "none",
                };

                this.dotStyle = {
                    boxSizing: "border-box",
                    position: "absolute",
                    zIndex: "2147483647",
                    top: "50%",
                    left: "50%",
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#111920",
                    boxShadow: "0 0 0 1px #F2F5F8",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                    transition: "opacity 0.2s ease, background-color 0.3s ease",
                    userSelect: "none",
                    pointerEvents: "none",
                };

                this.init(this.cursor, this.cursorStyle);
                this.init(this.dot, this.dotStyle);
            }

            init(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
                Object.assign(el.style, style);
                this.cursor.removeAttribute("hidden");
            }

            move(event: MouseEvent) {
                const target = event.target as HTMLElement;

                const carouselTarget = target.closest<HTMLElement>("[data-cursor-carousel]");
                const carouselDirection = carouselTarget
                    ? this.getCarouselDirection(carouselTarget, event.clientX)
                    : null;
                const tooltipTarget = target.closest<HTMLElement>("[data-cursor-label]");
                const tooltipLabel = tooltipTarget?.dataset.cursorLabel;

                if (carouselDirection) {
                    this.showCarouselArrow(carouselDirection);
                } else if (tooltipLabel) {
                    this.showTooltip(tooltipLabel);
                } else if (this.isInteractiveElement(target)) {
                    const hoverSize = this.getHoverSize(target);
                    this.hover(hoverSize);
                } else {
                    this.hoverout();
                }

                const currentSize = Number.parseFloat(this.cursor.style.width) || this.cursorSize;
                const cursorRadius = currentSize / 2;
                const viewportInset = 12;

                if (currentSize > this.cursorSize) {
                    this.pointerX = Math.min(
                        Math.max(event.clientX, cursorRadius + viewportInset),
                        window.innerWidth - cursorRadius - viewportInset
                    );
                    this.pointerY = Math.min(
                        Math.max(event.clientY, cursorRadius + viewportInset),
                        window.innerHeight - cursorRadius - viewportInset
                    );
                } else {
                    this.pointerX = event.clientX;
                    this.pointerY = event.clientY;
                }

                this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
            }

            getCarouselDirection(
                carousel: HTMLElement,
                pointerX: number
            ): "left" | "right" | null {
                const rect = carousel.getBoundingClientRect();
                const edgeZone = Math.min(180, rect.width * 0.18);
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                const firstCard = carousel.querySelector<HTMLElement>("[data-featured-card]");
                const firstSnapPosition = firstCard?.offsetLeft ?? 0;
                const canMoveLeft = carousel.scrollLeft > firstSnapPosition + 2;
                const canMoveRight = carousel.scrollLeft < maxScroll - 2;

                if (pointerX <= rect.left + edgeZone && canMoveLeft) return "left";
                if (pointerX >= rect.right - edgeZone && canMoveRight) return "right";

                return null;
            }

            isInteractiveElement(target: HTMLElement): boolean {
                // Elementos HTML interactivos
                if (target.localName === "button" || 
                    target.localName === "a" || 
                    target.localName === "input" ||
                    target.localName === "textarea" ||
                    target.localName === "select") {
                    return true;
                }

                // Elementos con eventos de click
                if (target.onclick !== null) {
                    return true;
                }

                // Elementos con clases específicas
                if (typeof target.className === "string") {
                    const interactiveClasses = [
                        "curzr-hover", "cursor-pointer", "hover:", 
                        "clickable", "interactive", "nav-link"
                    ];
                    return interactiveClasses.some(cls => target.className.includes(cls));
                }

                // Elementos con cursor pointer en CSS
                const computedStyle = window.getComputedStyle(target);
                if (computedStyle.cursor === "pointer") {
                    return true;
                }

                // Verificar elementos padre (hasta 3 niveles)
                let parent = target.parentElement;
                let level = 0;
                while (parent && level < 3) {
                    if (this.isDirectlyInteractive(parent)) {
                        return true;
                    }
                    parent = parent.parentElement;
                    level++;
                }

                return false;
            }

            isDirectlyInteractive(element: HTMLElement): boolean {
                return element.localName === "button" || 
                       element.localName === "a" || 
                       element.onclick !== null ||
                       (typeof element.className === "string" && element.className.includes("curzr-hover"));
            }

            getHoverSize(target: HTMLElement): number {
                // Diferentes tamaños según el tipo de elemento
                if (target.localName === "button") return 50;
                if (target.localName === "a") return 45;
                if (target.localName === "input" || target.localName === "textarea") return 35;
                if (typeof target.className === "string" && target.className.includes("nav")) return 55;
                
                // Tamaño por defecto
                return 40;
            }

            hover(radius: number) {
                this.label.textContent = "";
                this.label.style.opacity = "0";
                this.arrow.style.opacity = "0";
                this.cursor.style.width = this.cursor.style.height = `${radius}px`;
                this.cursor.style.top = this.cursor.style.left = `${radius / -2}px`;
                
                // Efectos adicionales en hover
                this.cursor.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                this.cursor.style.boxShadow = "0 0 0 1.25px #111920, 0 0 0 2.25px #F2F5F8, 0 0 20px rgba(255, 255, 255, 0.2)";
                
                // Escalar el dot también
                this.cursor.style.backdropFilter = "none";
                this.cursor.style.setProperty("-webkit-backdrop-filter", "none");
                this.dot.style.opacity = "1";
                this.dot.style.backgroundColor = "#fdfdfd";
            }

            showTooltip(text: string) {
                const tooltipSize = 112;

                this.label.textContent = text;
                this.label.style.opacity = "1";
                this.arrow.style.opacity = "0";
                this.label.style.fontSize = "14px";
                this.label.style.fontWeight = "500";
                this.cursor.style.width = this.cursor.style.height = `${tooltipSize}px`;
                this.cursor.style.top = this.cursor.style.left = `${tooltipSize / -2}px`;
                this.cursor.style.backgroundColor = "rgba(24, 24, 27, 0.66)";
                this.cursor.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 30px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.16)";
                this.cursor.style.backdropFilter = "blur(12px) saturate(150%)";
                this.cursor.style.setProperty("-webkit-backdrop-filter", "blur(12px) saturate(150%)");
                this.dot.style.opacity = "0";
            }

            showCarouselArrow(direction: "left" | "right") {
                const navigationSize = 76;

                this.label.textContent = "";
                this.label.style.opacity = "0";
                this.arrow.style.opacity = "1";
                this.arrow.style.transform = direction === "left" ? "rotate(180deg)" : "rotate(0deg)";
                this.cursor.style.width = this.cursor.style.height = `${navigationSize}px`;
                this.cursor.style.top = this.cursor.style.left = `${navigationSize / -2}px`;
                this.cursor.style.backgroundColor = "rgba(24, 24, 27, 0.66)";
                this.cursor.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 30px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.16)";
                this.cursor.style.backdropFilter = "blur(12px) saturate(150%)";
                this.cursor.style.setProperty("-webkit-backdrop-filter", "blur(12px) saturate(150%)");
                this.dot.style.opacity = "0";
            }

            hoverout() {
                this.label.textContent = "";
                this.label.style.opacity = "0";
                this.arrow.style.opacity = "0";
                this.label.style.fontSize = "14px";
                this.label.style.fontWeight = "500";
                this.cursor.style.width = this.cursor.style.height = `${this.cursorSize}px`;
                this.cursor.style.top = this.cursor.style.left = `${this.cursorSize / -2}px`;
                
                // Restaurar efectos
                this.cursor.style.backgroundColor = "#fff0";
                this.cursor.style.boxShadow = "0 0 0 1.25px #111920, 0 0 0 2.25px #F2F5F8";
                this.cursor.style.backdropFilter = "none";
                this.cursor.style.setProperty("-webkit-backdrop-filter", "none");
                
                // Restaurar el dot
                this.dot.style.opacity = "1";
                this.dot.style.backgroundColor = "#111920";
            }

            click() {
                this.cursor.style.transform += ` scale(0.75)`;
                setTimeout(() => {
                    this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, "");
                }, 35);
            }

            remove() {
                this.cursor.remove();
                this.dot.remove();
            }
        }

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const label = labelRef.current;
        const arrow = arrowRef.current;

        if (!cursor || !dot || !label || !arrow) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
        const ringDot = new RingDot(cursor, dot, label, arrow);

        if (!isMobile) {
            const nativeCursorStyle = document.createElement("style");
            nativeCursorStyle.dataset.customCursor = "true";
            nativeCursorStyle.textContent = `
                html,
                body,
                body * {
                    cursor: none !important;
                }
            `;
            document.head.appendChild(nativeCursorStyle);

            const handleMove = (event: MouseEvent) => ringDot.move(event);
            const handleClick = () => ringDot.click();

            document.addEventListener("mousemove", handleMove);
            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("mousemove", handleMove);
                document.removeEventListener("click", handleClick);
                nativeCursorStyle.remove();
            };
        } else {
            ringDot.remove();
        }
    }, []);

    return (
        <div className="curzr" ref={cursorRef} hidden>
            <div className="curzr-dot" ref={dotRef}></div>
            <span
                ref={labelRef}
                className="pointer-events-none relative z-10 px-[18px] text-center text-[14px] font-medium leading-tight text-white opacity-0 transition-opacity duration-200"
            />
            <span
                ref={arrowRef}
                aria-hidden="true"
                className="pointer-events-none absolute z-10 flex h-8 w-8 items-center justify-center text-white opacity-0 transition-[opacity,transform] duration-200"
            >
                <Icon path={mdiArrowRight} size={1.35} />
            </span>
        </div>
    );
}
