import test from 'ava';

import users from '../users';
import State from '../state';

test.cb('Get populated list of users', (t) => {
  t.plan(2);

  const user = {
    username: 'Tom',
  };

  State.addUser(user);

  const resMock = {
    send: (userObjects) => {
      t.is(userObjects.length, 1);

      const userObj = userObjects[0];

      t.deepEqual(userObj, user);
    },
  };

  users.getUsers(null, resMock, () => t.end());
});
