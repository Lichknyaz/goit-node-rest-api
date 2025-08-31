import fs from 'node:fs/promises';
import path from "node:path";
import {nanoid} from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');

export async function listContacts() {
    try {
        console.log(contactsPath);
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
    }

    catch (err) {
        console.log (err)
    }
}

export async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const parsed_data = JSON.parse(data);
        const contact = parsed_data.find(contact => contact.id === contactId);
        return contact || null;
    }

    catch (err) {
        console.log (err)
    }
}

export async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const parsed_data = JSON.parse(data);
        const contact = parsed_data.find(contact => contact.id === contactId);
        if (!contact) {
            return null
        }
        const new_data = parsed_data.filter(contact => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(new_data, null, 2), 'utf-8');
        return contact
    }

    catch (err) {
        console.log (err)
    }
}

export async function addContact(name, email, phone) {
    const new_contact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone
    };
    const data = await fs.readFile(contactsPath, 'utf-8');
    const parsed_data = JSON.parse(data);
    parsed_data.push(new_contact);
    await fs.writeFile(contactsPath, JSON.stringify(parsed_data, null, 2), 'utf-8');
    return new_contact;
}

export async function updateContactById(contactId, body) {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const parsed_data = JSON.parse(data);
    const index = parsed_data.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    const updatedContact = { ...parsed_data[index], ...body, id: contactId };
    parsed_data[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(parsed_data, null, 2), 'utf-8');
    return updatedContact;
}
