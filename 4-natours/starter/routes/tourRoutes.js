const express = require('express');
const tourController = require('../controllers/tourController');

const { getAllTours, createTour, getTour, updateTour, deleteTour } =
  tourController;
const router = express.Router();

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// router.param('id', tourController.checkId);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);
  // .post(tourController.checkBody, createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
