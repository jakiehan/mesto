export class FormValidator {
  constructor(validationConfig, form) {
    this._data = validationConfig;
    this._form = form;
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
      });
    });
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._data.inputErrorClass);
    errorElement.textContent = '';
  }

  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._data.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
  }

  toggleButtonState = () => {
    const button = this._form.querySelector(this._data.submitButtonSelector);
    button.disabled = !this._form.checkValidity();
    button.classList.toggle(this._data.inactiveButtonClass, !this._form.checkValidity());
  }

  clearErrorMessage(popup) {
    const inputs = Array.from(popup.querySelectorAll(this._data.inputSelector));
    inputs.forEach((input) => {
      input.classList.remove(this._data.inputErrorClass);
    });
    const errorMessages = Array.from(popup.querySelectorAll(this._data.errorMessageSelector));
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = '';
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', this._handleSubmit);
    this._form.addEventListener('input', () => {
      this.toggleButtonState();
    });
    this._setEventListeners();
    this.toggleButtonState();
  }
}