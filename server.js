const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

server.use(jsonServer.bodyParser);
server.use(middlewares);

//LOIGN AND REGISTER

server.post('/users/login', (req, res) => {
  const { login, password } = req.body;
  const users = router.db.get('users').value();

  const user = users.find(
    (user) => user.login.trim() === login && user.password.trim() === password
  );
  if (user) {
    const authorizationToken = jwt.sign({ userId: user.id }, 'my-secret-key');

    user.authorizationToken = authorizationToken;

    res.status(200).jsonp(user);
  } else {
    res.status(401).jsonp({ error: 'Invalid credentials' });
  }
});

server.post('/users/register', (req, res) => {
  const newUser = req.body;
  newUser.role = { name: 'developer' };

  const users = router.db.get('users');
  const existingUser = users.find({ login: newUser.login }).value();

  if (existingUser) {
    res.status(409).json({ error: 'User already exists' });
    return;
  }

  const allUsers = users.value();
  const lastUserId = allUsers.length > 0 ? allUsers[allUsers.length - 1].id : 0;

  const generatedId = lastUserId + 1;
  const authorizationToken = jwt.sign({ userId: generatedId }, 'my-secret-key');

  const userWithId = {
    id: generatedId,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    login: newUser.login,
    authorizationToken: authorizationToken,
    password: newUser.password,
    role: {
      name: 'developer',
    },
  };
  users.push(userWithId).write();

  res.status(201).json(userWithId);
});

// PROJECTS

server.get('/projects', (_, res) => {
  const projects = router.db.get('projects').value();

  if (projects.length > 0) {
    res.status(200).jsonp(projects);
  }
});

// FUNCTIONALITIES

server.get('/functionalities', (req, res) => {
  const functionalities = router.db.get('functionalities').value();
  res.status(200).jsonp(functionalities);
});

// ADMIN PANEL

server.get('/users', (_, res) => {
  const users = router.db.get('users').value();

  if (users.length > 0) {
    res.status(200).jsonp(users);
  }
});

// PORT LISTENER

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
