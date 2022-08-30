const fs = require('fs');

// TODO: check when directory doesn't exists
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

// TODO: check when file doesn't exists
if (!fs.existsSync('./data/contacts.json')) {
  fs.writeFileSync('./data/contacts.json', '[]', {
    encoding: 'utf-8',
  });
}

// TODO: get all data contact (return json)
function loadContacts() {
  const file = fs.readFileSync('data/contacts.json', {
    encoding: 'utf-8',
  });
  return JSON.parse(file);
}

// TODO: getContact by name (return json)
function getContact(name) {
  const contacts = loadContacts();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  return contact;
}

// TODO: replace new contacts json
function saveContacts(contacts) {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts), 'utf-8');
}

function addContact(contact) {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

function isNameExists(name) {
  const contacts = loadContacts();
  return contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
}

function removeContact(name) {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );
  saveContacts(filteredContacts);
}

function updateContact(newContact) {
  const contacts = loadContacts();
  const newContacts = contacts.map(function (contact) {
    if (contact.name === newContact.oldName) {
      contact.name = newContact.name;
      contact.phoneNumber = newContact.phoneNumber;
      contact.email = newContact.email;
    }
    return contact;
  });

  console.log(contacts);
  console.log(newContacts);
  // saveContacts(newContacts);
}

module.exports = {
  loadContacts,
  getContact,
  saveContacts,
  addContact,
  updateContact,
  isNameExists,
  removeContact,
};
