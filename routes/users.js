var express = require('express');
var router = express.Router();

const database = require('../database');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login-post', function (req, res){
  const password = req.body.password;
  const username = req.body.username;

  bcrypt.hash(password, 10, (err, hash) => {
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
