const fs = require('fs')
const express = require('express');

const app = express();

app.use(express.json())

app.use((req, res, next) => {

})



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


const getAllTours = (req, res) => {
 res.status(200)
  .json({
   status: 'success',
   results: tours.length,
   data: {
    tours: tours
   }
  })
}

const getTour = (req, res) => {
 console.log(req.params)

 const id = req.params.id * 1
 const tour = tours.find(el => el.id === id)

 // if(id > tours.length){
 if (!tour) {
  return res.status(404).json({
   status: 'Failed',
   message: 'Invalid Id'
  })
 }

 res.status(200)
  .json({
   status: 'success',
   results: tours.length,
   data: {
    tour: tour
   }
  })
}

const createTour = (req, res) => {
 // console.log(req.body)
 const newId = tours[tours.length - 1].id + 1
 const newTour = Object.assign({ id: newId }, req.body)

 tours.push(newTour)
 fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
  res.status(201).json({
   status: 'success',
   data: {
    tour: newTour
   }
  })
 })
}

const deleteTour = (req, res) => {
 if (req.params.id * 1 > tours.length) {
  return res.status(404).json({
   status: 'Failed',
   message: 'Invalid ID'
  })
 }

 res.status(204).json({
  status: 'success',
  data: {
   tour: null
  }
 })
}

const updateTour = (req, res) => {
 if (req.params.id * 1 > tours.length) {
  return res.status(404).json({
   status: 'Failed',
   message: 'Invalid ID'
  })
 }

 res.status(200)
  .json({
   status: 'success',
   data: {
    tour: '<Updated Tour Here>'
   }
  })
}

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
 .route('/api/v1/tours')
 .get(getAllTours)
 .post(createTour)

app.route('/api/v1/tours:id')
 .get(getTour)
 .patch(updateTour)
 .delete(deleteTour)

const port = 3000;
app.listen(port, () => {
 console.log(`App running on port ${port}...`);
});










/* 

problema de capa 8 es un chiste
capa de aplicacion

OSI
https con seguridad

400 
404 a nivel api
404 no existe pagina
401 unautorized 
403 forbidden
415 soy una tetera

https://app.getpostman.com/join-team?invite_code=e4be0796037d2ea90b3aceffb7b4270d
*/
