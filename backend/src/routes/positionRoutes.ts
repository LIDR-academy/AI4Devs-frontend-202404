import { getCandidatesByPosition, getInterviewFlowByPosition, getAllPositions, getPositionById } from '../presentation/controllers/positionController';


const router = require('express').Router();

router.get('/', getAllPositions);
router.get('/:id', getPositionById);
router.get('/:id/candidates', getCandidatesByPosition);
router.get('/:id/interviewflow', getInterviewFlowByPosition);



export default router;

