const storageKey = 'contacts';

export function getContacts(){
    const localData = localStorage.getItem(storageKey);
    return localData ? JSON.parse(localData) : [];
}

export function saveContacts(contacts) {
    localStorage.setItem(storageKey, JSON.stringify(contacts));
}

export function saveContact(event) {
    if (event) event.preventDefault();

    const form = document.getElementById('form-contato');
    
    if (!form) {
        console.error('Formulário não encontrado!');
        return false;
    }

    if(!form.checkValidity()){
        form.reportValidity();
        return false;
    }

    const formData = new FormData(form);
    const contact = Object.fromEntries(formData.entries());

    contact.id = Date.now();
    contact.favorite = document.getElementById('favorite').checked;

    const contacts = getContacts();
    contacts.push(contact);

    saveContacts(contacts);

    alert('Dados salvos com sucesso!');
    form.reset();
    return true;
}

export function updateContact(id, updatedData) {
    let contacts = getContacts();
    contacts = contacts.map(c => c.id == id ? { ...c, ...updatedData } : c);
    saveContacts(contacts);
}

export function deleteContact(id) {
    let contacts = getContacts();
    contacts = contacts.filter(c => c.id != id);
    saveContacts(contacts);
}

export function getContactById(id) {
    const contacts = getContacts();
    return contacts.find(c => c.id == id);
}

export function toggleFavorite(id) {
    let contacts = getContacts();
    contacts = contacts.map(c => {
        if (c.id == id) {
            const isFav = c.favorite === true || c.favorite === 'on';
            return { ...c, favorite: !isFav };
        }
        return c;
    });
    saveContacts(contacts);
}