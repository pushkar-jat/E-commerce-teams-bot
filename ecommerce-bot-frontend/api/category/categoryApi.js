const axios = require('axios'); 

module.exports.getProductcategory = async (text) => { 
    
    const product = await axios.get("http://localhost:3000/products/"); 
    var data = product.data; 
    
    return data
}
 
module.exports.getProductsId = async (id) => {
    //     ​​​​​​​
    // product = await axios.get("http://localhost:3000/products/606ee908410bd13890285b93")
    // console.log(product)
    
    const product = await axios.get("http://localhost:3000/products/" + id);
    // console.log(product.data.products) 

    var fdata = product
    return fdata
}
 