const express = require("express");

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

const User = require("../models/User"); // needed so mongoose can access the model
const userModel = mongoose.model("user");

const { ensureAuthenticated } = require("../utilities/authenticate");

// Login: post
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  let errors = [];

  if (!email || !password) {
    errors.push({
      msg: "Please fill in all fields"
    });
  }

  if (errors.length > 0) {
    return res.json(errors);
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "authentication failed"
      });
    }

    // when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response.
    req.login(user, err => {
      if (err) {
        return next(err);
      }

      return res.json({
        success: true,
        message: "authentication succeeded",
        email: user.email
      });
    });
  })(req, res, next);
});

// Register: post (handle)
router.post("/register", async (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  let data = {
    errors: [],
    registeredSuccessfully: false
  };

  if (!name || !email || !password || !passwordConfirmation) {
    data.errors.push("Please fill in all fields");
  }

  if (password !== passwordConfirmation) {
    data.errors.push("Passwords do not match");
  }

  if (password.length < 6) {
    data.errors.push("Password needs to be 6 or more characters long");
  }

  if (data.errors.length > 0) {
    res.json(data);
    return;
  }

  const existingUser = await getUser(email);
  if (existingUser) {
    data.errors.push("A user with that email already exists");
    return res.json(data);
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  const savedUsed = await newUser.save();
  if (savedUsed) {
    data.registeredSuccessfully = true;
  }

  return res.json(data);
});

async function getUser(email) {
  return User.findOne({
    email
  });
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Logout
router.get("/logout", (req, res) => {
  req.logOut();
  return res.json({
    success: true
  });
});

// Account info
router.get("/account", ensureAuthenticated, (req, res) => {
  const userId = req.session.passport.user;

  User.findById(userId)
    .then(user => {
      return res.json({
        authorized: true,
        userInfo: {
          name: user.name,
          email: user.email,
          date: user.date
        }
      });
    })
    .catch(error => console.log(error));
});

module.exports = router;
