export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarSelector = document.querySelector(avatarSelector)
    }


    getUserInfo() {

        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        
        };
    }


    setUserInfo({name, job, avatar}) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
        this._avatarSelector.style.backgroundImage = `url(${avatar})`
    }

    setUserAvatar(avatar) {
        this._avatarSelector.style.backgroundImage = `url(${avatar})`
    }
}