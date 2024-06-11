import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Position = {
  id: number;
  title: string;
  status: "Abierto" | "Contratado" | "Cerrado" | "Borrador";
  applicationDeadline: string;
  company: {
    name: string;
  };
};

const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/position`
        );
        const data = await response.json();
        setPositions(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  return { positions, loading, error };
};

const Positions: React.FC = () => {
  const { positions, loading, error } = usePositions();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Posiciones</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control type="text" placeholder="Buscar por título" />
        </Col>
        <Col md={3}>
          <Form.Control type="date" placeholder="Buscar por fecha" />
        </Col>
        <Col md={3}>
          <Form.Control as="select">
            <option value="">Estado</option>
            <option value="open">Abierto</option>
            <option value="filled">Contratado</option>
            <option value="closed">Cerrado</option>
            <option value="draft">Borrador</option>
          </Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control as="select">
            <option value="">Manager</option>
            <option value="john_doe">John Doe</option>
            <option value="jane_smith">Jane Smith</option>
            <option value="alex_jones">Alex Jones</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        {positions.map((position) => (
          <Col md={4} key={position.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{position.title}</Card.Title>
                <Card.Text>
                  <strong>Company:</strong> {position.company.name}
                  <br />
                  <strong>Deadline:</strong> {position.applicationDeadline}
                </Card.Text>
                <span
                  className={`badge ${
                    position.status === "Abierto"
                      ? "bg-warning"
                      : position.status === "Contratado"
                      ? "bg-success"
                      : position.status === "Borrador"
                      ? "bg-secondary"
                      : "bg-warning"
                  } text-white`}
                >
                  {position.status}
                </span>
                <div className="d-flex justify-content-between mt-3">
                  <Link to={`/position/${position.id}`}>
                    <Button variant="primary">Ver proceso</Button>
                  </Link>
                  <Button variant="secondary">Editar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Positions;
