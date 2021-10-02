const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({dest:'/uploads'});


const {Product} = require("../models/product");

router.post("/", upload.single('productImage'),(req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.body.productImage, 
    description:  req.body.description,
    category:  req.body.category,
    manufacture_details: {
        model_number:  req.body.manufacture_details.model_number,
        Origin:  req.body.manufacture_details.Origin,
        release_date: req.body.manufacture_details.release_date
    },
    shipping_details: {
        weight: req.body.shipping_details.weight,
        Unit:  req.body.shipping_details.Unit
    },
    quantity: req.body.quantity
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            _id: result._id,
            productImage: result.productImage, 
            description:  result.description,
            category:  result.category,
            manufacture_details: {
            model_number:  result.manufacture_details.model_number,
            Origin:  result.manufacture_details.Origin,
            release_date: result.manufacture_details.release_date
            },
            shipping_details: {
              weight:  result.shipping_details.weight,
              Unit:  result.shipping_details.Unit
            },
            quantity: result.quantity,

            request: {
                type: 'GET',
                url: "http://localhost:3000/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

 router.get("/", async (req, res, next) => {
  await Product.find({})
    // .select("name price _id productImage description category quantity")
    //.exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id, 
            description:  doc.description,
            category:  doc.category,
            manufacture_details: {
            model_number:  doc.manufacture_details.model_number,
            Origin:  doc.manufacture_details.Origin,
            release_date: doc.manufacture_details.release_date
            },
            shipping_details: {
              weight:  doc.shipping_details.weight,
              Unit:  doc.shipping_details.Unit
            },
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id) 
    .exec()
    .then(doc => {
      console.log("From database", doc);
      res.status(200).json(doc);
      //
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/products',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
