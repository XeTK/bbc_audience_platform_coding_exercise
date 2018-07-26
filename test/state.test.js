import test from 'ava';

import State from '../state';

test('Adding user to state', (t) => {
  const userObj = {
    username: 'Tom',
  };

  t.is(State.users.length, 0);

  State.addUser(userObj);

  t.is(State.users.length, 1);

  const testObject = State.users[0];

  t.deepEqual(testObject, userObj);
});


test('Getting user from username', (t) => {
  const username = 'Thomas';

  const userObj = {
    username,
  };

  State.addUser(userObj);


  const testObject = State.getUser(username);

  t.deepEqual(testObject, userObj);
});

test('Getting null if no user found', (t) => {
  const username = 'Greggory';

  const testObject = State.getUser(username);

  t.deepEqual(testObject, undefined);
});


test('Checking user exists by username', (t) => {
  const username = 'Thomas';

  const result = State.hasUser(username);

  t.truthy(result);
});

test('Checking user does not exists by username', (t) => {
  const username = 'Greggory';

  const result = State.hasUser(username);

  t.falsy(result);
});
