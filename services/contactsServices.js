import Contact from "../db/models/Contact.js";

export async function listContacts(where) {
    return Contact.findAll({where})
}

export async function getContactById(where) {
    return Contact.findOne({where});
}
  
export async function removeContact(where) {
    const contact = await Contact.findOne({where});
    if (!contact) return null;
  
    await contact.destroy();
    return contact;
}
    
export async function addContact(payload) {
    return Contact.create(payload);
}

export async function updateContact(where, payload) {
    const contact = await Contact.findOne({where});
    if (!contact) return null;
  
    await contact.update(payload);
    return contact;
  }

  export async function updateStatusContact(where, payload) {
    const contact = await Contact.findOne({where});
    if (!contact) return null;
  
    await contact.update(payload);
    return contact;
  }