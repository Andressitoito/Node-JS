const fs = require('fs')
const express = require('express')

const app = express() // creo el servidor
app.use(express.json()) // transformo a objeto las requests

app.get('/api/v1/test', (req, res) =>{
 res.status(200).json({
  message: "hello from the server",
  app: 'test 01'
 })
})



const port = 7000

app.listen(port, () => {
 console.log(`App running on port ${port}`)
})