const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));


// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysqlroot0708",
    database: "meditrack_db"
});


db.connect((err) => {
    if (err) {
        console.log("Database connection failed!");
        console.log(err);
    } else {
        console.log("Connected to MySQL Database");
    }
});


// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});


// Patient Insert
app.post("/patients", (req, res) => {

    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const phone = req.body.phone;

    const sql = "INSERT INTO patients (name, age, gender, phone) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, age, gender, phone], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Patient insertion failed");
        }
        else {
            res.send("Patient added successfully");
        }

    });

});


// Doctor Insert
app.post("/doctors", (req, res) => {

    const doctor_name = req.body.doctor_name;
    const specialization = req.body.specialization;
    const phone = req.body.phone;

    const sql = "INSERT INTO doctors (doctor_name, specialization, phone) VALUES (?, ?, ?)";

    db.query(sql, [doctor_name, specialization, phone], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Doctor insertion failed");
        }
        else {
            res.send("Doctor added successfully");
        }

    });

});

// Appointment Insert
app.post("/appointments", (req, res) => {

    const patient_name = req.body.patient_name;
    const doctor_name = req.body.doctor_name;
    const appointment_date = req.body.appointment_date;

    const sql = "INSERT INTO appointments (patient_name, doctor_name, appointment_date, appointment_time) VALUES (?, ?, ?, ?)";

    const appointment_time = "10:00:00";

    db.query(sql, [patient_name, doctor_name, appointment_date, appointment_time], (err, result) => {

        if (err) {
            console.log(err);
            res.send("Appointment insertion failed");
        }
        else {
            res.send("Appointment booked successfully");
        }

    });

});

// Server Start
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
