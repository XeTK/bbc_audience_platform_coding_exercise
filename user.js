
export default class User {
  constructor(username, accessToken) {
    this.username = username;
    this.accessToken = accessToken;

    this.creationTime = new Date();
    this.numOfNotificationsPushed = 0;
  }

  messageSent() {
    // I think the ++ is clearer than the alternative in this case.
    // eslint-disable-next-line no-plusplus
    this.numOfNotificationsPushed++;
  }
}
