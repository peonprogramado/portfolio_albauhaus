'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface BasicLoadingProps {
    children: React.ReactNode;
}

export default function BasicLoading({ children }: BasicLoadingProps) {
    const { t } = useLanguage();
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
                        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
                    >
                        <div className="w-full px-6 text-center sm:w-auto sm:px-0">
                            <h1
                                className="mb-8 text-[clamp(96px,38vw,200px)] font-black leading-none text-black"
                                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                            >
                                {progress}%
                            </h1>

                            <div className="mx-auto h-[2px] w-full max-w-[400px] overflow-hidden bg-gray-200">
                                <div
                                    className="h-full bg-black transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <p className="mt-6 text-black/60 uppercase tracking-wide">
                                {t('Cargando...', 'Loading...')}
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
