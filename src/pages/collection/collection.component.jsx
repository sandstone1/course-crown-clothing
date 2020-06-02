
import React from 'react';
import './collection.styles.scss';

// import in the CollectionItem component since this component is the component that
// displays our collection items
import CollectionItem from '../../components/collection-item/collection-item.component';

// now were back from creating our route in the ShopPage component or
/*
    <Route  
        path={ `${ match.path }/:category` }
        component={ CategroyPage }
    />
*/

// and we know we have access to the match object since the CategoryPage component is part
// of a route in the shop.compoenent.jsx file so let's add " match " below as an argument
// to our arrow function and if we add " console.log( match ); " inside our
// CategoryPage component and go to the following url " localhost/shop/hats ", we will get
// the following result in the console:
/*
{path: "/shop/:categoryId", url: "/shop/hats", isExact: true, params: {…}}
    path: "/shop/:categoryId"
    url: "/shop/hats"
    isExact: true
    params:
        categoryId: "hats"
        __proto__: Object
    __proto__: Object
*/

// and we see that inside the " params " property we get the categoryId property with the value
// of "hats" which is the string for the last part of our url or "/hats" so with the route
// above we are telling react router dom that we want this route to have a parameter or
// a params property and we can find the the place we want to go
// or the correct parameter by doing " match.params.categoryId " and this results in " hats "
// and then we can take this result and pass it into our selector and we'll do that in the
// next lesson


// -- Mark 1 --
// lecture 135: Collection Routing and Selector
// set up connect and mapStateToProps below
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
// End of -- Mark 1 --


// -- Mark 2 --
// lecture 137: Data Normalization + Collection Page
// first, we need to destructure the title and items properties off of collection or
// " const { title, items } = collection; " and then render title inside our h2 tag below
// and inside items.map() all we need to pass to the CollectionItem component is the
// key{ item.id } and item={ item } since those are the 2 argument props used by the
// CollectionItem component and now let's apply the styles to this component and go to
// the collection.styles.scss file and if we look at " localhost/shop/hats " we see
// everything is working great

// now we need to make a change in our directory reducer so that when we click on
// a collection category ( e.g. hats ) on the home page it takes us to the correct
// collection page or the collection page with the correct collection array so go
// to directory.reducer.js


// -- Mark 3 --
// lecture 168: WithSpinner HOC
// remember our collections map object may be null when we first load the application
// because we may not have received the collections map object data from our backend
// so we have to create what's called a loading state and in this loading state what
// we want to do is render a spinner and to build the spinner we will use the HOC pattern
// that we've explored before but first let's create a new folder called " with-spinner "
// and 2 new files called " with-spinner.component.jsx " and " with-spinner.styles.jsx "
// and let's go to with-spinner.styles.jsx next
// End of -- Mark 3 --


const CollectionPage = ( { collection } ) => {

    const { title, items } = collection;

    return (

        <div className="collection-page">

            <h2 className="collection-page--title">{ title }</h2>

            <div className="collection-page--items">
            {
                items.map( ( item ) => (

                    <CollectionItem
                        key={ item.id }
                        item={ item }            
                    />

                ) )
            }
            </div>

        </div>

    );

    console.log( collection );

}
// End of -- Mark 2 --

// -- Mark 1 -- continued
// lecture 135: Collection Routing and Selector
// in mapStateToProps we need to use both state and ownProps and ownProps needs to be the second
// argument to mapStateToProps and ownProps is the props of the
// component that we are wrapping in connect so in this case that component would be the
// CollectionPage component and ownProps would be the props of the CollectionPage component
// and we will pass " ownProps.match.params.collectionId " to selectCollection() and then we
// will pass in " state " after we pass in "ownProps.match.params.collectionId " since in this
// case our createSelector() call needs a piece of state in order to work and the piece of
// state that it needs depends on the Url parameter

// now let's change " const CollectionPage = ( { match } ) => { " to
// " const CollectionPage = ( { collection } ) => { " and if we console.log out "collection or
// do " console.log( collection ); " inside the CollectionPage component and when were on
// " localhost:3000/shop/hats " then we will see the following result in the console:
/*
{id: 1, title: "Hats", routeName: "hats", items: Array(9)}
    id: 1
    title: "Hats"
    routeName: "hats"
    items: Array(9)
        0: {id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25}
        1: {id: 2, name: "Blue Beanie", imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png", price: 18}
        2: {id: 3, name: "Brown Cowboy", imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png", price: 35}
        3: {id: 4, name: "Grey Brim", imageUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png", price: 25}
        4: {id: 5, name: "Green Beanie", imageUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png", price: 18}
        5: {id: 6, name: "Palm Tree Cap", imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png", price: 14}
        6: {id: 7, name: "Red Beanie", imageUrl: "https://i.ibb.co/bLB646Z/red-beanie.png", price: 18}
        7: {id: 8, name: "Wolf Cap", imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png", price: 14}
        8: {id: 9, name: "Blue Snapback", imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png", price: 16}
            length: 9
        __proto__: Array(0)
    __proto__: Object
*/

// so our selector is working properly

// and remember the createSelector() function is a curried function which is just a function
// that returns another function and the inner function or second function in this case takes the
// state
// and the function does a transformation on the state so the we get back the proper collection
// array and this is demostrated by the result from above and Yihua said there is a lot of
// stuff that we just went through in order to get our collection array but now were able to
// dynamically change the url and thereby change the collection array
const mapStateToProps = ( state, ownProps ) => (

    {
        collection : selectCollection( ownProps.match.params.collectionId )( state )
    }

);


export default connect( mapStateToProps )( CollectionPage);
// End of -- Mark 1 --