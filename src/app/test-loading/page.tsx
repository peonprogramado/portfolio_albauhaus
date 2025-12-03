'use client';

import { useState } from 'react';
import { useLoading } from '../components/SimpleLoadingProvider';

export default function TestLoading() {
    const { isLoading, showLoadingForNavigation } = useLoading();
    const [sessionCleared, setSessionCleared] = useState(false);

    const clearSession = () => {
        sessionStorage.removeItem('hasInitiallyLoaded');
        setSessionCleared(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const testNavigation = () => {
        showLoadingForNavigation('/');
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold mb-8 text-black">Test Loading System</h1>

                <div className="space-y-4">
                    <p className="text-lg text-gray-600">
                        Estado actual: {isLoading ? 'Cargando...' : 'Listo'}
                    </p>

                    <div className="space-x-4">
                        <button
                            onClick={clearSession}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={sessionCleared}
                        >
                            {sessionCleared ? 'Recargando...' : 'Limpiar Sesión y Recargar'}
                        </button>

                        <button
                            onClick={testNavigation}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Probar Navegación
                        </button>
                    </div>

                    <div className="mt-8 text-sm text-gray-500">
                        <p>• Primera carga: Debería mostrar loading completo</p>
                        <p>• Navegación: Debería mostrar transición rápida</p>
                        <p>• Recarga después de limpiar: Debería mostrar loading otra vez</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
