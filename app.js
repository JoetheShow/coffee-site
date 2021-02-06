const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/admin', (req, res) => {
  if(req.cookies.userLoggedIn == "true") {
    res.render("admin", {data: "this is the data"});
    // communicate with database, get all coffee
  } else {
    res.cookie("Error", "You must be logged in to view this page");
    res.redirect("/login");
  }
});

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if(email == "test@example.com" && password == "Test1") {
    res.cookie("userLoggedIn", true);
    res.redirect("/admin");
  } else {
    res.cookie("userLoggedIn", false);
    res.cookie("Error", "Bad email/password");
    res.render("login");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
