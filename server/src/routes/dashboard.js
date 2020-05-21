const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.send("Welcome user"));

module.exports = router;
