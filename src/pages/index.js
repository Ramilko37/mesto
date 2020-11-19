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
    confirmModalSelector,
    imageModalSelector,
    profileAvatar,
    renewAvatarModal
} from '../script/constants.js';

import PopupWithConfirm from '../script/components/PopupWithConfirm.js';

const popupWithConfirm = new PopupWithConfirm(confirmModalSelector);
// console.log(popupWithConfirm);
popupWithConfirm.setEventListeners();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: 'be6e413a-ec4e-40fe-a90b-19ec5fbfee46',
        'Content-Type': 'application/json'
    }
});

const errHandler = err => console.log(err);

const imageModal = new PopupWithImage(imageModalSelector);
imageModal.setEventListeners();

function handleImageClick(link, caption) {
    imageModal.open(link, caption);
}

api.getContent()
    .then(([cards, userInfoData]) => {
        console.log('cards', cards)
        // отрендерить карточки
        const cardList = new Section({
            items: cards,
            renderer: (item) => {
                addNewCard(item)
            }
        }, placesListSelector)

        cardList.renderItems()
        

        function createCard(data) {
            const card = new Card(
                data,
                '.card-template',
                userInfoData._id,
                {
                    handleImageClick,
                    handleDeleteConfirm: () => {
                        popupWithConfirm.open();
                        popupWithConfirm.setConfirm(() => {
                            api.deleteCard(card.getId())
                                .then(() => {
                                    console.log('deleted!!!')
                                    card.cardDelete();
                                })
                                .catch(errHandler);
                        })
                    },
                    handleLike: (id, isCardLiked) => { 
                        if (isCardLiked) {
                            api.dislike(id)
                                .then(res => {
                                    card.updateLikes(res.likes);
                                    // card.toggleLike();
                                })
                                .catch(errHandler);
                        }
                        else {
                            api.like(id)
                                .then(res => {
                                    card.updateLikes(res.likes);
                                    // card.toggleLike();
                                })
                                .catch(errHandler);
                        }
                    }
                }
            
            );

            return card.createCard();           
        }


        function addNewCard(data) {
            const card = createCard(data);
            cardList.addItem(card);
        }
    
        console.log('userInfoData avatar', userInfoData)
        // обновить профиль юзера
        userInfo.setUserInfo({
            name: userInfoData.name,
            job: userInfoData.about,
            avatar: userInfoData.avatar
        })

        openProfileEditButton.addEventListener('click', () => {
            const data = userInfo.getUserInfo();

            inputName.value = data.name
            inputJob.value = data.job
            editModal.open();
        });

        const addModal = new PopupWithForm('.popup_type_add-card', {
            formSubmitHandler: (data) => {
                console.log('submitted!!!!')
                api.addCard({
                    name: data.place,
                    link: data.url
                })
                    .then(res => {
                        addNewCard(res);
                        addModal.close();
                    })
                    .catch(errHandler)
                    .finally(() => {
                       addModal.loading('Сохранение')
                    })

            }
        })
        addModal.setEventListeners();
        openAddCardModalButton.addEventListener('click', () => {
            addModal.open()
        });
     
    })
    .catch(errHandler);
// здесь заканчивается обработчик .then

const editModal = new PopupWithForm('.popup_type_edit-profile', {
    formSubmitHandler: (data) => {
        console.log('form submit handler!!!!')
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
            // запрос выполнен успешно, далее происходит закрытие 
            editModal.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                editModal.loading('Сохранить')
            })
    }
})
editModal.setEventListeners();





const newAvatarModal = new PopupWithForm('.popup_type_add-avatar', {
    formSubmitHandler: (data) => {
        console.log('refreshAvatar data', data);
        newAvatarModal.loading('Сохранение...');
        api.refreshAvatar(data)
            .then(res => {
                userInfo.setUserAvatar(res.avatar)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                newAvatarModal.loading('Сохранить')
                newAvatarModal.close();
            })

    }

})

newAvatarModal.setEventListeners();

profileAvatar.addEventListener('click', () => {
    newAvatarModal.open();
})


// placesList - блок, который нужно заполнить датой.
const placesListSelector = '.places';

// cardList.renderItems();

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
});

const editFormValidation = new FormValidator(editProfileModal, settings)
const addCardFormValidation = new FormValidator(addCardModal, settings)
const editAvatarFormValidation = new FormValidator(renewAvatarModal, settings)
editFormValidation.enableValidation();
addCardFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();