
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



// -- Mark 3 --
// lecture 174: Redux Thunk
// we need to update our initial state and our reducer so let's add " isFetching : boolean value "
// to our initial state and by default let's set isFetching to " false " and isFetching tells us
// whether or not we are fetching the collections data and before we had state = { loading : true }
// inside our shop page component or shop.component.jsx because our component was making the API
// call but now our reducer needs to tell us whether or not we are in the process of fetching the
// data and we also set " errorMessage : undefined " in our initial state

// and now let's add the 3 types from the shop.types.js file to our shopReducer below and the
// 3 types are: " ShopActionTypes.FETCH_COLLECTIONS_START ",
// " ShopActionTypes.FETCH_COLLECTIONS_SUCCESS " and " ShopActionTypes.FETCH_COLLECTIONS_FAILURE "
// and this:
/*
case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS :

    return {
        ...state,
        isFetching  : false,
        collections : action.payload
    };
*/ 

// will replace this:
/*
case ShopActionTypes.UPDATE_COLLECTIONS : 

    return {
        ...state,
        collections : action.payload
    };
*/

// for " ShopActionTypes.FETCH_COLLECTIONS_FAILURE " we will set our errorMessage to
// action.payload so the payload we are passing through in this case is the error message string
// and now that we have our reducer set we need to think about our actions and let's go to our
// shop.actions.js file and we will leverage thunk inside this file
// End of -- Mark 3 --


const INTIAL_STATE = {

    collections  : null,
    isFetching   : false,
    errorMessage : undefined

};


const shopReducer = ( state = INTIAL_STATE, action ) => {

    switch( action.type ) {


        case ShopActionTypes.FETCH_COLLECTIONS_START :

            return {
                ...state,
                isFetching : true

            };

        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS :

            return {
                ...state,
                isFetching  : false,
                collections : action.payload
            };

        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE :

            return {
                ...state,
                isFetching   : false,
                errorMessage : action.payload

            };

        default:

            return state;

    }

}

// go to root-reducer.js and import in the shopReducer

export default shopReducer;