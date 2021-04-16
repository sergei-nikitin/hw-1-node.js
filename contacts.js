const fs = require("fs").promises
const path = require('path')
const shortId = require('shortid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

function errHandle(err){
console.log(err.message)
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(data)
  } catch(err) {
    errHandle(err)
  }
}

async function getContactById(contactId){
  try {
    const contacts = await listContacts()
    const findContact = contacts.find(({id}) => id === contactId)
    console.table(findContact)
  } catch (err) {
    errHandle(err)
  }
}


async function removeContact(contactId){
  try {
    const contacts = await listContacts()
    const newContactsList = contacts.filter(({id}) => id !== contactId)
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    console.log(`Contact with id: ${contactId} deleted`)
    return console.table(await listContacts())
  } catch(err) {
    errHandle(err)
  }
}

async function addContact(name, email, phone){
  try{
  const id = shortId.generate()
  const contacts = await listContacts()
  const newUser = {
    id, name, email, phone
  }
  const newContactsList = [...contacts, newUser]
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  console.table(await listContacts())
} catch (err) {
  eerHandle(err)
 }
}

module.exports = {listContacts, getContactById, removeContact, addContact,};
