

import { createSelector } from 'reselect';

// the below gives us the shop reducer
const selectShop = ( state ) => state.shop;

// the below gives us the shop collections array
export const selectShopCollections = createSelector( 
    [ selectShop ],
    ( shop ) => shop.collections
);


// -- Mark 1 --
// lecture 135: Collection Routing and Selector
// " COLLECTION_ID_MAP " is an object that maps the string value to the respective IDs
// and we will pass the string value to the correct ID and then we'll match that value
// in our selector
/*
const COLLECTION_ID_MAP = {
    hats     : 1,
    sneakers : 2,
    jackets  : 3,
    womens   : 4,
    mens     : 5
}
*/

// remember " [ selectShopCollections ] " will be equal to the collections array and we can
// then use the find method on the collectios array in order to find a match and remember
// find will loop through each item in the array from left to right until it finds a match
// or until it finds an element where the condition is true

// below we are trying to find the collection.id that is strictly equal to
// " COLLECTION_ID_MAP[ collectionUrlParam ] " or for example, COLLECTION_ID_MAP[ hats ] 
// equals " 1 " so if collection.id equals " 1 " then we have a match or we have
// a true condition and in that case that particular collection will get returned
// and that collection will equal " selectCollection "

// now that we have our selecttor, let's bring this into our component so let's go to the
// pages/collection/collection.component.jsx file

// the below gives us the correct collection object


// -- Mark 4 --
// lecture 168: WithSpinner HOC
// remember, we are coming from -- Mark 4 -- below and the notes below relate to the second error
// and since we changed the initial state for collections to null ( remember before collections
// : SHOP_DATA ) or collections equaled SHOP_DATA in our shop reducer but now collections equals
// null in our shop reducer so we need to account for this change by setting up a ternary operator
// below  or change " ( collections ) => collections[ collectionUrlParam ] " to
// " ( collections ) => ( collections ? collections[ collectionUrlParam ] : null ) " and we are
// saying if " collections " exist then return " collections[ collectionUrlParam ] " to our
// selectCollection selector and if collections does not exist or is null then we will return
// null and it is better that we return null so that the components that rely on the
// selectCollection selector will know that there is no data in the collections map object so
// therefore the respective components will just render an empty state and now let's go fix the
// CollectionPage component so go to pages/collection/collection.component.jsx
export const selectCollection = ( collectionUrlParam ) => createSelector(
    [ selectShopCollections ],
    ( collections ) => ( collections ? collections[ collectionUrlParam ] : null )
);
// End of -- Mark 4 --

// End of -- Mark 1 --


// -- Mark 2 --
// lecture 137: Data Normalization + Collection Page
// and all we have to do is change collections.find() above to collections[ collectionUrlParam ]
// and this will result is better app performance
// so change:
/*
export const selectCollection = ( collectionUrlParam ) => createSelector(
    [ selectShopCollections ],
    ( collections ) => collections.find(
        ( collection ) => collection.id === COLLECTION_ID_MAP[ collectionUrlParam ]
    )
);
*/

// to:
/*
export const selectCollection = ( collectionUrlParam ) => createSelector(
    [ selectShopCollections ],
    ( collections ) => collections[ collectionUrlParam ]
);
*/

// and remember collections equals SHOP_DATA in our shop reducer
/*
const INTIAL_STATE = {

    collections : SHOP_DATA

};
*/

// and we can comment out COLLECTION_ID_MAP and our collections array now looks like the
// following:
/*


*/

// and this is the ideal way to store large arrays of elements where we need to find an
// individual element inside our reducer and this is pretty common thing we'll encounter
// when talking about back ends and databases but all we need to know about data normalization
// is we store lists of elements as objects instead of arrays

// we do have directory: sections as an array ( i.e. the sections array ) in redux logger and we
// have shop: collections: hats: items: as an array ( i.e. the items array ) but this is Ok for our
// case since we probable will not need a find an individual element inside the sections array
// or the items array and if, for example, we had an individual product page where we wanted
// show a specific product page then maybe we would convert the items array to an object so now
// we've optimized this query search so if the collections object grows to hudreds or thousands of
// items inside the collection object ( current we have 5 items right now, such as " hats ",
// " jackets ", etc. ) our search is just as fast searching for the last item as it is searching
// for the first item because we are looking for a property on the collections object and that's all
// we have to do in order to get the corresponding collection object
// End of -- Mark 2 --


// -- Mark 3 --
// lecture 139: Data Flow In Our App
// remember our " selectShopCollections " equals " state.shop.collections " and
// " state.shop.collections " equals SHOP_DATA and SHOP_DATA is an object so we need to convert
// " selectShopCollections " to an array so we can use " selectShopCollections " inside our
// CollectionsOverview component

// on the second line we will get the " collections " object and execute the function
// " Object.keys( collections ) " and " Object.keys( object ) " takes the keys from an object and
// then converts those keys into an array ( from stackoverflow ):
/*
var foo = {
  'alpha': 'puffin',
  'beta': 'beagle'
};

var keys = Object.keys(foo);
console.log(keys) // ['alpha', 'beta'] 
*/

// so " Object.keys( collections ) " will give the keys from the collections object and those
// keys are: " hats ", " sneakers ", " jackets ", " womens " and " mens " and then let's map
// over those keys one at a time so that " collections[ key ] " or " collections[ "hats" ] ",
// for example, will return an object or the hats object in our example and after mapping
// over all the keys ( i.e. " Object.keys( collections ).map( ( key ) => collections[ key ] ) " )
// the function will return 5 objects ( hats, sneakers, jackets, womens, mens ) and the function
// will return those objects as part of an array or an array of items to
// selectCollectionForPreview, which is what we want in order for our CollectionsOverview
// component to work properly

// so let's go to our CollectionsOverview component and make this update


// -- Mark 4 --
// lecture 168: WithSpinner HOC
// since we set " collections " equal to " null " in our shop reducer we are getting an
// error related to the selectCollectionForPreview selector below because we are
// calling Object.keys( collections ) and collections is null so what we want to do is change
// " Object.keys( collections ).map( ( key ) => collections[ key ] ) " to this
// " collections ? Object.keys( collections ).map( ( key ) => collections[ key ] ) : [] "
// so we are saying if " collections " exist then return
// " Object.keys( collections ).map( ( key ) => collections[ key ] ) " otherwise return an
// an empty array and now if we go to " http://localhost:3000/shop " we see that the error is
// fixed

// however, if we go to " http://localhost:3000/shop/hats " and refresh the page we will see
// another error and to start the process of fixing this error go to -- Mark 4 -- above
export const selectCollectionForPreview = createSelector(
    [ selectShopCollections ],
    ( collections ) => collections ? Object.keys( collections ).map( ( key ) => collections[ key ] ) : []
    
);
// End of -- Mark 4 --

// End of -- Mark 3 --