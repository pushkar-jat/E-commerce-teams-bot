// import * as actions from './actionTypes';

let lastId=0;
export default function reducer(state=[], action){
    switch(action.type) {
        case ADDTOCART:
        return [
            ...state,{
                cartId:action.cartId,
                product:action.payLoad 
            }
        ];
    
    case REMOVEDTOCART:
        return state.filter(cart => cart.id !== action.payLoad.ProductId);
    case LOGIN:
        return [
            ...state,{
                userId:action.userId,
                email:action.email,
                auth:action.auth 
            }
        ];
    
    default:
        return state;
    } 
}