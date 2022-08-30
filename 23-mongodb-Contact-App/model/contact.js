const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = Contact;
