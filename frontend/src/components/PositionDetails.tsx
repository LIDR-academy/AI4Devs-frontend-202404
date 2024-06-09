import '../styles.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { Position, InterviewStep } from '../interfaces/Position';
import { Candidate } from '../interfaces/Candidate';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchPositionDetails, fetchCandidates, updateCandidateStage } from '../services/positionService';

const ItemType = {
  CANDIDATE: 'candidate',
};

const renderScoreCircles = (score: number) => {
    return Array(score)
      .fill('🟢')
      .join(' ');
  };

const CandidateCard: React.FC<{ candidate: Candidate, moveCandidate: (id: number, newStep: InterviewStep) => void }> = ({ candidate, moveCandidate }) => {
  const [, ref] = useDrag({
    type: ItemType.CANDIDATE,
    item: { id: candidate.id },
  });

  return (
    <Card ref={ref} className="mb-2 candidate-card">
      <Card.Body>
        <Card.Text>
          <strong>{candidate.fullName}</strong>
          <br />
          <span className="score-circles">{renderScoreCircles(candidate.averageScore)}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const InterviewStepColumn: React.FC<{ step: InterviewStep, candidates: Candidate[], moveCandidate: (id: number, newStep: InterviewStep) => void }> = ({ step, candidates, moveCandidate }) => {
  const [, ref] = useDrop({
    accept: ItemType.CANDIDATE,
    drop: (item: { id: number }) => moveCandidate(item.id, step),
  });

  return (
    <Col ref={ref} key={step.id} md={4} className="mb-4">
      <Card className="shadow-sm interview-step-card">
        <Card.Body>
          <Card.Title className="interview-step-title">{step.name}</Card.Title>
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} moveCandidate={moveCandidate} />
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
};

const PositionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [position, setPosition] = useState<Position | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const positionData = await fetchPositionDetails(id);
      setPosition(positionData);
      const candidatesData = await fetchCandidates(id);
      setCandidates(candidatesData);
    };

    fetchData();
  }, [id]);

  const moveCandidate = async (candidateId: number, newStep: InterviewStep) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    await updateCandidateStage(candidateId, candidate.applicationId, newStep.id);
    setCandidates(candidates.map(c => c.id === candidateId ? { ...c, currentInterviewStep: newStep.name } : c));
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <Container className="mt-5 position-details-container">
      <Row className="mb-4">
        <Col>
          <Link to="/positions">
            <Button variant="link">
              <ArrowLeft size={24} />
            </Button>
          </Link>
          <h1 className="position-title">{position?.positionName}</h1>
        </Col>
      </Row>
      <Row>
        {position?.interviewFlow?.interviewSteps?.map((step) => (
          <InterviewStepColumn key={step.id} step={step} candidates={candidates.filter(c => c.currentInterviewStep === step.name)} moveCandidate={moveCandidate} />
        ))}
      </Row>
    </Container>
    </DndProvider>
  );
};

export default PositionDetails;
