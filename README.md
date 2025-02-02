# Taller Mecánico Alonso

## Descripción del Proyecto

Taller Mecánico Alonso es una plataforma web diseñada para la gestión eficiente de turnos en un taller mecánico. La aplicación permite a los clientes solicitar turnos, dar seguimiento a sus citas y descargar facturas, mientras que los administradores pueden gestionar los turnos y organizar el flujo de trabajo del taller.

El proyecto está desarrollado con **React.js**, asegurando compatibilidad con todos los dispositivos y ofreciendo una experiencia de usuario fluida y eficiente.

## Funcionalidades Principales

### Inicio

- Presentación del taller mecánico.
- Información de contacto, horarios y servicios disponibles.

### Login

- Registro de nuevos usuarios.
- Inicio de sesión para usuarios registrados.
- Almacenamiento seguro de datos en **localStorage**.

### Dashboard (Administrador)

- Visualización del email y rol del administrador.
- Gestión de turnos solicitados por clientes.
- Listado de turnos con detalles del cliente, vehículo y horario.
- Opciones para **confirmar, cancelar y finalizar turnos**.
- Posibilidad de adjuntar facturas en formato **PDF** a los turnos finalizados.

### Dashboard (Cliente)

- Gestión de datos personales.
- Visualización y cancelación de turnos solicitados.
- Seguimiento del estado del turno.
- Descarga de facturas generadas por el administrador.

### Turnos

- Formulario para solicitar turnos.
- Selector de fecha y hora (✨ **DatePicker**), con horarios de atención de **lunes a viernes de 9:00 AM a 6:00 PM**.
- Requiere que el usuario esté logueado para solicitar un turno.
- Restricción de nuevos turnos hasta que el estado de un turno previo sea "Confirmado" o "Finalizado".

## Tecnologías Utilizadas

- **React.js**: Framework principal para el desarrollo del frontend.
- **localStorage**: Para almacenamiento de datos del usuario.
- **DatePicker**: Para selección de fecha y hora.

## Instalación y Uso

1. Clonar el repositorio:
   ```sh
   git clone https://github.com/tuusuario/taller-mecanico-alonso.git
   ```
2. Acceder al directorio del proyecto:
   ```sh
   cd taller-mecanico-alonso
   ```
3. Instalar dependencias:
   ```sh
   npm install
   ```
4. Iniciar la aplicación:
   ```sh
   npm start
   ```

## Licencia y Derechos de Autor

Este proyecto está protegido por derechos de autor y es propiedad exclusiva de **Alan Suárez**. Se prohíbe la copia, distribución o modificación sin el consentimiento explícito del autor.

**© 2024 Alan Suárez - Todos los derechos reservados.**
