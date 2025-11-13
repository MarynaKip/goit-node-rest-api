import * as contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js"

export const getAllContacts = ctrlWrapper(async (req, res) => {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
    const {id} = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
        throw HttpError(404);
      }
    res.json(contact)
});

export const deleteContact = ctrlWrapper(async (req, res) => {
    const {id} = req.params;
    const deleteContact = await contactsService.removeContact(id)
    if (!deleteContact) {
        throw HttpError(404);
      }
    res.json(deleteContact)
});

export const createContact = ctrlWrapper(async (req, res) => {
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
    const {id} = req.params;
    if(Object.keys(req.body).length < 1) throw HttpError(400, "Body must have at least one field");
    const updatedContact = await contactsService.updateContact(id, req.body);
    if (!updatedContact) {
        throw HttpError(404);
      }
    res.json(updatedContact);
});
