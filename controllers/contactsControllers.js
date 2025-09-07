import {
    getContactById,
    listContacts,
    removeContact,
    addContact,
    updateContactById,
    updateStatusById
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
        const contacts = await listContacts();
        return res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact === null) {
        return res.status(404).json({"message": "Not found"})
    }
    return res.json(contact);
};

export const deleteContact = async (req, res) => {
    const {id} = req.params;
    const contact = await getContactById(id);
    if (contact === null) {
        return res.status(404).json({"message": "Not found"})
    }
    await removeContact(id);
    return res.json(contact);
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    return res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const updatedContact = await updateContactById(id,req.body);
    if (updatedContact === null) {
        return res.status(404).json({"message": "Not found"})
    }
    return res.status(201).json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
    const {id} = req.params;
    const updatedContact = await updateStatusById(id,req.body);
    if (updatedContact === null) {
        return res.status(404).json({"message": "Not found"})
    }
    return res.status(201).json(updatedContact);
};