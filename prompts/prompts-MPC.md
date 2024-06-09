## Frontend: OpenUI + Cursor

Para desarrollar toda la estructura HTML y estilos básicos del componente utilicé la herramienta que se compartió en la formación de este módulo: https://openui.fly.dev/

Solo tuve que enviarle una captura y dar una explicación muy breve y desarrolló perfectamente el componente. Como esta herramienta aplica tailwind, en uno de los prompts le pido al asistente que lo tenga en cuenta para el desarrollo. 

El resto del desarrollo se ha hecho con Cursor. Solo he interactuado para cambios ínfimos y debugear.

No he ampliado las features, hecho testing, refactoring, documentación, etc.. por falta de tiempo ya que hoy mismo he visto que la entrega era para hoy y prefería entregar el objetivo mínimo de la tarea.

### Prompts

Si no hay ninguna anotación tras el prompt significa que este dio buen resultado en su primera respuesta y/o que no hay nada interesante a mencionar sobre esta respuesta.

#### NEW CHAT (1) - GOAL: Initial structure

- Check the project @AI4Devs-frontend and give me a brief about his purpose

- great, we're going to do some changes on the frontend part of @AI4Devs-frontend to create a new page to check how's the candidates process. Do you have any doubt?

- Inside @Positions.tsx I want you to make a change to use the "Ver proceso" Button to redirect the user to a diferent page called "Estado de proceso"

- Create this step: "Make sure that the route /process-status is defined in your routing setup in App.js or wherever you manage your routes." (fue una respuesta anterior del asistente)

- I need to use tailwind for the styles on @ProcessStatus.tsx 

- Which steps should I follow to install tailwind?

- In tailwind how works the classes like "shadow-md"?

    > Consulté esto porque no he utilizado mucho tailwind, así ya me iba haciendo al uso de como funcionan sus clases.

- I've noticed this shadow is just appearing in the left, right and bottom side, there is anothes class on tailwind to apply it to all the sides?

#### NEW CHAT (2) - GOAL: Get all positions from DB + show processStatus component

- In the backend side @backend I need you to create a new endpoint to get all the available "positions". Follow the same route as @positionRoutes.ts and the same structure defined in the controller @positionController.ts  

- On @positionController.ts you're using prisma.position to get all positions but the rest of the endpoint has it's own service created on @positionService.ts . Follow the same steps to manage the get all positions endpoint

- Using this new request to get all the positions, I want to make the necessary changes on @Positions.tsx to get the data from the database instead of using mock data

- The request should call to localhost:3010 instead of localhost:3000, change it

- Format the value received on "position.applicationDeadline" to DD/MM/YYY, we're receiving this from the database: 2024-12-31T00:00:00.000Z

- I need to send the position ID to the /process-status page and use it in this page to get all the position information

> El siguiente prompt fue más extenso:

- Change the structure on @ProcessStatus.tsx to use the database data instead of mocking data. The request u should do is: http://localhost:3010/position/{id}/interviewFlow where, the "id" param is the id received on the url. 

  This is the JSON that you're going to receive:
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
    For now, the candidates are going to be still mocked.

    Follow good practises: don't repeat code or blocks, modularised, create the necessary typings,.. 

    Before start let me know if you have some doubts

    > Fin del prompt extenso

- If there are no interviewSteps, show a traditional tailwind alert with the message "There are no steps or candidates related to this offer"

> Otro prompt con más información para el asistente:

- Each offer has different candidates. I want you to relate the candidates with the respective interviewStep where they are. To get all the candidates por a position you're going to use this request: http://localhost:3010/position/{id}/candidates where the id is the one received form the route.

    This is the JSON received from the request:
    ```
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
    ```

    For the average score we are going to show different emojis:

    value 0 = circle red emoji

    value 1 = circle orange emoji

    value 2 = circle yellow emoji

    value 3 = circle blue emoji

    value 4 = circle green emoji

    value 5 = star emoji

    Before you start let me know if you have some doubts

    > Fin del prompt extenso

#### NEW CHAT (3) - GOAL: Drag&Drop feature

- Using the react&tailwind features I want you to make some changes on @ProcessStatus.tsx to move the candidates between the different steps doing drag&drop. Do you have any question?

- Now I want to maintain the candidate in the step moved, for example, if it's dragged from "Initial screening" to "Technical interview" it should be updated in the database and maintained in the front boxes.
    To do this request we have this PUT: PUT /candidate/:id and it's expecting this body: 
    ```
    {
        "applicationId": "1",
        "currentInterviewStep": "3"
    }
    ````

    This request is going to answer with a JSON like this one:
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

    When the PUT is finished and we receive the answer from the server I want to show an alert 5 secs with the message received.

    Ask me the questions you need before start

> Dudas del asistente:

Questions:

    Candidate Identification: How do we identify each candidate uniquely in the system? Is it by fullName or do they have a unique id that should be used for the API call?

    Step Identification: How are interview steps identified? The PUT request expects a step ID 1. Are the name fields in the InterviewStep objects mapped to these IDs, or do we need additional information to map step names to their IDs?

    Error Handling: How should the application behave if the PUT request fails? Should it revert the candidate to their original step in the UI, or display an error message?
    Once these questions are clarified, I can provide a more detailed code modification for your onDragEnd function.

> Mi respuesta a sus dudas

    1. Candidate Identification: How do we identify each candidate uniquely in the system? Is it by fullName or do they have a unique id that should be used for the API call?

        Answer: Use the ID to identificate the candidate

    2. Step Identification: How are interview steps identified? The PUT request expects a step ID 1. Are the name fields in the InterviewStep objects mapped to these IDs, or do we need additional information to map step names to their IDs?

        Answer: the step identificator is the value from InterviewStep.id

    3. Error Handling: How should the application behave if the PUT request fails? Should it revert the candidate to their original step in the UI, or display an error message?

        Answer: display an error message

- (siguiente Prompt): Now we're updating the interview step for the candidates when we make the drag&drop but we've an error in the interface because I need to refresh the page to see the candidate in the new step. Could you fix it to improve the UX?

#### NEW CHAT (4) - GOAL: Fix some issues

- I'm having an error on @ProcessStatus.tsx . When the user do the drag&drop to update the interviewstep and the candidates are refreshed, the rest of the candidate appear as duplicated.

(...debugging...)

- Make the necessary changes in this block to get the moved candidate using the property draggableId. This property corresponds with the candidateId inside every object from updatedCandidate 

```
const updatedCandidates = [...candidates]; // Create a shallow copy of candidates
const [movedCandidate] = updatedCandidates.splice(source.draggableId, 1); // Remove the moved candidate from its original position
movedCandidate.currentInterviewStep = destStep.name; // Update the moved candidate's currentInterviewStep
updatedCandidates.splice(destination.index, 0, movedCandidate); // Insert the moved candidate at the new position
```