export default class FormValidator {
  constructor(formElement, settings) {
    console.log('formElement', formElement)
    this._formElement = formElement;
    this._settings = settings;
  }

  _showError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._settings.errorClass);
  };

  _hideError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._settings.errorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _buttonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._settings.inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {

      this._buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  }

  _setEventListeners() {

    this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._settings.submitButtonSelector);


    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._buttonState();
      });
    });
  };

  enableValidation = () => {
    const submitFormHandler = (event) => {
      event.preventDefault();
    };

    this._formElement.addEventListener("submit", submitFormHandler);

    this._setEventListeners();


  }
}