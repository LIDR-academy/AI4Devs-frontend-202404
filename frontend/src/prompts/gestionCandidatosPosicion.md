# Gestión de candidatos por posición

## Cargando contexto del proyecto
### Actuando como un experto desarrollador frontend, Analiza el proyecto @frontend  y dame un resumen técnico de sus funcionalidades. Explica brevemente en qué se basa el proyecto, qué funcionalidad tiene el sistema.

### Basado en lo implementado en @Positions.tsx   ¿cuáles crees que serían los siguientes pasos? no modifiques nada, solo menciona cuál sería la siguiente funcionalidad a implementar.

## Implementación de la funcionalidad

### vamos a priorizar la funcionalidad de navegar a una página de detalles de la posición al hacer clic en "Ver proceso",  para ello se debe tomar en cuenta el diseño de la imagen adjunta, y los siguientes aspectos:

1. La interfaz será un tablero tipo Kanban.
2. Cada columna del tablero representa la fase del proceso de contratación del candidato.
3. Cada tarjeta representa al candidato mostrando su nombre y el valor promedio acumulado representado en elemento esféricos.
4. El diseño debe ser responsivo usando las mejores practicas UX/UI en React.

Indica los nombres de los archivos que se requieren generar con sus corresponcientes ubicaciones.

Antes de comenzar, hazme las presntas que necesites, no generes código aún.

### 1. Existe una API con el endPoint GET /position/:id/candidates, Este endpoint devuelve todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Proporciona la siguiente información:
- name: Nombre completo del candidato
- current_interview_step: en qué fase del proceso está el candidato.
- score: La puntuación media del candidato
Ejemplo de respuesta:
[
     {
          "fullName": "Jane Smith",
          "currentInterviewStep": "Technical Interview",
          "averageScore": 4
      },
      {
          "fullName": "Carlos García",
          "currentInterviewStep": "Initial Screening",
          "averageScore": 0            
      },        
      {
          "fullName": "John Doe",
          "currentInterviewStep": "Manager Interview",
          "averageScore": 5            
     }    
]

2.  Existe el endPoint GET /position/:id/interviewFlow, Este endpoint devuelve información sobre el proceso de contratación para una determinada posición:
-positionName: Título de la posición
-interviewSteps: id y nombre de las diferentes fases de las que consta el proceso de contratación.
Ejemplo de respuesta:
{
     "positionName": "Senior backend engineer",
     "interviewFlow": {
             
             "id": 1,
             "description": "Standard development interview process",
             "interviewSteps": [
                 {
                     "id": 1,
                     "interviewFlowId": 1,
                     "interviewTypeId": 1,
                     "name": "Initial Screening",
                     "orderIndex": 1
                 },
                 {
                     "id": 2,
                     "interviewFlowId": 1,
                     "interviewTypeId": 2,
                     "name": "Technical Interview",
                     "orderIndex": 2
                 },
                 {
                     "id": 3,
                     "interviewFlowId": 1,
                     "interviewTypeId": 3,
                     "name": "Manager Interview",
                     "orderIndex": 2
                 }
             ]
         }
 }

3. Es un valor numérico que no requiere cálculo, se obtiene del endPoint GET /position/:id/candidates, el valor se indica en el atributo llamado "averageScore".

4. Para la definición de estilos, se debe tomar en cuenta los colores definidos en la imagen, adicionalmente, toma en cuenta los que ya maneja la aplicación en @App.css.

 Ten presente que el diseño debe ser responsivo usando las mejores practicas UX/UI en React.

Indica los nombres de los archivos que se requieren generar con sus corresponcientes ubicaciones.

### las llamadas de los endPoints en cada componente, se requieren separar del componente, de tal forma que cada componente use un archivo de servicio que será el encargado de comunicarse con el endPoint de la API y devolver la respuesta el componente.

### ok, dada la estructura  y planificación, procede a implementar la funcionalidad requerida de manera modular y organizada.

### aplica los cambios definidos del paso 6. Actualización de Rutas: App.tsx
En el archivo @App.tsx de tal forma que no se pierda las rutas actuales, se agregue la nueva ruta.
De ser necesario, refactoriza el archivo

### Agrega en este archivo en el boton "Ver proceso" el llamado a la ruta que muestra los detalles de la posición como un tablero kanban

## Data aleatoria

### Genera los insert SQL con los datos de mockPositions tomando en cuenta el schema prisma @schema.prisma .

Complementa los datos que falten generando data aletoria para España.

### Genera los insert SQL con datos aletoria para España  tomando en cuenta la tabla Candidate definida en el schema prisma @schema.prisma 

### basado en los datos de prueba generados, genera cuatro registros para la tabla application tomando como ids de candidatos los valaores: 4,5,6,7 


## Agregar eventos arrastar y soltar tarjeta de candidato

### la constante interviewFlowData recibe un objeto json con la siguiente estructura:

interviewFlow: 
  interviewFlow: {id: 1, description: 'Standard development interview process', interviewSteps: Array(3)}
  positionName: "Senior Full-Stack Engineer"

Se requiere reemplazar el texto de la linea 40 "Detalles de la Posición" por el valor contenido en interviewFlowData.interviewFlow.positionName

### Se requiere modificar el componente CandidateCard para agregar el evento arrastrar y soltar, de tal forma que la tarjeta del cadidato se pueda cambiar de posición entre las columnas definidas por el componte KanbanColumn.

contexto: @frontend 

Antes de comenzar, hazme las preguntas que necesites. No generes código aún.

### 1. No estoy usando ninguna aún, se podria usar la mas recomendada o popular de las dos.

2. Si, al momento de soltar en la otra columna, se debe ejecutar un llamado al endPoint: PUT /candidate/:id Este endpoint actualiza la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico, a través del parámetro "new_interview_step" y proporionando el interview_step_id correspondiente a la columna en la cual se encuentra ahora el candidato.
Ejemplo de parámetro: 
{
    "applicationId": "1",
    "currentInterviewStep": "3"
}

ejemplo de respuesta exitosa:
{    
   "message": "Candidate stage updated successfully",
    "data": {
        "id": 1,
        "positionId": 1,
        "candidateId": 1,
        "applicationDate": "2024-06-04T13:34:58.304Z",
        "currentInterviewStep": 3,
        "notes": null,
        "interviews": []    
    }
}

3. Si.

4. Si, la tarjeta se podrá mover entre columnas y en cuyo caso, se dispara la petición al endPoint, si es exitoso, se mueve la tarjeta, sino, se cancela la acción y la tarjeta queda en su posición original .

### luego de aplicar los cambios arroja el siguiente error:

ERROR
Expected drag drop context
Invariant Violation: Expected drag drop context
    at invariant (http://localhost:3000/static/js/bundle.js:91420:15)
    at useDragDropManager (http://localhost:3000/static/js/bundle.js:95964:66)
    at useDropTargetMonitor (http://localhost:3000/static/js/bundle.js:96174:93)
    at useDrop (http://localhost:3000/static/js/bundle.js:96091:97)
    at KanbanColumn (http://localhost:3000/static/js/bundle.js:1105:70)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:59180:22)
    at mountIndeterminateComponent (http://localhost:3000/static/js/bundle.js:63151:17)
    at beginWork (http://localhost:3000/static/js/bundle.js:64454:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:49436:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:49480:20)



ayúdame a corregir

