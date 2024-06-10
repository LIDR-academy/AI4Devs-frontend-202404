## IDE: Cursor

## Prompts

1. Quiero que actues como un desarrollador frontend senior. Estamos trabajando en el sistema ATS llamado LTI, en este momento ya se tiene el backend desarrollado @backend y una parte del frontend @frontend. Quiero que crees una interfaz visual `position` la cual aparece cuando se oprime el boton "Ver proceso" en el componente `Positions.tsx`.
   En esta interfaz se podra visualizar y gestionar los diferentes candidatos de una posición específica. Quiero que me preguntes que dudas tienes antes de darte las especificaciones y los requisitos para esta interfaz. No escribas codigo aun.

2. Te voy a resolver las dudas punto por punto para no tener problemas de contexto. No escribas codigo aun.
   1. Especificaciones de la Interfaz: La interfaz debe ser de tipo kanban, mostrando los candidatos como tarjetas en diferentes columnas que representan las fases del proceso de contratación, y pudiendo actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta a la nueva columna. Se deben cumplir los siguientes requisitos:
      - Se debe mostrar el título de la posición en la parte superior, para dar contexto
      - Añadir una flecha a la izquierda del título que permita volver al listado de posiciones
      - Deben mostrarse tantas columnas como fases haya en el proceso
      - La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media
      - Si es posible, debe mostrarse adecuadamente en móvil (las fases en vertical ocupando todo el ancho)

3. Listo ahora vamos con el punto 2, no escribas codigo aun. Datos de Candidatos: Contamos con los siguientes endpints:
   - `GET /position/:id/interviewFlow`: Este endpoint devuelve información sobre el proceso de contratación para una determinada posición. Output:
    ```
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
    ```   
   - `GET /position/:id/candidates`: Este endpoint devuelve todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Output:
    ```
    [
        {
            "fullName": "John Doe",
            "currentInterviewStep": "Technical Interview",
            "averageScore": 5
        },
        {
            "fullName": "Jane Smith",
            "currentInterviewStep": "Technical Interview",
            "averageScore": 4
        },
        {
            "fullName": "Carlos García",
            "currentInterviewStep": "Initial Screening",
            "averageScore": 0
        }
    ]
    ```
   - `PUT /candidate/:id`: Este endpoint actualiza la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico, a través del parámetro "new_interview_step" y proporionando el interview_step_id correspondiente a la columna en la cual se encuentra ahora el candidato. Output:  
        ```
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
        ```

4. Listo ahora vamos con el punto 3, no escribas codigo aun. Navegación y Estado: Al hacer clic en "Ver proceso", la interfaz debe mostrarse en una nueva página. 
5. Ten en cuenta la siguiente imagen para crear el diseño de la interfaz:
   ![image](https://media1-production-mightynetworks.imgix.net/asset/34e1b22b-b8b4-455a-b4cb-c0ddece51640/disen_o_ejemplo_kanban.png?ixlib=rails-4.2.0&fm=jpg&q=75&auto=format)
   No escribas codigo aun. Dime si tienes alguna duda adicional o dame los pasos para continuar.
   
6. Listo, empecemos con el paso 1. Utiliza las tecnologias y herramientas que tenga ya el proyecto @frontend   
   **NOTA**: Se siguen iterando los pasos sugeridos hasta que se crean todos los componentes y recursos necesarios.
7. Necesito que ajustes lo siguiente: La lógica o la comunicación con el backend no está en la carpeta @services. Por favor, ajusta las llamadas a los endpoints para que queden igual que en @candidateService.js.
8. Ahora necesito que modifiques el componente @Positions.tsx para que se conecte con la interfaz del Kanban
9. La respuesta correcta del endpoint `GET /position/:id/interviewFlow` es 
    ```
    {
        "interviewFlow": {
            "positionName": "Senior Full-Stack Engineer",
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
    Corrige los componentes de ser necesario.

10. Vamos bien. Ahora necesito que apliques estilo a la interfaz para que se vea como en la imagen. Guíate por los estilos de los componentes ya creados en @components y utiliza la librería react-bootstrap. Ten en cuenta lo siguiente:
    - La interfaz debe ser responsiva y adaptarse a diferentes dispositivos.
    - Debe permitir arrastrar las tarjetas entre las diferentes columnas.

11. Pasar la logica del `PUT candidates/:id` a @candidateService.js.  

***NOTA***: Surgió un error al mover las tarjetas entre las diferentes columnas: actualizaba al candidato incorrecto o lo colocaba en la columna equivocada. Pasé un tiempo considerable intentando encontrar una solución funcional, pero siempre obtenía respuestas similares que no resolvían el problema. Finalmente, logré solucionarlo, aunque tuve que hacer algunas correcciones manualmente.
    
