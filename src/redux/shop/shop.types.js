

// -- Mark 1 --
// lecture 174: Redux Thunk
// before we had a simple update collections action call because we were handling all the
// asynchronous activity in our shop page component instead what we are going to do is set
// multiple states that our shop action creators can use if needed so let's change this:
/*
export const ShopActionTypes = {
    UPDATE_COLLECTIONS : 'UPDATE_COLLECTIONS'
};
*/

// to:
/*
export const ShopActionTypes = {
    FETCH_COLLECTIONS_START   : 'FETCH_COLLECTIONS_START',
    FETCH_COLLECTIONS_SUCCESS : 'FETCH_COLLECTIONS_SUCCESS',
    FETCH_COLLECTIONS_FAILURE : 'FETCH_COLLECTIONS_FAILURE'
};
*/

// ShopActionTypes.FETCH_COLLECTIONS_START tells redux that we are starting to fetch the data and
// ShopActionTypes.FETCH_COLLECTIONS_SUCCESS is where we get a confimation on a successful API
// request and hopefully the data we need and then we will have a
// ShopActionTypes.FETCH_COLLECTIONS_FAILURE is what happens if our server is down or we don't
// have the proper credentials, etc., etc. and we want to be able to handle the API call failure
// in its own action as well and now let's go to shop.redcuer.js to update the reducer 
export const ShopActionTypes = {
    FETCH_COLLECTIONS_START   : 'FETCH_COLLECTIONS_START',
    FETCH_COLLECTIONS_SUCCESS : 'FETCH_COLLECTIONS_SUCCESS',
    FETCH_COLLECTIONS_FAILURE : 'FETCH_COLLECTIONS_FAILURE'
};
// End of -- Mark 1 --

// now go to our shop.sctions.js file