const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');

server.use(jsonServer.bodyParser);
server.use(middlewares);

//LOGOWANIE

server.post('/users', (req, res) => {
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
