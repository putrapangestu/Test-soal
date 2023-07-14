const { error } = require('console');

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const maxString = 10;

// connect to db
const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (error) => {
    if(error) return console.log(error.message)
})


// Create guest table
const tableGuest = `CREATE TABLE IF NOT EXISTS guest (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT,
    alamat TEXT,
    telp INTEGER,
    catatan TEXT
  );`;
  
  // Create users table
  const tableUsers = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    token TEXT,
    role INTEGER
  );`;

  db.serialize(() => {
    // Run table 
    db.run(tableGuest);
    db.run(tableUsers);
  });
  
  // Insert data into guest table
  const dataGuest = `INSERT INTO guest (nama, alamat, telp, catatan) VALUES (?, ?, ?, ?);`;
  const insertGuest = db.prepare(dataGuest);
  
  // Insert data into users table
  const dataUsers = `INSERT INTO users (username, password, role) VALUES (?, ?, ?);`;
  const insertUsers = db.prepare(dataUsers);
  
  // Function for guest data
  function guestData(id) {
    const nama = `Peter Karl ${id}`;
    const alamat = 'Jl. Malang';
    const telp = 89616709191;
    const catatan = `Catatan hari ini adalah ${id}`;
  
    insertGuest.run(nama, alamat, telp, catatan);
  }
  
  // Insert 100 data into guest table
  for (let i = 1; i <= 100; i++) {
    guestData(i);
  }
  
  // Insert data into users table
  const userData = [
    ['user', 'passworduser', 1],
    ['admin', 'passwordadmin', 2]
  ];
  
  userData.forEach(user => {
    let password = user[1];
    bcrypt.hash(password, maxString, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }
      //replace password with hash
      user[1] = hash;
    });
    insertUsers.run(user[0], password, user[2]);
  });
  
  // Close statement
  insertGuest.finalize();
  insertUsers.finalize();
  
  // close database
  db.close();

// export database for any file
module.exports = {
    db,
}


