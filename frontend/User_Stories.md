# Historias de Usuario para la Interfaz "Position"

## Historia de Usuario 1: Acceso y Navegación

**Como** usuario de la plataforma de contratación,
**Quiero** hacer clic en el botón "Ver proceso" de una posición en la lista de posiciones,
**Para que** me lleve a la página de detalle de esa posición específica, donde pueda ver y gestionar los candidatos.

**Criterios de Aceptación:**

1. Al hacer clic en "Ver proceso", el sistema debe redireccionar a la página de detalle correspondiente.
2. El título de la posición debe mostrarse en la parte superior de la página de detalle.
3. Debe haber una flecha de retorno al listado principal de posiciones junto al título de la página de detalle.
4. En caso de error durante la redirección, mostrar un mensaje de error claro y ofrecer la opción de reintentar.

## Historia de Usuario 2: Visualización de Candidatos

**Como** gerente de contratación,
**Quiero** ver todos los candidatos de una posición específica distribuidos en columnas que representan las fases del proceso de contratación,
**Para que** pueda entender rápidamente en qué fase se encuentra cada candidato.

**Criterios de Aceptación:**

1. Mostrar las columnas correspondientes a cada fase del proceso de contratación como se especifica en el endpoint GET /position/:id/interviewFlow.
2. Cada columna debe ser etiquetada con el nombre de la fase.
3. Las tarjetas de los candidatos deben aparecer en la columna que corresponda a su fase actual de entrevista, según la información del endpoint GET /position/:id/candidates.
4. Cada tarjeta de candidato debe mostrar el nombre completo y la puntuación media del candidato.
5. En caso de error al cargar los datos de los candidatos, mostrar un mensaje de error y ofrecer la opción de reintentar la carga.

## Historia de Usuario 3: Modificación de la Fase del Proceso

**Como** gerente de contratación,
**Quiero** poder actualizar la fase del proceso de entrevista de un candidato simplemente arrastrando su tarjeta a otra columna,
**Para que** pueda gestionar el proceso de forma dinámica y eficiente.

**Criterios de Aceptación:**

1. Permitir el arrastre de tarjetas de candidatos entre columnas.
2. Actualizar la fase del proceso en la base de datos mediante el endpoint PUT /candidate/:id cuando se mueva una tarjeta de candidato a una nueva columna.
3. Confirmar visualmente el cambio de fase con una notificación o actualización en la interfaz del usuario, como un toast o un diálogo modal.
4. En caso de error al actualizar la fase del proceso, mostrar un mensaje de error y ofrecer la opción de revertir el cambio.

## Historia de Usuario 4: Responsividad Móvil

**Como** usuario que accede desde un dispositivo móvil,
**Quiero** que las fases del proceso de contratación se muestren adecuadamente en mi dispositivo,
**Para que** pueda gestionar las contrataciones efectivamente mientras estoy en movimiento.

**Criterios de Aceptación:**

1. En dispositivos móviles, las columnas deben mostrarse en vertical, ocupando todo el ancho de la pantalla.
2. La interfaz debe ser fácil de usar en pantallas táctiles, permitiendo el arrastre de tarjetas entre columnas sin dificultad.
3. Asegurar que todos los textos y botones sean legibles y accesibles en dispositivos móviles.
4. Cumplir con los estándares de accesibilidad, como soporte para lectores de pantalla y cumplimiento de WCAG.
