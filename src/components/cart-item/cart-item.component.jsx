
import React from 'react';
// import './cart-item.styles.scss';

import {
    CartItemContainer,
    CartItemImage,
    CartItemDetails,
    CartItemDetailsName
} from './cart-item.styles';


// below we are destructuring " item " and then destructuring " imageUrl ", " price ", " name "
// and " quantity " off of " item "
const CartItem = ( { item : { imageUrl, price, name, quantity } } ) => (

    // remember in the final app we have the image on the left side and the details on the
    // right side and the details will say something like:
    /*
    " Blue Jean Jacket "
    " 1 x $90 "
    */
    <CartItemContainer>

        <CartItemImage src={ imageUrl } alt="item" />

        <CartItemDetails>

            <CartItemDetailsName>{ name }</CartItemDetailsName>

            <span>{ quantity } x ${ price }</span>

        </CartItemDetails>

    </CartItemContainer>

);

export default CartItem;

// now go to cart-item.styles.scss