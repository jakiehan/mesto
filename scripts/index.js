import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { chart } from './utils.js';
import { documentSelector, galleryPhotoCards, validationConfig } from './constants.js';

const profileFormValidator = new FormValidator(validationConfig, documentSelector.popupFormProfile);
const cardFormValidator = new FormValidator(validationConfig, documentSelector.popupFormCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

showPhoto();

addListenerClosePopup();

function generateCard(data) {
  const card = new Card(data, documentSelector.template);
  const cardElem = card.createPhotoCard();
  return cardElem;
}

function showPhoto() {
  galleryPhotoCards.forEach((photocard) => {
    documentSelector.galleryElements.append(generateCard(photocard));
  });
}

function handleFormProfile () {

  documentSelector.profileName.textContent = documentSelector.popupFieldName.value;
  documentSelector.profileRank.textContent = documentSelector.popupFieldRank.value;

  chart.closePopup(documentSelector.popupEditProfile);
}

function handleFormCard(evt) {
  const dataUser = {
    name: documentSelector.popupFormTitle.value,
    link: documentSelector.popupFormLink.value
  }
  documentSelector.galleryElements.prepend(generateCard(dataUser));
  evt.target.reset();
  cardFormValidator.toggleButtonState();
  chart.closePopup(documentSelector.popupPhotoCard);
}

function addListenerClosePopup() {
  const popups = Array.from(document.querySelectorAll('.popup'));
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-btn'))) {
        chart.closePopup(popup);
      }
    });
  });
}

documentSelector.profileEditButton.addEventListener('click', () => {
  documentSelector.popupFieldName.value = documentSelector.profileName.textContent;
  documentSelector.popupFieldRank.value = documentSelector.profileRank.textContent;
  chart.openPopup(documentSelector.popupEditProfile);
  profileFormValidator.clearErrorMessage();
});

documentSelector.profileAddButton.addEventListener('click', () => {
  chart.openPopup(documentSelector.popupPhotoCard);
});

documentSelector.popupFormProfile.addEventListener('submit', handleFormProfile);

documentSelector.popupFormCard.addEventListener('submit', handleFormCard);