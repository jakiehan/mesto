const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inputErrorClass: 'popup__field_type_error',
  inactiveButtonClass: 'popup__save-btn_atr_disabled'
}

function enableValidation(data) {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => {
      toggleButtonState(form, data);
    });
    setEventListeners(form, data);
    toggleButtonState(form, data);
  });
}

function setEventListeners(form, data) {
  const inputList = Array.from(form.querySelectorAll(data.inputSelector));
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, data);
    });
  });
}

function checkInputValidity(form, input, data) {
  if (input.validity.valid) {
    hideError(form, input, data);
  } else {
    showError(form, input, data);
  }
}

function hideError(form, input, data) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(data.inputErrorClass);
  errorElement.textContent = '';
}

function showError(form, input, data) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(data.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

function handleSubmit(evt) {
  evt.preventDefault();
}

function toggleButtonState(form, data) {
  const button = form.querySelector(data.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(data.inactiveButtonClass, !form.checkValidity());
}

enableValidation(validationConfig);