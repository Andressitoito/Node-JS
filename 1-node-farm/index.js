/* eslint-disable @typescript-eslint/no-unused-vars */

/* FIRST REQUIRE CORE MODULES */
const fs = require('fs');
const http = require('http');
const url = require('url');

/* SECOND REQUIRE THIRD PARTY MODULES */
const slugify = require('slugify');

/* LAST REQUIRE OUR OWN MODULES */
const replaceTemplate = require('./starter/modules/replaceTemplate');

/* ///////////////////////////////////////////// */
//Blocking, synchronous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This es what we know about the avocado ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./starter/txt/output.txt', textOut)
// console.log('File written')

//Non-blocking, asyncronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//     fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3)

//       fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}` ,'utf-8', err => {
//         console.log('Your File has been written')
//       })
//     })
//   })
// })

// console.log('Will read file')
/* ///////////////////////////////////////////// */

/* ///////////////////////////////////////////// */
/* SERVER */
/* ///////////////////////////////////////////// */

const tempOverview = fs.readFileSync(
 `${__dirname}/starter/templates/template_overview.html`,
 'utf-8'
);
const tempCard = fs.readFileSync(
 `${__dirname}/starter/templates/template_card.html`,
 'utf-8'
);
const tempProduct = fs.readFileSync(
 `${__dirname}/starter/templates/template_product.html`,
 'utf-8'
);
const data = fs.readFileSync(
 `${__dirname}/starter/dev-data/data.json`,
 'utf-8'
);
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
console.log(slugify('Fresh avocados', { lower: true }));

const server = http.createServer((req, res) => {
 console.log(req.url);
 console.log(url.parse(req.url, true));
 const { query, pathname } = url.parse(req.url, true);

 console.log(query);
 console.log(pathname);

 // const pathname = req.url;

 // OVERVIEW PAGE
 if (pathname === '/overview' || pathname === '/') {
  res.writeHead(200, {
   'Content-type': 'text/html',
  });

  // the return its implicit whitout the {}
  const cardsHtml = dataObj
   .map((el) => replaceTemplate(tempCard, el))
   .join('');

  const output = tempOverview.replace('{%PRODUCTS_CARDS%}', cardsHtml);
  res.end(output);

  // PRODUCT PAGE
 } else if (pathname === '/product') {
  res.writeHead(200, {
   'Content-type': 'text/html',
  });

  const product = dataObj[query.id];
  const output = replaceTemplate(tempProduct, product);

  res.end(output);

  //API
 } else if (pathname === '/api') {
  res.writeHead(200, {
   'Content-type': 'application/json',
  });
  res.end(data);

  // NOT FOUND
 } else {
  res.writeHead(404, {
   'Content-type': 'text/html',
   'my-own-header': 'hello world',
  });
  res.end(`
    <h1>Page not found!</h1>
    <p style='color: red'>The requested page could not be found<p/>
    `);
 }
});

server.listen(8000, '127.0.0.1', () => {
 console.log('Listening to request on port 8000');
});

/* eslint-enable @typescript-eslint/no-unused-vars */
