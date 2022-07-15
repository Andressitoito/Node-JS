const EventEmitter = require('events')
const http = require('http')

class Sales extends EventEmitter {
 constructor() {
  super()
 }
}

const myEmitter = new EventEmitter()

myEmitter.on('newSale', () => {
 console.log('thre was a new sale!')
})

myEmitter.on('newSale', () => {
 console.log('Costumer Name: Jonas')
})

myEmitter.on('newSale', stock => {
 console.log(`there are now ${stock} items left in stock`)
})

myEmitter.emit('newSale', 9)

//////////////////////////////////////////////
const server = http.createServer()

server.on('request', (req, res) => {
console.log('Request Received')
console.log(req.url)
res.end('Request Received')
})

server.on('request', (req, res) => {
console.log('Second Request Received')
 })

 server.on('close', () => {
  console.log('Server Closed')
 })

 server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for request...')
 })