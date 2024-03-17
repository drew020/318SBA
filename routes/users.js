const v_express = require(`express`);
const v_router = v_express.Router();
module.exports = v_router;

v_router.get(`/`, (req, res) => {
    res.send(`Users requested: ${v_users}`);
    //res.send(`Recieved a GET request for the users.`);
  });
 
  v_router.post(`/`, (req, res) => {
  
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
    else{
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

  