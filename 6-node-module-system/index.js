// const nama = 'Akmal Luthfi';
// console.log(nama);
// const cetakNama = nama => `Hi, nama saya ${nama}`;

// console.log(cetakNama(nama));

// const fs = require('fs'); //Core Module
// const cetakNama = require('./coba'); //local Module
// const moment = require('moment'); //nmp module

// const cetakNama = require('./coba');
// const PI = require('./coba');

const coba = require('./coba');
// console.log(coba);

console.log(coba.cetakNama('Akmal'), coba.PI);

console.log(coba.mhs.cetakMhs());

console.log(new coba.Orang);