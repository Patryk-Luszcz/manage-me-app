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

server.get('/projects/active', (_, res) => {
  const projects = router.db.get('projects').value();

  if (projects.length > 0) {
    const activeProject = projects.filter((project) => project.active === true);

    res.status(200).jsonp(activeProject[0]);
  }
});

server.post('/projects', (req, res) => {
  const { name, description } = req.body;

  const projects = router.db.get('projects');
  const lastProject = projects.value()[projects.size() - 1];
  const newId = lastProject ? lastProject.id + 1 : 1;

  const newProject = {
    id: newId,
    name,
    description,
    active: false,
  };

  projects.push(newProject).write();

  res.status(200).jsonp(newProject);
});

server.put('/projects', (req, res) => {
  const { id, name, description } = req.body;

  router.db.get('projects').find({ id: id }).assign({ name, description }).write();

  const updatedProject = router.db.get('projects').find({ id: id }).value();

  res.status(200).jsonp(updatedProject);
});

// FUNCTIONALITIES

server.get('/functionalities', (req, res) => {
  const functionalities = router.db.get('functionalities').value();
  res.status(200).jsonp(functionalities);
});

server.post('/functionalities', (req, res) => {
  const { projectId, name, description, status, project, owner, priority } = req.body;

  const functionalities = router.db.get('functionalities');
  const lastFunctionality = functionalities.value()[functionalities.size() - 1];
  const newId = lastFunctionality ? lastFunctionality.id + 1 : 1;

  const newFunctionality = {
    id: newId,
    projectId,
    name,
    description,
    status,
    project,
    owner,
    priority,
    tasks: [],
  };

  functionalities.push(newFunctionality).write();

  res.status(200).jsonp(newFunctionality);
});

server.put('/functionalities', (req, res) => {
  const { id, name, description, status, owner, priority } = req.body;

  router.db
    .get('functionalities')
    .find({ id: id })
    .assign({ name, description, status, owner, priority })
    .write();

  const updatedFunctionality = router.db.get('functionalities').find({ id: id }).value();

  res.status(200).jsonp(updatedFunctionality);
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
