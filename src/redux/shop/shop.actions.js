
import { ShopActionTypes } from './shop.types';


// -- Mark 1 --
// lecture 174: Redux Thunk
// see below for notes on this import
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// Yihua said that thunks are action creators that return a function so were going to write a
// function that returns a function and inside the returned function we will have one or more
// dispatch calls and whenever dispatch is called it will fire multiple actions 

// so let's change this:
/*
export const updateCollections = ( collectionsMap ) => (
    {
        type    : ShopActionTypes.UPDATE_COLLECTIONS,
        payload : collectionsMap
    }
);
*/


// to this:
export const fetchCollectionsStart = () => (
    {
        type : ShopActionTypes.FETCH_COLLECTIONS_START
    }
);

// and fetchCollectionsStart will switch " isFetching : false " to " isFetching : true " and
// see shop.reducer.js for details


// and this ( note 1 ):
export const fetchCollectionsSuccess = ( collectionsMap ) => (
    {
        type    : ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload : collectionsMap
    }
);


// and this ( note 2 ):
export const fetchCollectionsFailure = ( errorMessage ) => (
    {
        type    : ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload : errorMessage
    }
);


// and this:
export const fetchCollectionsStartAsync = () => {

    // and fetchCollectionsStartAsync will return a function ( with dispatch as the argument )
    // and we will copy the code that was in componentDidMount in the shop.component.js file
    // or we can copy the code that reflects the promised based approach
    // ( see lecture 173: Promise Pattern for details ) and this is what Yihua did and then we
    // paste this code inside " return ( dispatch ) => { } function; " below and then let's
    // comment out or remove " const { updateCollections } = this.props; " and
    // " updateCollections( collectionsMap ); " and " this.setState( { loading : false  } ); "
    // since we don't really need these anymore and now let's import in all the dependencies we
    // had in our shop page component or the shop.component.jsx file or:
    // " import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'; "
    return ( dispatch ) => {

        const collectionRef = firestore.collection( 'collections' );

        // once we get our collectionRef we will dispatch " fetchCollectionsStart() " and this will
        // switch " isFetching : false " to " isFetching : true "
        dispatch( fetchCollectionsStart() );

        // then we will began our asynchronous request
        collectionRef.get().then( ( snapshot ) => {

            const collectionsMap = convertCollectionsSnapshotToMap( snapshot );

            // now let's add " fetchCollectionsSuccess " above ( see note 1 above ) or:
            /*
            export const fetchCollectionsSuccess = ( collectionsMap ) => (
                {
                    type    : ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
                    payload : collectionsMap
                }
            );
            */

            // and were back from note 1 above and now that we have our collectionsMap, let's
            // dispatch " fetchCollectionsSuccess( collectionsMap ); "
            dispatch( fetchCollectionsSuccess( collectionsMap ) );

            // so once we get " colectionsMap " or once our asynchronous code resolves we will
            // dispatch " fetchCollectionsSuccess( collectionsMap ) " because we were successful
            // in fetching the requested data or fetching our " collections " collection and the
            // dispatch call will update our reducer ( and thereby update our state ) and remember
            // to add .catch() below just in case we get an error when making the asynchronous
            // request and inside .catch() we will dispatch
            // " fetchCollectionsFailure( error.message ) " but first we have to create the
            // " fetchCollectionsFailure " action creator above ( see note 2 )
        } ).catch( ( error ) => dispatch( fetchCollectionsFailure( error.message ) ) );

    }

}

// and now we have our asynchronous action creator or " fetchCollectionsStartAsync() " and we can
// write our code in this manner because we installed the redux thunk library and thunk is just
// a function that returns a function and the returned function gets access to dispatch and we
// can dispatch multiple actions and handle asynchronous code inside the asynchronous action
// creator

// remember we moved our isLoading state into the shop reducer from the shop.component.jsx file
// and now let's go to the shop.component.jsx file and make some updates

// End of -- Mark 1 --

