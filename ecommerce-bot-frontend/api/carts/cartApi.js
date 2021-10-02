const axios = require('axios'); 
const request = require('request');

module.exports.newCart = async (step) => {

    const user = step;
    res = await axios.post("http://localhost:3000/cart/newCart", user);
    const data = res.data;
    return data;
    }

module.exports.cart = (step) => {

const user = step.stack[0].state.options.msteams;
res = axios.get("http://localhost:3000/cart/get", user);
const data = res.data;
return data;
} 