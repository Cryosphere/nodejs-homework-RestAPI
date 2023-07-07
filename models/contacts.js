const fs = require("fs/promises");

const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === String(contactId));
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContacts = {
    id: v4(),
    body,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const remoteContact = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (remoteContact === -1) {
    return null;
  }
  const newContacts = contacts.filter((__, index) => index !== remoteContact);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[remoteContact];
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === String(contactId));
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, contactId };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
