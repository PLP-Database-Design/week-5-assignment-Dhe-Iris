const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the database connection
db.connect((err) => {
  if (err) return console.log("error connecting to MySQL");

  // if yes connect
  console.log("Conected to MySql as id: ", db.threadId);
});

//GET method goes here
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Use GET  method here
//Question Number 1: Patients
app.get("/data", (req, res) => {
  // Fetch all patients from the database and render them in the data.ejs file.
  db.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retreieving Data");
    } else {
      //Display patients record on the browser
      res.render("data", { results: results });
    }
  });
});
// STOP GET method  code here

// Question 2: Providers
app.get("/providers", (req, res) => {
  // Fetch first name, last name, and provider specialty from the database and render them in the providers.ejs file.
  db.query(
    "SELECT first_name, last_name, provider_specialty FROM providers",
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data");
      } else {
        // Display providers record on the browser using providers.ejs
        res.render("providers", { results: results });
      }
    }
  );
});

// Stop here

// Question 3: Filter patients by First Name
app.get("/patientsname", (req, res) => {
  // Fetch patients' first name only from the database and render them in the patientsname.ejs file.
  db.query("SELECT first_name FROM patients", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retreieving Data");
    } else {
      //Display patients record on the browser
      res.render("patientsname", { results: results });
    }
  });
});
// Stop here

// Question 4:  Retrieve all providers by their specialty
app.get("/specialty", (req, res) => {
  // Fetch provider specialty from the database and render them in the specialty.ejs file.
  db.query("SELECT provider_specialty FROM providers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      // Display providers record on the browser using providers.ejs
      res.render("specialty", { results: results });
    }
  });
});

// Stop here

// Listen to the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);

  //send a message to the browser
  console.log("sending message to the browser.......");
  app.get("/", (req, res) => {
    res.send("Hello from the server");
  });
});
