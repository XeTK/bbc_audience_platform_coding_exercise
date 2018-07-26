import test from 'ava';

import register from '../register';
import State from '../state';

test.cb('Error if no params given', (t) => {
  t.plan(1);

  const reqMock = {
    body: {},
  };

  const resMock = {
    send: () => t.fail(),
  };

  const endMock = (result) => {
    t.is(result.message, 'Missing parameter!');
    t.end();
  };

  register.registration(reqMock, resMock, endMock);
});


test.cb('Create new user', (t) => {
  t.plan(5);

  const username = 'terrance';
  const accessToken = 'accesstoken';

  const reqMock = {
    body: {
      username,
      accessToken,
    },
  };

  const resMock = {
    send: (user) => {
      t.is(user.username, username);
      t.is(user.accessToken, accessToken);

      const newUser = State.getUser(username);
      t.is(newUser.username, username);
      t.is(newUser.accessToken, accessToken);
    },
  };

  const endMock = (result) => {
    t.is(result, undefined);
    t.end();
  };

  register.registration(reqMock, resMock, endMock);
});

test.cb('Error if user already exists', (t) => {
  t.plan(1);

  const username = 'terrance';
  const accessToken = 'accesstoken';

  const reqMock = {
    body: {
      username,
      accessToken,
    },
  };

  const resMock = {
    send: () => t.fail(),
  };

  const endMock = (result) => {
    t.is(result.message, 'terrance already exists');
    t.end();
  };

  register.registration(reqMock, resMock, endMock);
});
