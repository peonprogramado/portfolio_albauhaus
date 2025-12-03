
"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        class RingDot {
            root: HTMLElement;
            cursor: HTMLDivElement;
            dot: HTMLDivElement;
            pointerX: number;
            pointerY: number;
            cursorSize: number;
            cursorStyle: Partial<CSSStyleDeclaration>;
            dotStyle: Partial<CSSStyleDeclaration>;

            constructor(cursor: HTMLDivElement, dot: HTMLDivElement) {
                this.root = document.body;
                this.cursor = cursor;
                this.dot = dot;

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
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.1s ease-out",
                    userSelect: "none",
                    pointerEvents: "none",
                };

                this.dotStyle = {
                    boxSizing: "border-box",
                    position: "fixed",
                    zIndex: "2147483647",
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#111920",
                    boxShadow: "0 0 0 1px #F2F5F8",
                    borderRadius: "50%",
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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
                
                // Detectar diferentes tipos de elementos interactivos
                if (this.isInteractiveElement(target)) {
                    const hoverSize = this.getHoverSize(target);
                    this.hover(hoverSize);
                } else {
                    this.hoverout();
                }

                this.pointerX = event.pageX + this.root.getBoundingClientRect().x;
                this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

                this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
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
                this.cursor.style.width = this.cursor.style.height = `${radius}px`;
                this.cursor.style.top = this.cursor.style.left = `${radius / -2}px`;
                
                // Efectos adicionales en hover
                this.cursor.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                this.cursor.style.boxShadow = "0 0 0 1.25px #111920, 0 0 0 2.25px #F2F5F8, 0 0 20px rgba(255, 255, 255, 0.2)";
                
                // Escalar el dot también
                this.dot.style.transform = "scale(1.5)";
                this.dot.style.backgroundColor = "#ffffff";
            }

            hoverout() {
                this.cursor.style.width = this.cursor.style.height = `${this.cursorSize}px`;
                this.cursor.style.top = this.cursor.style.left = `${this.cursorSize / -2}px`;
                
                // Restaurar efectos
                this.cursor.style.backgroundColor = "#fff0";
                this.cursor.style.boxShadow = "0 0 0 1.25px #111920, 0 0 0 2.25px #F2F5F8";
                
                // Restaurar el dot
                this.dot.style.transform = "scale(1)";
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

        if (!cursor || !dot) return;

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
        const ringDot = new RingDot(cursor, dot);

        if (!isMobile) {
            const handleMove = (event: MouseEvent) => ringDot.move(event);
            const handleClick = () => ringDot.click();

            document.addEventListener("mousemove", handleMove);
            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("mousemove", handleMove);
                document.removeEventListener("click", handleClick);
            };
        } else {
            ringDot.remove();
        }
    }, []);

    return (
        <div className="curzr" ref={cursorRef} hidden>
            <div className="curzr-dot" ref={dotRef}></div>
        </div>
    );
}
