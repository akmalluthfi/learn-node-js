const { log } = require('console');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'test';

const client = new MongoClient(uri);
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

client.connect((error, client) => {
  if (error) {
    return console.log('koneksi gagal');
  }

  const db = client.db(dbName);

  // Menambahkan data ke collections
  // db.collection('mahasiswa').insertOne(
  //   {
  //     nama: 'Coba',
  //     email: 'coba@gmail.com',
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log('gagal menambahkan data');
  //     }

  //     console.log(result);
  //   }
  // );

  // Menambahkan lebih dari satu data
  // db.collection('mahasiswa').insertMany(
  //   [
  //     {
  //       nama: 'Akmal',
  //       email: 'akmal@gmail.com',
  //     },
  //     {
  //       nama: 'Sandhika',
  //       email: 'sandhika@gmail.com',
  //     },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log(error);
  //     }

  //     console.log(result);
  //   }
  // );

  // Menampilkan semua data dimahasiswa collection
  const mhs = db.collection('mahasiswa').find();
  console.log(
    mhs.toArray((error, result) => {
      console.log(result);
    })
  );

  // Menampilkan data berdasarkan filter
  // const mhs = db.collection('mahasiswa').find({ nama: 'Akmal' });
  // console.log(
  //   mhs.toArray((error, result) => {
  //     console.log(result);
  //   })
  // );

  // Mengubah data
  // const update = db
  //   .collection('mahasiswa')
  //   .updateOne(
  //     {
  //       nama: 'Coba',
  //     },
  //     {
  //       $set: {
  //         // email: 'example@example.com',
  //         nama: 'akmall',
  //       },
  //     }
  //   )
  //   .then((result) => {
  //     console.log(result);
  //   });

  // update
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // Mengubah data lebih dari 1
  // db.collection('mahasiswa').updateMany(
  //   {
  //     nama: 'akmall',
  //   },
  //   {
  //     $set: {
  //       email: 'example@gmail.com',
  //     },
  //   },
  //   (err, result) => {
  //     console.log(result);
  //   }
  // );

  // menghapus satu data
  // db.collection('mahasiswa').deleteOne(
  //   {
  //     nama: 'Sandhika',
  //   },
  //   (error, result) => {
  //     console.log(result);
  //   }
  // );

  // menghapus banyak data
  // db.collection('mahasiswa').deleteMany(
  //   {
  //     nama: 'akmall',
  //   },
  //   (error, result) => {
  //     console.log(result);
  //   }
  // );
});
