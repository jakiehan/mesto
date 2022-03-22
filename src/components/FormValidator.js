export  default class FormValidator {
  constructor(validationConfig, form) {
    this._data = validationConfig;
    this._form = document.querySelector(form);

    this._button = this._form.querySelector(this._data.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._data.inputSelector));
  }

  // Слушаем все инпуты
  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
      });
    });
  }

  // Проверяем инпуты на валидность
  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  // Инпут валиден - Убираем класс с ошибкой очищаем сообщение с ошибкой
  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._data.inputErrorClass);
    errorElement.textContent = '';
  }

  // Инпут невалиден - добавляем класс с ошибкой, показываем сообщение с ошибкой
  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._data.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  // Отменяем действие по умолчанию
  _handleSubmit(evt) {
    evt.preventDefault();
  }

  // Переключем состояние кнопки (активная/неактивная)
  toggleButtonState = () => {
    this._button.disabled = !this._form.checkValidity();
    this._button.classList.toggle(this._data.inactiveButtonClass, !this._form.checkValidity());
  }

  // Очищаем сообщения об ошибках
  clearErrorMessage() {
    this._inputs.forEach((input) => {
      input.classList.remove(this._data.inputErrorClass);
      this._hideError(input);
    });
  }

  // Запускаем валидацию
  enableValidation() {
    this._form.addEventListener('submit', this._handleSubmit);
    this._form.addEventListener('input', () => {
      this.toggleButtonState();
    });
    this._setEventListeners();
    this.toggleButtonState();
  }
}