const mongoose = require('mongoose'); 

const cartSchema = mongoose.Schema({
    _id:  { type: String, 
    required: true,
    maxlength: 100
   }, 
    product:[{
        productId: {type: String, 
            maxlength: 100
           },
        quantity: { type: Number, default: 1 }
    }] 
});

module.exports = mongoose.model('Cart', cartSchema)