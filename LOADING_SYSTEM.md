# Sistema de Loading Page

## Descripción
Sistema completo de loading page con contador de 0% a 100% que aparece al entrar en la web y al cambiar entre páginas. Se oculta automáticamente cuando las animaciones están listas.

## Componentes Creados

### 1. LoadingScreen.tsx
- **Función**: Pantalla de carga inicial con contador animado
- **Características**:
  - Contador de 0% a 100% con tipografía Bebas Neue
  - Barra de progreso animada
  - Texto de estado dinámico
  - Animación de salida suave
  - Elementos decorativos minimalistas

### 2. PageTransition.tsx
- **Función**: Transición entre páginas con loading
- **Características**:
  - Fondo negro con contador blanco
  - Progreso más rápido (1 segundo)
  - Diseño minimalista

### 3. LoadingProvider.tsx
- **Función**: Contexto global para manejar estados de loading
- **Características**:
  - Detección de primera carga vs navegación
  - SessionStorage para evitar loading repetido
  - Hook `useLoading()` para componentes

### 4. AnimationReadyDetector.tsx
- **Función**: Detecta cuando las animaciones están listas
- **Características**:
  - Verifica disponibilidad de GSAP
  - Comprueba estado de carga del documento
  - Tiempo mínimo configurable (2.5s por defecto)

## Integración

### Layout Principal (layout.tsx)
```tsx
import LoadingProvider from "./components/LoadingProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          <CustomCursor />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
```

### Navegación (AnimatedNavLink.tsx)
```tsx
import { useLoading } from "../components/LoadingProvider";

const { showLoadingForNavigation } = useLoading();

const handleClick = () => {
  if (text === "Proyectos") {
    showLoadingForNavigation("/proyectos");
  }
};
```

## Configuración

### Tiempos de Loading
- **Carga inicial**: 2.5 segundos mínimo
- **Transición entre páginas**: 1 segundo
- **Animación de salida**: 0.8 segundos

### Estados de Carga
1. **Inicializando...** (0-30%)
2. **Cargando recursos...** (30-60%)
3. **Preparando animaciones...** (60-90%)
4. **Casi listo...** (90-99%)
5. **Completado** (100%)

## Estilos

### CSS Personalizado (loading.css)
- Estilos responsivos
- Animaciones suaves
- Tipografía Bebas Neue
- Colores: blanco/negro según contexto

### Clases Principales
- `.loading-screen`: Pantalla principal
- `.loading-counter`: Contador grande
- `.loading-progress`: Barra de progreso
- `.page-transition`: Transición entre páginas

## Funcionalidades

### Detección Inteligente
- ✅ Primera visita: Loading completo
- ✅ Navegación posterior: Solo transición
- ✅ Recarga de página: Loading completo
- ✅ Detección de GSAP y fuentes

### Prevención de Repetición
- Usa `sessionStorage` para recordar carga inicial
- Solo muestra loading completo una vez por sesión
- Transiciones rápidas en navegación posterior

### Responsive Design
- Tamaños de fuente adaptativos
- Barras de progreso responsivas
- Optimizado para móvil y desktop

## Uso

### Hook useLoading()
```tsx
const { 
  isLoading,           // Estado general de loading
  isInitialLoad,       // Es la primera carga
  showLoadingForNavigation // Función para navegación
} = useLoading();
```

### Navegación con Loading
```tsx
// En lugar de router.push("/ruta")
showLoadingForNavigation("/ruta");
```

## Personalización

### Cambiar Tiempos
```tsx
// En LoadingProvider.tsx
<AnimationReadyDetector 
  minWaitTime={3000} // 3 segundos
  onReady={completeInitialLoading}
/>
```

### Modificar Textos
```tsx
// En LoadingScreen.tsx
{progress < 30 && "Tu texto personalizado..."}
```

### Ajustar Colores
```css
/* En loading.css */
.loading-screen {
  background: tu-color; /* Cambiar fondo */
}
```

## Notas Técnicas

- Compatible con Next.js App Router
- Usa Framer Motion para animaciones
- Optimizado para rendimiento
- No interfiere con otras animaciones
- Limpieza automática de intervalos
