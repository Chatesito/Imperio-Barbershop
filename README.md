# ✂️ Imperio Barbershop

> Aplicación Full-Stack (MERN) para la gestión integral de citas y usuarios de una barbería moderna.

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)

## 🌐 Live Demo & Deploy

El proyecto se encuentra desplegado y funcional en el siguientes enlaces:
- **Frontend (Vercel):** [🔗 Imperio Barbeshop](https://imperiobarbershop.vercel.app)
- **Backend API (Render):** [🔗 Imperio Barbershop BACK](https://imperio-barbershop-backend.onrender.com)

*(Nota: Como el backend está alojado en el plan gratuito de Render, la primera petición podría tardar unos 50 segundos en despertar el servidor).*

## 📌 El Problema (The Pitch)

La experiencia de reservar un turno en una barbería suele depender de llamadas telefónicas, mensajes de WhatsApp perdidos o esperas innecesarias en el local. 

**Imperio Barbershop** soluciona esto digitalizando el proceso. Permite a los clientes registrarse, iniciar sesión de forma segura, seleccionar el tipo de servicio o corte deseado y agendar su cita. A su vez, facilita a la barbería la organización de su agenda diaria. Este proyecto fue desarrollado como trabajo final integrador para las asignaturas de "Lenguajes para la web" y "Computación en el cliente", demostrando capacidad para construir y conectar un sistema Full-Stack desde cero en equipo.

## 🚀 Funcionalidades Principales

- **Autenticación Segura:** Sistema de Login y Registro de usuarios utilizando JWT (JSON Web Tokens) y contraseñas encriptadas.
- **Gestión de Citas:** Los usuarios autenticados pueden agendar citas y seleccionar servicios específicos.
- **Interfaz Interactiva y Reactiva:** Uso de animaciones (Framer Motion) y notificaciones en tiempo real (SweetAlert2 y React Hot Toast) para una experiencia de usuario fluida.
- **Protección de Datos:** Implementación de middlewares de seguridad en el backend para prevenir ataques comunes.

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto está dividido en dos repositorios/carpetas principales, siguiendo el modelo **MERN Stack** (MongoDB, Express, React, Node.js).

### 🎨 Frontend (Client-Side)
- **Framework:** React 19 empaquetado con Vite para tiempos de compilación extremadamente rápidos.
- **Estilos:** Tailwind CSS 4 para un diseño responsivo y moderno.
- **Gestión de Formularios:** `react-hook-form` para manejar la validación de formularios de registro y login de manera eficiente sin re-renderizados innecesarios.
- **Enrutamiento:** `react-router-dom` para la navegación SPA (Single Page Application).
- **Peticiones HTTP:** Axios.

### ⚙️ Backend (Server-Side)
- **Entorno y Framework:** Node.js con Express, utilizando ES Modules.
- **Base de Datos:** MongoDB gestionado a través del ODM Mongoose.
- **Seguridad Destacada:** 
  - `helmet`: Para configurar cabeceras HTTP seguras.
  - `express-rate-limit`: Prevención de ataques de fuerza bruta (DDoS).
  - `express-mongo-sanitize`: Prevención de inyecciones NoSQL.
  - `bcryptjs` y `jsonwebtoken`: Para la encriptación de credenciales y manejo de sesiones stateless.

> **Trade-off Técnico:** Se optó por una base de datos NoSQL (MongoDB) dada la flexibilidad requerida para iterar rápidamente sobre los modelos de servicios y citas durante el desarrollo del proyecto universitario. Además, la decisión de utilizar `react-hook-form` sobre controladores de estado tradicionales (como `useState` masivos) mejoró significativamente la performance del cliente en dispositivos móviles.

## 🛠️ Instalación y Configuración Local

Para ejecutar el proyecto en tu entorno local, asegúrate de tener instalado **Node.js** (v18+) y acceso a un cluster de **MongoDB** (local o Atlas).

### 1. Clonar el repositorio
```bash
git clone https://github.com/Chatesito/Imperio-Barbershop.git
cd Imperio-Barbershop
```

### 2. Configurar y levantar el Backend
```bash
cd backend
npm install
```
Crea un archivo `.env` en la carpeta `backend` con las siguientes variables:
```env
PORT=5000
MONGODB_URI=tu_cadena_de_conexion_mongodb
JWT_SECRET=tu_secreto_super_seguro
```
Ejecuta el servidor en modo desarrollo:
```bash
npm run dev
```

### 3. Configurar y levantar el Frontend
Abre una nueva terminal y ejecuta:
```bash
cd frontend
npm install
```
Crea un archivo `.env` en la carpeta `frontend` si es necesario configurar la URL de la API (por defecto asume `http://localhost:5000` u otra especificada en los servicios de Axios).

Levanta la aplicación React:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## 👥 Equipo de Desarrollo (Créditos)

Este proyecto fue posible gracias al trabajo en equipo y colaboración de:

- **Juan David Rivera Chate (Chatesito)** - Desarrollador
- **afgquincoder** - Colaborador
- **AVargass19** - Colaboradora
- **NataUrbano** - Colaboradora

---
*Proyecto Universitario - Lenguajes para la web & Computación en el cliente.*
