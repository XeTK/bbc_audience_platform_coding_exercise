# Audience Platform Coding Exercise

## Running
If you have Docker installed on your machine the quickest way to get the application up and running is to execute the `./build.sh` script. 
This will build and start a Docker container with all the bits the application needs to run.

If you do not have Docker you will have to do a few more steps, Make sure you have version 10.7.0 Node.js installed (NVM makes this a bit easier).
In the root directory execute the following commands,
1. `npm install` This gets all the dependencies needed for the project.
2. `npm run build` this will transpile the Javascript to a single .js file which we can then execute.
3. `npm start` will execute the application


## Tests
To run the tests execute `npm test`, to see the test coverage open `coverage/index.html`.

## Calls

### Register
To register a new user, carry out the following REST call.

HTTP Method: POST
Path: `/registration`
Body:
```
{
  "username": "username",
  "accessToken": "access_token_here"
} 
```

### Users
To list all the users that are registered with the service.

HTTP Method: GET
Path: `/users`


### Message
To Send a message to a registered user, send the following REST call.

HTTP Method: POST
Path: `/notify`
Body: 
```
{
  "username": "username",
  "body": "message text"
}
```