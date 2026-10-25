import * as repo from "./utils/repo.js";
import * as mask from "./utils/mask.js";
import * as contacts from "./contacts/list.js";

let activeFilter = 'all';
let searchKeyword = '';
let editingContactId = null;

// Elementos do DOM
const saveFormButton = document.getElementById('save-contact');
const contactForm = document.getElementById('form-contato');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const favoriteCheckbox = document.getElementById('favorite');
const searchInput = document.getElementById('search');
const filterButtons = document.querySelectorAll('.filters');
const contactsContainer = document.querySelector('.contatos');

const phoneInputs = document.querySelectorAll('input.phone-input');
if (phoneInputs) {
    phoneInputs.forEach(input => {
        if (mask.aplyPhoneMask) {
            input.addEventListener('input', mask.aplyPhoneMask);
        }
    });
}

function updateList() {
    let allContacts = repo.getContacts();

    // Filtro de Favoritos ou alfabetica
    if (activeFilter === 'favs') {
        allContacts = allContacts.filter(c => c.favorite === true || c.favorite === 'on');
    } else if (activeFilter !== 'all') {
        const [start, end] = activeFilter.split('-');
        allContacts = allContacts.filter(c => {
            const firstLetter = (c.name || '').trim().charAt(0).toUpperCase();
            return firstLetter >= start && firstLetter <= end;
        });
    }

    // Busca por trecho nos campos name, email e phone
    if (searchKeyword.trim() !== '') {
        const term = searchKeyword.toLowerCase();
        allContacts = allContacts.filter(c =>
            (c.name && c.name.toLowerCase().includes(term)) ||
            (c.email && c.email.toLowerCase().includes(term)) ||
            (c.phone && c.phone.toLowerCase().includes(term))
        );
    }

    contacts.renderList(allContacts);
}

// Evento do Botão Salvar / Atualizar
if (saveFormButton) {
    saveFormButton.addEventListener('click', event => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const favorite = favoriteCheckbox.checked;

        if (editingContactId !== null) {
            // Edição
            repo.updateContact(editingContactId, { name, phone, email, favorite });
            alert('Contato atualizado com sucesso!');
            cancelEdit();
        } else {
            // Novo cadastro usando o repositório
            repo.saveContact(event);
        }

        updateList();
    });
}

// Busca em Tempo Real
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchKeyword = e.target.value;
        updateList();
    });
}

// Botões de Filtro Pré-cadastrados
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
        btn.setAttribute('aria-pressed', 'true');
        activeFilter = btn.getAttribute('filter');
        updateList();
    });
});

// Delegação de Eventos para Excluir, Editar e Favoritar
if (contactsContainer) {
    contactsContainer.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete');
        const editBtn = e.target.closest('.edit');
        const favIcon = e.target.closest('.fav-true, .fav-false');

        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            if (confirm('Deseja realmente excluir este contato?')) {
                if (editingContactId == id) {
                    cancelEdit();
                }
                repo.deleteContact(id);
                updateList();
            }
        } else if (editBtn) {
            const id = editBtn.dataset.id;
            startEdit(id);
        } else if (favIcon) {
            const id = favIcon.dataset.id;
            if (id) {
                repo.toggleFavorite(id);
                updateList();
            }
        }
    });
}

// Funções em edição
function startEdit(id) {
    const contact = repo.getContactById(id);
    if (!contact) return;

    editingContactId = id;
    nameInput.value = contact.name || '';
    phoneInput.value = contact.phone || '';
    emailInput.value = contact.email || '';
    favoriteCheckbox.checked = contact.favorite === true || contact.favorite === 'on';

    saveFormButton.textContent = 'Atualizar';
    addCancelButton();
    contactForm.scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
    editingContactId = null;
    contactForm.reset();
    saveFormButton.textContent = 'Salvar';
    removeCancelButton();
}

function addCancelButton() {
    if (document.getElementById('cancel-edit')) return;
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.id = 'cancel-edit';
    cancelButton.className = 'cancel';
    cancelButton.textContent = 'Cancelar';
    cancelButton.style.marginLeft = '8px';
    cancelButton.addEventListener('click', cancelEdit);

    saveFormButton.insertAdjacentElement('afterend', cancelButton);
}

function removeCancelButton() {
    const cancelButton = document.getElementById('cancel-edit');
    if (cancelButton) cancelButton.remove();
}

// Inicialização
updateList();