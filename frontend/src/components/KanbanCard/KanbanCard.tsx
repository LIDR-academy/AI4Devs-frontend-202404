import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import styles from './KanbanCard.module.css';
import { Candidate } from '../../types/candidate.type';

interface KanbanCardProps {
  candidate: Candidate;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ candidate, index }) => {

  return (
    <Draggable draggableId={`candidate-${candidate.id}`} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className={styles.kanbanCard}>
            <Card.Body>
              <Card.Text className={styles.candidateName}>
                {candidate.name} 
                <div className={styles.candidateScore}>
                  <span>
                    {'🟢'.repeat(Math.floor(candidate.score / 20))}
                  </span>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;