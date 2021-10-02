const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
{
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    manufacture_details: {
        model_number: { type: String, required: true },
        Origin: { type: String, required: true },
        release_date:  { type: String, required: true }
    },
    shipping_details: {
        weight: { type: Number, required: true },
        Unit: { type: String, required: true }
    },
    quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
    Product
}