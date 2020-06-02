
import styled from 'styled-components';


// I used flexbox below and flexbox allowed ( especially flex : 1 1 auto; ) boxes 4 & 5 to fill
// up the bottom row and I could not figure out how to do this with grid

// for whatever reason I did not have to use position : relative below in order for
// position : absolute to work in the MenuItemContent component but I used it anyway just to be
// clear as to what we are positioning against in the MenuItemContent component
export const MenuItemContainer = styled.div`
    display         : flex;
    flex            : 1 1 30%;
    align-items     : center;
    justify-content : center;
    position        : relative;
    height          : 240px;
    overflow        : hidden;
    margin          : 0 7.5px 15px 7.5px;

    border : 1px solid rgba( 0, 0, 0, 1 );

    &:hover {
        cursor : pointer;

        // Chris Coyier said: " Here is the "plain English" of "#header .callout":
        // Select all elements with the class name callout that are decendents of the element
        // with an ID of header. "
        > .background-image {
            transform  : scale( 1.1 );
            transition : transform 6s cubic-bezier( 0.25, 0.45, 0.45, 0.95 );
        }

        > .content {
            opacity : 0.9;
        }

    }

    // Chris Coyier said: " Here is the "plain English" of "#header.callout": Select the element
    // which has an ID of header and also a class name of callout." and large and menu-item
    // classes are only present in the menu item boxes for womens and mens
    &.large {
        height : 380px;
    }
`;


export const MenuItemBackgroundImage = styled.div`
    width  : 100%;
    height : 100%;

    background-image    : ${ ( props ) => `url( ${ props.imageUrl } )`  };
    background-position : center;
    background-size     : cover;
`;


 // had to do position : absolute below in order to get the MenuItemContent to sit on top
 // of the image
export const MenuItemContent = styled.div`
    display               : grid;
    align-content         : center;
    justify-items         : center;
    position              : absolute;
    height                : 90px;
    padding               : 0 25px 0 25px;

    border : 1px solid rgba( 0, 0, 0, 1 );

    background : rgba( 255, 255, 255, 1.0 );
    opacity    : 0.7;
`;


export const MenuItemContentTitle = styled.h1`
    margin : 0 0 6px 0;

    font-size   : 22px;
    font-weight : 700;
    color       : rgba(74, 74, 74, 1);
`;


export const MenuItemContentSubTitle = styled.span`
    font-size   : 16px;
    font-weight : 300;    
`;


