import express from 'express';
import meetupController from '../controllers/meetupController';
import questionController from '../controllers/questionController';

const router = express.Router();

// Meetups route
router.post('/', meetupController.createMeetup);
router.get('/', meetupController.getAllMeetup);
router.get('/:id', meetupController.getSingle);
router.get('/meetups/upcoming', meetupController.getUpcoming);

// Question route
router.post('/questions', questionController.createQuestion);
router.get('/questions/:id', questionController.getSingleQuestion);
router.patch('/questions/:id/upvote', questionController.upvote);
router.patch('/questions/:id/downvote', questionController.downvote);


export default router;
