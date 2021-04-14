const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
  .then((data) => console.table(JSON.parse(data)))
  .catch((err)=> console.log(err.message))
}

function getContactById(contactId) {
  fs.readFile(contactsPath, {encoding: 'utf-8'})
  .then((data)=> {
    const list = JSON.parse(data)
    const item = list.find(item => item.id === contactId)
    console.table(item)
  })
  .catch((err)=> console.log(err.message))
}


function removeContact(contactId) {
  fs.readFile(contactsPath)
  .then((data)=> {
    const list = JSON.parse(data)
   
    const newList = list.filter((item) => item.id !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(newList), (err) => {
      if(err) console.log(err.message);
    })
  })
}

function addContact(name, email, phone) {
  let users =[]
  fs.readFile(contactsPath).then((data) => {
     users =JSON.parse(data.toString())
     let id =users.length + 1;
     newUser = {
      id,
      name,
      email,
      phone
     }
     users.push(newUser)
     const string = JSON.stringify(users)
     fs.writeFile(contactsPath, string )
     console.log(`${name} is add`)
  })
  .catch((error)=>console.log(error))
}

module.exports = {listContacts, getContactById, removeContact, addContact,};
