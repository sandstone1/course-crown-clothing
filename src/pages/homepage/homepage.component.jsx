
import React from 'react';

// -- Mark 1 --
// lecture 57: E-commerce Homepage + SASS Setup
// import './homepage.styles.scss';
// -- Mark 2 --
// lecture 61: Homepage and Directory Components
import Directory from '../../components/directory/directory.component';


// -- Mark 2 continued --
// create new HomePage component



// -- Mark 3 --
// lecture 153: styled-components In Our App
// first let's make a new page called " homepage.styles.jsx " and go to homepage.styles.jsx
// and now I'm back from homepage.styles.jsx and now let's import in the HomePageContainer
// component and now we can replace "<div className="homepage"></div> " with
// " <HomePageContainer></HomePageContainer> " and comment out
// " import './homepage.styles.scss'; " and if we look at our app we see that it is
// the exact same as before

// now our home page container component is in our html file is looks like:
// " <div class="sc-AxjAm cFLNCL"></div> " and this class is specific to our HomePageContainer
// component

// now let's tackle a component that is a little bit more complicated and let's go to
// src/header/header.component.jsx
import { HomePageContainer } from './homepage.styles';



const HomePage = () => (

    // insert the Directory component below and this component includes the MenuItem component 
    // <div className="homepage">

    <HomePageContainer>

        <Directory />

    </HomePageContainer>
    // End of -- Mark 3 --
    // </div>

);


// -- Mark 2 --
// lecture 61: Homepage and Directory Components
// comment out the HomePage component below
/*
// create a functional component since we do not need any lifecycle methods at this point
// nor do we need to store any state
// End of -- Mark 1 --
const HomePage = () => (

    // -- Mark 1 -- continued
    // inside the div will be menu item container component and the menu item component
    <div className="homepage">

        <div className="directory-menu">

            <div className="menu-item">

                <div className="content">

                    <h1 className="title">HATS</h1>
                    <span className="subtitle">SHOP NOW</span>

                </div>
            
            </div>
            <div className="menu-item">

                <div className="content">

                    <h1 className="title">JACKETS</h1>
                    <span className="subtitle">SHOP NOW</span>

                </div>
            
            </div>
            <div className="menu-item">

                <div className="content">

                    <h1 className="title">SNEAKERS</h1>
                    <span className="subtitle">SHOP NOW</span>

                </div>
            
            </div>
            <div className="menu-item">

                <div className="content">

                    <h1 className="title">WOMENS</h1>
                    <span className="subtitle">SHOP NOW</span>

                </div>
            
            </div>
            <div className="menu-item">

                <div className="content">

                    <h1 className="title">MENS</h1>
                    <span className="subtitle">SHOP NOW</span>

                </div>
            
            </div>

        </div>

    </div>

);
*/
// End of -- Mark 2 --


export default HomePage;