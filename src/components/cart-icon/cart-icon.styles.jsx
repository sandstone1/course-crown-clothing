
import styled from 'styled-components';
import { ReactComponent as ShoppingIconSVG } from '../../assets/shopping-bag.svg';


export const CartIconContainer = styled.div`
    display        : grid;
    justify-items  : center;
    position       : relative;
    padding        : 5px 15px 5px 15px;

    cursor : pointer;
`;


// import in ShoppingIcon as a component and then apply the styles to the ShoppingIcon
// component as shown below
export const ShoppingIcon = styled( ShoppingIconSVG )`
    width  : 24px;
    height : 24px;
`;

export const CartIconItemCount = styled.span`
    position : absolute;
    bottom   : 14px;

    font-size   : 10px;
    font-weight : 700;
`;


