
export default class User {
  constructor(username, accessToken) {
    this.username = username;
    this.accessToken = accessToken;

    this.creationTime = new Date();
    this.numOfNotificationsPushed = 0;
  }

  messageSent() {
    this.numOfNotificationsPushed++;
  }
}
