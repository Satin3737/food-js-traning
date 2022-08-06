import {closeModal} from "./modals";
import {openModal} from "./modals";
import {modalSpinner} from "./modals";
import {postData} from "../services/services";

function forms(formSelector, modalTimer) {
    // forms
    const forms = document.querySelectorAll(formSelector);

    forms.forEach(form => {
        bindPostData(form);
    });

    const message = {
        success: 'все ок',
        failure: 'потрачено'
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            modalSpinner.style.display = 'block';

            // send formData
            const formData = new FormData(form);

            // json from formData - loop
            const objectLoop = {};
            formData.forEach((value, i) => {
                objectLoop[i] = value;
            });

            // json from formData - entries
            const objectEntries = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', objectLoop)
                .then(() => {
                    showThanksModal(message.success);
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    modalSpinner.style.display = 'none';
                });
        });
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.style.display = 'none';
        openModal('[data-modal="modal"]', modalTimer);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-modal="close" class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        previousModalDialog.closest('[data-modal="modal"]').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            closeModal('[data-modal="modal"]');
            previousModalDialog.style.display = 'block';
        }, 5000);
    }
}

export default forms;