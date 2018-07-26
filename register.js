import User from './user';
import State from './state';

function registration(req, res, next) {
  const {
    username,
    accessToken,
  } = req.body;

  let result;
  let message = `Registering new user: ${username}`;
  let error = false;

  if (username !== undefined && accessToken !== undefined) {
    if (!State.hasUser(username)) {
      const tempUser = new User(username, accessToken);
      State.addUser(tempUser);
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

  if (error) {
    result = new Error(message);
  }

  next(result);
}

export default {
  registration,
};
