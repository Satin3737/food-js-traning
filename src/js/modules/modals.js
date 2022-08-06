function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('opened');
    document.body.classList.add('fixed');

    if (modalTimer) {
        clearInterval(modalTimer);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('opened');
    document.body.classList.remove('fixed');
}

const modalSpinner = document.querySelector('[data-modal="spinner"]');


function modals(triggerSelector, modalSelector, modalTimer) {
    // modal variables
    const modal = document.querySelector(modalSelector);
    const modalBtn = document.querySelectorAll(triggerSelector);

    // modal listeners
    window.addEventListener('scroll', showModalByScroll);

    modalBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-modal') === 'close') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.classList.contains('opened')) {
            closeModal(modalSelector);
        }
    });

    // modal functions

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}

export default modals;
export {closeModal};
export {openModal};
export {modalSpinner};