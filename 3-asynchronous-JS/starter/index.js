const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
 return new Promise((resolve, reject) => {
  fs.readFile(file, (err, data) => {
   if (err) reject('I could not find that file');
   resolve(data);
  });
 });
};

const writeFilePromise = (file, data) => {
 return new Promise((resolve, reject) => {
  fs.writeFile(file, data, (err) => {
   if (err) reject('I could not write that file');
   resolve('Success');
  });
 });
};

const getDogPic = async () => {
 try {
  const data = await readFilePromise(`${__dirname}/dog.txt`);
  console.log(`Breed: ${data}`);

  const res1Promise = superagent.get(
   `https://dog.ceo/api/breed/${data}/images/random`
  );

  const res2Promise = superagent.get(
   `https://dog.ceo/api/breed/${data}/images/random`
  );

  const res3Promise = superagent.get(
   `https://dog.ceo/api/breed/${data}/images/random`
  );

  const all = await Promise.all([res1Promise, res2Promise, res3Promise])
  const images = all.map(el => el.body.message)
  console.log(images)

  await writeFilePromise('dog-img.txt', images.join('\n'));
  console.log('Random dog image saved to file');
 } catch (err) {
  console.log(err);
  throw err;
 }
 return '2: Ready';
};

(async () => {
 try {
  console.log('1: will get dog pics');

  const response = await getDogPic();
  console.log(response);

  console.log('3: done get dog pics');
 } catch (err) {
  console.log('ERROR');
 }
})();

/* console.log('1: will get dog pics')
getDogPic()
.then((data) =>{
 console.log(data)
 console.log('3: done get dog pics')
})
.catch(err =>{
 console.log('ERROR')
})
 */
/* 
readFilePromise(`${__dirname}/dog.txt`)
 .then((data) => {
  console.log(`Breed: ${data}`);
  return superagent
   .get(`https://dog.ceo/api/breed/${data}/images/random`)
 })
 .then((res) => {
  console.log(res.body.message);
  return writeFilePromise('dog-img.txt', res.body.message)
 })
 .then(() => {
  console.log('Random dog image saved to file')
 })
 .catch((err) => {
  console.log(err);
 })

 */
