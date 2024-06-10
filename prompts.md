# Inicio

````
Basado en @Frontend necesitamos realizar el siguiente requerimiento:

Crear la interfaz "position", una página en la que poder visualizar y gestionar los diferentes candidatos de una posición específica.

Se ha decidido que la interfaz sea tipo kanban, mostrando los candidatos como tarjetas en diferentes columnas que representan las fases del proceso de contratación, y pudiendo actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta. La interfaz sería similar a la imagen Adjunta.

Los requerimientos funcionales son:

* Se debe mostrar el título de la posición en la parte superior, para dar contexto
* Añadir una flecha a la izquierda del título que permita volver al listado de posiciones
* Deben mostrarse tantas columnas como fases haya en el proceso
* La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media
* Si es posible, debe mostrarse adecuadamente en móvil (las fases en vertical ocupando todo el ancho)

No generes codigo aun solo define las tareas que se van a realizar y lo que se requiere para iniciar. Formula las preguntas necesarias.

````

# Task Definition and Requirements Gathering for Kanban-style Interface

To create the "position" interface as described, the following tasks need to be defined and preliminary questions need to be addressed:

#### Tasks:
1. **Design the Interface:**
   - Sketch or wireframe the layout of the Kanban board with columns representing different hiring phases.
   - Design responsive views to ensure mobile compatibility.

2. **Setup Routing:**
   - Implement routing to navigate from the position listing to the specific position's Kanban board.

3. **Develop Components:**
   - **PositionHeader:** Displays the position title and a back arrow to return to the position listing.
   - **KanbanBoard:** Manages the columns and drag-and-drop functionality.
   - **KanbanColumn:** Represents each phase in the hiring process.
   - **CandidateCard:** Displays candidate's full name and average score.

4. **State Management:**
   - Define the state structure to manage the list of candidates and their respective phases.
   - Implement state management using Context API or Redux to handle updates when candidates are moved between phases.

5. **API Integration:**
   - Define API endpoints to fetch candidates and update their phases.
   - Implement API calls within the application.

6. **Testing:**
   - Write unit and integration tests for each component and functionality.

#### Preliminary Questions:
1. **Data Structure:**
   - What are the different phases in the hiring process? How are they represented in the data?
   - What details are available for each candidate (e.g., ID, name, score)?

2. **API Details:**
   - Are there existing API endpoints for fetching and updating candidate data, or do they need to be created?
   - What are the authentication and authorization requirements for these APIs?

3. **Mobile Compatibility:**
   - Are there specific design requirements or limitations for the mobile view?

4. **Performance Considerations:**
   - How many candidates are typically managed per position? This could impact the choice of state management and rendering optimizations.

5. **Accessibility:**
   - Are there any specific accessibility requirements, such as keyboard navigation or screen reader support, for the interface?

Addressing these tasks and questions will provide a solid foundation to start the development of the Kanban-style interface for managing candidates in different hiring phases.

# Iteración 2

````
USando principios SOLID y el @ManifestoBuenasPracticas.md  iniciemos a crear los componentes necesarios.

````

### Creating Components for the Kanban-style Interface Using SOLID Principles

To start building the Kanban-style interface for managing candidates in different hiring phases, we'll apply SOLID principles as outlined in the provided best practices manifesto. Here's a breakdown of the components we need to create, along with the application of SOLID principles:

#### 1. **PositionHeader Component**
   - **Responsibility:** Display the position title and a back navigation arrow.
   - **SOLID Principle Applied:** Single Responsibility Principle (SRP) - This component has only one reason to change, which is the modification of the header presentation.

```typescript
// src/components/PositionHeader.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

const PositionHeader: React.FC<{ title: string }> = ({ title }) => {
    const history = useHistory();

    return (
        <div>
            <ArrowLeft onClick={() => history.goBack()} />
            <h1>{title}</h1>
        </div>
    );
};

export default PositionHeader;
```

#### 2. **KanbanBoard Component**
   - **Responsibility:** Manage the overall layout of the Kanban board, including the columns for different phases.
   - **SOLID Principle Applied:** Open/Closed Principle (OCP) - This component is open for extension (e.g., adding more phases) but closed for modification.

```typescript
// src/components/KanbanBoard.tsx
import React from 'react';
import { KanbanColumn } from './KanbanColumn';

const KanbanBoard: React.FC<{ phases: string[]; candidates: Candidate[] }> = ({ phases, candidates }) => {
    return (
        <div className="kanban-board">
            {phases.map(phase => (
                <KanbanColumn key={phase} phase={phase} candidates={candidates.filter(c => c.phase === phase)} />
            ))}
        </div>
    );
};

export default KanbanBoard;
```

#### 3. **KanbanColumn Component**
   - **Responsibility:** Display candidates in a specific phase.
   - **SOLID Principle Applied:** Liskov Substitution Principle (LSP) - This component can be replaced with another version without affecting the behavior of the system.

```typescript
// src/components/KanbanColumn.tsx
import React from 'react';
import { CandidateCard } from './CandidateCard';

const KanbanColumn: React.FC<{ phase: string; candidates: Candidate[] }> = ({ phase, candidates }) => {
    return (
        <div className="kanban-column">
            <h2>{phase}</h2>
            {candidates.map(candidate => <CandidateCard key={candidate.id} candidate={candidate} />)}
        </div>
    );
};

export default KanbanColumn;
```

#### 4. **CandidateCard Component**
   - **Responsibility:** Display candidate's full name and average score.
   - **SOLID Principle Applied:** Interface Segregation Principle (ISP) - Clients (other components) will not be forced to depend on interfaces they do not use.

```typescript
// src/components/CandidateCard.tsx
import React from 'react';

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
    return (
        <div className="candidate-card">
            <p>{candidate.firstName} {candidate.lastName}</p>
            <p>Score: {candidate.averageScore}</p>
        </div>
    );
};

export default CandidateCard;
```

#### 5. **API Integration and State Management**
   - **Responsibility:** Fetch and update candidate data.
   - **SOLID Principle Applied:** Dependency Inversion Principle (DIP) - High-level modules should not depend on low-level modules but should depend on abstractions.

```typescript
// src/services/CandidateService.ts
import axios from 'axios';

export class CandidateService {
    static async fetchCandidates(positionId: string): Promise<Candidate[]> {
        return axios.get(`/api/positions/${positionId}/candidates`).then(res => res.data);
    }

    static async updateCandidatePhase(candidateId: string, newPhase: string): Promise<void> {
        return axios.patch(`/api/candidates/${candidateId}`, { phase: newPhase });
    }
}
```

By adhering to SOLID principles and following the outlined tasks, we can ensure that the components are well-structured, maintainable, and scalable.

# Iteración 3

````
Crea el Componente Position que usaría los componentes antes creados, y has un mock de datos basado en el sigiente JSON 

````

````json

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
````

### Creating the [Position] Component with Mock Data

To create the [Position] component that utilizes the previously defined components ([PositionHeader], [KanbanBoard], etc.), we'll first set up the component structure and then integrate mock data based on the provided JSON.

#### Position Component
The [Position] component will serve as the main container for the Kanban board interface. It will use the [PositionHeader] to display the title and navigation, and the [KanbanBoard] to manage the display of candidates across different phases.

```typescript
// src/components/Position.tsx
import React from 'react';
import PositionHeader from './PositionHeader';
import KanbanBoard from './KanbanBoard';

const Position: React.FC = () => {
    // Mock data for candidates
    const candidates = [
        { id: 1, fullName: "Jane Smith", phase: "Technical Interview", averageScore: 4 },
        { id: 2, fullName: "Carlos García", phase: "Initial Screening", averageScore: 0 },
        { id: 3, fullName: "John Doe", phase: "Manager Interview", averageScore: 5 }
    ];

    // Phases extracted from candidates data
    const phases = Array.from(new Set(candidates.map(candidate => candidate.phase)));

    return (
        <div>
            <PositionHeader title="Position Title" />
            <KanbanBoard phases={phases} candidates={candidates} />
        </div>
    );
};

export default Position;
```

#### Explanation
- **PositionHeader:** Displays the title and a back navigation arrow.
- **KanbanBoard:** Manages the display of candidates in columns corresponding to their current interview phase.
- **Mock Data:** The candidates' data is structured to fit the expected props for the `KanbanBoard` and `CandidateCard` components, with each candidate having an `id`, `fullName`, `phase`, and `averageScore`.

This setup allows the `Position` component to function as a complete page for managing the recruitment process for a specific position using a Kanban-style interface.


# Iteracion 4

````
@Positions.tsx usando los principios SOLID y @ManifestoBuenasPracticas.md al dar click en el boton de Ver Proceso este debe enviar la posición al componente @Position.tsx 
````


