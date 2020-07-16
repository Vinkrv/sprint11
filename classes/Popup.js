export class Popup {
   constructor(container) {
       this.container = container;
   }
    open(link = null) {
        if (link) {
            this.container.querySelector('.popup__image').src = link;
        }
        this.container.classList.add('popup_is-opened');
    }

    close () {
        this.container.classList.remove('popup_is-opened');
    }

}