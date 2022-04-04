import Popup from './Popup.js';

export default class PopupConfirmationAction extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._button = this._popup.querySelector('.popup__btn-s_type_delete');
  }

  open(card) {
    this._Card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._handleSubmit(this._Card);
    })
  }
}