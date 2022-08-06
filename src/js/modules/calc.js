function calc() {
    // calories calc
    const result = document.querySelector('[data-result]');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    calcTotal();
    initLocalSettings('[data-sex]', 'calculating__choose-item_active');
    initLocalSettings('[data-ratio]', 'calculating__choose-item_active');
    getInfoFromBoxes('[data-sex]', 'calculating__choose-item_active');
    getInfoFromBoxes('[data-ratio]', 'calculating__choose-item_active');
    getInfoFromInputs('[data-input]');

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('data-sex') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    }

    function getInfoFromInputs(inputSelector) {
        const inputs = document.querySelectorAll(inputSelector);
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '');
                switch (input.getAttribute('data-cons')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                calcTotal();
            });
        });
    }

    function getInfoFromBoxes(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                const target = e.target;
                if (target && target.hasAttribute('data-ratio')) {
                    ratio = +target.dataset.ratio;
                    localStorage.setItem('ratio', ratio);
                }
                if (target && target.hasAttribute('data-sex')) {
                    sex = target.dataset.sex;
                    localStorage.setItem('sex', sex);
                }
                elements.forEach(element => element.classList.remove(activeClass));
                target.classList.add(activeClass);
                calcTotal();
            });
        });

    }

    function calcTotal() {
        if (!sex || !height || !weight || !age|| !ratio) {
            result.textContent = 'где данные, Лебовски?'
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
}

export default calc;