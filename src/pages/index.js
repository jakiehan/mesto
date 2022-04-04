import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirmationAction from '../components/PopupConfirmationAction.js'
import {
  documentSelectors,
  validationConfig,
  profileEditButton,
  profileAddButton,
  popupFieldName,
  popupFieldRank,
  apiOptions,
  profileAvatarEdit,
  popupSelectors,
  popupFormSelectors
} from '../utils/constants.js';

const api = new Api(apiOptions);

api.getUserInfo().then((infoProfile) => {
  userData.setUserInfo(infoProfile);
  userData.setUserAvatar(infoProfile);
}).catch(err => {
  console.log(`Не удалось загрузить данные профиля ${ err }`)
})

api.getCards().then((cards) => {
  showPhoto.renderItems(cards);
}).catch(err => {
  console.log(`Не удалось загрузить фотокарточки с сервера ${ err }`)
})

const profileFormValidator = new FormValidator(validationConfig, popupFormSelectors.popupFormProfile);
const cardFormValidator = new FormValidator(validationConfig, popupFormSelectors.popupFormCard);
const avatarFormValidator = new FormValidator(validationConfig, popupFormSelectors.popupFormAvatar);

const showPhoto = new Section({
  renderer: (item) => {
    showPhoto.addItem(generateCard(item));
  }
}, documentSelectors.galleryElements);

const popupImage = new PopupWithImage(popupSelectors.popupViewForm);

const popupPhotoCard = new PopupWithForm(popupSelectors.popupPhotoCard, {
  handleForm: (inputData) => {
    popupPhotoCard.changeTextBtn(true, 'Сохранение...');
    api.uploadCard(inputData).then((card) => {
      showPhoto.addItem(generateCard(card));
    }).catch(err => {
      console.log(`Не удалось загрузить фото на сервер ${ err }`)
    }).finally(() => {
      popupPhotoCard.changeTextBtn(false, 'Создать');
    })
    popupPhotoCard.close();
  }
});

const popupEditAvatar = new PopupWithForm(popupSelectors.popupEditAvatar, {
  handleForm: (inputData) => {
    popupEditAvatar.changeTextBtn(true, 'Сохранение...');
    api.updateAvatar(inputData).then((avatar) => {
      userData.setUserAvatar(avatar)
    }).catch(err => {
      console.log(`Не удалось обновить фото профиля ${ err }`)
    }).finally(() => {
      popupEditAvatar.changeTextBtn(false, 'Сохранить');
    })
    popupEditAvatar.close();
  }
});

const popupEditProfile = new PopupWithForm(popupSelectors.popupEditProfile, {
  handleForm: (inputData) => {
    popupEditProfile.changeTextBtn(true, 'Сохранение...');
    api.updateProfileInfo(inputData).then((infoProfile) => {
      userData.setUserInfo(infoProfile)
    }).catch(err => {
      console.log(`Не удалось обновить данные профиля ${ err }`)
    }).finally(() => {
      popupEditProfile.changeTextBtn(false, 'Сохранить');
    })
    popupEditProfile.close();
  }
});

const popupDeleteCard = new PopupConfirmationAction (popupSelectors.popupDeleteCard, {
  handleSubmit: (Card) => {
    api.deleteCard(Card._idCard).then(() => {
      Card.handlePhotoCardTrash();
    }).catch(err => {
      console.log(`Не удалось удалить фото ${ err }`)
    }).finally(() => {
    })
    popupDeleteCard.close();
  }
});

const userData = new UserInfo({
  nameSelector: documentSelectors.profileName,
  rankSelector: documentSelectors.profileAbout,
  avatarSelector: documentSelectors.profileAvatar
});

// Возвращаем готовый элемент фотокарточки
function generateCard(data) {
  const userId = userData.getUserInfo()._id;
  const card = new Card(data, userId, documentSelectors.template, {
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleTrashClick: (Card) => {
      popupDeleteCard.open(Card);
    },
    handleLike: (idCard) => {
      card.checkMyLike();
      if (card.isLiked) {
        api.deleteLike(idCard).then((arrLikes) => {
          card.updateArrLikes(arrLikes.likes);
          card.changeStatus();
        }).catch(err => {
          console.log(`Ошибка ${err}`)
        })
      } else {
        api.putLike(idCard).then((arrLikes) => {
          card.updateArrLikes(arrLikes.likes);
          card.changeStatus();
        }).catch(err => {
          console.log(`Ошибка ${err}`)
        })
      }
    }
  });
  const cardElement = card.createPhotoCard();
  return cardElement;
}

// Слушаем кнопку открытия попапа редактирования профиля(подставляем данные в инпуты, открываем попапыч)
profileEditButton.addEventListener('click', () => {
  const profileData = userData.getUserInfo();
  popupFieldName.value = profileData.name;
  popupFieldRank.value = profileData.about;
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

// Слушаем кнопку открытия попапа смены аватара
profileAvatarEdit.addEventListener('click', () => {
  avatarFormValidator.clearErrorMessage();
  avatarFormValidator.toggleButtonState();
  popupEditAvatar.open();
})

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
popupImage.setEventListeners();
popupPhotoCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupEditAvatar.setEventListeners();
