export const galleryPhotoCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Кошка Шерри',
    link: 'https://images.unsplash.com/photo-1647907504851-08959d43d186?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const documentSelectors = {
  popupEditProfile: '.popup_edit-profile',
  popupPhotoCard: '.popup_photo-card',
  popupFormProfile: '.popup__form_type_profile',
  popupFormCard: '.popup__form_type_card',
  profileName: '.profile__name',
  profileRank: '.profile__rank',
  galleryElements: '.gallery__elements',
  popupViewForm: '.popup_viewing-photo',
  template: '.element-template',
};

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

export const popupFieldName = document.querySelector('.popup__field_type_name');
export const popupFieldRank = document.querySelector('.popup__field_type_rank');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__field_type_error',
  inactiveButtonClass: 'popup__save-btn_atr_disabled',
  errorMessageSelector: '.popup__validation-error'
};