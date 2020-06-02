
import styled from 'styled-components';
import CustomButton from '../custom-button/custom-button.component';


export const CartDropDownContainer = styled.div`
    display               : grid;
    grid-template-rows    : auto;
    grid-template-columns : auto;
    position              : absolute;
    top                   : 95px;
    right                 : 68px; // 68 equaled a 60px padding-right and 8px margin-right
    z-index               : 5;
    width                 : 240px;
    height                : 340px;
    padding               : 20px;

    border : 1px solid rgba( 0, 0, 0, 1 );

    background-color : rgba( 255, 255, 255, 1 );
`;


export const CartDropDownItemsContainer = styled.div`
    display               : grid;
    grid-template-rows    : min-content;
    grid-template-columns : auto;
    height                : 240px;
    overflow              : scroll;
`;


export const CartDropDownItemsEmptyMessage = styled.span`
    margin : 50px auto;

    font-size : 18px;
`;


export const CartDropDownButton = styled( CustomButton )`
    margin : 10px 0 0 0;

    outline : none;
`;
