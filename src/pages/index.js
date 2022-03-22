import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import popupWithImage from '../components/popupWithImage.js';
import popupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { selector, galleryPhotoCards, validationConfig } from '../utils/constants.js';

const profileFormValidator = new FormValidator(validationConfig, selector.popupFormProfile);
const cardFormValidator = new FormValidator(validationConfig, selector.popupFormCard);

const showPhoto = new Section({
  items: galleryPhotoCards,
  renderer: (item) => {
    showPhoto.addItem(generateCard(item));
  }
}, selector.galleryElements);

const popupImage = new popupWithImage(selector.popupViewForm, {
  popupImage: '.popup__image',
  popupTitle: '.popup__image-title'
});

const popupPhotoCard = new popupWithForm(selector.popupPhotoCard, {
  handleForm: (inputData) => {
    showPhoto.addItem(generateCard(inputData));
    popupPhotoCard.close();
  }
});

const popupEditProfile = new popupWithForm(selector.popupEditProfile, {
  handleForm: (inputData) => {
    userData.setUserInfo(inputData)
    popupEditProfile.close();
  }
});

const userData = new UserInfo({
  nameSelector: selector.profileName,
  rankSelector: selector.profileRank
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
showPhoto.renderItems();
popupImage.setEventListeners();
popupPhotoCard.setEventListeners();
popupEditProfile.setEventListeners();

// Возвращаем готовый элемент фотокарточки
function generateCard(data) {
  const card = new Card(data, selector.template, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }
  });
  const cardElement = card.createPhotoCard();
  return cardElement;
}

// Слушаем кнопку открытия попапа редактирования профиля(подставляем данные в инпуты, открываем попапыч)
selector.profileEditButton.addEventListener('click', () => {
  const profileData = userData.getUserInfo();
  selector.popupFieldName.value = profileData.name;
  selector.popupFieldRank.value = profileData.rank;
  popupEditProfile.open();
  profileFormValidator.clearErrorMessage();
});

// Слушаем кнопку открытия попапа добавления фотокарточки
selector.profileAddButton.addEventListener('click', () => {
  popupPhotoCard.open();
  cardFormValidator.clearErrorMessage();
  cardFormValidator.toggleButtonState();
});

// Слушаем белый шум