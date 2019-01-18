import express from 'express';
import meetupController from '../controllers/meetupController';
import questionController from '../controllers/questionController';


const router = express.Router();

// Meetups route
router.get('/', meetupController.getAllMeetup);
router.get('/:id', meetupController.getSingle);
router.get('/upcoming', meetupController.getUpcoming);
router.post('/:id/rsvps', meetupController.respond);
router.post('/:id/questions', questionController.createQuestion);
router.post('/', meetupController.createMeetup);

export default router;
