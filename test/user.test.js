import test from 'ava';

import User from '../user';

test('Default constructor constructs', (t) => {
  t.plan(4);

  const username = 'tom';
  const accessToken = 'access_token';


  const underTest = new User(username, accessToken);

  t.is(underTest.username, username);
  t.is(underTest.accessToken, accessToken);
  t.is(underTest.numOfNotificationsPushed, 0);

  const currentTime = new Date();

  t.truthy(currentTime - underTest.creationTime < 10);
});


test('messageSent() increments messages sent.', (t) => {
  t.plan(2);

  const underTest = new User('', '');

  t.is(underTest.numOfNotificationsPushed, 0);

  underTest.messageSent();

  t.is(underTest.numOfNotificationsPushed, 1);
});
