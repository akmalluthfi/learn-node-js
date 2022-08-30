const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');

// Route
const contactRoute = require('./routes/contact');

const app = express();
const port = 3000;

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// serving static file
app.use(express.static('public'));

// session config
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// ejs layout configuration
app.set('view engine', 'ejs');
app.use(expressLayout);

// TODO: render home page
app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Akmal Luthfi',
      email: 'akmalluthfi19@gmail.com',
    },
    {
      nama: 'Nando Septian Prisandy',
      email: 'nando@gmail.com',
    },
    {
      nama: 'Achmad Zuhril Facrizal',
      email: 'zuhril@gmail.com',
    },
  ];
  res.render('index', {
    active: 'home',
    title: 'Home Page',
    nama: 'Akmal Luthfi',
    mahasiswa,
    layout: 'layouts/main-layouts',
  });
});

// TODO: render about page
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'layouts/main-layouts',
    active: 'about',
    title: 'About Page',
  });
});

// TODO: handle contact route
app.use('/contact', contactRoute);

// TODO: handle error page
app.use((req, res) => {
  res.status(404);
  res.render('error-page', {
    layout: 'layouts/main-layouts',
    active: 'error',
    title: 'Error Page',
  });
});

app.listen(port, 'localhost', () => {
  console.log(`Example app listening on port ${port}`);
});
