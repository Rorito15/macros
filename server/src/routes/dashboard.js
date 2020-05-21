const express = require("express");

const router = express.Router();

// Dashboard
router.get("/", (req, res) => res.send("Welcome user"));

module.exports = router;
