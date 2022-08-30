// Core Module
// File System 

const { log, error } = require('console');
const fs = require('fs');

// Menuliskan string ke file (synchronous)

// try {
//   fs.writeFileSync('data/test.txt', 'hello world');
// } catch (err) {
//   console.log(err);
// }

// Menuliskan string ke file (asynchronous)

// fs.writeFile('data/test.txt', 'Hello world secara asynchronous', (e) => {
//   console.log(e);
// });

// Membaca isi file secara synchronous
// const data = fs.readFileSync('data/test.txt', {
//   encoding: 'utf-8'
// });

// console.log(data);


// Membaca isi file secara asynchronous

// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// rl.question('Masukkan nama : ', (nama) => {
//   console.log(`Halo ${nama}`);

//   rl.close();
// });

// membuat multiple input

// rl.question('Nama : ', (nama) => {
//   rl.question('Umur : ', (umur) => {
//     console.log(`Perkenalkan saya ${nama}, saya berumur ${umur}`);
//     rl.close();
//   })
// });

// Coba menuliskan ke file sesuai yang diinputkan oleh user 

rl.question('Masukkan nama : ', (nama) => {
  rl.question('Masukkan no.tlp : ', (noTlp) => {

    const newContact = { nama, noTlp }
    const file = fs.readFileSync('data/contacts.json', {
      encoding: 'utf-8'
    });
    const contacts = JSON.parse(file);
    contacts.push(newContact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('saved');

    rl.close();
  })

})



