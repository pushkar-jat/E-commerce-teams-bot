// const {store} = require('./store');
// // import * as actions from './actionTypes';

// export const showState = ()=>(store.subscribe(()=>{
//     console.log("store changed, new state => ",store.getState());
// })
// );

// export const userState = (userID,eMail) => (store.dispatch({
//     type:LOGIN, 
//     userId:userID,
//     email:eMail,
//     auth:true
    
// }));

// export const addToCart = (cartID,productID,Quantity) =>(store.dispatch({
//     type:ADDTOCART,
//     cartId:cartID,
//     payLoad:[{
//       productId:productID,
//       quantity:Quantity  
//     }]
// }));
// // store.dispatch({
// //     type:actions.BUG_REMOVED,
// //     payLoad:{
// //         id:1
// //     }
// // });
 