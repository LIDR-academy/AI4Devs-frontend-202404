// Hook personalizado para obtener detalles de una posición y sus candidatos
import { useState, useEffect } from 'react';
import { getPositionDetails, getCandidatesByPosition } from '../services/positionService';
import { Candidate } from '../components/PositionDetails';

const usePositionDetails = (id: string) => {
    const [position, setPosition] = useState<any>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const positionData = await getPositionDetails(Number(id));
                setPosition(positionData.interviewFlow);
                const candidatesData = await getCandidatesByPosition(Number(id));
                setCandidates(candidatesData);
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setError('No se encontró la posición solicitada.');
                } else {
                    setError('Error al obtener los detalles de la posición.');
                }
            }
        };
        fetchDetails();
    }, [id]);

    return { position, candidates, error, setCandidates };
};

export default usePositionDetails;