var express = require('express');
var router = express.Router();

const database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/data-guest', function (req, res){
    const selectDataGuest = "SELECT * FROM guest";

    database.db.all(selectDataGuest, [], (error, rows) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        
        // send data json
        res.json(rows);
    });
})

module.exports = router;