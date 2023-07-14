var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const database = require('./database');

/* GET users listing. */
router.post('/', function (req, res){
  const saltRounds = 10;
  const password = req.body.password;
  console.log(password)
  const username = req.body.username;
  console.log(username)

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }

    const selectDataGuest = `SELECT * FROM users WHERE username='${username}' AND password='${hash}'`;

    database.db.all(selectDataGuest, [], (error, rows) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      // Send data
      res.json(rows);
      console.log(rows);
    });
  });
})

module.exports = router;