import restify from 'restify';

import register from './register';
import users from './users';
import notify from './notify';


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
server.post('/notify', notify.notifier);

// eslint-disable-next-line no-console
server.listen(8080, () => console.log('%s listening at %s', server.name, server.url));
