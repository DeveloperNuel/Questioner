import express from 'express';
import questionController from '../controllers/questionController';

const router = express.Router();
// Question route
router.post('/meetups/:id/questions', questionController.createQuestion);
router.get('/questions/:id', questionController.getSingleQuestion);
router.patch('/questions/:id/upvote', questionController.upvote);
router.patch('/questions/:id/downvote', questionController.downvote);

export default router;
