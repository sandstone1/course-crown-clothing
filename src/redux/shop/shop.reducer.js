
// import in our shop data
// import SHOP_DATA from "./shop.data";

// remember collections is an array of 5 objects or items and each item has key value
// pairs and one of the keys equals an array or objects and these objects are the shop
// items


// -- Mark 1 --
// lecture 167: Adding Shop Data to Redux
import { ShopActionTypes } from './shop.types';

// add the following case below:
/*
case ShopActionTypes.UPDATE_COLLECTIONS : 
    return {
        ...state,
        collections : action.payload
    };
*/

// now bring our action creator into our shop component so go to the shop.component.jsx file
// End of -- Mark 1 --



// -- Mark 2 --
// lecture 168: WithSpinner HOC
// first, let's remove our SHOP_DATA or comment out " import SHOP_DATA from "./shop.data"; "
// and then let's change INITIAL_STATE from:
/*
const INTIAL_STATE = {

    collections : SHOP_DATA

};
*/

// to:
/*
const INTIAL_STATE = {

    collections : null

};
*/

// by setting collections equal to null we will run into a couple issues that relate to how
// we set up our application and to fix this go to the shop.selectors.js file

// End of -- Mark 2 --





const INTIAL_STATE = {

    collections : null

};


const shopReducer = ( state = INTIAL_STATE, action ) => {

    switch( action.type ) {

        case ShopActionTypes.UPDATE_COLLECTIONS : 
        
            return {
                ...state,
                collections : action.payload
            };

        default:

            return state;

    }

}

// go to root-reducer.js and import in the shopReducer

export default shopReducer;