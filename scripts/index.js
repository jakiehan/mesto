const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeButtonProfile = document.querySelector('.popup__close-btn_type_profile');
const closeButtonCard = document.querySelector('.popup__close-btn_type_card');
const popupPhotoCard = document.querySelector('.popup_photo-card');
const profileAddButton = document.querySelector('.profile__add-button');

const popupFormProfile = document.querySelector('.popup__form_type_profile');
const popupFieldName = popupFormProfile.querySelector('.popup__field_type_name');
const popupFieldRank = popupFormProfile.querySelector('.popup__field_type_rank');

const popupFormCard = document.querySelector('.popup__form_type_card');
const popupFormTitle = popupFormCard.querySelector('.popup__form_type_title');
const popupFormLink = popupFormCard.querySelector('.popup__form_type_link');

const profileName = document.querySelector('.profile__name');
const profileRank = document.querySelector('.profile__rank');

const galleryElements = document.querySelector('.gallery__elements');
const elementTemplate = document.querySelector('.element-template').content;

const popupViewForm = document.querySelector('.popup_viewing-photo');
const popupFormImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const popupCloseViewForm = document.querySelector('.popup__close-btn_type_view');

const galleryPhotoCards = [
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

function showPhoto() {
  galleryPhotoCards.forEach((photocard) => {
    galleryElements.append(createPhotoCard(photocard.name, photocard.link));
  });
};

showPhoto();

function openPopup(elem) {
  elem.classList.add('popup_opened');
}

function closePopup(elem) {
  elem.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  popupFieldName.value = profileName.textContent;
  popupFieldRank.value = profileRank.textContent;
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupPhotoCard);
});

closeButtonProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

closeButtonCard.addEventListener('click', () => {
  closePopup(popupPhotoCard);
});

function handlerFormProfile (evt) {
  evt.preventDefault();

  profileName.textContent = popupFieldName.value;
  profileRank.textContent = popupFieldRank.value;

  closePopup(popupEditProfile);
}

popupFormProfile.addEventListener('submit', handlerFormProfile);

function createPhotoCard(name, link) {
  const galleryElement = elementTemplate.querySelector('.gallery__element').cloneNode('true');

  photoCardImage = galleryElement.querySelector('.photo-card__image');
  photoCardTitle = galleryElement.querySelector('.photo-card__image-title');
  photoCardLike = galleryElement.querySelector('.photo-card__image-like');
  photoCardTrash = galleryElement.querySelector('.photo-card__trash'); 
  photoCardImage.src = link;
  photoCardImage.alt = name;
  photoCardTitle.textContent = name;
  photoCardLike.addEventListener('click', (evt) => {evt.target.classList.toggle('photo-card__image-like_active')});
  photoCardTrash.addEventListener('click', (evt) => {evt.target.closest('.gallery__element').remove()});
  photoCardImage.addEventListener('click', (evt) => {
    popupFormImage.src = evt.target.src;
    popupFormImage.alt = evt.target.alt;
    popupImageTitle.textContent = evt.target.alt;
    openPopup(popupViewForm);
  });

  return galleryElement;
}

function handlerFormCard(evt) {
  evt.preventDefault();
  galleryElements.prepend(createPhotoCard(popupFormTitle.value, popupFormLink.value));
  evt.target.reset();
  closePopup(popupPhotoCard);
}

popupFormCard.addEventListener('submit', handlerFormCard);

popupCloseViewForm.addEventListener('click', () => {
  closePopup(popupViewForm);
});