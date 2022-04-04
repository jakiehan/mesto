export default class UserInfo {
  constructor( { nameSelector, rankSelector, avatarSelector } ) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(rankSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = '';
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      _id: this._id
    }
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._id = userData._id;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}