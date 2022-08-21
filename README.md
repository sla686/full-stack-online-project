<div align="center">

# Online Shop

Online Shop is a fullstack project written with MERN stack and TypeScript. This is my first fullstack project I have ever done!
Thanks to this project I have learned a lot about building a fullstack web application, as well as designing backend and frontend parts to coordinate together.
The project is in active development and I am implementing more API endpoints as well as extending the UI.

[About](#about) •
[Demo](#demo) •
[Installation](#installation) •
[Author](#author) •
[License](#license) •

</div>

## About

The project consists of:

1. Frontend:

- React.js (17+)
- React Router (6+)
- Redux (toolkit)
- Material-UI (5+)

2. Backend:

- Node.js 16+
- Express.js 16+
- MongoDB(mongoose 6+)

Additionally, 'Jest' and 'mongodb-memory-server' are used for testing. 'JWTs' are used for authentication, and 'cookies' are used for authorization.

### Endpoints

- GET /api/v1/users - lists all users
- POST /api/v1/users - creates a new user

- GET /api/v1/users/:userId - get information about specified user
- PATCH /api/v1/users/:userId - update information for specified user
- DELETE /api/v1/users/:userId - delete specified user

_Note: more to be added!_

## Demo

- Backend: [User Collection Example](https://backend-online-shop-sla686.herokuapp.com/api/v1/users)
- Frontend: _Under development_

## Installation

1. After succesfull cloning of the repo, change the current working directory to /api or /client side:

```sh
  cd /api
```

OR

```sh
  cd /client
```

2. Install node modules

```sh
  npm install
```

3. **_For /api folder only:_** Create '/api/.env' file with your enivronmental variables. Use '/api/.env.example' file as a template!

4. Start the project in development mode

- For /api

```sh
  npm run start:dev
```

- For /client

```sh
  npm run start
```

4. Testing (husky will also automatically execute the following command on commit)

- For both /api and /client

```sh
  npm run test
```

5. If you wish to build the project and then start it:

- For /api

```sh
npm run build
npm run start
```

- For /client execute the following command and then host the /client/build folder by any means:

```sh
npm run build
```

## Author

- LinkedIn: [Viacheslav Semushin](https://www.linkedin.com/in/viacheslav-semushin/)
- Github: [@sla686](https://github.com/sla686)

## License

Copyright © 2022 [@sla686](https://github.com/sla686) </br>
