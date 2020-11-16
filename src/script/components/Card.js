export default class Card {

    constructor(data, cardSelector, userId, {
        handleLike,
        handleCardClick,
        handleDeleteConfirm,
        handleDislike
    }) {
        console.log('data id!!!', data)
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._userId = userId;
        this._handleLike = handleLike;
        this._handleCardClick = handleCardClick;
        this._handleDeleteConfirm = handleDeleteConfirm;
        this._handleDislike = handleDislike;
    }


    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
            .content.querySelector('.location').cloneNode(true)

        return cardElement
    }

    cardDelete = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', (evt) => {
            this._handleLike(this._id)
        })
        this._cardDeleteButton.addEventListener('click', this._cardDelete);
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));

    }

    toggleLike(shouldLike) {
        let newCount = this._likes.length;
        this._cardLikeButton.classList.toggle('location__like_active');

        if (shouldLike) {
            newCount = newCount + 1;
        } else {
            newCount = newCount - 1;
        }

        this._cardLikeNumber.textContent = newCount;
    }

    _likesCounter() {
        this._likeCounter = this._cardElement.querySelector('.location__like-counter');
        this._likeCounter.textContent = toString(data.likes.length);
        console.log(this._likeCounter);
    }



    createCard() {
        this._cardElement = this._getTemplate()

        this._cardImage = this._cardElement.querySelector('.location__image');
        this._cardTitle = this._cardElement.querySelector('.location__title');
        this._cardLikeButton = this._cardElement.querySelector('.location__like');
        this._cardDeleteButton = this._cardElement.querySelector('.location__delete');
        this._cardLikeNumber = this._cardElement.querySelector('.location__like-counter');
        

        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardLikeNumber.textContent = this._likes.length;
        this._setEventListeners();

        console.log(this._likes)

        const isLiked = this._likes.find(like => {
            return like._id == this._userId
        });

        if (isLiked) {
            this._classIsLiked();
        }

        return this._cardElement;
    }
}





















































// import {
//     imageModal,
//     imageModalTitle,
//     imageModalImg
// } from './constants.js';

// import Popup from './components/Popup.js';
// import { toggleModalWindow } from './index.js';

// export default class Card extends Popup {
//     constructor(item, cardSelector, handleCardClick) {
//         this._title = item.name;
//         this._link = item.link;
//         this._cardSelector = cardSelector;
//         this._handleCardClick = handleCardClick;
//     }


//     _getTemplate() {
//         const cardElement = document
//             .querySelector(this._cardSelector)
//             .content
//             .querySelector('.location')
//             .cloneNode(true)

//         return cardElement;
//     }

//     _cardDelete = () => {
//         this._cardElement.remove();
//         this._cardElement = null;
//     }

//     // _openImage = () => {
//         _handleCardClick() {
//         imageModalImg.src = this._cardImage.src
//         imageModalTitle.textContent = this._cardTitle.textContent
//         imageModalImg.alt = this._cardTitle.textContent


//         toggleModalWindow(imageModal);
//     }

//     // _handleCardClick() {
//     //     super.open();
//     // }

//     _setEventListeners() {
//         this._cardLike.addEventListener('click', (evt) => {
//             evt.target.classList.toggle('location__like_active');
//         });
//         this._cardDeleteBtn.addEventListener('click', this._cardDelete);
//         this._cardElement.querySelector('.location__image').addEventListener('click',
//           () =>  this._handleCardClick());


//     }

//     generateCard() {
//         this._cardElement = this._getTemplate();

//         this._cardImage = this._cardElement.querySelector('.location__image');
//         this._cardTitle = this._cardElement.querySelector('.location__title');
//         this._cardLike = this._cardElement.querySelector('.location__like');
//         this._cardDeleteBtn = this._cardElement.querySelector('.location__delete');

//         this._cardImage.src = this._link;
//         this._cardTitle.textContent = this._title;
//         this._cardImage.alt = this._title;

//         this._setEventListeners();

//         return this._cardElement;


//     }

// }