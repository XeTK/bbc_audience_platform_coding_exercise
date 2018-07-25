import State from './state';

function getUsers(req, res, next) {
  res.send(State.users);

  next();
}

export default {
  getUsers,
};
