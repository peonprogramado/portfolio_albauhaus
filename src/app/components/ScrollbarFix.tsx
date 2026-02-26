"use client";

import { useEffect } from "react";

export default function ScrollbarFix() {
  useEffect(() => {
    const originalSetProperty = document.body.style.setProperty.bind(document.body.style);
    const originalOverflowSetter = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, "overflow")?.set;
    const originalPaddingRightSetter = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, "paddingRight")?.set;

    // Intercept overflow changes on body
    const overflowDescriptor = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, "overflow");
    const paddingRightDescriptor = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, "paddingRight");

    Object.defineProperty(document.body.style, "overflow", {
      get() {
        return overflowDescriptor?.get?.call(this) ?? "";
      },
      set(value: string) {
        if (value === "hidden") return; // block HeroUI
        overflowDescriptor?.set?.call(this, value);
      },
      configurable: true,
    });

    Object.defineProperty(document.body.style, "paddingRight", {
      get() {
        return paddingRightDescriptor?.get?.call(this) ?? "";
      },
      set(_value: string) {
        // block HeroUI padding-right compensation
      },
      configurable: true,
    });

    return () => {
      // Restore originals on cleanup
      if (overflowDescriptor) Object.defineProperty(document.body.style, "overflow", overflowDescriptor);
      if (paddingRightDescriptor) Object.defineProperty(document.body.style, "paddingRight", paddingRightDescriptor);
    };
  }, []);

  return null;
}
