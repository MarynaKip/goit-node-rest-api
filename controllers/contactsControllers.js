import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js"

export const getAllContacts = ctrlWrapper(async (req, res) => {
    const {id: owner} = req.user;

    const contacts = await contactsService.listContacts({owner});
    res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
    const {id: owner} = req.user;

    const { id } = req.params;
  
    const contact = await contactsService.getContactById({id, owner});
  
    if (!contact) {
      throw HttpError(404, "Not found");
    }
  
    res.json(contact);
  });
  
  export const deleteContact = ctrlWrapper(async (req, res) => {
    const {id: owner} = req.user;

    const { id } = req.params;
  
    const removedContact = await contactsService.removeContact({id, owner});
  
    if (!removedContact) {
      throw HttpError(404, "Not found");
    }
  
    res.json(removedContact);
  });

export const createContact = ctrlWrapper(async (req, res) => {
    const {id: owner} = req.user;
    const newContact = await contactsService.addContact({...req.body, owner});
    res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const {id: owner} = req.user;
    const {id} = req.params;
    if(Object.keys(req.body).length < 1) throw HttpError(400, "Body must have at least one field");
    const updatedContact = await contactsService.updateContact({id, owner}, req.body);
    if (!updatedContact) {
        throw HttpError(404);
      }
    res.json(updatedContact);
});

export const updateFavorite = ctrlWrapper(async (req, res) => {
    const {id: owner} = req.user;
    const { contactId } = req.params;
    if (!req.body || typeof req.body.favorite !== "boolean") {
      throw HttpError(400, "missing field favorite");
    }
    const updatedContact = await contactsService.updateStatusContact({contactId, owner}, req.body);

    if (!updatedContact) {
        throw HttpError(404);
      }
    res.json(updatedContact);
});
