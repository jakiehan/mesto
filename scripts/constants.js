export const galleryPhotoCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Кошка Шерри',
    link: './images/photo-card-cat.png'
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

export const documentSelector = {
  profileEditButton: document.querySelector('.profile__edit-button'),
  popupEditProfile: document.querySelector('.popup_edit-profile'),
  popupPhotoCard: document.querySelector('.popup_photo-card'),
  profileAddButton: document.querySelector('.profile__add-button'),

  popupFormProfile: document.querySelector('.popup__form_type_profile'),
  popupFieldName: document.querySelector('.popup__field_type_name'),
  popupFieldRank: document.querySelector('.popup__field_type_rank'),

  popupFormCard: document.querySelector('.popup__form_type_card'),
  popupFormTitle: document.querySelector('.popup__field_type_title'),
  popupFormLink: document.querySelector('.popup__field_type_link'),

  profileName: document.querySelector('.profile__name'),
  profileRank: document.querySelector('.profile__rank'),

  galleryElements: document.querySelector('.gallery__elements'),
  elementTemplate: document.querySelector('.element-template').content,

  popupViewForm: document.querySelector('.popup_viewing-photo'),
  popupFormImage: document.querySelector('.popup__image'),
  popupImageTitle: document.querySelector('.popup__image-title'),

  template: '.element-template',
};

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__field_type_error',
  inactiveButtonClass: 'popup__save-btn_atr_disabled',
  errorMessageSelector: '.popup__validation-error'
};