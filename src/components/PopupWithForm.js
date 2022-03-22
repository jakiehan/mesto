import Popup from './Popup.js';

export default class popupWithForm extends Popup {
  constructor(popupSelector, { handleForm }) {
    super(popupSelector);
    this._handleForm = handleForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
  }
  _getInputValues() {
    const inputData = {};
    this._inputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleForm(this._getInputValues());
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
}