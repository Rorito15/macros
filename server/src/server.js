// import express from "express"; // can only be used when compiled via babel as node doesn't support this on its own
// import mongoose from "mongoose";
// import keys from "./config/keys";

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const keys = require("./config/keys");

const app = express();

// Database
const database = keys.MongoURI;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB database"))
  .catch(error => console.log(error));

// Example of how to access passed through params
// app.get("/api/users/:id", (req, res) => {
//   res.send(req.params.id);
// });

// Middleware - run every time a request is made
// const logger = (req, res, next) => {
//   console.log("Hello");
//   next(); // Make sure to call the next piece of middleware
// }
// app.use(logger);

// Bodyparser Middleware (required to parse the data sent by the client in the 'body')
// Handle JSON data
app.use(express.json());
// Handle form data (URL encodded data)
app.use(
  express.urlencoded({
    extended: false
  })
);

// Express session
app.use(
  session({
    secret: "RedWhiteBlackYellow",
    resave: true,
    saveUninitialized: true
  })
);

// Passport Config
require("./config/passport")(passport);

// Passport middleware (must be after express session middleware)
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user")); // any route in routes/user will be <url>/user/<route name>
app.use("/dashboard", require("./routes/dashboard"));

// Static Routes (images, CSS files, JS files, static web pages)
app.use("/static", express.static(path.join(__dirname, "/public"))); // Anything in the 'public' directory
app.use("/static", express.static("/public")); // Anything in the 'public' directory

// Port
const PORT = process.env.PORT || 8080; // Whatever the port is if we deply or 5000 if running locally

// Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Set up the server to run
