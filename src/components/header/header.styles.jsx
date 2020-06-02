
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// now let's tackle this one styled component at a time

// for " OptionContainerStyles " paste in the " option " styles from header.styles.scss
const OptionContainerStyles = css`

    padding : 10px 15px 10px 15px;

    cursor : pointer;

`;

export const HeaderContainer = styled.div`

    display               : grid;
    grid-template-rows    : auto;
    grid-template-columns : repeat( 2, max-content);
    justify-content       : space-between;
    align-items           : center;    
    height                : 70px;
    margin                : 0 0 25px 0;

`;

// we know our LogoContainer is a Link component and we handle this by calling styled()
// and pass Link to the function call and now we will get a styled Link component so we've
// extended styled-components into a real component or the Link component 
export const LogoContainer = styled( Link )`

    height : 100%;

`;


export const OptionsContainer = styled.div`

    display               : grid;
    grid-template-rows    : auto;
    grid-template-columns : repeat( 4, max-content);

`;

// for the option class we have a Link component and div that share the " option " class
// name and for this one we need to import in " { css } " above from " styled-components "
// and " css " allows us to write a block of css that we can pass in to any styled component
// and to see how this works go to " OptionContainerStyles " above and now paste in the
// " OptionContainerStyles " css code block to " OptionLink " and " OptionDiv " below and
// remember " OptionContainerStyles " has to be placed inside a placeholder or " ${} " and
// now let's import all this in and replace our respective code in " header.component.jsx "
export const OptionLink = styled( Link )`

    ${ OptionContainerStyles }

`;


export const OptionDiv = styled.div`

    ${ OptionContainerStyles }

`;