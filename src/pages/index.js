import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import popupWithImage from '../components/popupWithImage.js';
import popupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  documentSelectors,
  galleryPhotoCards,
  validationConfig,
  profileEditButton,
  profileAddButton,
  popupFieldName,
  popupFieldRank,
} from '../utils/constants.js';

const profileFormValidator = new FormValidator(validationConfig, documentSelectors.popupFormProfile);
const cardFormValidator = new FormValidator(validationConfig, documentSelectors.popupFormCard);

const showPhoto = new Section({
  renderer: (item) => {
    showPhoto.addItem(generateCard(item));
  }
}, documentSelectors.galleryElements);

const popupImage = new popupWithImage(documentSelectors.popupViewForm);

const popupPhotoCard = new popupWithForm(documentSelectors.popupPhotoCard, {
  handleForm: (inputData) => {
    showPhoto.addItem(generateCard(inputData));
    popupPhotoCard.close();
  }
});

const popupEditProfile = new popupWithForm(documentSelectors.popupEditProfile, {
  handleForm: (inputData) => {
    userData.setUserInfo(inputData)
    popupEditProfile.close();
  }
});

const userData = new UserInfo({
  nameSelector: documentSelectors.profileName,
  rankSelector: documentSelectors.profileRank
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
showPhoto.renderItems(galleryPhotoCards);
popupImage.setEventListeners();
popupPhotoCard.setEventListeners();
popupEditProfile.setEventListeners();

// Возвращаем готовый элемент фотокарточки
function generateCard(data) {
  const card = new Card(data, documentSelectors.template, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    }
  });
  const cardElement = card.createPhotoCard();
  return cardElement;
}

// Слушаем кнопку открытия попапа редактирования профиля(подставляем данные в инпуты, открываем попапыч)
profileEditButton.addEventListener('click', () => {
  const profileData = userData.getUserInfo();
  popupFieldName.value = profileData.name;
  popupFieldRank.value = profileData.rank;
  profileFormValidator.clearErrorMessage();
  profileFormValidator.toggleButtonState();
  popupEditProfile.open();
});

// Слушаем кнопку открытия попапа добавления фотокарточки
profileAddButton.addEventListener('click', () => {
  cardFormValidator.clearErrorMessage();
  cardFormValidator.toggleButtonState();
  popupPhotoCard.open();
});