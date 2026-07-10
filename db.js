const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysqlroot0708",
    database: "meditrack_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Database Connection Failed!");
        console.error(err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

module.exports = connection;