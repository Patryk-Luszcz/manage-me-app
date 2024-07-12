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

  res.status(200).json(userWithId);
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
  const { id, name, description, active } = req.body;

  const projects = router.db.get('projects').value();

  projects.forEach((project) => {
    if (project.id !== id) {
      project.active = false;
    } else {
      project.active = active;
    }
  });

  router.db.set('projects', projects).write();
  router.db.get('projects').find({ id: id }).assign({ name, description, active }).write();

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

  const currentTime = new Date();

  const timeString = currentTime.toTimeString().slice(0, 5);
  const dateString = currentTime.toLocaleDateString('en-GB');

  const newFunctionality = {
    id: newId,
    projectId,
    name,
    description,
    status,
    dateAdded: `${dateString} ${timeString}`,
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

// TASKS

server.post('/task', (req, res) => {
  const form = req.body;
  const functionalities = router.db.get('functionalities').value();
  const functionality = functionalities.find(({ name }) => name === form.taskBelongToFunctionality);

  if (functionality) {
    if (!functionality.tasks) {
      functionality.tasks = [];
    }

    const taskId = functionality.tasks.length + 1;

    const currentTime = new Date();

    const timeString = currentTime.toTimeString().slice(0, 5);
    const dateString = currentTime.toLocaleDateString('en-GB');

    const newTask = {
      id: taskId,
      functionalityId: functionality.id,
      dateAdded: `${dateString} ${timeString}`,
      dateStart: '',
      dateEnd: '',
      ...form,
    };

    if (form.state === 'doing') {
      newTask.dateStart = `${dateString} ${timeString}`;
    }

    if (form.state === 'done') {
      newTask.dateStart = `${dateString} ${timeString}`;
      newTask.dateEnd = `${dateString} ${timeString}`;
    }

    functionality.tasks.push(newTask);

    router.db.get('functionalities').find({ id: functionality.id }).assign(functionality).write();

    res.status(200).jsonp(newTask);
  } else {
    res.status(404).json({ error: 'Functionality not found' });
  }
});

server.put('/task', (req, res) => {
  const functionalityId = req.body.functionalityId;
  const taskId = req.body.id;
  const updatedTask = req.body;

  const functionalities = router.db.get('functionalities');
  const functionality = functionalities.find({ id: functionalityId }).value();

  if (!functionality) {
    res.status(404).json({ error: 'Functionality not found' });
    return;
  }

  const tasks = functionality.tasks;
  const taskIndex = tasks.findIndex(({ id }) => id === taskId);

  if (taskIndex === -1) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  tasks[taskIndex] = updatedTask;
  router.db.get('functionalities').find({ id: functionalityId }).assign({ tasks: tasks }).write();

  res.status(200).json({ message: 'Task updated successfully' });
});

server.put('/task/state', (req, res) => {
  const functionalityId = req.body.functionalityId;
  const taskId = req.body.id;
  const taskState = req.body.state;

  const functionalities = router.db.get('functionalities');
  const functionality = functionalities.find({ id: functionalityId }).value();

  if (!functionality) {
    res.status(404).send('Functionality not found');
    return;
  }

  const task = functionality.tasks.find((task) => task.id === taskId);
  if (!task) {
    res.status(404).send('Task not found');
    return;
  }

  const taskIndex = functionality.tasks.findIndex(({ id }) => id === taskId);

  if (taskState === 'todo') {
    task.dateStart = '';
    task.dateEnd = '';
  }

  if (taskState === 'doing') {
    const currentTime = new Date();

    const timeString = currentTime.toTimeString().slice(0, 5);
    const dateString = currentTime.toLocaleDateString('en-GB');

    task.dateStart = `${dateString} ${timeString}`;
    task.dateEnd = '';
  }

  if (taskState === 'done') {
    const currentTime = new Date();

    const timeString = currentTime.toTimeString().slice(0, 5);
    const dateString = currentTime.toLocaleDateString('en-GB');

    task.dateEnd = `${dateString} ${timeString}`;
  }

  task.state = taskState;

  functionality.tasks[taskIndex] = task;
  functionalities.find({ id: functionalityId }).assign({ tasks: functionality.tasks }).write();

  res.status(200).json(task);
});

server.delete('/task', (req, res) => {
  const { taskId, functionalityId } = req.query;

  const db = router.db;
  const functionality = db
    .get('functionalities')
    .find({ id: parseInt(functionalityId) })
    .value();

  if (!functionality) {
    return res.status(404).jsonp({ error: 'Functionality not found' });
  }

  const taskIndex = functionality.tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex === -1) {
    return res.status(404).jsonp({ error: 'Task not found' });
  }

  functionality.tasks.splice(taskIndex, 1);

  db.get('functionalities')
    .find({ id: parseInt(functionalityId) })
    .assign({ tasks: functionality.tasks })
    .write();

  res.status(200).jsonp({ message: 'Task deleted successfully' });
});

// ADMIN PANEL

server.get('/users', (_, res) => {
  const users = router.db.get('users').value();

  if (users.length > 0) {
    res.status(200).jsonp(users);
  }
});

server.put('/users', (req, res) => {
  const { id, firstName, lastName, login, role } = req.body;

  const name = `${firstName} ${lastName}`;

  router.db
    .get('users')
    .find({ id: id })
    .assign({ firstName, lastName, name, login, role })
    .write();

  const updatedUser = router.db.get('users').find({ id: id }).value();

  res.status(200).jsonp(updatedUser);
});

// NOTIFACATIONS

server.post('/notifications', (req, res) => {
  const newNotifacation = req.body;

  const notificationsDB = router.db.get('notifications');

  notificationsDB.push(newNotifacation).write();

  res.status(200).jsonp();
});

server.post('/notifications/clear', (req, res) => {
  router.db.set('notifications', []).write();

  res.status(200).jsonp([]);
});

// PORT LISTENER

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
