const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require("mongoose");
require('dotenv/config');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

const cartRoutes = require('./api/routes/cart');

mongoose.connect('mongodb+srv://' 
+ process.env.MONGO_COMMERCE_USER + ':' 
+ process.env.MONGO_COMMERCE_PW 
+ '@cluster0.uiren.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to db')
}).catch((err) => {
  console.log(err);
});

mongoose.Promise = global.Promise;

app.use(morgan("dev")); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
 
app.use('/cart',cartRoutes);
app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);
app.use('/user',userRoutes);


module.exports = app;