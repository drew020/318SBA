const v_express = require(`express`);
const v_fs = require('fs').promises;
const v_router = v_express.Router();
module.exports = v_router;

const v_app = v_express();

v_app.use(v_express.json());

// Read the JSON file

v_router.get(`/`, (req, res) => {
  res.status(404).send(`Request denied.`);
  //res.send(`Recieved a GET request for the users.`);
});

v_router.post(`/`, async (req, res) => {
  try {
    // Read the JSON file
    const v_userData = await v_fs.readFile('users.json');
    const v_chatData = await v_fs.readFile('chat.json');

    console.log(`1: Files read`);

    // Parse the JSON data into a JavaScript object
    const v_data = {
      users: JSON.parse(v_userData),
      chat: JSON.parse(v_chatData)
    };

    console.log(`2: Files parsed and stored in v_data:`);
    console.log(v_data.users)
    console.log(v_data.chat)


    if (req.body.username) {
      if (3 < req.body.username.length && req.body.username.length < 8) {
        const l_user = {
          Index: v_data.users.length,
          username: req.body.username
        };

        console.log(`3: username passed requirements:`);
        console.log(l_user);

        v_data.users.push(l_user);

        console.log(`4: New user has been added to virtual array of users:`)
        console.log(v_data.users);

        const jsonString = JSON.stringify(v_data.users, null, 2); // Optionally, pass null and 2 for pretty formatting

        console.log(`5: stringified`);
        console.log(jsonString);

        await v_fs.writeFile('./users.json', jsonString);

        console.log(`6: file check`);

        const v_userData2 = await v_fs.readFile('users.json');

        console.log(JSON.parse(v_userData2));

        res.send(`New user created: ${req.body.username}`);
      }
    }
    else {
      res.status(404).send(`The user with the given ID does not exist and/or user ID most have a lenght of between 3 and 8.`);
    }
  } catch (error) {
    // Handle errors (e.g., file not found, invalid JSON)
    console.error('Error reading JSON file:', error);
    res.status(500).send('Internal Server Error');
  }
});

v_router.get(`/:username/`, (req, res) => {
  //const user = v_users.find(object => object.Index === parseInt(req.params.Index));
  const user = v_users.find(object => object.username === req.params.username);
  //res.send(`Navigated to the user page for ${req.params.username}.`);

  //404
  if (!user) {
    res.status(404).send(`The user with the given ID does not exist.`);
  }
  res.send(user);
});

v_router.get(`/:username/chat`, (res, req) => {
  const l_user = v_users.find(object => object.username === req.params.username);
  if (l_user) {
    res.send(v_chat);

  }
  else {
    res.status(404).send("Access to chat denied.");
  }
})

v_router.post(`/:username/chat`, (req, res) => {
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

v_router.get(`/:username/account/`, (req, res) => {
  res.send(`Navigated to the user's ${req.params.username} account page.`);
});

v_router.get(`/:username/:gameCharacterID/`, (req, res) => {
  res.send(`Navigated to ${req.params.gameCharacterID} character sheet of user ${req.params.username}.`);
});

