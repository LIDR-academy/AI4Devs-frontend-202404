import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const CandidateDetails = ({ candidate, onClose }) => {
    const [candidateDetails, setCandidateDetails] = useState(null);
    const [newInterview, setNewInterview] = useState({
        notes: '',
        score: 0
    });

    useEffect(() => {
        if (candidate) {
            fetch(`http://localhost:3010/candidates/${candidate.id}`)
                .then(response => response.json())
                .then(data => setCandidateDetails(data))
                .catch(error => console.error('Error fetching candidate details:', error));
        }
    }, [candidate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInterview({
            ...newInterview,
            [name]: value
        });
    };

    const handleScoreChange = (score) => {
        setNewInterview({
            ...newInterview,
            score
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3010/candidates/${candidate.id}/interviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInterview)
        })
            .then(response => response.json())
            .then(data => {
                // Update the candidate details with the new interview
                setCandidateDetails(prevDetails => ({
                    ...prevDetails,
                    applications: prevDetails.applications.map(app => {
                        if (app.id === data.applicationId) {
                            return {
                                ...app,
                                interviews: [...app.interviews, data]
                            };
                        }
                        return app;
                    })
                }));
                // Reset the form
                setNewInterview({
                    notes: '',
                    score: 0
                });
                // Close the panel
                onClose();sl
            })
            .catch(error => console.error('Error creating interview:', error))
            .finally(() => onClose())
    };

    return (
        <Offcanvas show={!!candidate} onHide={onClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Detalles del Candidato</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {candidateDetails ? (
                    <>
                        <h5>{candidateDetails.firstName} {candidateDetails.lastName}</h5>
                        <p>Email: {candidateDetails.email}</p>
                        <p>Phone: {candidateDetails.phone}</p>
                        <p>Address: {candidateDetails.address}</p>
                        <h6>Educations</h6>
                        {candidateDetails.educations.map(edu => (
                            <div key={edu.id}>
                                <p>{edu.institution} - {edu.title}</p>
                                <p>{new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                        <h6>Work Experiences</h6>
                        {candidateDetails.workExperiences.map(work => (
                            <div key={work.id}>
                                <p>{work.company} - {work.position}</p>
                                <p>{work.description}</p>
                                <p>{new Date(work.startDate).toLocaleDateString()} - {new Date(work.endDate).toLocaleDateString()}</p>
                            </div>
                        ))}
                        <h6>Resumes</h6>
                        {candidateDetails.resumes.map(resume => (
                            <div key={resume.id}>
                                <p><a href={resume.filePath} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
                            </div>
                        ))}
                        <h6>Applications</h6>
                        {candidateDetails.applications.map(app => (
                            <div key={app.id}>
                                <p>Position: {app.position.title}</p>
                                <p>Application Date: {new Date(app.applicationDate).toLocaleDateString()}</p>
                                <h6>Interviews</h6>
                                {app.interviews.map(interview => (
                                    <div key={interview.interviewDate}>
                                        <p>Interview Date: {new Date(interview.interviewDate).toLocaleDateString()}</p>
                                        <p>Step: {interview.interviewStep.name}</p>
                                        <p>Notes: {interview.notes}</p>
                                        <p>Score: {interview.score}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <h6>Registrar Nueva Entrevista</h6>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formNotes">
                                <Form.Label>Notas</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="notes"
                                    value={newInterview.notes}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formScore">
                                <Form.Label>Puntuación</Form.Label>
                                <div>
                                    {[1, 2, 3, 4, 5].map(score => (
                                        <span
                                            key={score}
                                            style={{
                                                cursor: 'pointer',
                                                color: newInterview.score >= score ? 'gold' : 'gray'
                                            }}
                                            onClick={() => handleScoreChange(score)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Registrar
                            </Button>
                        </Form>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CandidateDetails;
