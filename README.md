# Innovasoft Test - Client Management System

Este proyecto es una aplicación de gestión de clientes desarrollada con **React**. A continuación, se detallan las decisiones técnicas clave tomadas durante el desarrollo.

## 🚀 Decisiones Técnicas

### 1. Vite vs Create React App (CRA)
Se ha seleccionado **Vite** como herramienta de construcción (build tool) en lugar de *Create React App* por las siguientes razones:
* **Velocidad de desarrollo:** Vite utiliza ESM nativo, lo que permite un inicio del servidor de desarrollo casi instantáneo y un HMR (Hot Module Replacement) mucho más rápido que Webpack.
* **Modernización:** CRA está oficialmente en desuso (deprecated) por la comunidad de React. Vite ofrece una configuración más limpia y un rendimiento superior tanto en desarrollo como en producción.

### 2. Uso de JavaScript (JSX) sobre TypeScript (TSX)
Aunque TypeScript es el estándar de la industria para proyectos a gran escala, para este desarrollo se optó por **JavaScript puro (.jsx)** con el fin de:
* **Simplicidad:** Mantener el código lo más ligero y directo posible.
* **Compatibilidad con React 17:** Dado que el requerimiento se basa en React 17, se priorizó evitar capas de abstracción complejas en el tipado que pudieran ralentizar la implementación inicial, enfocándose en la lógica de negocio y la arquitectura limpia.

### 3. Stack Tecnológico
* **React 17:** Biblioteca principal para la interfaz.
* **Material UI (MUI):** Para un diseño de componentes consistente y profesional.
* **Formik & Yup:** Manejo de formularios y validaciones de esquema.
* **React Router Dom:** Gestión de la navegación SPA.

## 🛠️ Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install