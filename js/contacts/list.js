function sortContacts(contacts) {
    return [...contacts].sort((a, b) => {
        return a.name.localeCompare(b.name);
    })
}

export function renderList(contacts) {
    const list = document.querySelector(".contatos");

    list.innerHTML = '';

    if (contacts) {
        const sorted = sortContacts(contacts);

        sorted.forEach(c => {
            const contact = document.createElement('article');

            contact.classList.add("contato");
            if(c.favorite)
                contact.innerHTML = `
                    <section class="dados">
                        <header>
                            <h1>${c.name}</h1>
                            <svg class="fav-true" height="10px" viewBox="0 0 49 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M25.203 0L31.1526 18.3111H50.406L34.8297 29.6279L40.7793 47.9389L25.203 36.6221L9.62669 47.9389L15.5763 29.6279L5.72205e-06 18.3111H19.2534L25.203 0Z" />
                            </svg>
                        </header>
                        <ul>
                            <li>Telefone: ${c.phone}</li>
                            <li>E-mail: ${c.email}</li>
                        </ul>
                    </section>
                    <section class="operacoes">
                        <button type="button" class="delete" onclick="deleteContact(${c.id})">
                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.6875 25C3.82812 25 3.09245 24.728 2.48047 24.184C1.86849 23.64 1.5625 22.9861 1.5625 22.2222V4.16667H0V1.38889H7.8125V0H17.1875V1.38889H25V4.16667H23.4375V22.2222C23.4375 22.9861 23.1315 23.64 22.5195 24.184C21.9076 24.728 21.1719 25 20.3125 25H4.6875ZM20.3125 4.16667H4.6875V22.2222H20.3125V4.16667ZM7.8125 19.4444H10.9375V6.94444H7.8125V19.4444ZM14.0625 19.4444H17.1875V6.94444H14.0625V19.4444Z" />
                            </svg>
                        </button>
                        <button type="button" class="edit" onclick="editContact(${c.id})">
                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.77778 22.2222H4.75694L18.3333 8.64583L16.3542 6.66667L2.77778 20.2431V22.2222ZM0 25V19.0972L18.3333 0.798611C18.6111 0.543981 18.9178 0.347222 19.2535 0.208333C19.5891 0.0694444 19.9421 0 20.3125 0C20.6829 0 21.0417 0.0694444 21.3889 0.208333C21.7361 0.347222 22.037 0.555556 22.2917 0.833333L24.2014 2.77778C24.4792 3.03241 24.6817 3.33333 24.809 3.68056C24.9363 4.02778 25 4.375 25 4.72222C25 5.09259 24.9363 5.4456 24.809 5.78125C24.6817 6.1169 24.4792 6.42361 24.2014 6.70139L5.90278 25H0ZM17.3264 7.67361L16.3542 6.66667L18.3333 8.64583L17.3264 7.67361Z" />
                            </svg>
                        </button>
                    </section>
                `
            else
                contact.innerHTML = `
                    <section class="dados">
                        <header>
                            <h1>${c.name}</h1>
                            <svg class="fav-false" height="10px" viewBox="0 0 49 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M25.203 0L31.1526 18.3111H50.406L34.8297 29.6279L40.7793 47.9389L25.203 36.6221L9.62669 47.9389L15.5763 29.6279L5.72205e-06 18.3111H19.2534L25.203 0Z" />
                            </svg>
                        </header>
                        <ul>
                            <li>Telefone: ${c.phone}</li>
                            <li>E-mail: ${c.email}</li>
                        </ul>
                    </section>
                    <section class="operacoes">
                        <button type="button" class="delete" onclick="deleteContact(${c.id})">
                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.6875 25C3.82812 25 3.09245 24.728 2.48047 24.184C1.86849 23.64 1.5625 22.9861 1.5625 22.2222V4.16667H0V1.38889H7.8125V0H17.1875V1.38889H25V4.16667H23.4375V22.2222C23.4375 22.9861 23.1315 23.64 22.5195 24.184C21.9076 24.728 21.1719 25 20.3125 25H4.6875ZM20.3125 4.16667H4.6875V22.2222H20.3125V4.16667ZM7.8125 19.4444H10.9375V6.94444H7.8125V19.4444ZM14.0625 19.4444H17.1875V6.94444H14.0625V19.4444Z" />
                            </svg>
                        </button>
                        <button type="button" class="edit" onclick="editContact(${c.id})">
                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.77778 22.2222H4.75694L18.3333 8.64583L16.3542 6.66667L2.77778 20.2431V22.2222ZM0 25V19.0972L18.3333 0.798611C18.6111 0.543981 18.9178 0.347222 19.2535 0.208333C19.5891 0.0694444 19.9421 0 20.3125 0C20.6829 0 21.0417 0.0694444 21.3889 0.208333C21.7361 0.347222 22.037 0.555556 22.2917 0.833333L24.2014 2.77778C24.4792 3.03241 24.6817 3.33333 24.809 3.68056C24.9363 4.02778 25 4.375 25 4.72222C25 5.09259 24.9363 5.4456 24.809 5.78125C24.6817 6.1169 24.4792 6.42361 24.2014 6.70139L5.90278 25H0ZM17.3264 7.67361L16.3542 6.66667L18.3333 8.64583L17.3264 7.67361Z" />
                            </svg>
                        </button>
                    </section>
                `

            list.appendChild(contact)
        });
        return;
    }

    list.innerHTML = `
        <h1>Nenhum contato cadastrado :(</h1>
    `
}