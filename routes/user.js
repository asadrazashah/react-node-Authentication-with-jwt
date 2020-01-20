const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

router.post("/signup", function(req, res) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });

      user
        .save()
        .then(user => {
          // console.log("I am here");
          res.json(user);
        })
        .catch(err => {
          // console.log("err in user saving");
          res.json(err);
        });
    });
  });
});
router.post("/signin", function(req, res) {
  const { email, password } = req.body;
  User.authenticate(email, password, function(err, user) {
    if (err || !user) {
      res.sendStatus(401);
      // console.log("user not found");
    } else {
      const payload = { email: email };
      const token = jwt.sign(payload, secret, { expiresIn: "24h" });
      // console.log(token);
      // res.cookie("token", token, { httpOnly: true }).sendStatus(200);
      // console.log("user found");
      res.json(token);
    }
  });
});

module.exports = router;
