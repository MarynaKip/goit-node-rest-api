import Contact from "../db/models/contacts.js";


export async function listContacts() {
    return Contact.findAll()
}

export async function getContactById(contactId) {
    return Contact.findByPk(contactId);
}
  
export async function removeContact(contactId) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
  
    await contact.destroy();
    return contact;
}
    
export async function addContact(payload) {
    return Contact.create(payload);
}

export async function updateContact(contactId, payload) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
  
    await contact.update(payload);
    return contact;
  }

  export async function updateStatusContact(contactId, payload) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) return null;
  
    await contact.update(payload);
    return contact;
  }