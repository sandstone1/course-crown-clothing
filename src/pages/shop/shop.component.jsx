

// ==============================
// Component Tree Structure
// ==============================
// App                    - React Router
//   Shop Page            - Class and State
//   Shop Data            - Data
//     Collection-Preview - Functional and Presentational
//       Collection-Item  - Functional and Presentational

/*
import React from 'react';
// import in the shop data
// import SHOP_DATA from './shop.data.js';


// -- Mark 7 --
// lecture 174: Redux Thunk
// first let's remove all the code we don't need anymore so take out or comment out the
// following:

/*
state = {
    loading : true
};
*/

// and:
/*
unsubscribeFromSnapshot = null;
*/

// and everything inside componentDidMount():
/*
const collectionRef = firestore.collection( 'collections' );
collectionRef.onSnapshot( async ( snapshot ) => {}
const collectionsMap = convertCollectionsSnapshotToMap( snapshot );
const { updateCollections } = this.props;
updateCollections( collectionsMap );
this.setState( { loading : false  } );
*/

// and:
/*
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
const { loading } = this.state;
*/

// and let's comment out all this code and start anew at the bottom of this file
// End of -- Mark 7 --



// -- Mark 3 --
// lecture 133: Nested Routing in Shop Page
/*
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

/*
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

// -- Mark 7 -- continued
// lecture 174: Redux Thunk
// comment out the import below
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
// End of -- Mark 7 --

// -- Mark 5 --
// lecture 167: Adding Shop Data to Redux
/*
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

    // -- Mark 7 --
    // lecture 174: Redux Thunk
    // comment out state
    /*
    state = {
        loading : true
    };
    */
    // End of -- Mark 7 --
    // End of -- Mark 6 --


    // need to write our componentDidMount method and put our fetch call inside componentDidMount
    // and Yihua said whenever we do this pattern we will most likely subscribe to some reference
    // and therefore we need to remember to unsubscribe when we unmount our component and Yihua
    // will definately touch on this subscriber pattern a little more in a couple lessons from
    // now so let's start off by setting unsubscribeFromSnapshot = null;
    
    // -- Mark 7 -- continued
    // lecture 174: Redux Thunk
    // comment out unsubscribeFromSnapshot
    // unsubscribeFromSnapshot = null;
    // End of -- Mark 7 --


    // now we are going to get a snapshot representation of our " collections " array inside
    // our firestore database and we will fetch that inside our component did mount method
    /*
    componentDidMount() {
        // now we need to pull in our firestore library from our firebase.utils.js file
        // so do this above

        // -- Mark 7 -- continued
        // lecture 174: Redux Thunk
        // comment out collectionRef
        // const collectionRef = firestore.collection( 'collections' );
        // End of -- Mark 7 --

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
        
        // -- Mark 7 -- continued
        // lecture 174: Redux Thunk
        // comment out " collectionRef.onSnapshot( async ( snapshot ) => {} "
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

            // -- Mark 7 -- continued
            // lecture 174: Redux Thunk
            // comment out collectionsMap
            // const collectionsMap = convertCollectionsSnapshotToMap( snapshot );
            // End of -- Mark 7 --

            // console.log( collectionsMap );

            // now I'm back from the shop.types.js file and I added our mapDispatchToProps
            // function below so now let's fire our action creator or " updateCollections "
            // and by doing this we will update our reducer and remember we will fire our
            // action creator and thereby update our reducer evertime the snapshot object
            // changes or everytime we update our firestore database or the " collections "
            // collection inside our firestore database

            
            // -- Mark 7 -- continued
            // lecture 174: Redux Thunk
            // comment out " const { updateCollections } = this.props; "
            // " updateCollections( collectionsMap ); "
            // " this.setState( { loading : false  } ); "
            // const { updateCollections } = this.props;
            
            // updateCollections( collectionsMap );

            // -- Mark 6 -- continued
            // lecture 169: WithSpinner HOC 2
            // now that we have set our state object above let call this.setState() and change
            // our state once we call " updateCollections( collectionsMap ); " because once we do
            // this we know we got our snapshot object back from our firestore database and we've
            // updated our shop reducer by calling our action creator " updateCollections() "
            // so we can turn off our spinner
            
            // this.setState( { loading : false  } );
            // End of -- Mark 7 --       

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
        // End of -- Mark 7 --

    /* }

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

        // -- Mark 7 -- continued
        // lecture 174: Redux Thunk
        // comment out " const { loading } = this.state; "
        // const { loading } = this.state;
        // End of -- Mark 7 --


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
/*
const mapDispatchToProps = ( dispatch ) => (
    {
        updateCollections : ( collectionsMap ) => dispatch( updateCollections( collectionsMap ) )
    }
);


export default connect( null, mapDispatchToProps )( ShopPage );
// End of -- Mark 5 --

*/





// *********
// and let's comment out all this code and start anew at the bottom of this file
// *********



/* // COMMENT OUT LECTURE 201 TIMESTAMP



// -- Mark 7 -- continued
// lecture 174: Redux Thunk
// remember we commented out the above code and we are starting anew
import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


// -- Mark 7 -- continued
// lecture 174: Redux Thunk
// ( note to self ) I had to move the 3 imports below to be above the " CollectionPage " import
// in order to load the app and not get an error in the console and I'm not exactly sure why
// these imports have to be loaded first but they do and now we have to import in
// " createStructuredSelector " since we know were going to need to select certain values off
// of our state
// import { createStructuredSelector } from 'reselect';
// next we need to create the selector that will pull in the isFetching property so let's go
// to our shop.selector.js file and were back from our shop.selector.js file and now let's
// import in " selectIsColllectionFetching "
// import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
// and now let's chnage " import { updateCollections } from '../../redux/shop/shop.actions'; "
// to " import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'; "
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// End of -- Mark 7 --


// -- Mark 8 --
// lecture 176: Debugging Our Code
// import in our new selector and add it to mapStateToProps below
// import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
// End of -- Mark 8 --



// -- Mark 9 --
// lectures 177: Container Pattern
// comment out the following:
// " const CollectionsOverviewWithSpinner = WithSpinner( CollectionsOverview ); "

// change this:
// " import CollectionsOverview from
// '../../components/collections-overview/collections-overview.component'; "
// to this:
// " import CollectionsOverviewContainer from
// '../../components/collections-overview/collections-overview.container'; "
// now go to -- Mark 9 -- continued 1

// End of -- Mark 9 --


// -- Mark 9 -- continued 2
// lectures 177: Container Pattern
// comment out the following:
// " const CollectionPageWithSpinner = WithSpinner( CollectionPage ); "
// change this:
// " import CollectionPage from '../collection/collection.component'; "
// to this:
// " import CollectionPageContainer from '../collection/collection.ccontainer'; "

// comment out the following:
// " import { createStructuredSelector } from 'reselect'; "
// " import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors'; "
// " import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors'; "
// " import WithSpinner from '../../components/with-spinner/with-spinner.component'; "

// change this:
// " export default connect( mapStateToProps, mapDispatchToProps )( ShopPage ); "
// to this:
// " export default connect( null, mapDispatchToProps )( ShopPage ); "
// now go to -- Mark 9 -- continued 3

// End of -- Mark 9 --



import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// const CollectionsOverviewWithSpinner = WithSpinner( CollectionsOverview );
// const CollectionPageWithSpinner = WithSpinner( CollectionPage );


class ShopPage extends React.Component {

    componentDidMount() {

        // -- Mark 7 -- continued
        // lecture 174: Redux Thunk
        // call "  fetchCollectionsStartAsync " in componentDidMount() but remember we need to
        // destructure it off of our props first
        const { fetchCollectionsStartAsync } = this.props;
        // and then we will call " fetchCollectionsStartAsync() " the moment the component mounts
        fetchCollectionsStartAsync();
        // End of -- Mark 7 --

    }

    render() {

        // -- Mark 7 -- continued
        // lecture 174: Redux Thunk
        // pull " isFetchingCollections " off of this.props and pass " isFetchingCollections "
        // to isLoading below and remember we pulled " match " off of this.props in a prior
        // lecture

        // -- Mark 8 --
        // lecture 176: Debugging Our Code
        // remember to destructure " isCollectionsLoaded " off of this.props and then pass
        // " isCollectionsLoaded " to isLoading in the <CollectionPageWithSpinner /> component
        // below and remember we want to pass the inverse of " isCollectionsLoaded " to isLoading
        // so we will use the not operator on " isCollectionsLoaded " below

        // now if we save and go to our application we see that our application is working as
        // expected or when we refresh the collection page we see the spinner and then a few
        // moments later we see the data or our CollectionPage component

        // so in summary we just needed to make a new selector for the CollectionPage component
        // and we had to do this based on the way our application is set up

        // in the next lesson we are going to focus on moving our selectors from mapStateToProps
        // below into their own component
        const { match } = this.props;
        // End of -- Mark 7 and Mark 8 --


        // -- Mark 9 -- continued 1
        // lectures 177: Container Pattern
        // in the first route let's switch back to our normal pattern or let's go from
        // " render={} " to " component={} " or " component={ CollectionsOverviewContainer } "
        
        // and remove:
        // " isFetchingCollections " and " selectIsCollectionFetching " from mapStateToProps

        // and remove:
        // " isFetchingCollections " from above since we don't need any of these anymore and
        // remember our container is handling all this information now

        // and if we look at our app, we see that it behaves exactly the same

        // I think I like the container pattern

        // and now let's do the same thing for our CollectionPageWithSpinner component and
        // let's start making the changes for this component in -- Mark 9 -- continued 2
        // above
        // End of -- Mark 9 --


        // -- Mark 9 -- continued 3
        // lectures 177: Container Pattern
        // in the second route let's switch back to our normal pattern or let's go from
        // " render={} " to " component={} " or " component={ CollectionPageContainer } "

        // and remove:
        // " isCollectionsLoaded " and " selectIsCollectionsLoaded " from mapStateToProps

        // and remove:
        // " isCollectionsLoaded " from above since we don't need any of these anymore and
        // remember our container is handling all this information now

        // since we removed all the properties and selectors in mapStateToProps, let's comment
        // out mapStateToProps below

        // and if we look at our app, we see that it behaves exactly the same
        // End of -- Mark 9 --

        return (

            <div className="shop-page">

                <Route
                    path={ `${ match.path }` }
                    exact={ true }
                    component={ CollectionsOverviewContainer }
                />
                <Route
                    path={ `${ match.path }/:collectionId` }
                    component={ CollectionPageContainer }
                />
    
            </div>

        );

    }
    
}


// -- Mark 7 -- continued
// lecture 174: Redux Thunk

// -- Mark 8 --
// lecture 176: Debugging Our Code
/*
const mapStateToProps = createStructuredSelector(
    {
        isCollectionsLoaded   : selectIsCollectionsLoaded
    }
);
*/



/* // COMMENT OUT LECTURE 201 TIMESTAMP


// include " fetchCollectionsStartAsync " in mapDispatchToProps
const mapDispatchToProps = ( dispatch ) => (
    {
        fetchCollectionsStartAsync : () => dispatch( fetchCollectionsStartAsync() )
    }
);
// End of -- Mark 7 --


// -- Mark 7 -- continued
// lecture 174: Redux Thunk
// let's add mapStateToProps below
export default connect( null, mapDispatchToProps )( ShopPage );

// now if we save our files and go back to our application we see the code works the exact same
// way as before and the only difference now is that we see these new actions in redux logger
// ( FETCH_COLLECTIONS_START, FETCH_COLLECTIONS_SUCCESS and FETCH_COLLECTIONS_FAILURE ) and
// remember these actions are fired once our component mounts

// the pattern above is a very very common pattern in redux, especially for asynchronous event
// handling and when it comes to components that depend on external APIs to provide the
// component with the data it needs

// Yihua said we will go through this pattern again and again in this course and remember
// practice makes perfect and redux thunk allows us to have a function
// ( i.e. fetchCollectionsStartAsync(); ) that returns another function and this returned
// function allows us to dispatch multiple actions which in turn allows us to handle
// asynchronous activity inside of an action ( i.e. fetchCollectionsStartAsync(); ) instead
// of handling asynchronous activity inside of a component like we were doing before

// so if we have multiple components that need this shop data they can just fire the action
// ( i.e. fetchCollectionsStartAsync(); ) and this makes things easier for us and Yihua thanked
// us for watching the entire video because thunks is a very important topic and this pattern
// is incredibly common and this start, success and failure pattern is everywhere in the react
// redux web development world

// in the next lesson we are going to tackle a new pattern using HOCs

// End of -- Mark 7 --



*/ // COMMENT OUT LECTURE 201 TIMESTAMP







// lecture 201: useEffect In Our App
// remember we commented out the above code and we are starting anew

// (1) import in useEffect and we will replace " componentDidMount() {} " below with our
// useEffect hook
import React, { useEffect } from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionPageContainer from '../collection/collection.container';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

// (2) change this " class ShopPage extends React.Component { " to this
// " const ShopPage = ( { fetchCollectionsStartAsync, match } ) => { "
const ShopPage = ( { fetchCollectionsStartAsync, match } ) => {

    // (3) replace this:
    /*
    componentDidMount() {

        const { fetchCollectionsStartAsync } = this.props;

        fetchCollectionsStartAsync();

    }
    */

    // with this:
    useEffect( () => {

        fetchCollectionsStartAsync();

        // remember one of the big caveats with the useEffect hook is how it fires and when we
        // want it to fire bacause if were not careful the useEffect hook might cause some
        // side effects that we don't want

        // let's talk about renders cycles in our componnet and we know that our shop page will
        // only re render if (1) our props change or (2) we call this.setState(); or use the
        // useState hook inside our component and an example of this from a prior lecture
        // is when we used " setCredentails " in the SignIn component or:
        /*
        setCredentials(
            {
                ...userCredentials,
                [ name ] : value 
            } 
        );
        */

        // so we updated the " userCredentials " and this would trigger a component re render
        // or (3) the parent of this component or our ShopPage component ( i.e. the parent of this
        // component is our App.js file ) calls its own re render then this component will re
        // render as well and the only time that will happen is if currentUser updates in the
        // App component so what could happen here assuming we do not pass in an array below
        // is that if were on our shop page then we know when the component mounts it will fire
        // off the " fetchCollectionsStartAsync(); " function and after our ShopPage component
        // mounts our App.js file will see that our auth state has changed or is now equal to null
        // and therefore the App component will connect to the firestore database and get the
        // current user information and the current user information update will cause the
        // App component to re render or the setCurrentUser action creator inside
        // componentDidMount() will update the currentUser state in the user reducer which will
        // cause the App component to re render and this will trigger a re render in our ShopPage
        // component or will cause our useEffect hook to run again which will cause
        // " fetchCollectionsStartAsync(); " to fire again and remember the ShopPage component
        // is a route in the App component return(); call and that is why a re render in the
        // App component causes a re render in the ShopPage component
        // and therefore " fetchCollectionsStartAsync(); " will fire twice and if we go
        // to our shop page and refresh the browser we will see that we call
        // " fetchCollectionsStartAsync(); " twice or we will see that we called
        // " action FETCH_COLLECTIONS_START @ 13:47:59.347 " twice and we called
        // " action FETCH_COLLECTIONS_SUCCESS @ 13:50:01.771 " twice

        // remember that the useEffect hook will fire whenever re render is called

        // the way to solve the double firing of " fetchCollectionsStartAsync(); " is to add
        // " fetchCollectionsStartAsync " to the array below so that useEffect will only
        // fire when " fetchCollectionsStartAsync " changes and remember
        // " fetchCollectionsStartAsync " will only change when the ShopPage component
        // mounts so in this case " fetchCollectionsStartAsync(); " will only fire one time

        // typically we could pass in an empty array and that would accomplish the same thing
        // but we will get a warning in the console ( i.e. " React Hook useEffect has a missing
        // dependency: 'fetchCollectionsStartAsync'. " ) so to avoid this warning we pass in
        // " fetchCollectionsStartAsync "

        // now when I check the shop page or " localhost:3000/shop/hats " we see that
        // " action FETCH_COLLECTIONS_START @ 13:47:59.347 " and 
        // " action FETCH_COLLECTIONS_SUCCESS @ 13:50:01.771 " are called only one time and
        // there is no warning

        // Yihua said in our case we want to use the useEffect hook like componentDidMount
        // and Yihua said all in all it was pretty easy to switch over our application to using
        // the useState and useEffect hooks and in the next lesson we will learn how to use
        // the useEffect hook to mimick our componentWillUnmount lifecycle method
    }, [ fetchCollectionsStartAsync ] );

    // (5) take out the render method or " render() {} " and comment out
    // " const { match } = this.props; " since we included match above in our functional
    // component argument
    // const { match } = this.props;
    return (

        <div className="shop-page">

            <Route
                path={ `${ match.path }` }
                exact={ true }
                component={ CollectionsOverviewContainer }
            />
            <Route
                path={ `${ match.path }/:collectionId` }
                component={ CollectionPageContainer }
            />

        </div>

    );

}


const mapDispatchToProps = ( dispatch ) => (
    {
        fetchCollectionsStartAsync : () => dispatch( fetchCollectionsStartAsync() )
    }
);


export default connect( null, mapDispatchToProps )( ShopPage );


