import * as fs from "node:fs/promises"
import * as path from "node:path"
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json")

async function updateContacts(contacts) {
    fs.writeFile(contactsPath, JSON.stringify(contacts))
}

export async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(data)
}
  
export async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find(({id}) => id === contactId)
    return result || null
}
  
export async function removeContact(contactId) {
    const contacts = await listContacts()
    const contactIndex = contacts.findIndex(({id}) => id === contactId)
    if(contactIndex === -1) return null
    const [result] = contacts.splice(contactIndex, 1)
    await updateContacts(contacts)
    return result || null
}
  
export async function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact)
    await updateContacts(contacts)
    return newContact
}

export async function updateContact(contactId, payload) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({id}) => id === contactId);
    if(contactIndex === -1) return null;
    contacts[contactIndex] = {...contacts[contactIndex], ...payload};
    await updateContacts(contacts);
    return contacts[contactIndex];
}