const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id:  { type: String, 
        required: true,
        maxlength: 100
       }, 
        Order:[{
            productId: {type: String, 
                maxlength: 100
               },
            quantity: { type: Number, default: 1 },
            price:{type: Number, default: 0},
            totalPrice:{type: Number, default: 0},
            status:{type: String, 
                maxlength: 100},
            expectedDelivery:{type: String, 
                maxlength: 100}
            
        }] 
});

module.exports = mongoose.model('Order', orderSchema);