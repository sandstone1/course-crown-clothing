

// ==============================
// Component Tree Structure
// ==============================
// App                    - React Router
//   Shop Page            - Class and State
//   Shop Data            - Data
//     Collection-Preview - Functional and Presentational
//       Collection-Item  - Functional and Presentational


import React from 'react';
// import in the style sheet
// import './collection-item.styles.scss';

// -- Mark 1 --
// lecture 109: Add to Cart Styling
// import in our CustomButton component and then add the CustomButton component below and we
// added the inverted property to the CustomButton component so that we will get the proper
// styling for this particular button and remember go to the style sheet for the CustomButton
// component for details on styling
// import CustomButton from '../custom-button/custom-button.component';
// End of -- Mark 1 --


// -- Mark 2 --
// lecture 110: Cart Item Reducer
// add addItem as an argument to the CollectionItem arrow funciton and add
// " onClick={ addItem } " to the CustomButton component and thereby dispatch the addItem action
// generator to the cart reducer and the cart reducer will return a new state object depending on
// action.payload

// but first we need to revise our code so that we can get the " item " value we need for our
// action creator and we do that in the CollectionPreview component

// change " const CollectionItem = ( { name, imageUrl, price } ) => { " to
// " const CollectionItem = ( { item, addItem } ) => { " and then use destructuring on " item "
// or add " const { name, imageUrl, price } = item; " and add in a explicit return or
// " return(); "

// also, in our CustomButton component add an onClick event handler so that we can dispatch the
// addItem action creator to the cart reducer and the addItem action creator will be dispatched
// with the item value as the argument and remember to set this up as an arrow function
// ( see below )

// and remember an item is an object inside the " items " array and an item will look like the
// following:
/*
    {
        id: 1,
        name: 'Camo Down Vest',
        imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
        price: 325
    }
*/

// state, collections and the " items " array will look like the following and this code come from
// the Shop component:
/*
    state = {
        collections : [
            {
                id: 5,
                title: 'Mens',
                routeName: 'mens',
                items: [
                    {
                        id: 1,
                        name: 'Camo Down Vest',
                        imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
                        price: 325
                    },
                    {
                        id: 2,
                        name: 'Floral T-shirt',
                        imageUrl: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
                        price: 20
                    },
                    {
                        id: 3,
                        name: 'Black & White Longsleeve',
                        imageUrl: 'https://i.ibb.co/55z32tw/long-sleeve.png',
                        price: 25
                    },
                    {
                        id: 4,
                        name: 'Pink T-shirt',
                        imageUrl: 'https://i.ibb.co/RvwnBL8/pink-shirt.png',
                        price: 25
                    },
                    {
                        id: 5,
                        name: 'Jean Long Sleeve',
                        imageUrl: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png',
                        price: 40
                    },
                    {
                        id: 6,
                        name: 'Burgundy T-shirt',
                        imageUrl: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
                        price: 25
                    }
                ]
            }
        ]
    }; // end of state
*/

// now let's test this out in our app and now we see that when we click on the
// CustomButton component we are firing our addItem action creator and if we go
// to the console we see the following:
/*
action ADD_ITEM @ 19:47:56.303

    prev state {user: {…}, cart: {…}}
        user: {
            currentUser: null
        }
        cart: {
            show: false,
            cartItems: Array(0)
        }
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
        user:
            currentUser: null
            __proto__: Object
        cart:
            show: false
            cartItems: Array(1)
            0: {
                id: 3,
                name: "Brown Cowboy",
                imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
                price: 35
            }
            length: 1
            __proto__: Array(0)
        __proto__: Object
    __proto__: Object
*/

// so we see that our redux flow is working or we are successfully firing an action and
// that action is updating the state in the cart reducer so redux increases our apps
// complexity but it gives us these beutiful reusable functions and reusable state that
// we can now use across our entire application and next let's take out any duplicates
// in the cartItems array
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
// End of -- Mark 2 --


// -- Mark 3 --
// lecture 156: styled-components in Our App 3
import { 
    CollectionItemContainer,
    CollectionItemImage,
    CollectionItemFooter,
    CollectionItemButton
} from './collection-item.styles';
// End of -- Mark 3 --


// don't need any state so make another functional component
const CollectionItem = ( { item, addItem } ) => {

    const { name, imageUrl, price } = item;
        
    return (

        // -- Mark 3 -- continued
        // lecture 156: styled-components in Our App 3
        // change divs into styled-components and remember to comment out
        // " import './collection-item.styles.scss'; " above and comment out
        // " import CustomButton from '../custom-button/custom-button.component'; " above

        <CollectionItemContainer>

            <CollectionItemImage
                className="collection-item-container--image"
                imageUrl={ imageUrl }
            >
            </CollectionItemImage>

            <CollectionItemFooter>
                <span>{ name }</span>
                <span>{ price }</span>
            </CollectionItemFooter>

            <CollectionItemButton
                className="collection-item-container--button"
                inverted
                onClick={ () => addItem( item ) }
            >
                Add to cart
            </CollectionItemButton>

        </CollectionItemContainer>

    );
    // End of -- Mark 3 --
}


// after I set up the styling, let's bring this into our Header component

// -- Mark 2 -- continued
// lecture 110: Cart Item Reducer
// add mapDispatchToProps and connect()() below
const mapDispatchToProps = ( dispatch ) => (
    {
        addItem : ( item ) => dispatch( addItem( item ) )
    }
);


export default connect( null, mapDispatchToProps )( CollectionItem );
// End of -- Mark 2 --
