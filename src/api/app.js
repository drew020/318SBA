const v_express = require(`express`);//using express module and cache as app
const fs = require('fs').promises;

const v_app = v_express();

v_app.use(v_express.json());


const v_hostname = '127.0.0.1';
//set port or if undefined set to 3000
const v_port = process.env.PORT || 3000;


const v_users = [
  { Index: 0, userID: `Pragma` },
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


//#endregion

//#region ROUTES
v_app.get(`/`, (req, res) => {
  res.send(`Hello Express!`);
});

v_app.get(`/api/`, (req, res) => {
  res.send(`API requested`);
});

v_app.get(`/api/users/`, (req, res) => {
  res.send(`Recieved a GET request for the users.`);
});
v_app.post(`/api/users/`, (req, res) => {
  const user = {
    Index: v_users.length + 1,
    userID: req.body.userID
  };
  v_users.push(user);

  console.log(`New user created: ${user}`)
  res.send(user);
  //res.send(`Recieved a POST request for the users: ${req.params.userID}`);
});

v_app.get(`/api/users/:userID/`, (req, res) => {
  //const user = v_users.find(object => object.Index === parseInt(req.params.Index));
  const user = v_users.find(object => object.userID === req.params.userID);
  //res.send(`Navigated to the user page for ${req.params.userID}.`);

  //404
  if (!user) { res.status(404).send(`The user with the given ID does not exist.`); }
  res.send(user);
});

v_app.post(`/api/users/:userID/`, (req, res) => {

  res.send(`Recieved a POST request for the users: ${req.params.userID}`);
});

v_app.get(`/api/users/:userID/account/`, (req, res) => {
  res.send(`Navigated to the user's ${req.params.userID} account page.`);
});

v_app.get(`/api/users/:userID/:gameCharacterID/`, (req, res) => {
  res.send(`Navigated to ${req.params.gameCharacterID} character sheet of user ${req.params.userID}.`);
});
//#endregion

// const port = 3000;

v_app.listen(v_port, () => {
  console.log(`Express Server running at http://${v_hostname}:${v_port}/`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/api/`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/api/users/`);
})
