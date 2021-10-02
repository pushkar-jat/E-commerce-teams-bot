const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Order = require("../models/order");
router.post("/signup", async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: req.body.password,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              userAddress: req.body.userAddress
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                  userId: result._id
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "User not found"
          });
        }
        const validpass = bcrypt.compare(req.body.password, user[0].password);
          if (!validpass) { 
            return res.status(401).json({
              message: "Auth failed not valid password "
            });
          }
          if (validpass) {
            const token = {
              email:user[0].email,
              userId: user[0]._id
            };
            // const token = jwt.sign(
            //   {
            //     email: user[0].email,
            //     userId: user[0]._id
            //   },
            //   process.env.JWT_KEY
            //   {
            //       expiresIn: "1h"
            //   }
            // );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed 401 status"
          });
        
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  router.get("/",   (req, res, next) => {
    User.findById(req.body)
      .populate(' ')
      .exec()
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: "user not found"
          });
        }
        res.status(200).json({
          user: user,
          request: {
            type: "GET",
            url: "http://localhost:3000/cart"
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
 

 

module.exports = router;
