import { Request, Response } from 'express';
import { getCandidatesByPositionService, getInterviewFlowByPositionService, getAllPositionsService, getPositionByIdService } from '../../application/services/positionService';

export const getCandidatesByPosition = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        const candidates = await getCandidatesByPositionService(positionId);
        res.status(200).json(candidates);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error retrieving candidates', error: error.message });
        } else {
            res.status(500).json({ message: 'Error retrieving candidates', error: String(error) });
        }
    }
};

export const getInterviewFlowByPosition = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        const interviewFlow = await getInterviewFlowByPositionService(positionId);
        res.status(200).json({ interviewFlow });
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ message: 'Position not found', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: String(error) });
        }
    }
};

export const getAllPositions = async (req: Request, res: Response) => {
    console.log("Ingresa al controller")
    try {
        const positions = await getAllPositionsService();
        res.json(positions);
    } catch (error) {
        console.error('Error retrieving positions:', error);
        res.status(500).json({ message: 'Error retrieving positions' });
    }
};

export const getPositionById = async (req: Request, res: Response) => {
    try {
        const positionId = Number(req.params.id);
        const position = await getPositionByIdService(positionId);
        res.json(position);
    } catch (error) {
        console.error('Error retrieving position:', error);
        res.status(500).json({ message: 'Error retrieving position' });
    }
};
