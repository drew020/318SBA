const v_express = require(`express`);
const v_fs = require('fs').promises;
const v_router = v_express.Router();
module.exports = v_router;

const v_app = v_express();

v_app.use(v_express.json());

// Read the JSON file

v_router.get(`/`, async (req, res) => {
  const v_userData = await v_fs.readFile('users.json');

  console.log(`1: Files read`);

  // Parse the JSON data into a JavaScript object
  const v_data = {
    users: JSON.parse(v_userData),
  };
  console.log(`2: Files parsed and stored in v_data:`);

  res.send(JSON.stringify(v_data.users, null, 2))
});

v_router.post(`/`, async (req, res) => {
  try {
    // Read the JSON file
    const v_userData = await v_fs.readFile('users.json');
    console.log(`1: Files read`);

    // Parse the JSON data into a JavaScript object
    const v_data = {
      users: JSON.parse(v_userData),
    };
    console.log(`2: Files parsed and stored in v_data:`);

    if (req.body.username) {
      if (3 < req.body.username.length && req.body.username.length < 8) {
        const l_user = {
          Index: v_data.users.length +1,
          username: req.body.username
        }
        console.log(`3: username passed requirements:`);

        console.log(l_user);

        v_data.users.push(l_user);

        console.log(`4: New user has been added to virtual array of users:`)
        console.log(v_data.users);

        const jsonString = JSON.stringify(v_data.users, null, 2); // Optionally, pass null and 2 for pretty formatting

        console.log(`5: stringified`);
        console.log(jsonString);
        
        res.send(`New user created: ${req.body.username}`);

        await v_fs.writeFile('./users.json', jsonString);

        console.log(`6: file check`);

        const v_userData2 = await v_fs.readFile('users.json');

        console.log(JSON.parse(v_userData2));

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

v_router.put(`/`, async (req, res) => {
  try {
    // Read the JSON file
    const v_userData = await v_fs.readFile('users.json');
    console.log(`1: Files read`);

    // Parse the JSON data into a JavaScript object
    const v_data = {
      users: JSON.parse(v_userData),
    };
    console.log(`2: Files parsed and stored in v_data:`);

    if (req.body.username) {
      if (3 < req.body.username.length && req.body.username.length < 8) {
        const l_user = {
          Index: v_data.users.length++,
          username: req.body.username
        }
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

v_router.delete(`/`, async (req, res) => {
  // Read the JSON file
  const v_userData = await v_fs.readFile('users.json');
  console.log(`0: Files read`);

  // Parse the JSON data into a JavaScript object
  const v_data = {
    users: JSON.parse(v_userData),
  };
  console.log(`1: fil stored as array nested in object(v_data)`);

  console.log(`2: Files parsed and stored in v_data:`);
  console.log(v_data.users);


  if (req.body.username) {

    let l_userID_index;
    console.log(`3: Created variable to store index of found username; default value is undefined`);

    console.log(`4: find username match in v_data.user and store index in l_userID`);
    for (let i = 0; i < v_data.users.length; i++) {

      if (req.body.username == v_data.users[i].username) {
        l_userID_index = i;
        console.log(`5: Found username index match, stored in l_userID`);
        break;
      }
    }

    if (l_userID_index != undefined) {
      console.log(`6: attempting to delete username element`)
      if (v_data.users.splice(l_userID_index, 1)) {
        console.log(`7: deletion successful `)
      }
      else {
        console.log(`7: deletion failed!!!!`)
        res.status(500).send(`Failed to delete user`);
      }

      const jsonString = JSON.stringify(v_data.users, null, 2); // Optionally, pass null and 2 for pretty formatting
      console.log(`8: stringified v_data.user`);
      console.log(jsonString);

      await v_fs.writeFile('./users.json', jsonString)


      console.log(`9: success to write file`)
      res.send(`deleted user and/or write file`);
    }
    else {
      console.log(`6: failed to find user`)
      res.status(500).send(`Failed to delete and or find user on file`);
    }
  }
});

v_router.get(`/:username/`, async (req, res) => {
  const v_userData = await v_fs.readFile('users.json');

  console.log(`1: Files read`);

  // Parse the JSON data into a JavaScript object
  const v_data = {
    users: JSON.parse(v_userData),
  };
  console.log(`2: Files parsed and stored in v_data:`);

  let l_user;

  //const user = v_users.find(object => object.Index === parseInt(req.params.Index));
  if (l_user = v_data.users.find(object => object.username === req.params.username)) {
    console.log(`3: User found`);
    res.send(JSON.stringify(l_user, null, 2));


  } else {
    console.log(`2: User not found`);
    res.status(400).send(`The user with the given ID does not exist.`);
  }
});