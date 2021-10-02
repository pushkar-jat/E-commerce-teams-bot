const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');

const User = require("../models/user");
const Cart = require("../models/cart")
const Product = require("../models/product");
const { update } = require("../models/user");

       
router.post("/newCart", async (req, res, next) => {
  Cart.find({ _id: req.body.userId })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "cart exists"
        });
      } else {
          
            const cart = new Cart({
              _id:  req.body.userId,
              product:[{
                productId:"",
                quantity:""
              }] 
            });
            cart
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "cart created",
                  cartId: result._id
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
});

 
router.get("/",   (req, res, next) => {
  Cart.findById(req.body._id)
    .populate('product')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "cart not found"
        });
      }
      res.status(200).json({
        order: order,
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

router.delete("/",   (req, res, next) => {
  Order.remove({ _id: req.body.cartId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "cart deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.patch("/", (req, res, next) => {
  const cart = req.body;
  const updateOps = [{
    productId:"",
    quantity:""
  }];
  let flag = false
  
  Cart.findById(req.body._id)
  .then((cart) => {
    console.log(cart);
    for (let i in cart.product) { 
      updateOps[i].productId = cart.product[i].productId;
      updateOps[i].quantity = cart.product[i].quantity;
    }
    for(let i in req.body.product) {
      for(let j in updateOps){
        if(req.body.product[i].productId == updateOps[j].productId){
            updateOps[j].quantity +=req.body.product[i].quantity;
            console.log(updateOps[j].quantity);
        }
        // else if(res.body.product[i].productId == updateOps[j].productId){
        //   //logic
        // }
      }
    }
    
    console.log(updateOps);
    Cart.update({_id:req.body._id},{$set:updateOps}).then(cart => console.log("cart",cart)).catch(err => console.log(err))
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
  
  // Cart
  // .update({ _id: req.body._id }, { $set: updateOps })
  //   .exec()
  //   .then(result => {
  //     console.log(result);
  //     res.status(200).json({
  //         message: 'Cart updated',
  //         request: {
  //             type: 'GET',
  //             url: 'http://localhost:3000/cart/'
  //         }
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err
  //     });
  //   });
});

module.exports = router;
