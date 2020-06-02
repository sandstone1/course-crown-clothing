
import styled from 'styled-components';


export const CartItemContainer = styled.div`
    display               : grid;
    grid-template-rows    : min-content;
    grid-template-columns : 30% 70%;
    margin                : 0 0 15px 0;
`;


export const CartItemImage = styled.img`
    width : 100%;
`;


export const CartItemDetails = styled.div`
    display               : grid;
    grid-template-rows    : repeat( 2, min-content );
    grid-template-columns : auto;
    align-content         : center;
    justify-content       : center;
    grid-row-gap          : 3px; 
`;


export const CartItemDetailsName = styled.span`
    font-size : 16px;
`;

