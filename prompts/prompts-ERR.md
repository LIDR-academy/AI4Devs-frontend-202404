## Prompt
You are an experienced full-stack developer. The tech stack of the application is made of, on the frontend (located in @frontend )
- React
- React-bootstrap
- Dotenv
On the backend (located in @backend ):
- NodeJS
- Express
- Dotenv
- Prisma
- Typescript
I need to generate a new frontend screen. Please follow existing codestyle, keep in mind the UI if the application has to be responsive and adaptive, with the principle "mobile first" in mind

Please take ownership of the application and let me know if you have any questions, before I prompt you with the new screen to be generated


## Prompt
ok for peace of mind and not mixing languages, I will start writing in Spanish, as the application is writen in spanish


## Prompt
En el fichero abierto ahora mismo, @Positions.tsx , el botón "Ver proceso" debe llevar a la nueva pantalla, que será acerca de los detalles de esa posición en especifico. En el siguiente prompt te daré los detalles de la pantalla


## Prompt
Refactoriza la pantalla en la que estamos trabajando @PositionDetails.tsx para sea fiel a la imagen que adjunto 


## Prompt
Vamos a refactorizar el código para que la pantalla que hemos modificado dependa del backend y no de un mock. 

http://localhost:3010/position/:id/interviewFlow va a devolvernos
###
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
###
que nos dirá cuantas columnas debemos de dibujar en la pantalla @PositionDetails.tsx 

Además, tenemos http://localhost:3010/position/1/candidates
###
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
###

que nos va a decir qué candidatos dibujamos en cada columna


## Prompt
Gracias, esto se ve bien, pero por favor sigue las prácticas de código limpio; en este caso no se ha seguido el patrón de "single responsability" en @PositionDetails.tsx . Puedes extraer las dos llamadas REST en un nuevo componente de capa servicio (siempre lado frontend), que se va a encontrar en @positionService.js


## Prompt



## Prompt
## Prompt
## Prompt
## Prompt
## Prompt
