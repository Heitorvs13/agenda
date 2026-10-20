const storageKey = 'contacts'

export function saveContact(event) {
    event.preventDefault();

    // Seleciona o formulário pelo ID
    const form = document.getElementById('form-contato');
    
    if (!form) {
        console.error('Formulário não encontrado!');
        return;
    }

    if(!form.checkValidity()){
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);

    const contact = Object.fromEntries(formData.entries());

    contact.id = Date.now();

    const contacts = getContacts();

    contacts.push(contact);

    localStorage.setItem(storageKey, JSON.stringify(contacts));

    console.log('Dados salvos com sucesso!', contact);
    
    // Feedback visual e limpeza do formulário
    alert('Dados salvos com sucesso!');
    form.reset();
}

export function getContacts(){
    
    const localData = localStorage.getItem(storageKey);

    return localData ? JSON.parse(localData) : [];
}