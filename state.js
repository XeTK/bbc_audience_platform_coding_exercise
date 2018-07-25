// This is a singleton with the state.
class State {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(username) {
    return this.users.find(item => item.username === username);
  }

  hasUser(username) {
    const user = this.getUser(username);
    return (user !== undefined);
  }
}

const instance = new State();
Object.freeze(instance);

export default instance;
