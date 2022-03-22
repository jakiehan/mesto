export default class UserInfo {
  constructor( { nameSelector, rankSelector } ) {
    this._name = nameSelector;
    this._rank = rankSelector;
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