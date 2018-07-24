'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var restify = _interopDefault(require('restify'));

class User {
  constructor(username, accessToken) {
    this.username = username;
    this.accessToken = accessToken;

    this.creationTime = new Date();
    this.numOfNotificationsPushed = 0;
  }
}

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
  	let user = this.getUser(username);
  	return (user !== undefined);
  }
}

const instance = new State();
Object.freeze(instance);

function registration(req, res, next) {
  const { 
    username, 
    accessToken 
  } = req.body;

  let result;
  let message = `Registering new user: ${username}`;
  let error = false;

  if (username !== undefined && accessToken !== undefined) {
    if (!instance.hasUser(username)) {

      const tempUser = new User(username, accessToken);
      instance.addUser(tempUser);
      res.send(tempUser);
    } else {
      error = true;
      message = `${username} already exists`;
    }
  } else {
    error = true;
    message = 'Missing parameter!';
  }

  // eslint-disable-next-line no-console
  console.log(message);

  if (error)
    result = new Error(message);

  next(result);
}

var register = {
  registration,
};

function getUsers(req, res, next) {
  res.send(instance.users);

  next();
}

var users = {
  getUsers,
};

const server = restify.createServer();

server.use(
  restify.plugins.queryParser({
    mapParams: true,
  }),
);

server.use(
  restify.plugins.bodyParser({
    mapParams: true,
  }),
);


server.post('/registration', register.registration);
server.get('/users', users.getUsers);

// eslint-disable-next-line no-console
server.listen(8080, () => console.log('%s listening at %s', server.name, server.url));
