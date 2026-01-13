'use client';

import { useEffect, useState } from 'react';

interface AnimationReadyDetectorProps {
    onReady: () => void;
    minWaitTime?: number;
}

export default function AnimationReadyDetector({
    onReady,
    minWaitTime = 2500
}: AnimationReadyDetectorProps) {
    const [startTime] = useState(() => Date.now());

    useEffect(() => {
        const checkReady = () => {
            const elapsedTime = Date.now() - startTime;

            // Verificar tiempo mínimo
            if (elapsedTime < minWaitTime) {
                return false;
            }

            // Verificar si GSAP está disponible
            if (typeof window !== 'undefined') {
                const gsapReady = window.gsap !== undefined;

                // Verificar si las fuentes están cargadas
                const fontsReady = document.readyState === 'complete';

                return gsapReady && fontsReady;
            }

            return false;
        };

        const interval = setInterval(() => {
            if (checkReady()) {
                clearInterval(interval);
                onReady();
            }
        }, 100);

        // Cleanup
        return () => clearInterval(interval);
    }, [onReady, startTime, minWaitTime]);

    return null; // Este componente no renderiza nada
}
