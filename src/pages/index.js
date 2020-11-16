import './index.css';

import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import UserInfo from '../script/components/UserInfo.js';
import Api from '../script/components/Api.js';

import {
    initialCards,
    settings,
    inputJob,
    inputName,
    editProfileModal,
    addCardModal,
    cardDeleteModal,
    addAvatarButton,
    openAddCardModalButton,
    openProfileEditButton,
    inputPlace,
    inputUrl,
    imageModalImgSelector,
    confirmModal
} from '../script/constants.js';

import PopupWithConfirm from '../script/components/PopupWithConfirm.js';

const popupWithConfirm = new PopupWithConfirm(confirmModal);
console.log(popupWithConfirm);

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: 'be6e413a-ec4e-40fe-a90b-19ec5fbfee46',
        'Content-Type': 'application/json'
    }
});

api.getContent()
    .then(([cards, userInfoData]) => {
        console.log(cards) // 
        console.log(userInfoData) // 
        function addNewCard(data) {
            const card = new Card(
                data,
                '.card-template', {
                    handleImageClick,
                    handleDeleteConfirm: () => {
                        popupWithConfirm.open();
                        popupWithConfirm.setConfirm(() => {
                            api.deleteCard(card._id)
                                .then(() => {
                                    card.cardDelete();
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                    },
                    handleLike: (id) => {

                        if (shouldlike) {
                            api.like(id)
                                .then(res => {
                                    card.toggleLike(true); // 
                                    console.log(res)
                                })
                        } else {
                            api.dislike(id)
                                .then(res => {
                                    card.toggleLike(false);
                                    console.log(res)
                                })
                        }
                    }
                }
            );

            const cardList = new Section({
                items: cards,
                renderer: (item) => {
                    addNewCard(item)
                }
            }, placesListSelector)
            cardList.renderItems()

            const cardElement = card.createCard();
            cardList.addItem(cardElement);
        }   

        // const cardList = new Section({
        //     items: cards,
        //     renderer: (item) => {
        //         addNewCard(item)
        //     }
        // }, placesListSelector)
        // cardList.renderItems()


      

        // console.log('info', data)
        userInfo.setUserInfo({
            name: userInfoData.name,
            job: userInfoData.about
        })

        const editModal = new PopupWithForm('.popup_type_edit-profile', {

            formSubmitHandler: (data) => {
                editModal.loading('Сохранение')
                api.setUserInfo({
                        name: data.name,
                        about: data.job
                    })
                    .then(res => {
                        userInfo.setUserInfo({
                            name: res.name,
                            job: res.about
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        popupEditProfile.loading('Сохранить')
                    })
            }
        })



        openProfileEditButton.addEventListener('click', () => {
            const data = userInfo.getUserInfo();

            inputName.value = data.name
            inputJob.value = data.job
            editModal.open();
        });

    

        const addModal = new PopupWithForm('.popup_type_add-card', {
            // addModal.setEventListeners();

            formSubmitHandler: (data) => {
                api.addCard({
                        name: data.place,
                        link: data.url
                    })
                    .then(res => {
                        addNewCard(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        popupEditProfile.loading('Сохранить')
                    })

            }
        })

        openAddCardModalButton.addEventListener('click', () => {
            addModal.open(), console.log('123')
        });
    })

console.log('getContent')


//avatar change

const newAvatar = new PopupWithForm('.popup_type_add-avatar', {
    formSubmitHandler: (data) => {
        api.refreshAvatar(data)
            .then(res => {
                userInfo.setUserAvatar(res)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                newAvatar.loading('Сохранить')
            })

    }

})

const imageModal2 = new PopupWithImage('.popup_type_image');
imageModal2.setEventListeners();

function handleImageClick(link, caption) {
    imageModal2.open(link, caption);
}





// placesList - блок, который нужно заполнить датой.
const placesListSelector = '.places';




// cardList.renderItems();

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__description'
});

const editFormValidation = new FormValidator(editProfileModal, settings)
debugger;
const addCardFormValidation = new FormValidator(addCardModal, settings)

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();