
import React from 'react';
// -- Mark 2 --
// lecture 67: withRouter()
import { withRouter } from 'react-router-dom';
// End of -- Mark 2 --
// import './menu-item.styles.scss';


import {
    MenuItemContainer,
    MenuItemBackgroundImage,
    MenuItemContent,
    MenuItemContentTitle,
    MenuItemContentSubTitle
} from './menu-item.styles';


// create a functional component here since we don't really need our component to hold
// any state, at least not for now and let's make our title dynamic by passing in props
// for the title or better yet we could destructure the title so instead of props.title,
// we do { title } and we destructure " title " inside the arrow function argument

// -- Mark 2 --
// lecture 67: withRouter()
// add in the destructured history, match and linkUrl parameter
const MenuItem = ( { title, imageUrl, size, history, match, linkUrl } ) => (
    // End of -- Mark 2 --

    // in react each html element has another property we can use and that property is
    // called style and style takes an object and this object has prop values equal to
    // css values and we apply the css values to the corresponding element and the css values
    // need to be in camel case so instead of background-image we would use backgroundImage

    // -- Mark 1 --
    // lecture 63: Styling Menu Items
    // capitalize the titles by changing " <h1 className="title">{ title }</h1> "
    // to " <h1 className="title">{ title.toUpperCase() }</h1> " and create another div
    // within the container div that will hold our image because we will want our image to
    // increase when we hover over it but we don't want the content div to increase so move the
    // style object into the new div
    <MenuItemContainer
        // to make the menu item boxes for mens and womens larger than the other 3 menu item boxes
        // we can add a class name dynamically and we will use template literals to help us do that
        // so under certain circumstances this div will have 2 class names: " large " or
        // ` ${ size } ` and " menu-item "
        className={ `${ size }` }

        // -- Mark 2 -- continued
        // lecture 67: withRouter()
        // since we don't know where we will be URL wise in our application, we will add in a
        // template string that matches our current URL ( i.e. ${ match.url } ) plus the linkUrl
        // value ( i.e. ${ linkUrl } ) and when we click on this link we go to
        // " localhost:3000/hats "
        
        // within the MenuItem component, match.url equals "/" or " localhost:3000/ "
        // and linkUrl equals "hats" or " localhost:3000/hats " and inside the Hats
        // component match.url equals " /hats " and if we were to change our URL or
        // the URL before /hats we would still be directed to the Hats component when
        // we click on the link below since ${ match.url } will be the URL for
        // wherever we are in the application URL wise
        
        // so if ${ match.url } equals " localhost:3000/ " or
        // " localhost:3000/somehereelse ", for example, when press on the link below
        // we will go to the Hats component page so " localhost:3000/ " turns into
        // " localhost:3000/hats " and " localhost:3000/somehereelse" turns into
        // " localhost:3000/somehereelse/hats " and this assumes the react router is
        // set up to show " localhost:3000/somehereelse " and if so then match.url will
        // equal " localhost:3000/somehereelse " and clicking on the link below will take
        // us to " localhost:3000/somehereelse/hats " in this particualr example
        onClick={ () => history.push( `${ match.url }${ linkUrl }` ) }
        // End of -- Mark 2 --
    >
        <MenuItemBackgroundImage
            className="background-image"
            imageUrl={ imageUrl }
        />

        <MenuItemContent className="content">

            <MenuItemContentTitle>{ title.toUpperCase() }</MenuItemContentTitle>
            <MenuItemContentSubTitle>SHOP NOW</MenuItemContentSubTitle>

        </MenuItemContent>

    </MenuItemContainer>
    // End of -- Mark 1 --

);

// -- Mark 2 -- continued
// lecture 67: withRouter()
// use the withRouter HOC to wrap our MenuItem component thereby giving the MenuItem component
// access to the history, match and location props from react-router-dom and now we can use the
// destructured history prop above
export default withRouter( MenuItem );
// End of -- Mark 2 --

// using props instead of desstructuring
/*
const MenuItem = ( props ) => (

    <div
        style={
            {
                backgroundImage : `url( ${ props.imageUrl } )`
            }
        }
        className={ `${ props.size } menu-item` }
    >

        <div className="content">

            <h1 className="title">{ props.title }</h1>
            <span className="subtitle">SHOP NOW</span>

        </div>

    </div>

);
*/