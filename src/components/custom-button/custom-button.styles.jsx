
import styled, { css } from 'styled-components';

// instead of conditionally rendering class names ( our current approach in
// custom-button.component.jsx ), we can use { css } to conditionally render css blocks
// and therefore change our styles through css blocks

// first, let's take all styles related to our custom button and put those styles into
// their own component and then take all styles related to our Google sign in class and
// put those styles into their own component and then take all styles related to the inverted
// class and put those styles into their own component

// one of the great things about styled components is that it supports sass nesting and the
// sass way of doing things so with styled components we get all the benefits of sass but we
// also get all the benefits of JavaScript

// first, let's create 2 css blocks for the google sign in class and the inverted class and
// then use those css blocks inside a function that will conditionally render certain css 
// blocks based on some condition
const buttonStyles = css`
    border : none;

    color : rgba( 255, 255, 255, 1 );

    background-color : rgba( 0, 0, 0, 1 );

    transition : all 100ms ease-out;

    &:hover {
        border : 1px solid rgba( 0, 0, 0, 1 );

        color : rgba( 0, 0, 0, 1 );

        background-color : rgba( 255, 255, 255, 1 ); 
    }
`;


const googleSignInStyles = css`
    border : none;

    color : rgba( 255, 255, 255, 1 );
            
    background-color : rgba( 66, 133, 244, 1 ); // this is a Google blue

    transition : all 100ms ease-out;

    &:hover{
        border : none;
        
        background-color : rgba( 53, 122, 232, 1 ); 
    }
`;


const invertedButtonStyles = css`
    border : 1px solid rgb( 0, 0, 0 );

    color : rgba( 0, 0, 0, 1 );

    background-color : rgba( 255, 255, 255, 1 );

    transition : all 100ms ease-out;

    &:hover {
        border : none;

        color : rgba( 255, 255, 255, 1 );

        background-color : rgba( 0, 0, 0, 1 );           
    }
`;


// now let's write a function inside the custom-button.styles.jsx file and to use this function
// we just call it inside the CustomButtonContainer and remember we have to use a placeholder
// when calling this function and the placeholder combined with the backticks results in string
// interpolation and now go back to custom-button.component.jsx file and import in the
// CustomButtonContainer component
const getButtonStyles = ( props ) => {
    
    if ( props.isGoogleSignIn ) {
        return googleSignInStyles;
    }

    return props.inverted ? invertedButtonStyles : buttonStyles;

}


export const CustomButtonContainer = styled.button`
    width           : auto;
    min-width       : 165px;
    height          : 50px;
    padding         : 0 35px 0 35px;

    font-family    : 'Open Sans Condensed';
    font-size      : 15px;
    font-weight    : 700;
    letter-spacing : 0.5px;
    line-height    : 50px;
    text-transform : uppercase;

    cursor : pointer;

    ${ getButtonStyles }
`;




