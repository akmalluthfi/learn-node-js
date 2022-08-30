const express = require('express');
const router = express.Router();
const session = require('express-session');
const methodOverride = require('method-override');

const { body, validationResult, check } = require('express-validator');

// session config
router.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Model
require('../utils/db');
const Contact = require('../model/contact');

// override with POST having ?_method=DELETE
router.use(methodOverride('_method'));

// TODO: render contact page
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.render('contact', {
    layout: 'layouts/main-layouts',
    active: 'contact',
    title: 'Contact Page',
    contacts,
    msg: req.session.msg,
  });
});

// TODO: render add page
router.get('/add', (req, res) => {
  res.render('contact-add', {
    active: 'contact',
    layout: 'layouts/main-layouts',
    title: 'add new contact',
    errors: false,
  });
});

// TODO: render edit page
router.get('/edit/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  res.render('contact-edit', {
    layout: 'layouts/main-layouts',
    active: 'contact',
    title: 'Edit Contact',
    errors: false,
    contact,
  });
});

// TODO: handle request method post (change data)
router.post(
  '/',
  [
    body('name').custom(async (value) => {
      const contact = await Contact.findOne({ name: value });
      if (contact) {
        throw new Error('Name already in use');
      }
      return true;
    }),
    check('email', 'invalid email').isEmail(),
    check('phoneNumber', 'invalid phone number').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('contact-add', {
        active: 'contact',
        layout: 'layouts/main-layouts',
        title: 'add new contact',
        inputOld: req.body,
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body).then((result) => {
        req.session.msg = 'contact added successfully';
        res.redirect('/contact');
      });
    }
  }
);

// TODO: delete contact
router.delete('/', (req, res) => {
  Contact.deleteOne({ _id: req.body.id }).then((result) => {
    req.session.msg = 'contact deleted successfully';
    res.redirect('/contact');
  });
});

// TODO: update contact
router.put(
  '/',
  [
    body('name').custom(async (value, { req }) => {
      const nameExists = await Contact.findOne({ name: value });
      if (nameExists && value !== req.body.oldName) {
        throw new Error('Name already in use');
      }
      return true;
    }),
    check('email', 'invalid email').isEmail(),
    check('phoneNumber', 'invalid phone number').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('contact-edit', {
        active: 'contact',
        layout: 'layouts/main-layouts',
        title: 'add new contact',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { id: req.body._id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
          },
        }
      ).then((result) => {
        req.session.msg = 'contact changed successfully';
        res.redirect('/contact');
      });
    }
  }
);

// TODO: render detail contact
router.get('/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });
  res.render('contact-detail', {
    layout: 'layouts/main-layouts',
    active: 'contact',
    title: 'Detail Contact',
    contact,
  });
});

module.exports = router;
