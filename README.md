# Instrucciones de Instalación para Mi Aplicación Web

¡Bienvenido a la guía de instalación de mi aplicación web! A continuación, encontrarás los pasos necesarios para poner en funcionamiento la aplicación en tu entorno local. Asegúrate de seguir cada uno de los pasos con atención para asegurar una instalación exitosa.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js y npm:** Asegúrate de tener Node.js (que incluye npm) instalado en tu sistema. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **Servidor PostgreSQL:** Asegúrate de tener un servidor PostgreSQL en funcionamiento.

## Pasos de Instalación

1. **Clonar el Repositorio:**
   Clona este repositorio desde GitHub en tu directorio de proyectos local:

   ```bash
   git clone https://github.com/Carliitta/inmobiliaria.git
   ```

2. **Crear el archivo .env:**
   En la carpeta `Servidor` de la aplicación, crea un archivo llamado `.env` y agrega las siguientes líneas con las credenciales de tu base de datos:

   ```plaintext
   DB_NAME=tu_nombre_de_base_de_datos
   DB_USER_NAME=tu_usuario_de_postgres
   DB_PASSWORD=tu_contraseña_de_postgres
   DB_HOST=tu_host_de_postgres
   ```

   Asegúrate de reemplazar `tu_nombre_de_base_de_datos`, `tu_usuario_de_postgres`, `tu_contraseña_de_postgres` y `tu_host_de_postgres` con los valores correspondientes.

3. **Instalar Dependencias del Servidor:**
   Navega a la carpeta del servidor:

   ```bash
   cd inmobiliaria/servidor
   ```

   Instala las dependencias del servidor ejecutando:

   ```bash
   npm install
   ```

4. **Configurar la Base de Datos:**
 Crea una base de datos en PostgreSQL y Asegúrate de que tu servidor PostgreSQL esté en funcionamiento. Las credenciales de la base de datos se cargarán automáticamente desde el archivo `.env`.


5. **Iniciar el Servidor:**
   Desde la carpeta del servidor, ejecuta:

   ```bash
   npm start
   ```

6. **Instalar Dependencias del Cliente:**
   Navega a la carpeta del cliente:

   ```bash
   cd ../Cliente
   ```

   Instala las dependencias del cliente ejecutando:

   ```bash
   npm install
   ```

8. **Iniciar el Cliente:**
   Desde la carpeta del cliente, ejecuta:

   ```bash
   npm start
   ```

9. **Explorar la Aplicación:**
   Abre tu navegador web y accede a `http://localhost:3000`. ¡Deberías ver la interfaz de usuario de la aplicación en funcionamiento!





