import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

const mockPositions = [
    { title: 'Senior Backend Engineer', manager: 'John Doe', deadline: '2024-12-31', status: 'Abierto' },
    { title: 'Junior Android Engineer', manager: 'Jane Smith', deadline: '2024-11-15', status: 'Contratado' },
    { title: 'Product Manager', manager: 'Alex Jones', deadline: '2024-07-31', status: 'Borrador' }
];

const PositionDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const position = mockPositions[parseInt(id || '0')];

    if (!position) {
        return <div>Posición no encontrada</div>;
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">{position.title}</h2>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Información de la Posición</Card.Title>
                            <Card.Text>
                                <strong>Manager:</strong> {position.manager}<br />
                                <strong>Deadline:</strong> {position.deadline}<br />
                                <strong>Status:</strong> {position.status}
                            </Card.Text>
                            <Button variant="primary">Aplicar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Por Hacer</Card.Title>
                                    {/* Aquí irían las tareas por hacer */}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>En Progreso</Card.Title>
                                    {/* Aquí irían las tareas en progreso */}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Hecho</Card.Title>
                                    {/* Aquí irían las tareas hechas */}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PositionDetails;