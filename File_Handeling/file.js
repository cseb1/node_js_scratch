const { log, error } = require('console');
const fs = require('fs');
//console.log(fs);


// create or write file 
// sync .. 
//fs.writeFileSync('./test.txt', "Hey i am a file creating in file handeling")

// Async..
// fs.writeFile('./test.txt', 'Hey there Async .. call', (error) => {
//     console.log(error);
// })


// reading the existing file

// Sync.. call
// Sync call return the result
// const result = fs.readFileSync('./contact.txt', "utf-8");
// console.log(result);


// Async call

// fs.readFile('./contact.txt', "utf-8", (error, data) => {
//     if (error) {
//         console.log("Error:", error);
//     } else {
//         console.log(data);
//     }
// })


// append data in existing file
// writeFile method overwrite the content

// Synchronous call
// fs.appendFileSync('./test.txt', `hey there\n`);


// Asynchronous call..

// fs.appendFile('./contact.txt', 'Deepika: 91 455353535', "utf-8", (error) => {
//     if (error) throw err;
//     console.log('The "data to append" was appended to file!');
// });

// copy the existing file
// fs.cpSync('./contact.txt', './diary.txt');

// unlink / delete the file

// fs.unlinkSync('./diary.txt')


// check the file status

// console.log(fs.statSync('./contact.txt'));

//  create the Directory

// fs.mkdirSync('./Hello');