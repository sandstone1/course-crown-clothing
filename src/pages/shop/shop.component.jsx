

// ==============================
// Component Tree Structure
// ==============================
// App                    - React Router
//   Shop Page            - Class and State
//   Shop Data            - Data
//     Collection-Preview - Functional and Presentational
//       Collection-Item  - Functional and Presentational


import React from 'react';
// import in the shop data
// import SHOP_DATA from './shop.data.js';


// -- Mark 3 --
// lecture 133: Nested Routing in Shop Page
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
// End of -- Mark 2 --


/*
// import in the CollectionPrview component
import CollectionPreview from '../../components/collection-preview/collection-preview.component';


// -- Mark 1 --
// lecture 131: Collection State Into Redux
// first import in connect, createStructuredSelector and selectShopCollections and comment out
// " import SHOP_DATA from './shop.data.js'; " above
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectShopCollections } from '../../redux/shop/shop.selectors';
*/

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

// now (1) change the class based component below to a functional component or change
// " class ShopPage extends React.Component { " to
// " const ShopPage = ( { collections } ) => (" and then (2) comment out render() {} and
// return(); and then (3) comment out state = { collections : SHOP_DATA }; and (4) change:
/*
    <div className="shop-page">
    {
        this.state.collections.map( ( { id, title, items } ) => (
            <CollectionPreview
                key   ={ id }
                title ={ title }
                items ={ items }
            />
        ))
    }
    </div>
*

// to:
/*
   <div className="shop-page">
    {
        collections.map( ( { id, title, items } ) => (
            <CollectionPreview
                key   ={ id }
                title ={ title }
                items ={ items }
            />
        ))
    }
    </div>
*/

// and (5) change " export default ShopPage; " to
// " export default connect( mapStateToProps )( ShopPage ); " and (6) add mapStateToProps or:
/*
const mapStateToProps = createStructuredSelector(

    {
        collections : selectShopCollections
    }

);

// remember, we could have done this instead ( but would have lost the performance benefits of
// using selectors ):
/*
const mapStateToProps = ( state ) => (

    {
        collections : state.shop.collections
    }

);
*/

// and if I check the app I see everything is working correctly and Yihua said there are a lot
// of files here but it gets easier with practice and it just comes down to making the right
// files, calling in the right libraries and setting up the right code and Yihua said that
// all this works great but the set up is a little lengthy and now let's start building our
// category pages
// End of -- Mark 1 --

// -- Mark 4 --
// lecture 165: Bringing Shop Data To Our App
// the first thing we need to do is convert our funcitonal component to a class based component
// so change " const ShopPage = ( { match } )  => (} " to
// " class ShopPage extends React.Component {} "

// import in firestore and see notes below for details and later we import in
// " convertCollectionsSnapshotToMap " function
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';


// -- Mark 5 --
// lecture 167: Adding Shop Data to Redux
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
// End of -- Mark 5 --


// -- Mark 6 --
// lecture 169: WithSpinner HOC 2
import WithSpinner from '../../components/with-spinner/with-spinner.component';

// the first thing we need to figure out is how were going to set the isLoading value
// and the best way to do that is inside the ShopPage component so go to -- Mark 6 -- below
// End of -- Mark 6 --

// -- Mark 6 -- continued
// lecture 169: WithSpinner HOC 2
// remember our 2 route components below will need to know whether the state.loading is true
// or false and they need to be aware of whether or not the loading is still happening and
// now let's create a 2 new components
const CollectionsOverviewWithSpinner = WithSpinner( CollectionsOverview );
const CollectionPageWithSpinner = WithSpinner( CollectionPage );

// now we just need to render these 2 components within their respective routes and then
// pass to each component the loading state through a prop and go to -- Mark 6 -- inside
// render()
// End of -- Mark 6 --


class ShopPage extends React.Component {


    // -- Mark 6 -- continued
    // lecture 169: WithSpinner HOC 2
    // let's add a state object with the loading property set to " true " and now go to
    // -- Mark 6 -- below
    state = {
        loading : true
    };
    // End of -- Mark 6 --


    // need to write our componentDidMount method and put our fetch call inside componentDidMount
    // and Yihua said whenever we do this pattern we will most likely subscribe to some reference
    // and therefore we need to remember to unsubscribe when we unmount our component and Yihua
    // will definately touch on this subscriber pattern a little more in a couple lessons from
    // now so let's start off by setting unsubscribeFromSnapshot = null;
    unsubscribeFromSnapshot = null;

    // now we are going to get a snapshot representation of our " collections " array inside
    // our firestore database and we will fetch that inside our component did mount method
    componentDidMount() {
        // now we need to pull in our firestore library from our firebase.utils.js file
        // so do this above
        const collectionRef = firestore.collection( 'collections' );

        // now that we have the reference we want to get this " collections " data and
        // to do that we use the onSnapshot method again so we write collectionRef.onSnapshot()
        // and onSnapshot is a listener function and whenever the collectionRef updates or
        // whenever " collectionRef.onSnapshot() " runs for the first time collectionRef
        // will send us the " snapshot " object which represents the " collections " collection
        // and we want this request to be asynchronous and first let's console log out the snapshot
        // to see what it is and the result of " console.log( snapshot ); " is:
        /*
        QuerySnapshot {_firestore: Firestore, _originalQuery: Query, _snapshot: ViewSnapshot,
        _converter: undefined, _cachedChanges: null, …}
            docs: Array(5)
                0: QueryDocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document:
                Document, _fromCache: false, _hasPendingWrites: false, …}
                1: QueryDocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document:
                Document, _fromCache: false, _hasPendingWrites: false, …}
                2: QueryDocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document:
                Document, _fromCache: false, _hasPendingWrites: false, …}
                3: QueryDocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document:
                Document, _fromCache: false, _hasPendingWrites: false, …}
                4: QueryDocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document:
                Document, _fromCache: false, _hasPendingWrites: false, …}
                length: 5
                __proto__: Array(0)
            empty: false
            metadata: SnapshotMetadata {hasPendingWrites: false, fromCache: false}
            query: Query
            size: 5
            _cachedChanges: null
            _cachedChangesIncludeMetadataChanges: null
            _converter: undefined
            _firestore: Firestore {_firebaseApp: FirebaseAppImpl, _queue: AsyncQueue, INTERNAL: {…},
                _databaseId: DatabaseId, _persistenceKey: "[DEFAULT]", …}
            _originalQuery: Query {path: ResourcePath, collectionGroup: null, explicitOrderBy:
                Array(0), filters: Array(0), limit: null, …}
            _snapshot: ViewSnapshot {query: Query, docs: DocumentSet, oldDocs: DocumentSet,
                docChanges: Array(5), mutatedKeys: SortedSet, …}
            __proto__: Object
        */

        // so we see that we got back a QuerySnapshot object with a property called " docs "
        // and we get back 5 docs and if we want the value we will have to call .data() on
        // them and inside " docs " we see an id property with the same value as the id property
        // inside our firestore database or " collections/ids " so these 5 docs represent the
        // 5 categories inside " collections " or " hats, sneakers, jackets, womens and mens "
        // so we know were getting the right data but now we need to transform this data into
        // the shape that we need as well as add any key values pairs that we need and we will
        // do that inside our firebase.utils.js file and we will create a new function similar
        // to createUserProfileDocument() so go to the firebase.utils.js file

        // now we are back from our firebase.utils.js file let's change
        // " console.log( snapshot ); " to " convertCollectionsSnapshotToMap( snapshot ); "
        // and after we call convertCollectionsSnapshotToMap( snapshot ); we will see the value
        // of " transformedCollection " in the console and remember we console.logged out
        // " transformedCollection " or " console.log( transformedCollection ) " in our
        // firebase.utils.js file so that we could double check the data we are getting back
        // from our firestore database and make sure it matches the data we what
        /*
        (5) [{…}, {…}, {…}, {…}, {…}]
            0:
                id: "JQUr46Foq20b6vUvGYp0"
                items: Array(7)
                    0: {id: 23, imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png", name: "Blue Tanktop", price: 25}
                    1: {id: 24, imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png", name: "Floral Blouse", price: 20}
                    2: {id: 25, imageUrl: "https://i.ibb.co/KV18Ysr/floral-skirt.png", name: "Floral Dress", price: 80}
                    3: {id: 26, imageUrl: "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png", name: "Red Dots Dress", price: 80}
                    4: {id: 27, imageUrl: "https://i.ibb.co/KmSkMbH/striped-sweater.png", name: "Striped Sweater", price: 45}
                    5: {id: 28, imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png", name: "Yellow Track Suit", price: 135}
                    6: {id: 29, imageUrl: "https://i.ibb.co/qBcrsJg/white-vest.png", name: "White Blouse", price: 20}
                        length: 7
                __proto__: Array(0)
                routename: "womens"
                title: "Womens"
            __proto__: Object
            1: {id: "PMw0lnFb7tWxUOe3bHEv", routename: "mens", title: "Mens", items: Array(6)}
            2: {id: "kRrrxVcKtSuXHtjWQz4Q", routename: "jackets", title: "Jackets", items: Array(5)}
            3: {id: "mCGGrwiX1TDVmaEXeNKG", routename: "hats", title: "Hats", items: Array(9)}
            4: {id: "uLXuVidFGd6C866dEhNy", routename: "sneakers", title: "Sneakers", items: Array(8)}
            length: 5
            __proto__: Array(0)
        */

        // so we see that we are gettin back our id, items, routename and title properties with
        // the corresponding values so our " convertCollectionsSnapshotToMap( snapshot ); "
        // is working
        
        // and remember we can also see that we are getting back an array of objects or
        // " [{…}, {…}, {…}, {…}, {…}] " so now that we have our data in the right shape
        // and we've put the data in the right place in our component tree we need to convert
        // this from an array to an object and remember we converted our SHOP_DATA from an array
        // to an object in our state normalization lectures or in
        // " lecture 137: Data Normalization + Collection Page " and we will convert our data
        // from an array to an object in the next lecture        

        // collectionRef.onSnapshot( async ( snapshot ) => {

            // -- Mark 5 -- continued
            // lecture 167: Adding Shop Data to Redux
            // remember collectionsMap equals the return value from
            // transformedCollection.reduce() from the firebase.utils.js file or :
            /*
            return transformedCollection.reduce( ( accumulator, collection ) => {
                    accumulator[ collection.title.toLowerCase() ] = collection;
                    return accumulator;
                }, {}
            );
            */

            // and now console.log collectionsMap to see what we end up with or
            // " console.log( collectionsMap ); ":
            /*
            {womens: {…}, mens: {…}, jackets: {…}, hats: {…}, sneakers: {…}}
                hats:
                    id: "mCGGrwiX1TDVmaEXeNKG"
                    items: Array(9)
                        0: {id: 1, imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", name: "Brown Brim", price: 25}
                        1: {id: 2, imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png", name: "Blue Beanie", price: 18}
                        2: {id: 3, imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png", name: "Brown Cowboy", price: 35}
                        3: {id: 4, imageUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png", name: "Grey Brim", price: 25}
                        4: {id: 5, imageUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png", name: "Green Beanie", price: 18}
                        5: {id: 6, imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png", name: "Palm Tree Cap", price: 14}
                        6: {id: 7, imageUrl: "https://i.ibb.co/bLB646Z/red-beanie.png", name: "Red Beanie", price: 18}
                        7: {id: 8, imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png", name: "Wolf Cap", price: 14}
                        8: {id: 9, imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png", name: "Blue Snapback", price: 16}
                        length: 9
                        __proto__: Array(0)
                    routename: "hats"
                    title: "Hats"
                    __proto__: Object
                jackets: {id: "kRrrxVcKtSuXHtjWQz4Q", routename: "jackets", title: "Jackets", items: Array(5)}
                mens: {id: "PMw0lnFb7tWxUOe3bHEv", routename: "mens", title: "Mens", items: Array(6)}
                sneakers: {id: "uLXuVidFGd6C866dEhNy", routename: "sneakers", title: "Sneakers", items: Array(8)}
                womens: {id: "JQUr46Foq20b6vUvGYp0", routename: "womens", title: "Womens", items: Array(7)}
                __proto__: Object
            */

            // and this structure is identical to our SHOP_DATA object that is stored on our front
            // end and this is what we want because this structure results in better performance
            // and notice our top layer above is an object with keys and corresponding values that
            // are also objects or
            // " {womens: {…}, mens: {…}, jackets: {…}, hats: {…}, sneakers: {…}} "

            // now that we " collectionsMap " we want to store this in our shop reducer and how
            // do we do this? we will do do this by updating our redcuer and creating an action
            // file ( so we can fire actions to update the reducer ) and types file so create a
            // new file called shop.types.js and shop.actions.js and let's go to the
            // shop.types.js file

            // const collectionsMap = convertCollectionsSnapshotToMap( snapshot );
            // console.log( collectionsMap );

            // now I'm back from the shop.types.js file and I added our mapDispatchToProps
            // function below so now let's fire our action creator or " updateCollections "
            // and by doing this we will update our reducer and remember we will fire our
            // action creator and thereby update our reducer evertime the snapshot object
            // changes or everytime we update our firestore database or the " collections "
            // collection inside our firestore database
            const { updateCollections } = this.props;
            
            // updateCollections( collectionsMap );

            // -- Mark 6 -- continued
            // lecture 169: WithSpinner HOC 2
            // now that we have set our state object above let call this.setState() and change
            // our state once we call " updateCollections( collectionsMap ); " because once we do
            // this we know we got our snapshot object back from our firestore database and we've
            // updated our shop reducer by calling our action creator " updateCollections() "
            // so we can turn off our spinner
            // this.setState( { loading : false  } );

            fetch( 'https://firestore.googleapis.com/v1/projects/crown-clothing-25f2b/databases/(default)/documents/collections' )
            .then( ( response ) => response.json() )
            .then( ( collections ) => console.log( collections ) );

            // now that we have determined where in the logic the loading state will change we
            // have to figure out how to use our WithSpinner HOC and as we know our WithSpinner
            // is a HOC that takes a component as an argument then return another component and
            // in this case the returned component is our Spinner component and the Spinner
            // component will render the wrapper component when isLoading is false and go to
            // -- Mark 6 -- above
            // End of -- Mark 6 --


            // now if we save this file and go to our app and check next state in redux
            // logger we should see our " collections " object and let's check that now
            // and the result is:
            /*
            shop: {collections: {…}}
                collections: {womens: {…}, mens: {…}, jackets: {…}, hats: {…}, sneakers: {…}}
                __proto__: Object
            */    
              
            /*
            shop:
                collections:
                    hats: {id: "mCGGrwiX1TDVmaEXeNKG", routename: "hats", title: "Hats", items: Array(9)}
                    jackets: {id: "kRrrxVcKtSuXHtjWQz4Q", routename: "jackets", title: "Jackets", items: Array(5)}
                    mens: {id: "PMw0lnFb7tWxUOe3bHEv", routename: "mens", title: "Mens", items: Array(6)}
                    sneakers: {id: "uLXuVidFGd6C866dEhNy", routename: "sneakers", title: "Sneakers", items: Array(8)}
                    womens: {id: "JQUr46Foq20b6vUvGYp0", routename: "womens", title: "Womens", items: Array(7)}
                    __proto__: Object
                __proto__: Object
            */

            /*
            shop:
                collections:
                    hats:
                        id: "mCGGrwiX1TDVmaEXeNKG"
                        items: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                        routename: "hats"
                        title: "Hats"
                        __proto__: Object
                    jackets: {id: "kRrrxVcKtSuXHtjWQz4Q", routename: "jackets", title: "Jackets", items: Array(5)}
                    mens: {id: "PMw0lnFb7tWxUOe3bHEv", routename: "mens", title: "Mens", items: Array(6)}
                    sneakers: {id: "uLXuVidFGd6C866dEhNy", routename: "sneakers", title: "Sneakers", items: Array(8)}
                    womens: {id: "JQUr46Foq20b6vUvGYp0", routename: "womens", title: "Womens", items: Array(7)}
                    __proto__: Object
                __proto__: Object
            */

            // so this is correct and we can see that the collections keys such as " hats " have
            // an id that matches our firestore " hats " id or " mCGGrwiX1TDVmaEXeNKG  " and
            // this is in the shape and format that we were looking for or expecting so that is
            // good

            // also if we look at next state in the console:
            /*
            next state {user: {…}, cart: {…}, directory: {…}, shop: {…}, _persist: {…}}
                cart: {show: false, cartItems: Array(2)}
                directory: {sections: Array(5)}
                shop: {collections: {…}}
                user: {currentUser: {…}}
                _persist: {version: -1, rehydrated: true}
                __proto__: Object
            */

            // we see our 4 reducers listed: " cart ", " directory ", " shop " and " user " and
            // this matches our root reducer:

            /*
            const rootReducer = combineReducers(
                {  
                    user      : userReducer,
                    cart      : cartReducer,
                    directory : directoryReducer,
                    shop      : shopReducer
                }
            );
            */

            // so all of our state or all 4 of our reducers are working correctly and being
            // displayed in the next state category in redux logger

            // we will remove our SHOP_DATA from our INITIAL_STATE in our shop reducer
            // in the next lesson

            // End of -- Mark 5 --

        // } );

    }

    render() {
        
        // destructure match off of our props
        const { match } = this.props;

        // -- Mark 6 -- continued
        // lecture 169: WithSpinner HOC 2
        // change " component={ CollectionsOverview } " to
        // " render={ ( props ) => <CollectionsOverviewWithSpinner isLoading={ loading }
        // { ...props } /> } "
        // and remember the " props " argument above contains the history, location and match
        // properties and these props are passed in by the Route component and passed to our
        // component and then let's destructure our loading value from our state object and we
        // do this below and loading will be either true or false and then let's add in our
        // isLoading key value pair or " isLoading={ loading } " and remember isLoading
        // will be used inside the WithSpinner HOC to determine what to render ( i.e. either
        // the spinner or the WrappedComponent and remember the WrapperComponent will be
        // either the CollectionsOverview component or the CollectionPage component )
        
        // let's do the exact same thing for our CollectionPage component

        // now if we go to our application we will see the spinner is spinning while our
        // component is fetching the back end data and the moment the data comes back and we
        // update the reducer is the moment the spinner disappears and the WrappedComponent
        // appears and remember the WrappedComponent will be either the CollectionsOverview
        // component or the CollectionPage component depending on the route

        // the Spinner component works in the shop page or " localhost:3000/shop " or in the
        // collection page or " localhost:3000/shop/hats ", for example, and remember our
        // shop page is rendering either ( depending on the route ) our CollectionsOverview
        // component which is then rendering our CollectionPreview component or our
        // CollectionPage component which is then rendering our CollectionItem component

        // so now we have used and built our loading component and it is working great and
        // is a really nice piece of UI

        // now we can use this same pattern or use our WithSpinner HOC anywhere we need to
        // fetch asynchronous data from the back end and remember there are a lot of projects
        // out there that leverage this HOC pattern of wrapping components and returning new
        // components ( i.e. like our Spinner component ) and the more you look at this HOC
        // pattern and more you practice with this pattern the more it will make sense and the
        // more you'll see how to use and leverage this HOC pattern

        // so now our application is wired with our back end so if we updated our backend with
        // a new document object, for example, then our application will update accordingly and
        // this now mimics a real life application so we now understand how to build a front
        // end application that leverages data on the back end
        const { loading } = this.state;


        return (

            <div className="shop-page">

                <Route
                    path={ `${ match.path }` }
                    exact={ true }
                    render={ ( props ) => (
                        <CollectionsOverviewWithSpinner isLoading={ loading } { ...props } />
                     ) }
                />
                <Route
                    path={ `${ match.path }/:collectionId` }
                    render={ ( props ) => (
                        <CollectionPageWithSpinner isLoading={ loading } { ...props } />
                    ) }
                />
    
            </div>

        );

    }
    
}
// End of -- Mark 4 and Mark 6 --



/*
const ShopPage = ( { match } )  => (

    // need to copy and paste the collections array data from the last lecture
    // and then move the state object into its own file since it will be static
    // and this will make it easier to focus on the main thing about our shop page
    // which will be component itself and its lifecycle methods and call this file
    // shop.data.jsx
    /*
    state = {
        collections : [
            {
                id: 1,
                title: 'Hats',
                routeName: 'hats',
                items: [
                    {
                        id: 1,
                        name: 'Brown Brim',
                        imageUrl: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
                        price: 25
                    },
                    {
                        id: 2,
                        name: 'Blue Beanie',
                        imageUrl: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
                        price: 18
                    },
                    {
                        id: 3,
                        name: 'Brown Cowboy',
                        imageUrl: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
                        price: 35
                    },
                    {
                        id: 4,
                        name: 'Grey Brim',
                        imageUrl: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
                        price: 25
                    },
                    {
                        id: 5,
                        name: 'Green Beanie',
                        imageUrl: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
                        price: 18
                    },
                    {
                        id: 6,
                        name: 'Palm Tree Cap',
                        imageUrl: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png',
                        price: 14
                    },
                    {
                        id: 7,
                        name: 'Red Beanie',
                        imageUrl: 'https://i.ibb.co/bLB646Z/red-beanie.png',
                        price: 18
                    },
                    {
                        id: 8,
                        name: 'Wolf Cap',
                        imageUrl: 'https://i.ibb.co/1f2nWMM/wolf-cap.png',
                        price: 14
                    },
                    {
                        id: 9,
                        name: 'Blue Snapback',
                        imageUrl: 'https://i.ibb.co/X2VJP2W/blue-snapback.png',
                        price: 16
                    }
                ]
            },
            {
                id: 2,
                title: 'Sneakers',
                routeName: 'sneakers',
                items: [
                    {
                        id: 1,
                        name: 'Adidas NMD',
                        imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
                        price: 220
                    },
                    {
                        id: 2,
                        name: 'Adidas Yeezy',
                        imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
                        price: 280
                    },
                    {
                        id: 3,
                        name: 'Black Converse',
                        imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
                        price: 110
                    },
                    {
                        id: 4,
                        name: 'Nike White AirForce',
                        imageUrl: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
                        price: 160
                    },
                    {
                        id: 5,
                        name: 'Nike Red High Tops',
                        imageUrl: 'https://i.ibb.co/QcvzydB/nikes-red.png',
                        price: 160
                    },
                    {
                        id: 6,
                        name: 'Nike Brown High Tops',
                        imageUrl: 'https://i.ibb.co/fMTV342/nike-brown.png',
                        price: 160
                    },
                    {
                        id: 7,
                        name: 'Air Jordan Limited',
                        imageUrl: 'https://i.ibb.co/w4k6Ws9/nike-funky.png',
                        price: 190
                    },
                    {
                        id: 8,
                        name: 'Timberlands',
                        imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
                        price: 200
                    }
                ]
            },
            {
                id: 3,
                title: 'Jackets',
                routeName: 'jackets',
                items: [
                    {
                        id: 1,
                        name: 'Black Jean Shearling',
                        imageUrl: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
                        price: 125
                    },
                    {
                        id: 2,
                        name: 'Blue Jean Jacket',
                        imageUrl: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
                        price: 90
                    },
                    {
                        id: 3,
                        name: 'Grey Jean Jacket',
                        imageUrl: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
                        price: 90
                    },
                    {
                        id: 4,
                        name: 'Brown Shearling',
                        imageUrl: 'https://i.ibb.co/s96FpdP/brown-shearling.png',
                        price: 165
                    },
                    {
                        id: 5,
                        name: 'Tan Trench',
                        imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
                        price: 185
                    }
                ]
            },
            {
                id: 4,
                title: 'Womens',
                routeName: 'womens',
                items: [
                    {
                        id: 1,
                        name: 'Blue Tanktop',
                        imageUrl: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
                        price: 25
                    },
                    {
                        id: 2,
                        name: 'Floral Blouse',
                        imageUrl: 'https://i.ibb.co/4W2DGKm/floral-blouse.png',
                        price: 20
                    },
                    {
                        id: 3,
                        name: 'Floral Dress',
                        imageUrl: 'https://i.ibb.co/KV18Ysr/floral-skirt.png',
                        price: 80
                    },
                    {
                        id: 4,
                        name: 'Red Dots Dress',
                        imageUrl: 'https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png',
                        price: 80
                    },
                    {
                        id: 5,
                        name: 'Striped Sweater',
                        imageUrl: 'https://i.ibb.co/KmSkMbH/striped-sweater.png',
                        price: 45
                    },
                    {
                        id: 6,
                        name: 'Yellow Track Suit',
                        imageUrl: 'https://i.ibb.co/v1cvwNf/yellow-track-suit.png',
                        price: 135
                    },
                    {
                        id: 7,
                        name: 'White Blouse',
                        imageUrl: 'https://i.ibb.co/qBcrsJg/white-vest.png',
                        price: 20
                    }
                ]
            },
            {
                id: 5,
                title: 'Mens',
                routeName: 'mens',
                items: [
                    {
                        id: 1,
                        name: 'Camo Down Vest',
                        imageUrl: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
                        price: 325
                    },
                    {
                        id: 2,
                        name: 'Floral T-shirt',
                        imageUrl: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
                        price: 20
                    },
                    {
                        id: 3,
                        name: 'Black & White Longsleeve',
                        imageUrl: 'https://i.ibb.co/55z32tw/long-sleeve.png',
                        price: 25
                    },
                    {
                        id: 4,
                        name: 'Pink T-shirt',
                        imageUrl: 'https://i.ibb.co/RvwnBL8/pink-shirt.png',
                        price: 25
                    },
                    {
                        id: 5,
                        name: 'Jean Long Sleeve',
                        imageUrl: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png',
                        price: 40
                    },
                    {
                        id: 6,
                        name: 'Burgundy T-shirt',
                        imageUrl: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
                        price: 25
                    }
                ]
            }
        ]
    }; // end of state
    */

    // now point collections to our SHOP_DATA array from shop.data.jsx
    /*
    state = {
        collections : SHOP_DATA
    };
    */

    // render() {
        // could do render() this way instead:
        /*
        return(

            <div className="shop-page">
            {
                this.state.collections( ( { id, ...otherCollectionProps } ) => (
                    <CollectionPreview
                        key   ={ id }
                        ...otherCollectionProps ( and ...otherCollectionProps represents
                        (1) title ={ title } and (2) routeName = { routename } and
                        (3) items ={ items } )
                    />
                ))
            }
            </div>

        );
        */
        // return (


    // -- Mark 2 --
    // lecture 132: Collection Overview Component
    // now we want to move collection.map or:
    /*
       collections.map( ( { id, title, items } ) => (
            <CollectionPreview
                key   ={ id }
                title ={ title }
                items ={ items }
            />
        ))
    */
    // into its own component and once we move it out we won't need the " collections " array
    // anymore and we will tie everything that is attached to our CollectionPreview component
    // and put it into a CollectionsOverview component and the CollectiosnOverview component will
    // be connected to the state and will get the collections array and let's make a new folder
    // inside our components folder called collections-overview and inside that file we will
    // create 2 new files: collections-overview.component.jsx and
    // collections.overview.styles.scss and let's go to collections-overview.component.jsx and
    // now I'm back from collections-overview.component.jsx and (1) let change collections.map
    // below or:
    /*
       collections.map( ( { id, title, items } ) => (
            <CollectionPreview
                key   ={ id }
                title ={ title }
                items ={ items }
            />
        ))
    */
    
    // to <CollectionsOverview /> and (2) let's comment out mapStateToProps and delete connect
    // below and (3) let's comment out the imports for the CollectionPreview component, connect,
    // createStructuredSelector and selectShopCollections above and (4) let's import in the
    // CollectionsOverview component and (5) change
    // " const ShopPage = ( { collections } )  => ( " to " const ShopPage = ()  => ( " and
    // now if I look at our app everything is still working as expected and in the next lecture
    // we will selectively render inside the CollectionsOverview component so we will have one
    // route that leads us to our CollectionsOverview component and this will apply only when
    // were on the shop page and then we will render our new category page when we land on our
    // shop/:category route
    // End of -- Mark 2 --


    // -- Mark 3 --
    // lecture 133: Nested Routing in Shop Page
    // instead of just rendering our component or <CollectionsOverview /> we need to access
    // the component through a route and the path we want to display is the current path or that
    // were on or " path={ `${ match.path }` } " and remember our shop page is also a routed
    // component in the App.js file so when were on "/shop" we should see our CollectionsOverview
    // component just like before

    // we know we have access to the match object inside the ShopPage component because our
    // shop page is nested inside a route in the App.js file and remember route automatically
    // passes 3 objects to our components as props and those 3 object are match, location
    // and history and for this component we want the match object and change
    // " const ShopPage = ()  => ( " to " const ShopPage = ( { match } )  => ( " above

    // we will use string interpolation to get the path for the CollectionsOverview component
    // or we will do " path={ `${ match.path }` } " and if we run console.log( match );
    // inside our ShopPage component  we will get the following result in the console:
    /*
        {path: "/shop", url: "/shop", isExact: true, params: {…}}
            path: "/shop"
            url: "/shop"
            isExact: true
            params: {}
            __proto__: Object
    */

    // in other words, " path : "/shop" " so " path={ `${ match.path }` } " below should
    // equal " path="/shop" " and we need to know the current path for the shop page
    // because we have to build our routes off the shop page path and before we finish our
    // routing, let's build our category page first so inside the pages folder add a new
    // folder called category and inside that folder let's add 2 new files: category.component.jsx
    // and category.styles.scss and let's go to category.component.jsx and now were back
    // from category.component.jsx and let's import in the CategoryPage component above

    // Yihua said he mentioned ealier that we need to nest our routes so what does that mean?
    // what we want is be able to dynamically pick the right category from our collections
    // array and display that particular category on the category page

    // so we are going to tell the category route that the route name will be a parameter
    // and we want to be able to access the string that is in our URL so that we can access
    // the right category

    // so for our category route we will do the following:
    /*
        <Route  
            path={ `${ match.path }/:category` }
            exact={ true }
            component={ CategroyPage }
        />
    */

    // and remember we want to use " `${ match.path }` " instead of hardcoding the path like
    // " path={ /shop } " since we want to be able to pick up the shop url no matter what
    // the shop url happens to be and then start from that point and move forward
    // and in this case we want to add the category parameter or " /:categoryId " and what
    // " categoryId " does is it allows us to access the categoryId as a parameter on the
    // match object and we can do this when were on the category page and now let's go back
    // to the category.component.jsx file
/*
    <div className="shop-page">

        <Route  
            path={ `${ match.path }` }
            exact={ true }
            component={ CollectionsOverview }
        />
        <Route  
            path={ `${ match.path }/:collectionId` }
            component={ CollectionPage }
        />

    </div>

    // End of -- Mark 3 --

        // );

    // }

);
*/


/*
const mapStateToProps = createStructuredSelector(

    {
        collections : selectShopCollections
    }

);
*/


// -- Mark 5 -- continued
// lecture 167: Adding Shop Data to Redux
// add in the connect and mapStateToDispatch functions below and then set up the dispatch
// function where we dispatch the action creator " updateCollections " with the argument of
// " collectionsMap "
const mapDispatchToProps = ( dispatch ) => (
    {
        updateCollections : ( collectionsMap ) => dispatch( updateCollections( collectionsMap ) )
    }
);


export default connect( null, mapDispatchToProps )( ShopPage );
// End of -- Mark 5 --
