"use client";

import { HeroUIProvider } from "@heroui/react";
import { LanguageProvider } from "./context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <LanguageProvider>{children}</LanguageProvider>
        </HeroUIProvider>
    );
}
