export default class UserInfo {
  constructor( { nameSelector, rankSelector } ) {
    this._name = document.querySelector(nameSelector);
    this._rank = document.querySelector(rankSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      rank: this._rank.textContent
    }
  }
  setUserInfo(inputData) {
    this._name.textContent = inputData.name;
    this._rank.textContent = inputData.rank;
  }

}