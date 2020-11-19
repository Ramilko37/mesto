import Popup from './Popup.js'


export default class PopupWithForm extends Popup {
    constructor(popupSelector, { formSubmitHandler }) {
        
        super(popupSelector)
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._popupElement.querySelector('.popup__button')

        console.log('popupSelector',  this._popupElement)
    }


    _getInputValues() {
        const inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        const obj = {};

        inputs.forEach((input) => {
            obj[input.name] = input.value
        })
        return obj;
    }

    close() {
        // console.log('close!!!!!');
        this._form.reset();
        super.close()
    }


    setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputValue = this._getInputValues();
            this._formSubmitHandler(inputValue);
            // this.close();
        });
        super.setEventListeners()
    }

    loading(msg) {
        console.log('msg', msg)
        this._submitButton.textContent = msg;
    }
}