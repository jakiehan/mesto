const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupPhotoCard = document.querySelector('.popup_photo-card');
const profileAddButton = document.querySelector('.profile__add-button');

const popupFormProfile = document.querySelector('.popup__form_type_profile');
const popupFieldName = popupFormProfile.querySelector('.popup__field_type_name');
const popupFieldRank = popupFormProfile.querySelector('.popup__field_type_rank');

const popupFormCard = document.querySelector('.popup__form_type_card');
const popupFormTitle = popupFormCard.querySelector('.popup__field_type_title');
const popupFormLink = popupFormCard.querySelector('.popup__field_type_link');

const profileName = document.querySelector('.profile__name');
const profileRank = document.querySelector('.profile__rank');

const galleryElements = document.querySelector('.gallery__elements');
const elementTemplate = document.querySelector('.element-template').content;

const popupViewForm = document.querySelector('.popup_viewing-photo');
const popupFormImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

showPhoto();

addListenerClosePopup();

function showPhoto() {
  galleryPhotoCards.forEach((photocard) => {
    galleryElements.append(createPhotoCard(photocard));
  });
};

function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupTheEsc);
}

function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupTheEsc);
}

function handleFormProfile () {
  
  profileName.textContent = popupFieldName.value;
  profileRank.textContent = popupFieldRank.value;

  closePopup(popupEditProfile);
}

function createPhotoCard(dataCard) {
  const galleryElement = elementTemplate.querySelector('.gallery__element').cloneNode('true');

  const photoCardImage = galleryElement.querySelector('.photo-card__image');
  const photoCardTitle = galleryElement.querySelector('.photo-card__image-title');
  const photoCardLike = galleryElement.querySelector('.photo-card__image-like');
  const photoCardTrash = galleryElement.querySelector('.photo-card__trash'); 
  photoCardImage.src = dataCard.link;
  photoCardImage.alt = dataCard.name;
  photoCardTitle.textContent = dataCard.name;
  photoCardLike.addEventListener('click', (evt) => {evt.target.classList.toggle('photo-card__image-like_active')});
  photoCardTrash.addEventListener('click', (evt) => {evt.target.closest('.gallery__element').remove()});
  photoCardImage.addEventListener('click', () => {
    popupFormImage.src = photoCardImage.src;
    popupFormImage.alt = photoCardTitle.textContent;
    popupImageTitle.textContent = photoCardTitle.textContent;
    openPopup(popupViewForm);
  });

  return galleryElement;
}

function handleFormCard(evt) {
  const dataUser = {
    name: popupFormTitle.value, 
    link: popupFormLink.value
  }
  galleryElements.prepend(createPhotoCard(dataUser));
  evt.target.reset();
  toggleButtonState(popupFormCard, validationConfig);
  closePopup(popupPhotoCard);
}

function closePopupTheEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
    clearErrorMessege(popupEditProfile, validationConfig);
  }
}

function addListenerClosePopup() {
  popups = Array.from(document.querySelectorAll('.popup')); 
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
        clearErrorMessege(popupEditProfile, validationConfig);
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
        clearErrorMessege(popupEditProfile, validationConfig);
      } 
    });
  });
}

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  popupFieldName.value = profileName.textContent;
  popupFieldRank.value = profileRank.textContent;
});

profileAddButton.addEventListener('click', () => {
  openPopup(popupPhotoCard);
});

popupFormProfile.addEventListener('submit', handleFormProfile);

popupFormCard.addEventListener('submit', handleFormCard);