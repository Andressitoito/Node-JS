// const fs = require('fs')
const Tour = require('./../models/tourModel')

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// exports.checkId = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`)

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'Failed',
//       message: 'Invalid ID'
//     })
//   }
//   next()
// }

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'Failed',
//       message: 'Missing NAME or PRICE'
//     })
//   }
//   next()
// }

exports.getAllTours = async (req, res) => {
 // console.log(req.requestTime)
 try {
  const queryObj = ...req.query

  console.log(req.query)
  
  const tours = await Tour.find(req.query)
  
  // const tours = await Tour.find()
  // .where('duration')
  // .equals(5)
  // .where('difficulty')
  // .equals('easy')

  res.status(200)
   .json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
     tours: tours
    }
   })
 } catch (err) {
  res.status(404).json({
   status: 'Failed',
   message: err
  })
 }

}

exports.getTour = async (req, res) => {
 try {
  // this id comes from routes :id we call 
  // :id so we use that name
  const tour = await Tour.findById(req.params.id)

  res.status(200)
   .json({
    status: 'success',
    data: {
     tour: tour
    }
   })
 } catch (err) {
  res.status(404).json({
   status: 'Failed',
   message: err
  })
 }
 // const id = req.params.id * 1
 // const tour = tours.find(el => el.id === id)
}

exports.createTour = async (req, res) => {
 try {

  // const newTours = newTour({})
  // newTour.save()

  const newTour = await Tour.create(req.body)

  res.status(201).json({
   status: 'success',
   data: {
    tour: newTour
   }
  })
 } catch (err) {
  res.status(400).json({
   status: 'Failed',
   message: err
  })
 }


 // const newId = tours[tours.length - 1].id + 1
 // const newTour = Object.assign({ id: newId }, req.body)
 // console.log(newId)
 // console.log(newTour)

 // tours.push(newTour)
 // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
 //   res.status(201).json({
 //     status: 'success',
 //     data: {
 //       tour: newTour
 //     }
 //   })
 // })
}

exports.deleteTour = async (req, res) => {
 try {
  await Tour.findByIdAndDelete(req.params.id)

  res.status(204).json({
   status: 'success',
   data: {
    tour: null
   }
  })
 } catch (err) {
  res.status(400).json({
   status: 'Failed',
   message: 'Invalid id sent!', err
  })
 }
}

exports.updateTour = async (req, res) => {
 try {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
   new: true,
   runValidators: true
  })
  res.status(200)
   .json({
    status: 'success',
    data: {
     tour: tour
    }
   })
 } catch (err) {
  res.status(400).json({
   status: 'Failed',
   message: 'Invalid data sent!'
  })
 }

}