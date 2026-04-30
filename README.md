# Javeriana Lead & Events Manager 🎓

Esta es una aplicación web moderna desarrollada como prueba técnica para la Pontificia Universidad Javeriana. La plataforma permite gestionar leads (interesados) y visualizar la oferta académica de la institución de manera eficiente.

## 🚀 Tecnologías Utilizadas

- **React 18**: Framework principal para la construcción de la SPA.
- **TypeScript**: Para un desarrollo robusto con tipado estricto de interfaces y modelos.
- **Tailwind CSS**: Para un diseño responsivo, moderno y premium.
- **Context API**: Gestión de estado global para la persistencia de leads.
- **Vite**: Herramienta de construcción ultra rápida.
- **Docker**: Entorno de desarrollo contenedorizado para asegurar la consistencia.

## ✨ Funcionalidades

1.  **Visualización de Eventos**: Consumo de API REST (JSONPlaceholder) con mapeo dinámico de datos.
2.  **Filtrado Avanzado**: Buscador en tiempo real por nombre y filtrado por categorías (Pregrado, Posgrado, Educación Continua).
3.  **Gestión de Leads**:
    - Formulario con validaciones estrictas de email y dominio `@javeriana.edu.co`.
    - Normalización automática de datos (capitalización y limpieza de espacios).
    - Mensajes de éxito dinámicos.
4.  **Persistencia**: Almacenamiento local mediante `localStorage`.
5.  **Modo Oscuro**: Soporte nativo para modo oscuro con persistencia de preferencia del usuario.
6.  **Diseño Responsivo**: Adaptabilidad total a dispositivos móviles y escritorio.

## 🛠️ Instrucciones de Ejecución

### Requisitos Previos

- Docker y Docker Compose (Recomendado)
- Node.js 20+ (Si se ejecuta localmente sin Docker)

### Ejecución con Docker (Recomendado)

1.  Clona el repositorio.
2.  Desde la raíz del proyecto, ejecuta:
    ```bash
    docker-compose up --build
    ```
3.  La aplicación estará disponible en `http://localhost:5173`.

### Ejecución Local

1.  Navega a la carpeta `app`:
    ```bash
    cd app
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## 🧠 Decisiones Técnicas

- **TypeScript**: Se eligió para mejorar la mantenibilidad y evitar errores comunes mediante interfaces claras para `Event` y `Lead`.
- **Context API**: Dado que la aplicación es una SPA de tamaño medio, Context API es ideal por su ligereza frente a Redux, cumpliendo con los requisitos de gestión de estado de forma eficiente.
- **Mapeo de Datos**: Como JSONPlaceholder provee datos genéricos, se implementó una capa de transformación en `eventsApi.ts` para asignar categorías y fotos aleatorias coherentes con el contexto académico.
- **Arquitectura de Componentes**: Se separaron las responsabilidades en componentes atómicos (`EventCard`, `LeadForm`, `FilterBar`) para facilitar la escalabilidad.

## 🌐 Despliegue Conjunto

Este proyecto está configurado para ser desplegado automáticamente en dos plataformas:

### 1. GitHub Pages (vía GitHub Actions)
- La configuración se encuentra en `.github/workflows/deploy.yml`.
- Se activa automáticamente al hacer `push` a la rama `main`.
- **Importante**: Asegúrate de ir a `Settings > Pages` en tu repositorio de GitHub y seleccionar `GitHub Actions` como la fuente del despliegue.

### 2. Vercel
- El archivo `vercel.json` en la raíz configura automáticamente el proyecto.
- **Pasos para desplegar**:
  1. Ve a [vercel.com](https://vercel.com) e importa tu repositorio.
  2. Vercel detectará el archivo `vercel.json` y configurará el "Root Directory" como `app`.
  3. El despliegue será automático en cada `push`.

---
Desarrollado por [HE_Calderon](https://www.linkedin.com/in/developerhcode/) para la **Pontificia Universidad Javeriana**.

