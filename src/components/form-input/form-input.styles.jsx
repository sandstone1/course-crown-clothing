
import styled, { css } from 'styled-components';


const subColor  = 'grey';
const mainColor = 'black';


const ShrinkStyles = css`
    top : -14px;

    font-size : 12px;
    color     : ${ mainColor }; 
`;


export const FormInputContainer = styled.div`
    position : relative;
    margin   : 45px 0;

    input[ type='password' ] {
        letter-spacing : 0.3em;
    }
`;


export const FormInputField = styled.input`
    display : block;
    width   : 100%;
    margin  : 25px 0 25px 0;
    padding : 10px 10px 10px 5px;

    border        : none;
    border-radius : 0;
    border-bottom : 1px solid ${ subColor };

    font-size : 18px;
    color     : ${ subColor };

    background       : none;
    background-color : rgb( 255, 255, 255);

    &:focus {
        outline : none;
    }

    // The general sibling combinator (~) separates two selectors and matches the
    // second element only if it follows the first element (though not necessarily
    // immediately), and both are children of the same parent

    // what this says below is that whenever the user focuses inside the input element
    // we want to use the general sibling combinator to target the form input label
    // element and move the label up 24px ( from 10 to -14 ) and use a transition is give
    // the movement a nice feel
    &:focus ~ .form-input-label {
        ${ ShrinkStyles }
    }
`;


export const FormInputLabel = styled.label`
    position : absolute;
    top      : 10px;
    left     : 5px;

    font-size   : 16px;
    font-weight : normal;
    color       : ${ subColor };

    pointer-events : none;
    // transition : all will target the top, font-size and color properties
    transition     : all 300ms ease;

    // this is here so that if the user takes the focus off the input field the
    // form label stays in the same position or top : -14px;
    &.shrink {
        ${ ShrinkStyles }
    }
`;

