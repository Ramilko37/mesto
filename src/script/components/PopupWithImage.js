import Popup from './Popup.js'


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._img = this._popupElement.querySelector('.popup__image');
        this._caption = this._popupElement.querySelector('.popup__caption');
    }

    open(link, caption) {
        this._img.src = link;
        this._caption.textContent = caption;
        super.open();
    }
}