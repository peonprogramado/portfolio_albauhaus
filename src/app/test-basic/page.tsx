'use client';

import { useState } from 'react';

export default function TestBasic() {
    const [sessionCleared, setSessionCleared] = useState(false);

    const clearSession = () => {
        sessionStorage.removeItem('hasInitiallyLoaded');
        setSessionCleared(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold mb-8 text-black">Test Basic Loading</h1>

                <div className="space-y-4">
                    <p className="text-lg text-gray-600">
                        Si ves esta página, el loading funcionó correctamente.
                    </p>

                    <button
                        onClick={clearSession}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        disabled={sessionCleared}
                    >
                        {sessionCleared ? 'Recargando...' : 'Limpiar Sesión y Ver Loading Otra Vez'}
                    </button>

                    <div className="mt-8 text-sm text-gray-500">
                        <p>• Primera carga: Debería mostrar loading de 0% a 100%</p>
                        <p>• Recarga después de limpiar: Debería mostrar loading otra vez</p>
                        <p>• Navegación normal: No debería mostrar loading</p>
                    </div>

                    <div className="mt-8">
                        <a
                            href="/"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                            Volver al Inicio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
