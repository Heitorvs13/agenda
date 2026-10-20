import * as repo from "./utils/repo.js";
import * as mask from "./utils/mask.js";
import * as contacts from "./contacts/list.js"

const saveFormButton = document.getElementById('save-contact');

saveFormButton.addEventListener('click', event => {
    repo.saveContact(event);
});

const phoneInputs = document.querySelectorAll('input.phone-input')

if (phoneInputs) {
    phoneInputs.forEach(input => {
        input.addEventListener('input', mask.aplyPhoneMask)
    })
}

contacts.renderList(repo.getContacts())