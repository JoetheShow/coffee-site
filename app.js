const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
const port = 3000;

mongoose.connect('mongodb://localhost/coffee');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});
var user = mongoose.model("user", userSchema);

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

app.get('/signup', (req, res) => {
  res.render("signup");
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

  user.find({email: email, password: password}, 
   function(err, response){
      let user = response[0];
      console.log(response);
      if(user) {
        res.cookie("userLoggedIn", true);
        res.redirect("/admin");
      } else {
        res.cookie("userLoggedIn", false);
        res.cookie("Error", "Bad email/password");
        res.render("login");
      }
  });
  
});

app.post("/signup", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  user.create({name: name, email: email, password: password});
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
