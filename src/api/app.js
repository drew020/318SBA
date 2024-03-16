const v_express = require(`express`);//using express module and cache as app
const v_fs = require('fs').promises;
const cors = require('cors');

// Enable CORS for all routes

const v_app = v_express();
v_app.use(v_express.json());

v_app.use(cors());

const v_hostname = '127.0.0.1';
//set port or if undefined set to 5000
const v_port = process.env.PORT || 5000;


const v_users = [
  {
    Index: 0,
    username: `Pragma`
  }
];

const v_chat = [
  {
    username: "Pragma",
    message: "Hi!"
  }
];



//#reigon HTTP Module
// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World!\n');
// });

// server.listen(port, hostname, () => {  
//     console.log(`Http Server running at http://${hostname}:${port}/`);
// });
//#endregion

//#region MIDDLEWARE
const logReq = function (req, res, next) {
  console.log("Request Received");
  next();
};

v_app.use(logReq);

// Enable CORS for specific origins
const corsOptions = {
  origin: 'http://127.0.0.1:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

v_app.use(cors(corsOptions));
//#endregion

//#region ROUTES
v_app.get(`/`, (req, res) => {
  res.send(`Hello Express!`);

});

v_app.get(`/api/`, (req, res) => {
  const l_data = {
    users: v_users,
    chat: v_chat
  }
  res.send( l_data);
});

v_app.get(`/api/users/`, (req, res) => {
  res.send(`Users requested: ${v_users}`);
  //res.send(`Recieved a GET request for the users.`);
});

v_app.post(`/api/users/`, (req, res) => {

  if (req.body.username) {
    if (3 < req.body.username.length && req.body.username.length < 8) {
      const l_user = {
        Index: v_users.length + 1,
        username: req.body.username
      };

      v_users.push(l_user);

      res.send(`New user created: ${req.body.username}`);
    }
    else {
      // 400 bad request 
      res.status(404).send(`The user with the given ID does not exist and/or user ID most have a lenght of between 3 and 8.`);
    }
  }
  else {
    // 400 bad request 
    res.status(404).send(`The user with the given ID does not exist.`);
  }
  //res.send(`Recieved a POST request for the users: ${req.params.username}`);
});

v_app.get(`/api/users/:username/`, (req, res) => {
  //const user = v_users.find(object => object.Index === parseInt(req.params.Index));
  const user = v_users.find(object => object.username === req.params.username);
  //res.send(`Navigated to the user page for ${req.params.username}.`);

  //404
  if (!user) {
    res.status(404).send(`The user with the given ID does not exist.`);
  }
  res.send(user);
});

v_app.get(`/api/users/:username/chat`, (res, req) => {
  const l_user = v_users.find(object => object.username === req.params.username);
  if (l_user) {
  res.send(v_chat);

  }
  else{
    res.status(404).send("Access to chat denied.");
  }
})

v_app.post(`/api/users/:username/chat`, (req, res) => {
  //const l_user = v_users.find(object => object.username === req.params.username);
  const l_user = v_users.find(object => object.username === req.body.username);
  if (l_user) {

    const l_message =
    {
      username: req.body.username,
      message: req.body.message
    }

    if (l_message.message) {
      v_chat.push(l_message)
      //res.send(l_message);
      res.send(`Recieved a POST to chat request for the user: ${req.params.username}`);
      return;
    }
  }
  else {
    res.status(404).send(`Nonexistent users can not send messages or empty messages.`);
    return;
  }
});

v_app.get(`/api/users/:username/account/`, (req, res) => {
  res.send(`Navigated to the user's ${req.params.username} account page.`);
});

v_app.get(`/api/users/:username/:gameCharacterID/`, (req, res) => {
  res.send(`Navigated to ${req.params.gameCharacterID} character sheet of user ${req.params.username}.`);
});
//#endregion

// const port = 3000;

v_app.listen(v_port, () => {
  console.log(`Express Server running at http://${v_hostname}:${v_port}`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/api/`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/api/users/`);

})
