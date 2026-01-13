'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from './LoadingScreen';
import PageTransition from './PageTransition';

interface LoadingContextType {
    isLoading: boolean;
    isInitialLoad: boolean;
    showLoadingForNavigation: (href: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}

interface LoadingProviderProps {
    children: ReactNode;
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isPageTransition, setIsPageTransition] = useState(false);
    const [transitionProgress, setTransitionProgress] = useState(0);
    const router = useRouter();

    // Función para completar la carga inicial
    const completeInitialLoading = () => {
        console.log('Completing initial loading...');
        setIsInitialLoading(false);
        // Marcar como cargado en sessionStorage
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasInitiallyLoaded', 'true');
        }
    };

    // Función para navegación con loading
    const showLoadingForNavigation = (href: string) => {
        setIsPageTransition(true);
        setTransitionProgress(0);

        // Simular progreso de transición
        const duration = 1000;
        const interval = 16;
        const increment = 100 / (duration / interval);

        const progressInterval = setInterval(() => {
            setTransitionProgress(prev => {
                const newProgress = prev + increment;

                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    // Navegar cuando llegue a 100%
                    router.push(href);
                    setTimeout(() => {
                        setIsPageTransition(false);
                        setTransitionProgress(0);
                    }, 300);
                    return 100;
                }

                return newProgress;
            });
        }, interval);
    };

    // Verificar si es la primera carga y configurar timeout de seguridad
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasLoaded = sessionStorage.getItem('hasInitiallyLoaded');
            if (hasLoaded) {
                setIsInitialLoading(false);
            } else {
                // Timeout de seguridad: forzar finalización después de 4 segundos máximo
                const safetyTimeout = setTimeout(() => {
                    console.log('Safety timeout triggered - completing loading');
                    completeInitialLoading();
                }, 4000);

                return () => clearTimeout(safetyTimeout);
            }
        }
    }, []);

    const contextValue: LoadingContextType = {
        isLoading: isInitialLoading || isPageTransition,
        isInitialLoad: isInitialLoading,
        showLoadingForNavigation
    };

    return (
        <LoadingContext.Provider value={contextValue}>
            <LoadingScreen
                isVisible={isInitialLoading}
                onComplete={completeInitialLoading}
            />
            <PageTransition
                isVisible={isPageTransition}
                progress={transitionProgress}
            />
            <div style={{
                opacity: isInitialLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out',
                pointerEvents: isInitialLoading ? 'none' : 'auto'
            }}>
                {children}
            </div>
        </LoadingContext.Provider>
    );
}
