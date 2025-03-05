// class definitions

class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  // handle displaying error messages next to fields
  _showInputError(inputElement, errorMessage) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId); // find the error element
    inputElement.classList.add(this._inputErrorClass); // add an error class to the input element
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  // handle hiding error messages next to fields
  _hideInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId); // find the error element
    inputElement.classList.remove(this._inputErrorClass); // remove an error class to the input element
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  // checks if any input in a form is invalid
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // enables or disables the submit button based on input validity
  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.diasbled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  // validates a single input field
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // attaches event listeners to form elements, such as input fields
  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  // clear error messages and reset input states
  resetValidation() {

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this.toggleButtonState();
    this._formEl.reset();
  }

  // initializes validation across forms by calling _setEventListeners
  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      this.resetValidation();
      evt.preventDefault(); // prevent the form from submitting
    });
    this._setEventListeners();
  }
}

export default FormValidator;
