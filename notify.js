import restify from 'restify-clients';

import State from './state';


function pushToPushBullet(username, body, callback) {
  const user = State.getUser(username);

  const title = `Message for ${username}`;

  const client = restify.createJsonClient({
    url: 'https://api.pushbullet.com',
  });

  client.post(
    {
      path: '/v2/pushes',
      headers: {
        'Access-Token': user.accessToken,
        'Content-Type': 'application/json',
      },
    },
    {
      body,
      title,
      type: 'note',
    },
    (err, req, res, obj) => {
      const hasError = (res.statusCode !== 200);

      if (!hasError) {
        user.messageSent();
      }

      callback(hasError, obj);
    },
  );
}


function notifier(req, res, next) {
  const {
    username,
    body,
  } = req.body;

  let result;
  let message = `Sending message to ${username}`;
  let error = false;

  if (username !== undefined && body !== undefined) {
    if (State.hasUser(username)) {
      pushToPushBullet(
        username,
        body,
        (isError, response) => {
          if (!isError) {
            res.send(response);
          } else {
            error = true;
            message = `Error while sending notification to ${username}`;
          }
        },
      );
    } else {
      error = true;
      message = `${username} does not exist!`;
    }
  } else {
    error = true;
    message = 'Missing parameter!';
  }

  // eslint-disable-next-line no-console
  console.log(message);

  if (error) result = new Error(message);

  next(result);
}

export default {
  notifier,
};
