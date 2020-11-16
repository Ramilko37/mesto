import Popup from './Popup.js'


export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    
        this._submitButton = this._popupElement.querySelector('.popup__button');
    }


    
    close() {
        // console.log('close!!!!!');
        super.close()
    }


    setEventListeners() {
        this._submitButton.addEventListener('click', (e) => {
            this._formSubmitHandler();
            this.close();
        });
        
        super.setEventListeners()
    }

    setConfirm(submit) {
        this._formSubmitHandler = submit;
    }

}