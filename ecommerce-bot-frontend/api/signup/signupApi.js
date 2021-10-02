const axios = require('axios'); 
const request = require('request');
 

module.exports.signup = async (person) => { 
  res = await axios.post("http://localhost:3000/user/signup ", person);
console.log(res.data);
return res.data
} 