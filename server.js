const v_express = require(`express`);//using express module and cache as app
const v_fs = require('fs').promises;
const v_cors = require('cors');

const v_app = v_express();

v_app.set(`view engine`,`ejs`);

const v_userRouter = require(`./routes/users.js`);

const v_hostname = '127.0.0.1';
//set port or if undefined set to 5000
const v_port = process.env.PORT || 5000;

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
v_app.use(v_express.json());
v_app.use(v_express.static('src'));
//v_app.use(v_express.Route())

const f_logReq = function (req, res, next) {
  console.log("Request Received");
  next();
};
v_app.use(f_logReq);

// Enable CORS for specific origins
const corsOptions = {
  origin: 'http://127.0.0.1:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

v_app.use(v_cors(corsOptions));

//External routes Link
v_app.use("/api/users", v_userRouter)
//#endregion


//#region ROUTES
v_app.get(`/`, (req, res) => {
  res.render(`chat`);
});
v_app.get(`/home`, (req, res) => {
  res.render(`chat`);
});
v_app.get(`/chat`, (req, res) => {
  res.render(`chat`);
});
v_app.get(`/textgame/create_character`, (req, res) => {
  res.render(`create_character`);
});
v_app.get(`/textgame/prologue`, (req, res) => {
  res.render(`prologue`);
});

// v_app.get(`/api/`, (req, res) => {
//   const l_data = {
//     users:v_userRouter.v_users,
//     chat: v_userRouter.v_chat
//   }
//   res.send( l_data);
// });

v_app.get('/api/', async (req, res) => {
  try {
    // Read the JSON file
    const v_userData = await v_fs.readFile('users.json');
    const v_chatData = await v_fs.readFile('chat.json');

    // Parse the JSON data into a JavaScript object
    const v_data = {
     users: JSON.parse(v_userData),
     chat: JSON.parse(v_chatData)
  };

    console.log(v_data);
    
    // Send the JSON data as the response
    res.send(v_data);

  } catch (error) {
    // Handle errors (e.g., file not found, invalid JSON)
    console.error('Error reading JSON file:', error);
    res.status(500).send('Internal Server Error');
  }
});
//#endregion

// const port = 3000;

v_app.listen(v_port, () => {
  console.log(`Express Server running at http://${v_hostname}:${v_port}/`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/home`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/chat`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/textgame/create_character`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/textgame/prologue`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/api/`);
  console.log(`Express Server running at http://${v_hostname}:${v_port}/api/users/`);

})
