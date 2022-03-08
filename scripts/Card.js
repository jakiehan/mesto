import { chart } from './utils.js';
import { documentSelector } from './constants.js';

export class Card {
  constructor(dataCard, elementTemplate) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._elementTemplate = elementTemplate;
  }

  createPhotoCard() {
    const galleryElement = document
      .querySelector(this._elementTemplate).content
      .querySelector('.gallery__element').cloneNode('true');
    this._photoCardImage = galleryElement.querySelector('.photo-card__image');
    this._photoCardTitle = galleryElement.querySelector('.photo-card__image-title');
    this._photoCardLike = galleryElement.querySelector('.photo-card__image-like');
    this._photoCardTrash = galleryElement.querySelector('.photo-card__trash');

    this._setEventListeners();

    this._photoCardImage.src = this._link;
    this._photoCardImage.alt = this._name;
    this._photoCardTitle.textContent = this._name;

    return galleryElement;
  }

  _handlePhotoCardLike(evt) {
    evt.target.classList.toggle('photo-card__image-like_active');
  }

  _handlePhotoCardTrash(evt) {
    evt.target.closest('.gallery__element').remove()
  }

  _handlePhotoCardImage = () => {
    documentSelector.popupFormImage.src = this._photoCardImage.src;
    documentSelector.popupFormImage.alt = this._photoCardTitle.textContent;
    documentSelector.popupImageTitle.textContent = this._photoCardTitle.textContent;
    chart.openPopup(documentSelector.popupViewForm);
  }

  _setEventListeners() {
    this._photoCardLike.addEventListener('click', this._handlePhotoCardLike);
    this._photoCardTrash.addEventListener('click', this._handlePhotoCardTrash);
    this._photoCardImage.addEventListener('click', this._handlePhotoCardImage);
  }
}
