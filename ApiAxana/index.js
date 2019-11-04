const express = require('express');
require('express-group-routes');

const app = express();
const port = Number(process.env.PORT || 5000);

const bodyParser = require('body-parser');

app.use(bodyParser.json());
const AuthController = require('./controllers/auth');
const ForyousController = require('./controllers/foryous');
const {authenticated} = require('./middleware');

app.group('/api/v1', router => {
  router.get('/yolo', (req, res) => {
    //res means, response, and it send string "Hello Express!" to the API
    res.send('Hello Express!');
  });

  // Login
  router.post('/login', AuthController.login);
  router.post('/register', AuthController.register);
  router.get('/user/:id', authenticated, AuthController.show);
  router.get('/rooms', authenticated, ForyousController.index);
  router.post('/room', authenticated, ForyousController.add);
  router.put('/room/:id', authenticated, ForyousController.edit);
  router.get('/customers', authenticated, ForyousController.customer);
  router.post('/customer', authenticated, ForyousController.addcustomer);
  router.put('/customer/:id', authenticated, ForyousController.editcustomer);
  router.get('/checkin', authenticated, ForyousController.checkin);
  router.post('/orders', authenticated, ForyousController.addcheckin);
  router.put('/order/:id', authenticated, ForyousController.editorder);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
