### 1. Prompt inicial
Se está trabajando en el sistema llamado LTI, el cual es un application tracking system.

Con base en este proyecto de frontend: @frontend 
Tienes que añadir la vista de Position, la cual es una página en la que se debe poder visualizar y gestionar los diferentes candidatos de una posición específica. La interfaz debe ser tipo kanban, mostrando los candidatos como tarjetas en diferentes columnas que representan las fases del proceso de contratación, y pudiendo actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta.

Genera el código y las instrucciones para realizar esta vista de "position" teniendo en cuenta las buenas prácticas @buenas-practicas.md y la estructura y estilos del proyecto. Un buen componente para tomar base es @Positions.tsx 

### Algunos Prompts de Refinamiento
User:
Actualiza el archivo @App.js añadiendo el path '/position' para mostrar el componente @Position.tsx 

User:
Teniendo la base @Position.tsx hay unos ajustes por hacer para cumplir los requerimientos.
Empecemos por: 
 * La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media.
* Deben mostrarse tantas columnas como fases haya en el proceso.

User:
El archivo @candidateService.js contiene los llamados del front al back a la entidad de candidate.
Genera el archivo positionService.js con el siguiente servicio:
GET /position/:id/interviewFlow
Este endpoint devuelve información sobre el proceso de contratación para una determinada posición:

positionName: Título de la posición
interviewSteps: id y nombre de las diferentes fases de las que consta el proceso de contratación

Este servicio será consultado en el componente @Position.tsx 

User:
Ahora en @Position.tsx consume el servicio asincrono getPositionInterviewFlow en @positionService.js para obtener los datos de position reemplazando positionData.

...
User:
Ok.
Ahora en @Position.tsx  añade la funcionalidad de poder arrastrar la tarjeta de candidate.
La funcionalidad consiste en poder arrastar la tarjeta de candidate y poder "ponerla" en una columna de interviewStep, de esta manera se podrá actualzar el valor de currentInterviewStep del candidate de la tarjeta arrastrada.

...
User:
Vamos a necesitar el applicationId en el componente @Position.tsx 
Para eso tenemos que ajustar el servicio get /:id/candidates de @positionRoutes.ts
Añade el 'app.id', el cual es el id de applicaiton, a la respuesta del method getCandidatesByPositionService en @positionService.ts 

User:
Ahora podemos finalizar la funcionalidad
en @Position.tsx actualiza la función handleDrop para que se llame el método asíncrono updateCandidateInterviewStep, en donde se debe pasar por parametros el candidate.candidateId, el candidate.applicationId que se obtiene del map a candidates y el interviewStep.id