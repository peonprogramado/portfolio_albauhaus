'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UseLoadingStateOptions {
    minLoadingTime?: number; // Tiempo mínimo de carga en ms
    checkAnimationsReady?: () => boolean; // Función para verificar si las animaciones están listas
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
    const { minLoadingTime = 2000, checkAnimationsReady } = options;
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const router = useRouter();

    // Verificar si es la primera carga
    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('hasInitiallyLoaded');
        if (hasLoaded) {
            setIsInitialLoad(false);
            setIsLoading(false);
        } else {
            setIsInitialLoad(true);
            setIsLoading(true);
        }
    }, []);

    // Manejar carga inicial
    useEffect(() => {
        if (!isInitialLoad) return;

        const startTime = Date.now();

        const checkReadiness = () => {
            const elapsedTime = Date.now() - startTime;
            const minTimeReached = elapsedTime >= minLoadingTime;
            const animationsReady = checkAnimationsReady ? checkAnimationsReady() : true;

            if (minTimeReached && animationsReady) {
                return true;
            }
            return false;
        };

        const interval = setInterval(() => {
            if (checkReadiness()) {
                clearInterval(interval);
                // Marcar como cargado en sessionStorage
                sessionStorage.setItem('hasInitiallyLoaded', 'true');
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isInitialLoad, minLoadingTime, checkAnimationsReady]);

    // Función para completar la carga
    const completeLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Función para mostrar loading en navegación
    const showLoadingForNavigation = useCallback((href: string) => {
        setIsLoading(true);

        // Simular tiempo de carga para navegación
        setTimeout(() => {
            router.push(href);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }, 800);
    }, [router]);

    // Resetear loading state cuando cambia la ruta
    useEffect(() => {
        const handleRouteChange = () => {
            if (!isInitialLoad) {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
            }
        };

        // Escuchar cambios de ruta (Next.js App Router)
        const originalPush = router.push;
        router.push = (...args) => {
            handleRouteChange();
            return originalPush.apply(router, args);
        };

        return () => {
            router.push = originalPush;
        };
    }, [router, isInitialLoad]);

    return {
        isLoading,
        isInitialLoad,
        completeLoading,
        showLoadingForNavigation
    };
}
