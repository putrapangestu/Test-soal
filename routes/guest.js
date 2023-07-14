var express = require('express');
var router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (error) => {
    if(error) return console.log(error.message)
})

const database = require('../database');

/* GET users listing. */
router.get('/', function (req, res){
    db.all("SELECT * from guest",[],(err, rows) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        
        res.json(rows);
    })
})

module.exports = router;