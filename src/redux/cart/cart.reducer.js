
import { CartActionTypes } from './cart.types';

// -- Mark 2 --
// lecture 111: Adding Multiple Items to Cart
import { addItemToCart } from './cart.utils';
// End of -- Mark 2 --

// -- Mark 4 --
// lecture 127: Remove Items At Checkout
import { removeItemFromCart } from './cart.utils';
// End of -- Mark 4 --

// -- Mark 1 --
// lecture 110: Cart Item Reducer
// let's set cartItems below equal to an empty array and we will need to create a new
// action and action type below so let's start by going to REDUX/CART/CART.TYPES.JS - MARK 1
// End of -- Mark 1 --


// set up the initial state first
const INITIAL_STATE = {
    show      : false,
    cartItems : []
};


const cartReducer = ( state = INITIAL_STATE, action ) => {

    switch ( action.type ) {

        case CartActionTypes.TOGGLE_CART :
            return {
                ...state,
                show : !state.show
            };

        
        // -- Mark 1 -- continued
        // lecture 110: Cart Item Reducer
        // so we will start off with the existing cartItems array or " ...state.cartItems " and
        // then add the action.payload item to the existing cartItems array and then we will
        // update the corresponding state key value pairs and now let's write the action and to
        // do that let's go to REDUX/CART/CART.ACTIONS.JS - MARK 1


        // -- Mark 2 -- continued
        // lecture 111: Adding Multiple Items to Cart
        // we call addItemToCart below and remember this function is in our cart.utils.js file
        // so we need to change " cartItems : [ ...state.cartItems, action.payload ] " to
        // " cartItems : addItemToCart( state.cartItems, action.payload ) "
        // and now we need to make one more modification and go to PAGES/SHOP/SHOP.DATA.JS
        // and remember we have duplicate id numbers for different items so Yihua provided a
        // new shop.data.js file that includes unique IDs for each item, which is what we want
        // in the real world

        // now if we go to our app and click on ADD TO CART we will see:
        /*

        action ADD_ITEM @ 16:16:58.391

            prev state {user: {…}, cart: {…}}
                user: {currentUser: null}
                cart: {show: false, cartItems: Array(0)}
                __proto__: Object

            action {type: "ADD_ITEM", payload: {…}}
                type: "ADD_ITEM"
                payload:
                    id: 3
                    name: "Brown Cowboy"
                    imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png"
                    price: 35
                    __proto__: Object
                __proto__: Object

            next state {user: {…}, cart: {…}}
                user: {currentUser: null}
                cart:
                    show: false
                    cartItems: Array(1)
                    0: {
                        id: 3,
                        name: "Brown Cowboy",
                        imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
                        price: 35,
                        quantity: 1
                    }
                    length: 1
                    __proto__: Array(0)
                __proto__: Object
            __proto__: Object

        */
        // so we see in next state that we have our object but now we have a new key value pair
        // added to the original object or " quantity: 1 " and if we click the same collection
        // item again we will see:
        /*
        next state {user: {…}, cart: {…}}
            user: {currentUser: null}
            cart:
                show: false
                cartItems: Array(1)
                0: {
                    id: 3
                    name: "Brown Cowboy"
                    imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png"
                    price: 35
                    quantity: 2
                }
                __proto__: Object
                length: 1
                __proto__: Array(0)
            __proto__: Object
        __proto__: Object
        */
        // so we see that our quantity now equals 2 and now we are also able to create
        // a remove action since we have defined the quantity value and now let's commit
        // our code so let's do:

        // Rogers-iMac:crown_clothing Home$ git status
        // Rogers-iMac:crown_clothing Home$ git add .
        // Rogers-iMac:crown_clothing Home$ git commit -m " updated shop data with new data
        // and created cart utils so that we could handle adding duplicate collection items "
        // Rogers-iMac:crown_clothing Home$ git push origin master

        // now if I go to my " crown-clothing " project in GutHub, I see the changes were uploaded
        // sucessfully

        case CartActionTypes.ADD_ITEM :
            return {
                ...state,
                cartItems : addItemToCart( state.cartItems, action.payload )
            };
        // End of -- Mark 1 and Mark 2 --


        // -- Mark 3 --
        // lecture 126: Remove Items From Cart
        // we can use filter to remove the relevant cartItem and with filter() we will loop through
        // every cart item in the array and if " cartItem.id !== action.payload.id  " is true then
        // that particular cart item will remain in the cartItems array and if
        // " cartItem.id !== action.payload.id " is false, meaning that we have a match then
        // that particular cart item will be removed from our cartItems array and now go to
        // checkout-item.component.jsx
        case CartActionTypes.CLEAR_ITEM_FROM_CART :
            return {
                ...state,
                cartItems : state.cartItems.filter( 
                    ( cartItem ) => cartItem.id !== action.payload.id
                )
            };
        // End of -- Mark 3 --


        // -- Mark 4 -- continued
        // lecture 127: Remove Items At Checkout
        // we are going to write a new utility function that will decrease the quantity or
        // actually remove the item from the cart if the quantity goes to 0 so let's go to
        // cart.utils.js and now were back from cart.utils.js and first let's import in the
        // removeItemFromCart utility function above and then apply our utility function below
        case CartActionTypes.REMOVE_ITEM :
        return {
            ...state,
            cartItems : removeItemFromCart( state.cartItems, action.payload )
        };
        // End of -- Mark 4 --

        default:
            return state;

    }

}

export default cartReducer;

// GO TO COMPONENTS/CART-ICON/CART-ICON.COMPONENT.JSX - MARK 1