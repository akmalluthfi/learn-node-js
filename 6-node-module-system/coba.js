function cetakNama(nama) {
  return `Hi, nama saya ${nama};`;
}

const PI = 3.14;

const mhs = {
  nama: 'Akmal Luthfi',
  umur: 17,
  cetakMhs() {
    return `Halo, nama saya ${this.nama}. dan saya umur ${this.umur} tahun.`
  }
}

class Orang {
  constructor() {
    console.log('Object orang telah dibuat');
  }
}


// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mhs = mhs;
// module.exports.Orang = Orang;

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mhs: mhs,
//   Orang: Orang,
// }

module.exports = { cetakNama, PI, mhs, Orang };