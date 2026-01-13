'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BasicLoadingProps {
    children: React.ReactNode;
}

export default function BasicLoading({ children }: BasicLoadingProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Verificar si ya se cargó en esta sesión
        const hasLoaded = sessionStorage.getItem('hasInitiallyLoaded');

        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        // Simular progreso
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsLoading(false);
                        sessionStorage.setItem('hasInitiallyLoaded', 'true');
                    }, 500);
                    return 100;
                }
                return prev + 2; // Incremento de 2% cada 50ms = 2.5 segundos total
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            filter: "blur(10px)",
                            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
                        }}
                        className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
                    >
                        <div className="text-center">
                            <h1
                                className="text-[200px] font-black text-black mb-8"
                                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                            >
                                {progress}%
                            </h1>

                            <div className="w-[400px] h-[2px] bg-gray-200 mx-auto">
                                <div
                                    className="h-full bg-black transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p className="mt-6 text-black/60 uppercase tracking-wide">
                                Cargando...
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}>
                {children}
            </div>
        </>
    );
}
