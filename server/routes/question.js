import express from 'express';
import questionController from '../controllers/questionController';

const router = express.Router();
// Question route
router.get('/:id', questionController.getSingleQuestion);
router.patch('/:id/upvote', questionController.upvote);
router.patch('/:id/downvote', questionController.downvote);

export default router;
