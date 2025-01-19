# ⚡️ Administrador de Pacientes

Este proyecto es un administrador de citas veterinarias que permite gestionar de manera eficiente las consultas de pacientes. Desarrollado con JavaScript moderno y programación orientada a objetos, ofrece una interfaz intuitiva para veterinarios y personal administrativo. El sistema permite registrar, editar y eliminar citas, incluyendo detalles como información del paciente, propietario, fecha/hora y síntomas. Utiliza Bootstrap para un diseño responsivo y moderno, validación de formularios en tiempo real, y almacenamiento local para persistir los datos. El código está estructurado en clases y módulos para mayor mantenibilidad y escalabilidad.

## Características

- **Registro de citas:** Permite registrar nuevos pacientes con sus respectivas citas, incluyendo información como nombre de la mascota, propietario, teléfono de contacto, fecha, hora y síntomas.
- **Visualización de citas:** Muestra todas las citas registradas de forma clara y ordenada, facilitando la gestión y seguimiento.
- **Edición y eliminación:** Permite editar y eliminar citas existentes para mantener la información actualizada.
- **Validación de formularios:** Realiza validaciones en tiempo real para asegurar que todos los campos obligatorios estén completos antes de registrar una cita.
- **Almacenamiento local:** Guarda las citas en el localStorage del navegador para mantener la persistencia de datos.
- **Alertas interactivas:** Muestra alertas visuales para informar al usuario sobre acciones realizadas correctamente o posibles errores.
- **Base de datos local:** Utiliza IndexedDB para almacenar las citas de forma persistente en el navegador.
- **Interfaz moderna:** Diseño limpio y responsivo con Bootstrap 5 y estilos personalizados.
- **Gestión completa de citas:** CRUD completo (Crear, Leer, Actualizar y Eliminar) para las citas veterinarias.

## Tecnologías y Herramientas

- **HTML5:** Estructura semántica de la página.
- **Bootstrap 5:** Framework CSS para un diseño moderno y responsivo.
- **JavaScript ES6+:**
  - Programación orientada a objetos
  - Módulos ES6
  - IndexedDB para persistencia de datos
  - Clases y herencia
  - Async/Await para operaciones asíncronas
- **Características adicionales:**
  - Sistema de validación de formularios
  - Manejo de errores y alertas
  - Diseño responsivo con media queries

## Estructura del Proyecto

- **css/**:
  - `styles.css`: Estilos personalizados y override de Bootstrap
- **js/**:
  - `app.js`: Punto de entrada de la aplicación
  - `class/UI.js`: Clase para manejo de la interfaz de usuario
  - `class/Paciente.js`: Clase para la lógica de negocio de pacientes
- **index.html**: Página principal de la aplicación

## Uso

Para visualizar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio:

```
git clone https://github.com/JMatochePascual/Administrador-de-Pacientes.git
```

2. Navega al directorio del proyecto:

```
cd Administrador-de-Pacientes
```

3. Abre el archivo `index.html` en tu navegador web preferido

4. Opcionalmente, puedes usar un servidor local como Live Server para una mejor experiencia

## Instalación

No se requiere instalación adicional para utilizar este proyecto.

## Contribución

Si deseas contribuir al proyecto, por favor sigue estos pasos en orden:

1. Haz un fork del repositorio.

2. Crea una nueva rama para tu funcionalidad:
   ```bash
   git checkout -b feature-name
   ```
3. Realiza y confirma tus cambios:
   ```bash
   git commit -am 'Add new feature'
   ```
4. Sube los cambios a tu repositorio:
   ```bash
   git push origin feature-name
   ```
5. Abre un Pull Request desde tu repositorio hacia el proyecto principal

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

## Imagen de Rereferencia

![](https://i.postimg.cc/4ytk6wnj/Pacientes-JS.png)

## ¡Visita Nuestro Proyecto!

¿Quieres ver Administrador de Pacientes en acción? ¡Haz clic aquí! 👉 [Visitar Administrador de Pacientes](https://jmatochepascual.github.io/Administrador-de-Pacientes/)

Hecho con 💚 por Administrador de Pacientes | ©2025 - Transformando tu veterinaria en una experiencia única.
