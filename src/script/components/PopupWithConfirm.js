import Popup from './Popup.js'


export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        
        this._submitButton = this._popupSelector.querySelector('.popup__close-button');
    }


    
    close() {
        console.log('close!!!!!');
        super.close()
    }


    setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._formSubmitHandler();
            this.close();
        });
        super.setEventListeners()
    }

    setConfirm(submit) {
        this._formSubmitHandler = submit;
    }

}