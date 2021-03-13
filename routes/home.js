var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
const app = express();
const authenticateUser = require("../middlewares/authenticateUser");
const mongoose = require("mongoose");

var bodyParser=require("body-parser");

const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
var path = require('path');
const User = require("../models/User");

mongoose
  .connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });
router
  .get("/", (req, res) => {
    res.redirect("copr.html");
  })
  .get("/log", (req, res) => {
    res.redirect("copr.html");
  })
  .get("/reg", (req, res) => {
    res.redirect("copr.html");
  })

  .get("/home", authenticateUser, (req, res) => {
    res.redirect("homes.html", { user: req.session.user });
  })
 ;
 
// route for handling post requirests
router
  .post("/log", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits) {
      res.send("invalid username or password");
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) {
      res.send("invalid useranme or password");
      return;
    }

    // else he\s logged in
    req.session.user = {
      email,
    };

    res.redirect("homes.html");
   
  })

  
  .post("/reg", async (req, res) => {
    const { email, password, cpassword } = req.body;

    // check for missing filds
    if (!email || !password || !cpassword) {
      res.send("Please enter all the fields");
      return;
    }

    const doesUserExitsAlreay = await User.findOne({ email });

    if (doesUserExitsAlreay) {
      res.send("A user with that email already exits please try another one!");
      return;
    }
	
	if(password!=cpassword){
		res.send("Password didn't match");
	}
	else
	{
		 // lets hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new User({ email, password: hashedPassword });
    latestUser
      .save()
      .then(() => {
        res.send("registered account!");
        return;
      })
      .catch((err) => console.log(err));
	}});
    
//logout
router.get("/logout", authenticateUser, (req, res) => {
    req.session.user = null;
    res.redirect("copr.html");
  });
 
    module.exports = router;