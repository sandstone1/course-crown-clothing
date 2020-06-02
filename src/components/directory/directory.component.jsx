
import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
// import './directory.styles.scss';


// -- Mark 2 -- continued
// lecture 130: Directory State Into Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
// End of -- Mark 2 --


import { DirectoryMenuContainer } from './directory.styles';


// will create a class based component since we need to store state
const Directory = ( { sections } ) => (

    /*
    state = {
        // sections will be an array that will contain a list of objects

        // -- Mark 1 --
        // lecture 67: withRouter()
        // add a URL parameters to each object below and then pass the linkUrl into
        // our MenuItem component below

        // -- Mark 2 -- continued
        // lecture 130: Directory State Into Redux
        // let's start by making a directory redux folder and remember we don't have any
        // actions here so we just need a place to store our directory or our sections array
        // and we can store the sections array as state inside the directory reducer so let's
        // make a reducer file called directory.reducer.js and now go to our
        // directory.reducer.js file
        
        // now we back from our directory.reducer.js file and let's comment out our state
        // object above and then let's import in connect from react-redux and since we don't
        // need access to state we can convert our class based component to a functional
        // component so change " class Directory extends React.Component { " to
        // " const Directory = ( { sections } ) => { "
        // and then take out render{} and return(); below and then add () above so we just
        // implicitly return some jsx

        // Yihua recommends we create directory.selectors.js so let's go to the
        // directory.selectors.js file and now I'm back from the directory.selectors.js
        // file and let's import in the relevant selector above or
        // " import { selectDirectorySections } from '../../redux/directory/directory.selectors'; "
        // and then we'll use this selector in mapStateToProps below
        
        // and then let's change:
        /*
            this.state.sections.map( ( { title, imageUrl, size, id, linkUrl } ) => (
                <MenuItem
                    key     ={ id }
                    title   ={ title }
                    imageUrl={ imageUrl }
                    size    ={ size }
                    linkUrl ={ linkUrl }
                />
            ) )
        */
        // to:
        /*
            sections.map( ( { title, imageUrl, size, id, linkUrl } ) => (
                <MenuItem
                    key     ={ id }
                    title   ={ title }
                    imageUrl={ imageUrl }
                    size    ={ size }
                    linkUrl ={ linkUrl }
                />
            ) )
        */

        // and Yihua said it took him a long time to get fully comfortable with being able to
        // just remember all the moving parts of react, redux, reducers, selectors, etc. but again
        // practice makes perfect and if we go to the app we see our code still works and if we
        // go to redux logger we will see our directory and our sections array inside our state
        // object or we will see the following:
        /*
         next state {user: {…}, cart: {…}, directory: {…}, _persist: {…}}
            user: {currentUser: {…}}
            cart: {show: false, cartItems: Array(1)}
            directory:
                sections: Array(5)
                    0: {title: "hats", imageUrl: "https://i.ibb.co/cvpntL1/hats.png", id: 1, linkUrl: "hats"}
                    1: {title: "jackets", imageUrl: "https://i.ibb.co/px2tCc3/jackets.png", id: 2, linkUrl: ""}
                    2: {title: "sneakers", imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png", id: 3, linkUrl: ""}
                    3: {title: "womens", imageUrl: "https://i.ibb.co/GCCdy8t/womens.png", size: "large", id: 4, linkUrl: ""}
                    4: {title: "mens", imageUrl: "https://i.ibb.co/R70vBrQ/men.png", size: "large", id: 5, linkUrl: ""}
                    length: 5
                    __proto__: Array(0)
                __proto__: Object
            _persist: {version: -1, rehydrated: true}
            __proto__: Object
        */
        
        // so now let's do this for our ShopPage component before we build our category pages
        // because the ShopPage component definitely needs its own reducer
        // End of -- Mark 2 --

        /*
        sections : [
            {
                title    : 'hats',
                imageUrl : 'https://i.ibb.co/cvpntL1/hats.png',
                id       : 1,
                linkUrl  : 'hats'
            },
            {
                title    : 'jackets',
                imageUrl : 'https://i.ibb.co/px2tCc3/jackets.png',
                id       : 2,
                linkUrl  : ''                
            },
            {
                title    : 'sneakers',
                imageUrl : 'https://i.ibb.co/0jqHpnp/sneakers.png',
                id       : 3,
                linkUrl  : ''
            },
            {
                title    : 'womens',
                imageUrl : 'https://i.ibb.co/GCCdy8t/womens.png',
                size     : 'large',
                id       : 4,
                linkUrl  : ''
            },
            {
                title    : 'mens',
                imageUrl : 'https://i.ibb.co/R70vBrQ/men.png',
                size     : 'large',
                id       : 5,
                linkUrl  : ''
            }
            // End of -- Mark 1 --
        ]

    };
    */

    // render() {

        // return (

            <DirectoryMenuContainer>
            {
                // instead of:
                /*
                state.sections.map( ( section ) => (
                    <MenuItem 
                        key={ section.id }
                        title={ section.title }
                        imageUrl={ section.imageUrl }
                        size={ section.size }               
                    />
                ) )
                */
                // were going to destructure the title, imageURL, size, id values off of section
                // or we'll type the following as the argument to the arrow function below:
                // { title, imageURL, size, id } and then we'll use those destructured values
                // inside <MenuItem />

                // -- Mark 1 --
                // lecture 67: withRouter()
                // remember, we could do the below instead since the destructured keys ( which
                // represent the corresponding values in the sections array above ) we are using
                // are the same as the prpperties we using inside the <MenuItem /> component and
                // therefore we can use the spread operator as follows:
                /*
                this.state.sections.map( ( { id, ...otherSectionProps } ) => (
                    <MenuItem
                        key={ id }
                        { ...otherSectionProps }
                    />
                */                

                // however, I prefer to be more explicit in my code so I'm keeping original
                // format below:
                sections.map( ( { title, imageUrl, size, id, linkUrl } ) => (
                    <MenuItem
                        key     ={ id }
                        title   ={ title }
                        imageUrl={ imageUrl }
                        size    ={ size }
                        linkUrl ={ linkUrl }
                    />
                ) )
                // End of -- Mark 1 and Mark 2 --
            }
            </DirectoryMenuContainer>

        // );

    // }

);


// -- Mark 2 -- continued
// lecture 130: Directory State Into Redux
const mapStateToProps = createStructuredSelector(
    
    {
        sections : selectDirectorySections
    }

);


/*
// we could do this:
const mapStateToProps = ( state ) => (
    
    {
        directory : state.directory
    }

);
// and:
// " const Directory = ( { directory } ) => ( "
// and:
directory.sections.map( ( { title, imageUrl, size, id, linkUrl } ) => (
    <MenuItem
        key     ={ id }
        title   ={ title }
        imageUrl={ imageUrl }
        size    ={ size }
        linkUrl ={ linkUrl }
    />
) )
// and this works

or we could do:
/*
const mapStateToProps = ( state ) => (
    
    {
        sections : state.directory.sections
    }

);
// and:
// " const Directory = ( { sections } ) => ( "
// and:
sections.map( ( { title, imageUrl, size, id, linkUrl } ) => (
    <MenuItem
        key     ={ id }
        title   ={ title }
        imageUrl={ imageUrl }
        size    ={ size }
        linkUrl ={ linkUrl }
    />
) )
// and this works
*/


export default connect( mapStateToProps )( Directory );
// End of -- Mark 2 --