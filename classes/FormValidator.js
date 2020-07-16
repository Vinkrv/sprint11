export class FormValidator {

    constructor(form , errors) {
        this.form = form;
        this.errors = errors;
    }

    checkInputValidity(element) {      
        const errorElem = this.form.querySelector(`#${element.id}-error`);
        const validity = element.validity;    

        if (validity.valid) {
            errorElem.textContent = '';
            return true;
        }

        if (validity.tooShort) {
            errorElem.textContent = this.errors.tooShort;
            return false;

        }

        if (validity.valueMissing) {
            errorElem.textContent = this.errors.valueMissing;
            return false;
        }

        if (validity.typeMismatch) {
            errorElem.textContent = this.errors.typeMismatch;
            return false;
        }
        
        return element.checkValidity();
    }

    setSubmitButtonState(button, state) {
        if (state) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', true);
        }
    }

    enableValidation(event) {
        const submit = this.form.querySelector('.button');
        const target = event.target;
        const currentForm = event.currentTarget;

        this.checkInputValidity(target);
        if (currentForm.checkValidity()) {
            this.setSubmitButtonState(submit, true);
        } else {
            this.setSubmitButtonState(submit, false);
        }
    }

    setEventListeners() {
        this.form.addEventListener('input' , this.enableValidation.bind(this), true);
    }

    resetForm() {
        this.form.reset();
    }

    resetButtonForm() {
        this.form.querySelector('.button').setAttribute('disabled', true);
    }

    cleanError() {
        const error = this.form.querySelectorAll('.error');
        error.forEach(function (popup) {
            popup.textContent = '';
        });
    }
}