
// import in react
import React from 'react';
// import in our shopping icon
// from LogRocket: " SVGs can be imported and used directly as a React component in your React
// code. The image is not loaded as a separate file, instead, it’s rendered along the HTML. "
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// import in our style sheet
// import './cart-icon.styles.scss';


// -- Mark 1 --
// lecture 108: Implementing Redux in Cart
import { connect } from 'react-redux';
import { toggleCart } from '../../redux/cart/cart.actions';
// End of -- Mark 1 --


// -- Mark 3 --
// lecture 119: Reselect Library
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
// End of -- Mark 3 --


import {
    CartIconContainer,
    ShoppingIcon,
    CartIconItemCount
} from './cart-icon.styles';


const CartIcon = ( { toggleCart, itemCount } ) => (

    // -- Mark 1 --
    // lecture 108: Implementing Redux in Cart
    // now if I click on the cart icon, I see the following response in the console:
    /* 
    action TOGGLE_CART @ 15:16:50.263

    redux-logger.js:388  prev state 
    {user: {…}, cart: {…}}
        user: {currentUser: {…}}
        cart:
            show: false
            __proto__: Object
        __proto__: Object

    redux-logger.js:392  action     
    {type: "TOGGLE_CART"}
        type: "TOGGLE_CART"
    __proto__: Object

    redux-logger.js:401  next state 
    {user: {…}, cart: {…}}
        user: {currentUser: {…}}
        cart:
            show: true
            __proto__: Object
        __proto__: Object
    */

    // so our toggleCart action generator is working and the cart reducer is toggling state
    // between " show : false " and " show : true "
    <CartIconContainer
        onClick={ toggleCart }
    >

        <ShoppingIcon />
        <CartIconItemCount>{ itemCount }</CartIconItemCount>

    </CartIconContainer>
    // End of -- Mark 1 --

);



// -- Mark 3 -- continued
// lecture 119: Reselect Library
// change:
/*
const mapStateToProps = ( state ) => (

    {
        itemCount : state.cart.cartItems.reduce( ( accumlator, currentElement ) =>
            accumlator + currentElement.quantity,
            0
        )
    }

);
*/

// to ( remember, we still have to pass " selectCartItemsCount " the state object in
// order for this to work )
/*
const mapStateToProps = ( state ) => (

    {
        itemCount : selectCartItemsCount( state )
    }

);
*/

// if we check our application we see that the cart icon count is still working properly but now
// we have a memoized selector, which is great for performance

// we can also use selectCartItems in our cart-dropdown.component.jsx file and go to that
// file now
// End of -- Mark 3 --

// -- Mark 2 --
// lecture 115: Selectors in Redux
// change " export default connect( null, mapDispatchToProps )( CartIcon ); " to
// " export default connect( mapStateToProps, mapDispatchToProps )( CartIcon ); "
// and add mapStateToProps below and then use the reduce method to add all the items
// in the cartItems array and then set that value equal to " itemCount " and then
// add " itemCount " to the argument above and then change
// " <span className="cart-icon--item-count">0</span> " to
// " <span className="cart-icon--item-count">{ itemCount }</span> "

// what we wrote in mapStateToProps is called a selector because we are getting the whole
// state and then we are writing a function that pulls off a small slice of that state 
const mapStateToProps = ( state ) => (
    
    // what we wrote below is called a selector because we are getting the whole state
    // object and then we are writing a function that pulls off a small slice of that state
    // and then computing a new value based off of that state and the only caveat to this
    // approach is that everytime the state object changes whether that be inside the cart
    // reducer or the user reducer, mapStateToProps gets called and then rerenders our
    // component and remember everytime we have a new state object mapStateToProps gets
    // called even if the key value pairs remain the same and this is not good for performance
    // and we don't want to rerender our component unless the changes to the state object
    // directly impact our component so what we want to do is use something called memorization
    // which is the caching or storing of the selector's value and we can achieve this kind of
    // memorization using a library called Reselect and if the state object changes but the
    // itemCount value has not changed then Reselect will pass in the old value into our
    // component and our component will know not to rerender in this case
    
    // in the next lecture we will take a look at the Reselect library
    {
        itemCount : selectCartItemsCount( state )
    }
);


// -- Mark 1 -- continued
// lecture 108: Implementing Redux in Cart
// add mapDispatchToProps and connect()() below
const mapDispatchToProps = ( dispatch ) => (
    {
        toggleCart : () => dispatch( toggleCart() )
    }
);


export default connect( mapStateToProps, mapDispatchToProps )( CartIcon );
// End of -- Mark 1 and Mark 2 --

// after I set up the styling, let's bring this into our Header component