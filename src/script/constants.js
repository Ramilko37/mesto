const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

const settings = { 
    formSelector: '.popup__form', 
    inputSelector: '.popup__input', 
    submitButtonSelector: '.popup__button', 
    inactiveButtonClass: 'popup__button_disabled', 
    inputErrorClass: 'popup__input_type_error', 
    errorClass: 'popup__error_visible' 
  }; 


// Modals
const addCardModal = document.querySelector('.popup_type_add-card')
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const cardDeleteModal = document.querySelector('.popup_type_delete');
const renewAvatarModal = document.querySelector('.popup_type_avatar')
const confirmModal = document.querySelector('.popup_type_confirm');
const addCardForm = addCardModal.querySelector('.popup__form');

//image modal data
const imageModal = document.querySelector('.popup_type_image');
const imageModalTitle = imageModal.querySelector('.popup__caption');
const imageModalImg = imageModal.querySelector('.popup__image');


const imageModalImgSelector = '.popup__image';
const imageModalTitleSelector = '.popup__caption';


const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');

const openProfileEditButton = document.querySelector('.profile__edit-button');
const openAddCardModalButton = document.querySelector('.profile__add-button');

const addAvatarButton = document.querySelector('.popup__button_avatar');

// place data
const inputPlace = addCardForm.querySelector('.popup__input_type_place');
const inputUrl = addCardForm.querySelector('.popup__input_type_url');

export {
    initialCards,
    settings,
    imageModal, 
    imageModalTitle, 
    imageModalImg,
    imageModalImgSelector,
    imageModalTitleSelector, 
    cardDeleteModal,
    profileJob,
    profileName,
    addCardForm,
    editProfileModal, 
    addCardModal,
    confirmModal,
    openAddCardModalButton,
    openProfileEditButton,
    addAvatarButton,
    inputName, 
    inputJob,
    inputPlace,
    inputUrl
};