let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');

let popupForm = document.querySelector('.popup__form');
let popupFieldName = popupForm.querySelector('.popup__field-name');
let popupFieldRank = popupForm.querySelector('.popup__field-rank');

function popupClose() {
  popup.classList.remove('popup_opened');
}

function popupOpen() {
  popup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);

popupCloseBtn.addEventListener('click', popupClose);

document.addEventListener('keydown', function(evt) {
  if (evt.code === 'Escape') {
    popupClose();
  }
});

function formSumbitHandler (evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileRank = document.querySelector('.profile__rank');

  profileName.textContent = popupFieldName.value;
  profileRank.textContent = popupFieldRank.value;

  popupClose();
}

popupForm.addEventListener('submit', formSumbitHandler);