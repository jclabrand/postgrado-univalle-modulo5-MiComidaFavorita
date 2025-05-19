# Mi Comida Favorita

**Mi Comida Favorita** es una aplicación móvil desarrollada en React Native que permite a los usuarios registrarse, iniciar sesión y gestionar su perfil, incluyendo su comida favorita. La aplicación utiliza Firebase para la autenticación y almacenamiento de datos.

## Características

- Registro de usuarios con validaciones de seguridad para contraseñas.
- Inicio de sesión con Firebase Authentication.
- Gestión de perfil de usuario, incluyendo nombre, apellido y comida favorita.
- Persistencia de datos en Firestore.
- Navegación entre pantallas utilizando React Navigation.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (versión 16 o superior)
- Expo CLI (`npm install -g expo-cli`)
- Una cuenta de Firebase configurada con un proyecto.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone git@github.com:jclabrand/postgrado-univalle-modulo5-MiComidaFavorita.git
   postgrado-univalle-modulo5-MiComidaFavorita
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Configura Firebase:

   - Ve al archivo [`src/config/firebase.js`](src/config/firebase.js).
   - Asegúrate de que las credenciales de Firebase (`apiKey`, `authDomain`, etc.) sean correctas para tu proyecto.

4. Inicia la aplicación en el entorno de desarrollo:

   ```bash
   npm start
   ```

5. Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o ejecuta la aplicación en un emulador:

   - Para Android: `npm run android`
   - Para iOS: `npm run ios`
   - Para web: `npm run web`

## Mejoras realizadas

1. **Validaciones de seguridad para contraseñas**:
   - Se añadieron reglas estrictas para las contraseñas en el registro, incluyendo requisitos de longitud, mayúsculas, minúsculas, números y caracteres especiales.

2. **Gestión de errores mejorada**:
   - Se implementó un manejo de errores más robusto en las pantallas de registro, inicio de sesión y perfil, mostrando mensajes claros al usuario.

3. **Indicadores de carga**:
   - Se añadieron indicadores de carga (`ActivityIndicator`) en las acciones de registro, inicio de sesión y actualización de perfil para mejorar la experiencia del usuario.

4. **Persistencia de datos en Firestore**:
   - Se integró Firestore para almacenar y recuperar los datos del perfil del usuario.

5. **Diseño responsivo**:
   - Se ajustaron los estilos para garantizar una experiencia consistente en diferentes tamaños de pantalla.

6. **Navegación mejorada**:
   - Se configuró React Navigation para una navegación fluida entre las pantallas de inicio de sesión, registro y perfil.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.