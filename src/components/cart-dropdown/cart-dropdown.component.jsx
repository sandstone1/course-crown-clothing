
import React from 'react';
import './cart-dropdown.styles.scss';

// import in our CustomButton component since we know we need one
// import CustomButton from '../custom-button/custom-button.component';


// -- Mark 1 --
// lecture 113: Cart Item Component
// below we will get " state.cart.cartItems " by using connect and mapStateToProps
// and then we will use map to interate over " cartItems " and by doing this we will be
// able to pass " item " to the CartItem component and the CartItem component will use
// " item " and it's associated properties to build the CartItem component

// now open our CartDropdown component and now when we click on the " Add To Cart "
// custom button in our collection item component we see that that collection item 
// along with the image, name and price has been added to our cart dropdown window and
// if we click on " Add To Cart " on another collection item we will see that
// that collection item is now appended to our cart dropdown window and sits right underneth
// the first collection item so everything is working as expected and is super performant,
// really amazingly performant

// Yihua said hopefully by now we can see the benefit of what redux does for us and hopefully
// we understand this pattern

// now let's commit our code so let's do:

// Rogers-iMac:crown_clothing Home$ git status
// Rogers-iMac:crown_clothing Home$ git add .
// Rogers-iMac:crown_clothing Home$ git commit -m " created cart-item component and connected
// our cart dropdown component with our cart reducer "
// Rogers-iMac:crown_clothing Home$ git push origin master

// now if I go to my " crown-clothing " project in GutHub, I see the changes were uploaded
// sucessfully
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
// End of -- Mark 1 --


// -- Mark 2 --
// lecture 119: Reselect Library
// let's import in our selector file and commented out below since we are not using
// selectCartItems
// import { selectCartItems } from '../../redux/cart/cart.selectors';
// End of -- Mark 2 --


// -- Mark 3 --
// lecture 121: Checkout Page
// in this case, we will import withRouter
import { withRouter } from 'react-router-dom';

// we are going to conditionally render a span element depending on whether or not the cart
// items array has a length greater than 0 so let's change this:
/*
    {
        cartItems.map( ( cartItem ) => (
            <CartItem
                key ={ cartItem.id }
                item={ cartItem }
            />
        ) )
    }
*/

// to this:
/*
    {
        cartItems.length > 0 ? (
            cartItems.map( ( cartItem ) => (
                <CartItem
                    key ={ cartItem.id }
                    item={ cartItem }
                />
            ) )
        ) : (
            <span className="cart-dropdown--empty-message">Your cart is empty</span>
        )
    }
*/

// now let's talk about type coercion in JavaScript and we know that 0 is something that will
// evaluate to false or 0 == false equals " true " and == just checks if the values of the two
// elements are the same and it will try to coerce the type on the right and left side of ==
// so let's say for example 1 == "1" and in this case Javascript will try to coerce the value
// of the string to a number and then JavaScript will compare the 2 values and this will evaluate
// to " true " whereas if we try to use a === or 1 === "1" then we will find this results in
// " false " because with === JavaScript is doing a strict evaluation which means that in this case
// JavaScript is comparing both the type and the value and because 1 is a number and "1" is a
// string we will get false when doing a strict equality comparison or ===

// and remember there are 6 types of things that are considered falsy values which means if we
// were to put them in a conditional like an if statement or ternary operator then it would
// return false and those 6 items are (1) 0 (2) false (3) undefined (4) null (5) NaN and (6)
// an empty string or "" and these 6 items always evaluate to false so inside our reducer if
// we want our object to be false we will set it to " null " or if we want a number to be
// false we set it to "0" or if we want a string to be false we set it to an empty string or ""
// and below we saying if cartItems.length is 0 or false then render the span element
/*
   {
        cartItems.length ? (
            cartItems.map( ( cartItem ) => (
                <CartItem
                    key ={ cartItem.id }
                    item={ cartItem }
                />
            ) )
        ) : (
            <span className="cart-dropdown--empty-message">Your cart is empty</span>
        )
    }
*/

// now let's apply the styles and go to cart-dropdown.styles.scss and now if the user
// has nothing in his or her cart then we get the message " Your cart is empty " inside
// the cart dropdown and now let's create the checkout page so first let's create the
// checkout folder called " checkout " inside " pages " and inside the checkout folder
// let's create 2 new files called " checkout.component.jsx " and
// " checkout.styles.scss " and now let's go to checkout.component.jsx

// back from App.js and import with withRouter ( see above ) and then wrap
// " connect( mapStateToProps )( CartDropdown ) " with " withRouter " and we will use
// the history object to take us to the checkout page and what we want onClick to fire is
// a function that will take us to history.push( '/checkout' ) and if we test this in the
// app we see that it works
/*
    <CustomButton>GO TO CHECKOUT</CustomButton>
*/

// to:
/*
    <CustomButton onClick={ () => history.push( '/checkoutpage' ) }>GO TO CHECKOUT</CustomButton>
*/

// import link from react-router-dom
// End of -- Mark 3 --


// -- Mark 4 --
// lecture 124: Dispatch Action Shorthand
import { toggleCart } from '../../redux/cart/cart.actions';

// instead of doing something like this:
/*
const mapDispatchToProps = ( dispatch ) => (
    {
        toggleCart : () => dispatch( toggleCart() )
    }
);

export default connect( null, mapDispatchToProps )( CartDropdown );
*/

// and then using toggleCart inside our component to call " dispatch( toggleCart() ) " we can
// bapass this approach because connect passes dispatch into our components as a prop if we do
// not supply a second argument to connect or if we do not supply " mapDispatchToProps " and in
// our case we could just include " dispatch " as one of our destructured arguments to our
// CartDropdown component since we have supplied as second argument to connect or
// " export default withRouter( connect( mapStateToProps )( CartDropdown ) ); " and the reason
// connect does this is because if we need to write a one off dispatch then there is no reason
// to write mapDispatchToProps so let's change
// " const CartDropdown = ( { cartItems, history } ) => ( " to
// " const CartDropdown = ( { cartItems, history, dispatch } ) => ( " and then change:
// " <CustomButton onClick={ () => history.push( '/checkout' ) }>GO TO CHECKOUT</CustomButton> "
// to:
/*
    <CustomButton onClick=
    { 
        () => {
            history.push( '/checkout' );
            dispatch( toggleCart() );
        }
    }
    >
        GO TO CHECKOUT
    </CustomButton>
*/

// remember to add " {} " after " => " above since we now have a multi line arrow function and
// when I go to the app and press on the " Go To Checkout " button that we go to the checkout
// page and our dropdown goes away at the same time so now we have an improved user flow
// End of -- Mark 4 --


import { 
    CartDropDownContainer,
    CartDropDownItemsContainer,
    CartDropDownItemsEmptyMessage,
    CartDropDownButton
} from './cart-dropdown.styles';



const CartDropdown = ( { cartItems, history, dispatch } ) => (

    <CartDropDownContainer>

        <CartDropDownItemsContainer>

            {
                cartItems.length > 0 ? (
                    cartItems.map( ( cartItem ) => (
                        <CartItem
                            key ={ cartItem.id }
                            item={ cartItem }
                        />
                    ) )
                ) : (
                    <CartDropDownItemsEmptyMessage>Your cart is empty</CartDropDownItemsEmptyMessage>
                )
            }

        </CartDropDownItemsContainer>

        <CartDropDownButton onClick=
        { 
            () => {
                history.push( '/checkout' )
                dispatch( toggleCart() )
            }
        }
        >
            GO TO CHECKOUT
        </CartDropDownButton>

    </CartDropDownContainer>

);


// -- Mark 2 --
// lecture 119: Reselect Library
// now we can use " selectCartItems " in our mapStateToProps and we will change
// mapStateToProps from:
/*
const mapStateToProps = ( state ) => (
    {
        cartItems : state.cart.cartItems
    }
);
*/

// to:
/*
const mapStateToProps = ( state ) => (
    {
        cartItems : selectCartItems( state )
    }
);
*/

// however, even though this will help with performance, I decided to keep it the same
// for simplicity sake or so I can more easily understand this code later

// we will write a lot more selectors as we build our application and now let's commit
// our code

// Rogers-iMac:crown_clothing Home$ git status
// Rogers-iMac:crown_clothing Home$ git add .
// Rogers-iMac:crown_clothing Home$ git commit -m " updated our application with reselect and
// and replaced cart selectors with memoized selectors "
// Rogers-iMac:crown_clothing Home$ git push origin master

// now if I go to my " crown-clothing " project in GutHub, I see the changes were uploaded
// sucessfully
// End of -- Mark 2 --


// -- Mark 1 -- continued
// lecture 113: Cart Item Component
const mapStateToProps = ( state ) => (
    {
        cartItems : state.cart.cartItems
    }
);


// -- Mark 3 -- continued
// lecture 121: Checkout Page
// wrap " connect( mapStateToProps )( CartDropdown ) " with " withRouter " and remember
// withRouter will pass the match, location and history objects into the component that is
// being wrapped and remember withRouter is a higher order component so we want what
// is returned from " connect( mapStateToProps )( CartDropdown ) " to receive the match,
// location and history objects or in other words the CartDropdown component will have access
// to the match, location and history objects and now let's add props.history or just
// { history } to our CartDropdown component argument above

export default withRouter( connect( mapStateToProps )( CartDropdown ) );
// End of -- Mark 1 and Mark 3 --

// after I set up the styling, let's bring this component into our Header component