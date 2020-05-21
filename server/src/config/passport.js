const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/User");

async function getUser(email) {
  return User.findOne({
    email
  });
}

async function verifyPassword(enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
}

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const user = await getUser(email);

        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        const passwordsMatch = await verifyPassword(password, user.password);
        if (passwordsMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err, user) => done(err, user))
  );
};
