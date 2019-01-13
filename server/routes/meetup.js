import express from 'express';
import meetupController from '../controllers/meetupController';
import questionController from '../controllers/questionController';


const router = express.Router();

// Create meetup records
router.post('/', meetupController.createMeetup);
// Fetch all ​Meetup​​ records.
router.get('/', meetupController.getAllMeetup);
// Fetch a specific Meetup​​ record.
router.get('/:id', meetupController.getSingle);

// Fetch all ​Upcoming​​ ​Meetup​​ records.
// router.get('/upcomming', meetupController.getUpcomming);
// Create Question
router.post('/questions', questionController.createQuestion);
// router.get('/question/:id', questionController.getSingleQuestion);
router.patch('/question/:id/upvote', questionController.upVote);
router.patch('/question/:id/downvote', questionController.downVote);


export default router;
