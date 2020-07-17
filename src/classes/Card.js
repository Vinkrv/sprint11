export class Card {
  constructor(name, link, popupPicture) {
    this.name = name;
    this.link = link;
    this.popupPicture = popupPicture;
    this.popupImageOpen = this.popupImageOpen.bind(this);
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
  }

  popupImageOpen() {
    this.popupPicture.open(this.link);
  }

  addListeners() {
    this.likeButton.addEventListener('click', this.like);
    this.cardDeleteButton.addEventListener('click', this.remove);
    this.popupImage.addEventListener('click', this.popupImageOpen);
  }

  create() {
    const cardOne = `
          <div class="place-card">
          <div class="place-card__image">
            <button class="place-card__delete-icon"></button>
          </div>
          <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <button class="place-card__like-icon"></button>
          </div>
          </div>
          `;

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', cardOne);

    const newCard = element;
    const placeImage = newCard.querySelector('.place-card__image');

    newCard.querySelector('.place-card__name').textContent = this.name;
    placeImage.setAttribute('style', `background-image: url(${this.link})`);

    this.card = newCard;

    this.likeButton = this.card.querySelector('.place-card__like-icon');
    this.cardDeleteButton = this.card.querySelector('.place-card__delete-icon');
    this.popupImage = this.card.querySelector('.place-card__image');

    this.addListeners();
    return element.firstElementChild;
  };

  like() {
    this.likeButton.classList.toggle('place-card__like-icon_liked');
  }

  removeListeners() {
    this.cardDeleteButton.removeEventListener('click', this.remove);
    this.likeButton.removeEventListener('click', this.like);
    this.popupImage.removeEventListener('click', this.popupImageOpen);
  }

  remove(event) {
    this.removeListeners();
    event.target.closest('.place-card').remove();
  }
}
