import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Col, Card } from 'react-bootstrap';
import KanbanCard from '../KanbanCard/KanbanCard';
import styles from './KanbanColumn.module.css';
import { InterviewStep } from '../../types/inverviewFlow.type';
import { Candidate } from '../../types/candidate.type';

interface KanbanColumnProps {
  step: InterviewStep;
  candidates: Candidate[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, candidates }) => {
  return (
    <Col md={3} className={styles.kanbanColumn}>
      <Droppable droppableId={step.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Card className={styles.kanbanCard}>
              <Card.Header>{step.name}</Card.Header>
              <Card.Body>
                {candidates.map((candidate, index) => (
                  <KanbanCard key={candidate.name} candidate={candidate} index={index} />
                ))}
                {provided.placeholder}
              </Card.Body>
            </Card>
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default KanbanColumn;