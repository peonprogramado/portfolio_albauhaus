'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
    isVisible: boolean;
}

export default function LoadingScreen({ onComplete, isVisible }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!isVisible) return;

        console.log('LoadingScreen started');
        setProgress(0);
        setIsExiting(false);

        // Simular progreso de carga
        const duration = 2500; // 2.5 segundos total
        const interval = 16; // ~60fps
        const increment = 100 / (duration / interval);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + increment;

                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    console.log('LoadingScreen reached 100%');
                    // Pequeña pausa en 100% antes de salir
                    setTimeout(() => {
                        console.log('LoadingScreen starting exit animation');
                        setIsExiting(true);
                        setTimeout(() => {
                            console.log('LoadingScreen calling onComplete');
                            onComplete();
                        }, 800); // Tiempo para animación de salida
                    }, 300);
                    return 100;
                }

                return newProgress;
            });
        }, interval);

        return () => {
            console.log('LoadingScreen cleanup');
            clearInterval(progressInterval);
        };
    }, [isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                    }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                >
                    {/* Contenedor principal */}
                    <div className="flex flex-col items-center justify-center">

                        {/* Contador principal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: 0.2, duration: 0.6, ease: "easeOut" }
                            }}
                            className="relative mb-8"
                        >
                            <span
                                className="text-[120px] md:text-[160px] lg:text-[200px] font-black text-black leading-none tracking-tighter"
                                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                            >
                                {Math.floor(progress)}%
                            </span>
                        </motion.div>

                        {/* Barra de progreso */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{
                                opacity: 1,
                                scaleX: 1,
                                transition: { delay: 0.4, duration: 0.8, ease: "easeOut" }
                            }}
                            className="relative w-[300px] md:w-[400px] h-[2px] bg-gray-200 overflow-hidden"
                        >
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-black origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: progress / 100,
                                    transition: { duration: 0.1, ease: "linear" }
                                }}
                            />
                        </motion.div>

                        {/* Texto de carga */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { delay: 0.6, duration: 0.6 }
                            }}
                            className="mt-8 text-center"
                        >
                            <p className="text-[14px] md:text-[16px] text-black/60 font-medium tracking-wider uppercase">
                                {progress < 30 && "Inicializando..."}
                                {progress >= 30 && progress < 60 && "Cargando recursos..."}
                                {progress >= 60 && progress < 90 && "Preparando animaciones..."}
                                {progress >= 90 && progress < 100 && "Casi listo..."}
                                {progress >= 100 && "Completado"}
                            </p>
                        </motion.div>

                        {/* Elementos decorativos minimalistas */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 0.1,
                                scale: 1,
                                transition: { delay: 0.8, duration: 1 }
                            }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-black rounded-full" />
                            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-black rounded-full" />
                            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-black rounded-full" />
                        </motion.div>

                    </div>

                    {/* Overlay de salida */}
                    <AnimatePresence>
                        {isExiting && (
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{
                                    scaleY: 1,
                                    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                                }}
                                className="absolute inset-0 bg-black origin-bottom"
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
