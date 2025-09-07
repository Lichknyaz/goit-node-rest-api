import Contact from "../db/contact.js";

export const listContacts = () => Contact.findAll()

export const getContactById = (contactId) => Contact.findByPk(contactId)

export const removeContact = (contactId) => Contact.destroy({
        where: {
            id: contactId,
        }
    })

export const addContact = (name, email, phone) => {
    return Contact.create({
        name: name,
        email: email,
        phone: phone,
    });
}

export const updateContactById = async (contactId, body) => {
    const contact = await getContactById(contactId);
    if (!contact) return null;

    await contact.update(body);
    return contact;
}

export const updateStatusById = async (contactId, body) => {
    const contact = await getContactById(contactId);
    if (!contact) return null;

    await contact.update(body);
    return contact;
}