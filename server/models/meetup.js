const meetups = [
  {
    id: 1,
    createdOn: new Date(),
    topic: 'Andela Learning Community',
    location: 'Telecom House',
    happeningOn: '02/03/2019',
    images: 'url',
    tags: ['Newbies', 'Programmer', 'Learning'],
  },
];
const question = [{
  id: 21,
  createdOn: new Date(),
  createdBy: 34,
  meetup: 4,
  title: 'How Do I Become the first in Class',
  body: 'You have to study very hard and collaborate with other classmate',
  votes: 0,
}];

module.export = { meetups, question };
