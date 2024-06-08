#PROMPTS

- Quiero que actues como un desarrollador frontend senior, especialista en React. Analiza el proyecto @frontend  y explicame brevemente en qué se basa el proyecto, qué funcionalidad tiene el sistema

- Partiendo de esta base, ahora quiero añadir una nueva interfaz para poder visualizar y gestionar los diferentes candidatos de una posición concreta. Accederemos a esta interfaz al clicar en el botón "Ver proceso" para cada uno de los procesos mostrados en @Positions.tsx. De momento quiero que muestres el título de la posición en la parte superior y todas las fases del proceso que tenga. Tienes más información para el endpoint que tienes que usar GET /position/:id/interviewFlow en@api-spec.yaml . De momento no hagas nada, solo dime qué harías y preguntame si tienes alguna duda

- quiero que separes la request a la API para que no esté en el componente sino que esté en un servicio. El servicio debe llamar a la API y devolver el resultado. El componente debe recibir el resultado y mostrarlo. 

- perfecto, vamos a implementar el nuevo componente PositionDetails.tsx

- ten en cuenta que getPositionDetails devuelve una respuesta con esta estructura

```json
{
    "interviewFlow": {
        "positionName": "Software Engineer",
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
}
 ```

 - vamos a controlar el error en caso de que el endpoint de getPositionDetails devuelva Request failed with status code 404

 - parece que setPosition no está asignando los valores de data correctamente a Position

 - ahora quiero que organices cada fase del proceso en tarjetas tipo kanban, no necesito que sean dropables. Ten en cuenta que este diseño debe mostrarse correctamente en todos los tipos de dispositivo, por lo que debe ser responsive

 - ahora vamos a obtener todos los candidatos que están participando en el proceso de cada posición, para ello tenemos que consultar el endpoint GET /position/:id/candidates, tienes más info en @api-spec.yaml .
La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media

- mostraremos la puntuacion media de cada candidato con tantos círculos verdes como puntuación tengan

- ahora tenemos que hacer que esas tarjetas de cada candidato se pueden mover a otro proceso para poder actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta

- ten en cuenta que el endpoint para updateCandidateStage es PUT /candidate/:id y se enviará los datos en el body con la siguiente estructura 

```json
{
    "applicationId": "1",
    "currentInterviewStep": "3"
}
```


- vamos a modificar el endpoint getCandidatesByPositionService en @backend  para que devuelva tambien el applicationID y el ID del candidato para esa posicion de cada candidato

- vamos a modificar el codigo en @PositionDetails.tsx para que tenga en cuenta que el endpoint que obtiene los candidatos de cada proceso devuelve esta estructura de datos


```json
 {
        "applicationID": 3,
        "candidateID": 3,
        "fullName": "Jane Smith",
        "currentInterviewStep": "Technical Interview",
        "averageScore": 4
    }
```

- quiero que modifiques la funcion moveCandidate() para que pueda recibir toda la informacion que necesita el endpoint de la funcion updateCandidateStage()

- estoy teniendo muchos problemas con useEffects, vamos a cambiar la forma de hacer una tarjeta dropable

- ayudame a revisar @package.json y haz los cambios que creas necesarios para asegurarte de que las dependencias sean compatibles

- el endpoint PUT /candidate/:id espera en el parametro currentInterviewStep un entero con el ID del nuevo step, tenemos que modificar @PositionDetails.tsx 
 
- cuando se arrastre una tarjeta de candidato a otra fase del proceso, la tarjeta debe mostrarse sin necesidad de recargar la pagina de nuevo
 
- parece que no se actualiza automaticamente, despues de mover la tarjeta a otra fase la tarjeta desaparece

- vamos a revisar @PositionDetails.tsx , quiero que compruebes si se podría refactorizar este componente para simplificarlo y si es necesario creando otros componentes

- vamos a mejorar el diseño de la interfaz:
    - el background a un color gris claro
    - la caja con las fases de la posicion serán de un gris más parecido al blanco
    - las tarjetas de cada candidato serán blancas
    - todo con la esquina redondeada
    - el diseño debe ser responsive
    - el diseño debe ser claro y legible
    - el diseño debe ser moderno y minimalista

