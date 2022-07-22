const express = require('express');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// 1 MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
 console.log('Hello from the middleware')
 /* NEVER FORGET NEXT */
 next()
})

app.use((req, res, next) => {
 req.requestTime = new Date().toISOString()
 next()
})

// 2 ROUTE HANDLERS

// 3 ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// 4 START SERVER


module.exports = app







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
