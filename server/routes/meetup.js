import express from 'express';
import meetupController from '../controllers/meetupController';


const router = express.Router();

// Meetups route
router.post('/', meetupController.createMeetup);
router.get('/', meetupController.getAllMeetup);
router.get('/:id', meetupController.getSingle);
router.get('/meetups/upcoming', meetupController.getUpcoming);
router.post('/meetups/:id/rsvps', meetupController.respond);

export default router;
