
export default class Card {
  constructor(dataCard, userId, elementTemplate, { handleCardClick, handleTrashClick, handleLike }) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._idCardUser = dataCard.owner._id;
    this._idCard = dataCard._id;
    this._idUser = userId;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLike = handleLike;
    this._elementTemplate = elementTemplate;
  }

  // Шаблон
  _getTemplate() {
    this._galleryElement = document
      .querySelector(this._elementTemplate).content
      .querySelector('.gallery__element')
      .cloneNode('true');
    return this._galleryElement;
  }

  // Создаем элемент фотокарточки
  createPhotoCard() {
    this._element = this._getTemplate();
    this._photoCardImage = this._element.querySelector('.photo-card__image');
    this._photoCardTitle = this._element.querySelector('.photo-card__image-title');
    this._photoCardLike = this._element.querySelector('.photo-card__image-like');
    this._photoCardTrash = this._element.querySelector('.photo-card__trash');
    this._photoCardLikeCount = this._element.querySelector('.photo-card__image-like-count');

    this._photoCardImage.src = this._link;
    this._photoCardImage.alt = this._name;
    this._photoCardTitle.textContent = this._name;

    this._setEventListeners();
    this.showMyLikes();
    this.showLikesCount();
    this._handleDeleteBtn();

    return this._element;
  }

  // Обновляем массив лайков
  updateArrLikes(arrLikes) {
    this._likes = arrLikes;
    this.showLikesCount();
  }

  // Отображаем лайкнутые лайки
  showMyLikes() {
    this._likes.forEach((like) => {
      if (like._id === this._idUser) {
        this._photoCardLike.classList.add('photo-card__image-like_active');
      }
    })
  }

  // Лайк(активный/неактивный)
  _handlePhotoCardLike = () => {
    this._photoCardLike.classList.toggle('photo-card__image-like_active');
  }

  // Показываем количество лайков
  showLikesCount() {
    if (this._likes.length === 0) {
      this._photoCardLikeCount.textContent = '';
    } else {
      this._photoCardLikeCount.textContent = this._likes.length;
    }
  }

  // Проверяем есть ли среди лайков мой
  checkMyLike() {
    this._likes.forEach((like) => {
      if (like._id === this._idUser) {
        this.isLiked = true;
      }
    });
  }

  // Переключетель
  changeStatus() {
    this.isLiked = !this.isLiked;
    this._handlePhotoCardLike();
  }

  // Показываем/непоказываем корзину если свое/не свое фото
  _handleDeleteBtn() {
    if (this._idCardUser !== this._idUser) {
      this._photoCardTrash.remove();
    }
  }

  // Удаляем карточку
  handlePhotoCardTrash = () => {
    this._element.remove();
    this._element = null;
  }

  // Слушаем
  _setEventListeners() {
    this._photoCardLike.addEventListener('click', () => {
      this._handleLike(this._idCard);
    });
    this._photoCardTrash.addEventListener('click', () => {
      this._handleTrashClick(this);
    });
    this._photoCardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
