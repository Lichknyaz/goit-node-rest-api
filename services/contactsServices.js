import Contact from "../db/contact.js";

export const listContacts = (ownerId) => Contact.findAll({ where: { owner: ownerId } })

export const getContactById = (contactId, ownerId) => Contact.findOne({ where: { id: contactId, owner: ownerId } })

export const removeContact = (contactId, ownerId) => Contact.destroy({
        where: {
            id: contactId,
            owner: ownerId,
        }
    })

export const addContact = (name, email, phone, ownerId) => {
    return Contact.create({
        name: name,
        email: email,
        phone: phone,
        owner: ownerId,
    });
}

export const updateContactById = async (contactId, body, ownerId) => {
    const contact = await getContactById(contactId, ownerId);
    if (!contact) return null;

    await contact.update(body);
    return contact;
}

export const updateStatusById = async (contactId, body, ownerId) => {
    const contact = await getContactById(contactId, ownerId);
    if (!contact) return null;

    await contact.update(body);
    return contact;
}