'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingContextType {
    isLoading: boolean;
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

export default function SimpleLoadingProvider({ children }: LoadingProviderProps) {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isPageTransition, setIsPageTransition] = useState(false);
    const [progress, setProgress] = useState(0);
    const [transitionProgress, setTransitionProgress] = useState(0);
    const router = useRouter();

    // Verificar si es la primera carga
    useEffect(() => {
        console.log('SimpleLoadingProvider mounted');

        // Verificar sessionStorage
        const hasLoaded = typeof window !== 'undefined'
            ? sessionStorage.getItem('hasInitiallyLoaded')
            : null;

        console.log('hasLoaded from sessionStorage:', hasLoaded);

        if (hasLoaded) {
            console.log('Skipping loading - already loaded this session');
            setIsInitialLoading(false);
            return;
        }

        console.log('Starting initial loading...');

        // Simular progreso de carga inicial
        const duration = 2500;
        const interval = 16;
        const increment = 100 / (duration / interval);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + increment;

                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    console.log('Loading completed, finalizing...');
                    // Finalizar loading
                    setTimeout(() => {
                        console.log('Setting isInitialLoading to false');
                        setIsInitialLoading(false);
                        if (typeof window !== 'undefined') {
                            sessionStorage.setItem('hasInitiallyLoaded', 'true');
                            console.log('Saved to sessionStorage');
                        }
                    }, 500);
                    return 100;
                }

                return newProgress;
            });
        }, interval);

        return () => {
            console.log('Cleaning up loading interval');
            clearInterval(progressInterval);
        };
    }, []);

    // Función para navegación con loading
    const showLoadingForNavigation = (href: string) => {
        setIsPageTransition(true);
        setTransitionProgress(0);

        const duration = 1000;
        const interval = 16;
        const increment = 100 / (duration / interval);

        const progressInterval = setInterval(() => {
            setTransitionProgress(prev => {
                const newProgress = prev + increment;

                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    router.push(href);
                    setTimeout(() => {
                        setIsPageTransition(false);
                        setTransitionProgress(0);
                    }, 200);
                    return 100;
                }

                return newProgress;
            });
        }, interval);
    };

    const contextValue: LoadingContextType = {
        isLoading: isInitialLoading || isPageTransition,
        showLoadingForNavigation
    };

    return (
        <LoadingContext.Provider value={contextValue}>
            {/* Loading Screen Inicial */}
            <AnimatePresence>
                {isInitialLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.6, ease: "easeInOut" }
                        }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    >
                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.2, duration: 0.6 }
                                }}
                                className="mb-8"
                            >
                                <span
                                    className="text-[160px] md:text-[200px] font-black text-black leading-none tracking-tighter"
                                    style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                                >
                                    {Math.floor(progress)}%
                                </span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{
                                    opacity: 1,
                                    scaleX: 1,
                                    transition: { delay: 0.4, duration: 0.8 }
                                }}
                                className="w-[400px] h-[2px] bg-gray-200 overflow-hidden mx-auto"
                            >
                                <div
                                    className="h-full bg-black origin-left transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { delay: 0.6, duration: 0.6 }
                                }}
                                className="mt-8 text-[16px] text-black/60 font-medium tracking-wider uppercase"
                            >
                                {progress < 30 && "Inicializando..."}
                                {progress >= 30 && progress < 60 && "Cargando recursos..."}
                                {progress >= 60 && progress < 90 && "Preparando animaciones..."}
                                {progress >= 90 && progress < 100 && "Casi listo..."}
                                {progress >= 100 && "Completado"}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Transition */}
            <AnimatePresence>
                {isPageTransition && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9998] flex items-center justify-center bg-black"
                    >
                        <div className="text-center">
                            <span
                                className="text-[100px] font-black text-white leading-none tracking-tighter"
                                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                            >
                                {Math.floor(transitionProgress)}%
                            </span>

                            <div className="w-[200px] h-[2px] bg-white/20 overflow-hidden mx-auto mt-6">
                                <div
                                    className="h-full bg-white origin-left transition-all duration-100 ease-linear"
                                    style={{ width: `${transitionProgress}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contenido Principal */}
            <div
                style={{
                    opacity: isInitialLoading ? 0 : 1,
                    transition: 'opacity 0.6s ease-in-out',
                    pointerEvents: isInitialLoading ? 'none' : 'auto'
                }}
            >
                {children}
            </div>
        </LoadingContext.Provider>
    );
}
