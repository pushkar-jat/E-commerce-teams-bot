const axios = require('axios'); 
const request = require('request');

module.exports.newOrder = async (step) => {

    const user = step;
    res = await axios.post("http://localhost:3000/orders/newOrder", user);
    const data = res.data;
    return data;
    }

module.exports.Order = (step) => {

const user = step.stack[0].state.options.msteams;
res = axios.post("http://localhost:3000/orders/get", user);
const data = res.data;
return data;
} 