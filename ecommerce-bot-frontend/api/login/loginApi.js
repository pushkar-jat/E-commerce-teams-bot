const axios = require('axios'); 
const request = require('request');
 
// logInres = async () => {

//     const myrecords = [];

    
//     var data = JSON.stringify({
//         "email": "pc@gmail.com",
//         "password": "12345"
//       });
      
//       var config = {
//         method: 'post',
//         url: 'http://localhost:3000/user/login',
//         headers: {'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'},
//         data : data
//       };

      
      
//       axios(config)
//       .then(function (response) {
//         console.log("data = " + JSON.stringify( response.data));
//         let myItems = []; 
//         myItems.push({ 
//            message: response.data.message,
//            token: response.data.token });

//         myrecords.push({
//             myrecords: myItems
//          });

//       }) 
//       .catch(function (error) {
//         console.log(error);
//       }); 
//       console.log(myrecords);
//       return myrecords;

// }

// console.log("kya = " + logInres("hi")); 

module.exports.logIn = async (person) => {

  res = await axios.post("http://localhost:3000/user/login", person);
  console.log(res.data);
  return res.data
} 

module.exports.userData = async (person) => {

  res = await axios.get("http://localhost:3000/user/login", person);
  console.log(res.data);
  return res.data
} 