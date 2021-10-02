const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        email: {
        type: String,
        required: [true,'The email field is required!'],
        trim: true,
        unique: 1,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password: {
        type: String,
        required: [true,'The password field is required!'],
        minlength: 5
        },
        
        firstName: {
        type: String,
        required: [true,'The first name field is required!'],
        trim: true,
        maxlength: 100
       },
        lastName: {
        type: String,
        required: [true,'The last name field is required!'],
        trim: true,
        maxlength: 100
       },
       userAddress:{
        type: String,
        required: [true,'The Address field is required!'],
        trim: true,
        maxlength: 300
       },  
});

module.exports = mongoose.model('User', userSchema);