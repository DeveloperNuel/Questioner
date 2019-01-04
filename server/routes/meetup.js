import express from 'express';
import meetupController from '../controllers/meetupController';


const router = express.Router();

// Create meetup records
router.post('/', meetupController.createMeetup);
// Fetch all ​Meetup​​ records.
router.get('/', meetupController.getAllMeetup);
// Fetch a specific Meetup​​ record.
router.get('/:id', meetupController.getSingle);

// Fetch all ​Upcoming​​ ​Meetup​​ records.
// router.get('/meetups/upcomming', meetupController.getUpcomming);


export default router;
