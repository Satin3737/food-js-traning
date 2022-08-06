import {getMenuData} from "../services/services";

function cards() {
    // create class for card
    class MenuCard {
        constructor(imageSrc, imageAlt, cardTitle, cardDesrc, price, parentSelector, ...classes) {
            this.imageSrc = imageSrc;
            this.imageAlt = imageAlt;
            this.cardTitle = cardTitle;
            this.cardDesrc = cardDesrc;
            this.price = price; // will be changed later
            this.transher = 36;
            this.changeToUAH(); // modify price with changeToUAH method
            this.parentSelector = document.querySelector(parentSelector);
            this.classes = classes; // array
        }
        // create method for transfer USD to UAH
        changeToUAH() {
            this.price *= this.transher;
        }
        // create method for rendering card on page
        renderCard() {
            let card = document.createElement('div');

            // added all classes from rest operator or add default class
            if (!this.classes.includes('menu__item')) {
                card.classList.add('menu__item');
            }
            this.classes.forEach(className => card.classList.add(className));

            // added markup
            card.innerHTML = `
                <img src="${this.imageSrc}" alt="${this.imageAlt}">
                <h3 class="menu__item-subtitle">${this.cardTitle}</h3>
                <div class="menu__item-descr">${this.cardDesrc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</div>
                </div>
            `;

            // append new card
            this.parentSelector.append(card);
        }
    }

    getMenuData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').renderCard();
            });
        });
}

export default cards;