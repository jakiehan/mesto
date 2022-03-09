import { chart } from './utils.js';
import { documentSelector } from './constants.js';

export class Card {
  constructor(dataCard, elementTemplate) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._elementTemplate = elementTemplate;
  }

  createPhotoCard() {
    this._galleryElement = document
      .querySelector(this._elementTemplate).content
      .querySelector('.gallery__element').cloneNode('true');
    this._photoCardImage = this._galleryElement.querySelector('.photo-card__image');
    this._photoCardTitle = this._galleryElement.querySelector('.photo-card__image-title');
    this._photoCardLike = this._galleryElement.querySelector('.photo-card__image-like');
    this._photoCardTrash = this._galleryElement.querySelector('.photo-card__trash');

    this._setEventListeners();

    this._photoCardImage.src = this._link;
    this._photoCardImage.alt = this._name;
    this._photoCardTitle.textContent = this._name;

    return this._galleryElement;
  }

  _handlePhotoCardLike = () => {
    this._photoCardLike.classList.toggle('photo-card__image-like_active');
  }

  _handlePhotoCardTrash = () => {
    this._galleryElement.remove();
    this._galleryElement = null;
  }

  _handlePhotoCardImage = () => {
    documentSelector.popupFormImage.src = this._link;
    documentSelector.popupFormImage.alt = this._name;
    documentSelector.popupImageTitle.textContent = this._name;
    chart.openPopup(documentSelector.popupViewForm);
  }

  _setEventListeners() {
    this._photoCardLike.addEventListener('click', this._handlePhotoCardLike);
    this._photoCardTrash.addEventListener('click', this._handlePhotoCardTrash);
    this._photoCardImage.addEventListener('click', this._handlePhotoCardImage);
  }
}
