const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 30

setTimeout(() => console.log('timer 1 finisheed'), 0);
setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('test-file.txt', () => {
 console.log('I/O finished')
 setTimeout(() => console.log('timer 2 finisheed'), 0);
 setTimeout(() => console.log('timer 3 finisheed'), 3000);
 /* execute once per loop */
 setImmediate(() => console.log('Immediate 2 finished'))

 /* once per face loop */
 process.nextTick(() => console.log('Process Next Tick'))

 crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
 console.log(Date.now() - start, 'Password Encypted')
 
 crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
 console.log(Date.now() - start, 'Password Encypted')
 
 crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
 console.log(Date.now() - start, 'Password Encypted')
 
 crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512')
 console.log(Date.now() - start, 'Password Encypted')
 
 crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  console.log(Date.now() - start, 'Password Encypted')
 })
 crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  console.log(Date.now() - start, 'Password Encypted')
 })
 crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
  console.log(Date.now() - start, 'Password Encypted')
 })

})

console.log('Hello from the top-level code')