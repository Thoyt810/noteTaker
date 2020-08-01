const express = require("express");
const mysql = require("mysql");
const app = express();
var path = require("path")

var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Tomcat96!?",
  database: "notes_db"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

app.post("/api/notes", function(req, res) {
    console.log(req)
    connection.query("INSERT INTO notes SET ?", [req.body])
})

app.get("/api/notes", function( req, res) {
  console.log(req);
  connection.query("SELECT * FROM notes;", function(err,data) {
    if (err) {
      throw err 
    }
    res.json(data);
  })
})

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });