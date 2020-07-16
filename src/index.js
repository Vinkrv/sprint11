import {Api} from './classes/Api.js';
import {Card} from './classes/Card.js';
import {CardList} from './classes/CardList.js';
import {FormValidator} from './classes/FormValidator.js';
import {Popup} from './classes/Popup.js';
import {UserInfo} from './classes/UserInfo.js';

(function(){const placesList = document.querySelector('.places-list');
const buttonAdd = document.querySelector('.user-info__button');
const buttonEdit = document.querySelector('.user-info__edit');
const popupClosePlace = document.querySelector('.popup__close_place');
const popupCloseProfile = document.querySelector('.popup__close_profile');
const popupClosePicture = document.querySelector('.popup__close_picture');
const popupName = document.querySelector('.popup__input_type_name');
const popupLink = document.querySelector('.popup__input_type_link-url');
const popupAddFormProfile = document.querySelector('.popup__form_profile');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job')
const userNamePopup = popupAddFormProfile .querySelector('.popup__input_type_name');
const infoPopup = popupAddFormProfile .querySelector('.popup__input_type_info');
const popupAddFormPlace = document.querySelector('.popup__form_place');
const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
};
const config ={
  url: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'f70a6be0-271c-4f60-bd8e-23050a89a937',
    'Content-Type': 'application/json'
  }
};
const userInfo = new UserInfo(userName , userJob , userNamePopup , infoPopup);
const popupAddFormProfileValid = new FormValidator(popupAddFormProfile , errorMessages);
const popupAddFormPlaceValid = new FormValidator(popupAddFormPlace , errorMessages);
const picturePopup = new Popup(document.querySelector('.popup_picture'));
const addPopup = new Popup(document.querySelector('.popup_place'));
const editProfile = new Popup(document.querySelector('.popup_profile'));
const api = new Api(config);

function cardsRender (name , link) {
  const newcard = new Card(name , link, picturePopup);
  return newcard.create();
};

const cardList = new CardList(placesList, cardsRender);

api.getInfoUser()
  .then(res => {
  userInfo.updateUserInfo(res.name , res.about);
  document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${res.avatar})`)
  })
  .catch(err => console.log(err));

popupAddFormProfile.addEventListener('submit', (e) => {
  e.preventDefault();
  api.patchInfo({
    name: `${userNamePopup.value}`,
    about: `${infoPopup.value}`
  })
  .then(res => {
    userInfo.updateUserInfo(res.name , res.about);
    editProfile.close();
  })
  .catch(err => console.log(err));
});

api.getInitialCards()
  .then(res => {
  cardList.render(res);
  })
  .catch(err => console.log(err));

//Открытие формы карточки
buttonAdd.addEventListener('click', () => {
  addPopup.open();
  popupAddFormPlaceValid.resetForm();
  popupAddFormPlaceValid.cleanError();
  popupAddFormPlaceValid.resetButtonForm();
  popupAddFormPlaceValid.setEventListeners();

});

// Открытие формы профиля
buttonEdit.addEventListener('click', () => {
  editProfile.open();
  userInfo.setUserInfo(userName , userJob);
  popupAddFormProfileValid.cleanError();
  popupAddFormProfileValid.setEventListeners();
});

// Закрытие формы карточки
popupClosePlace.addEventListener('click', () => {
  addPopup.close();
});

// Закрытие формы профиля
popupCloseProfile.addEventListener('click', () => {
  editProfile.close();
});

// Закрытие изображения карточки
popupClosePicture.addEventListener('click', () => {
  picturePopup.close();
});

// Добавление карточки
popupAddFormPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  cardList.addCard(popupName.value , popupLink.value, picturePopup);
  popupName.value = '';
  popupLink.value = '';
  addPopup.close();
});

})();