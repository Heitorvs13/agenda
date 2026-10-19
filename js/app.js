import * as repo from "./utils/repo.js";

const saveFormButton = document.getElementById('save-contact');

saveFormButton.addEventListener('click', event => {
    repo.saveContact(event);
});