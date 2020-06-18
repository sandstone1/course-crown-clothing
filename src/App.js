
// *********
// and let's comment out all this code and start anew at the bottom of this file
// *********

/* // COMMENT OUT LECTURE 201 TIMESTAMP



import React from 'react';
import './App.css';

// -- Mark 1 --
// lecture 57: E-commerce Homepage + SASS Setup

// -- Mark 2 --
// lecture 61: Homepage and Directory Components
import HomePage from './pages/homepage/homepage.component';
// End of -- Mark 2 --

// -- Mark 3 --
// lecture 65: Routing in Our Project

// -- Mark 13 --
// lecture 105: User Redirect and User Action Type
// we will need the Redirect component from react-router-dom
import { Route, Switch, Redirect } from 'react-router-dom';
// End of -- Mark 13 --


// -- Mark 4 --
// lecture 69: Shop Page
import ShopPage from './pages/shop/shop.component';

// -- Mark 5 --
// lecture 71: Header Component
import Header from './components/header/header.component';
// End of -- Mark 5 --

// -- Mark 6 --
// lecture 74: Sign In Component
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// End of -- Mark 6 --

// -- Mark 14 --
// lecture 121: Checkout Page
import CheckoutPage from './pages/checkout/checkout.component';
// End of -- Mark 14 --


// -- Mark 7 --
// lecture 83: Google Sign In Authentication 2
// we import in the named export " auth " since we want to store the state of our user in App.js
// and we want to do this no matter what service they use, whether that be sign in with your
// Google account or sign in with your email and password and we want to be able to pass the state
// of our user into the components that need it or we want to access our current user object
// throughout our application so convert our App below to a class component


// -- Mark 9 --
// lecture 89: Storing User Data in Firebase
// let's import our named export called createUserProfileDocument from firebase.utils.js
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// End of -- Mark 7 & 9 --



// -- Mark 12 --
// lecture 104: mapDispatchToProps
// first, we need to import in connect and we will use the connect function below
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
// End of -- Mark 12 --



// -- Mark 15 --
// lecture 162: Moving Our Shop Data to Firebase
// we are going to add our SHOP_DATA to our backend one time and we will do it
// programmatically so we don't have to write it by hand and after we add the relevant
// code inside our App component we will remove it since we only want to add our SHOP_DATA
// to our backend one time

// we also had to import in the selectCurrentUser selector and the 
// createStructuredSelector from reselect so that our mapStateToProps works with our
// selectCollectionForPreview selector and now let's go into the App component and call the
// addCollectionAndDocuments function
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
// import { selectCollectionForPreview } from './redux/shop/shop.selectors';
// import { addCollectionAndDocuments } from './firebase/firebase.utils';
// End of -- Mark 15 --



// -- Mark 4 -- continued
// comment out HatsPage
/*
// make am example component that represents another page outside of our HomePage component
const HatsPage = () => (
    <div>
        <h1>Hats Page</h1>
    </div>
);
// End of -- Mark 3 --
*/
// End of -- Mark 4 --


// include our <HomePage /> component below and then we need to go to the terminal and type
// " npm start " to start the project and after we press enter we will be automatically taken
// to localhost:3000, which includes our component App.js
// End of -- Mark 1 --

// -- Mark 7 -- continued
// lecture 83: Google Sign In Authentication 2
// convert " function App() { } " to " class App extends React.Component { } "
// End of -- Mark 7 --



/* // COMMENT OUT LECTURE 201 TIMESTAMP


class App extends React.Component {
    
    // -- Mark 7 -- continued
    // lecture 83: Google Sign In Authentication 2
    // put return() inside render() {}

    // add in state
    state = {
        currentUser : null
    };

    // see notes below
    // here we are setting a property called unsubscribeFromAuth on our class component or
    // on " App " and setting the property eqaul to null
    unsubscribeFromAuth = null;

    // to understand what Firebase auth gives us we have to understand the concept of subscription
    // and before if we wanted to fetch data from the backend we would use the componentDidMount()
    // method but doing it this way is only good for a one off situation but we don't want to
    // remount our app, we just always want to know when the authentication state of a user has
    // changed so we want to know whenever a user signs in or signs out so let's use " auth " or
    // the auth library and call the onAuthStateChanged method on auth and we will do this inside
    // the componentDidMount method
    componentDidMount() {
        // inside onAuthStateChanged we will call a function and the argument will be a " user "
        // and we will update state based on the user argument, which is an object

        // " this.unsubscribeFromAuth " will equal a function and when we call this function we
        // will close the subscription that we created below and we close the subscription
        // in componentWillUnmount below


        // -- Mark 10 --
        // lecture 91: Storing User Data In Our App
        // so below we are calling the " createUserProfileDocument() " function that we just
        // made
        
        // remember, in the last video we stored the user data in our database but now
        // we have to store that data in the " state " of our application so we can use it
        // in our app

        // let's modify our code so we understand what is actually happening

        // first let's change
        // " this.unsubscribeFromAuth = auth.onAuthStateChanged( async ( user ) => { " to
        // " this.unsubscribeFromAuth = auth.onAuthStateChanged( async ( userAuth ) => { "
        // because now we know what were getting back is a userAuth

        // remember we first need to comment out " createUserProfileDocument( user ); " and
        // " console.log( user ); " below

        this.unsubscribeFromAuth = auth.onAuthStateChanged( async ( userAuth ) => {

            // what we are saying below is that if the userAuth object is not null or meaning it
            // does exist then we want to run the code inside the if statement below and
            // if the user is signed out then userAuth will be " null " or false so the if
            // statement below will not run in this situation and this is what we want because
            // we don't want to setState if the user has signed out
            if ( userAuth ) {

                // remember, what we get back from our createUserProfileDocument() function is
                // the userRef and remember if the firebase.utils.js file we returned userRef
                // or did " return userRef; " at the bottom of the
                // createUserProfileDocument() function and so it makes sense when we call the
                // createUserProfileDocument() function in App.js we will get back the userRef
                // object
                const userRef = await createUserProfileDocument( userAuth );

                // and we want the userRef object because we are going to check and see if our
                // database has updated at that reference location with any new data so were
                // kind of saying has the snapShot changed?

                // the moment the following code runs or the moment this code runs:
                // " userRef.onSnapShot() " we will get back is a snapshot object and this object
                // will represent the data that is currently stored in our database so this
                // code will give us a snapShot object and on this snapShot object we will be able
                // to get the data related to the user that we may have just created and stored
                // in our database ( i.e. we did this in the last lecture ) or the data related
                // to the user that is already stored in our Firestrore database

                // now let's talk about the snapShot object and Yihua is now reading from a
                // slide that is titled " DocumentSnapshot "

                // from slide bullet #1 - " we get a documentSnapshot object from our
                // documentReference object " and we do this by using the .get() method

                // from slide bullet #2 - " the documentSnapshot object allows us to check
                // if a document exists at this query using the .exists property which
                // returns a boolean "

                // from slide bullet #3 - the documentSnapshot object also allows us to " get
                // the actual properties on the object by calling the .data() method, which returns
                // a JSON object of the document " or this method will return a JSON object of
                // the document

                // and remember, we do not get any data until we use the data method on snapShot
                // and if we do " snapShot.data() " as shown below then we will get the following
                // data back ( see below ):
                // commented out based on changes below
                /*
                userRef.onSnapshot( ( snapShot ) => {
                    console.log( snapShot.data() );
                } );
                */

                // remember our data will come back to us as an object and the object will
                // contain the key value pairs that we created in the last video and those
                // key value pairs are: " createdAt : ", " displayName : Roger Hall " and
                // " email: rogerhall123@gmail.com  " and below is the object returned by
                // " snapShot.data() ":
                /*
                createdAt: Timestamp {seconds: 1584064599, nanoseconds: 362000000}
                displayName: "Roger Hall"
                email: "rogerhall123@gmail.com"
                __proto__: Object
                */

                // if we just do:
                /*
                userRef.onSnapshot( ( snapShot ) => {
                    console.log( snapShot );
                } );
                */

                // then we will get the following data back in the console:
                /*
                DocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document: Document, _fromCache: true, _hasPendingWrites: false, …}
                id: "NLszUUbnVGfP0krGUBIKUgQxC5s1"
                ref: DocumentReference
                exists: true
                metadata: SnapshotMetadata
                _firestore: Firestore {_firebaseApp: FirebaseAppImpl, _queue: AsyncQueue, INTERNAL: {…}, _databaseId: DatabaseId, _persistenceKey: "[DEFAULT]", …}
                _key: DocumentKey {path: ResourcePath}
                _document: Document {key: DocumentKey, version: SnapshotVersion, objectValue: ObjectValue, proto: {…}, converter: ƒ, …}
                _fromCache: true
                _hasPendingWrites: false
                _converter: undefined
                __proto__: Object
                */

                // so " snapShot.data() " is main thing we need to use but we see we do not have the
                // id when we ran " snapShot.data() " but as we saw above in the snapShot object we
                // had the id so let's do console.log( snapShot ) again:
                /*
                userRef.onSnapshot( ( snapshot ) => {
                    console.log( snapshot );
                } );
                */

                // so on the snapshot itself is the id of where we currently are in our userRef
                // as well as the id of our DocumentSnapshot and the DocumentSnapshot represents
                // the our snapshot data or:
                /*
                DocumentSnapshot {_firestore: Firestore, _key: DocumentKey, _document: Document,
                _fromCache: false, _hasPendingWrites: false, …}
                id: "NLszUUbnVGfP0krGUBIKUgQxC5s1"
                ref: DocumentReference
                exists: true
                metadata: SnapshotMetadata
                _firestore: Firestore {_firebaseApp: FirebaseAppImpl, _queue: AsyncQueue,
                INTERNAL: {…}, _databaseId: DatabaseId, _persistenceKey: "[DEFAULT]", …}
                _key: DocumentKey {path: ResourcePath}
                _document: Document {key: DocumentKey, version: SnapshotVersion, objectValue:
                undefined, proto: {…}, converter: ƒ, …}
                _fromCache: false
                _hasPendingWrites: false
                _converter: undefined
                __proto__: Object
                */

                // so we have to call " snapShot.data() " in order to see what our data looks like
                // or:
                /*
                createdAt: Timestamp {seconds: 1584064599, nanoseconds: 362000000}
                displayName: "Roger Hall"
                email: "rogerhall123@gmail.com"
                __proto__: Object
                */
                
                // and we created these key value pairs in the last lecture and stored them
                // in the database so " snapShot.data() " is the main thing we need to use but
                // we see we do not have the id but the snapShot object itself contained the
                // id of where we currently are in our userRef and this id was also the id of
                // our DocumentSnapshot object ( please see above )

                // so we need to use these 2 things combined: (1) the id of where we are currently
                // in our database and this location in the database is represented by our userRef
                // and (2) the data or key value pairs that are stored in our Firestore database
                // at this specific location or userRef

                // so we need to use these 2 things combined and then call setState() of our
                // current user or " currentUser " and we do this below

                // so change this:
                /*
                userRef.onSnapshot( ( snapShot ) => {
                    console.log( snapShot.data() );
                } );
                */

                // to this:
                // and what we are going to do is call setState below and pass in an object



                /* // COMMENT OUT LECTURE 201 TIMESTAMP



                userRef.onSnapshot( ( snapShot ) => {

                        // so below we are creating a new object that has all the properties and
                        // corresponding values that we want ( we get those key value pairs
                        // from snapShot.data() ) and the id that we want ( we get the id from
                        // snapShot.id )
                        
                        // -- Mark 12 -- continued
                        // lecture 104: mapDispatchToProps
                        // change this.setState() to this.props.setCurrentUser()
                        this.props.setCurrentUser(
                            {
                                id : snapShot.id,
                                ...snapShot.data()
                            }
                        );

                        // and this will result in dispatching an action object that looks like:
                        /*
                            {
                                type    : 'SET_CURRENT_USER',
                                payload :   {
                                                id : snapShot.id,
                                                ...snapShot.data()
                                            }
                            }
                        */

                        // now if we look in our console log we will see the following ( this comes
                        // from redux logger ):
                        /*
action SET_CURRENT_USER @ 18:28:26.218
redux-logger.js:388  prev state {user: {…}}user: {currentUser: null}
    __proto__: Object
redux-logger.js:392  action     {type: "SET_CURRENT_USER", payload: null}
    type:"SET_CURRENT_USER"payload: null
    __proto__: Object
redux-logger.js:401  next state {user: {…}}user: currentUser: null
    __proto__: Object__proto__: Object
                        */

                        // and these are the messages we are getting from redux logger and logger
                        // tells us the state of redux after any action is fired and " prev state "
                        // is the state before the action is fired and " action " is the action
                        // itself and " next state " is the state after the action is fired

                        // after I sign in with " Mike " the console.log looks like the following:
                        /*

action SET_CURRENT_USER @ 18:42:20.269

redux-logger.js:388  prev state {user: {…}}
                                    user: currentUser: null
                                        __proto__: Object
                                    __proto__: Object

redux-logger.js:392  action     {type: "SET_CURRENT_USER", payload: {…}}
                                    type: "SET_CURRENT_USER"
                                    payload:
                                        id: "AgKTz3u1GgXabXRJxBqd4l7qwxb2"
                                        createdAt: Timestamp {seconds: 1584846789, nanoseconds: 493000000}
                                        displayName: "Mike"
                                        email: "mike@gmail.com"
                                            __proto__: Object
                                        __proto__: Object

redux-logger.js:401   next state {user: {…}}
                                    user: 
                                        currentUser:
                                            id: "AgKTz3u1GgXabXRJxBqd4l7qwxb2"
                                            createdAt: Timestamp {seconds: 1584846789, nanoseconds: 493000000}
                                            displayName: "Mike"
                                            email: "mike@gmail.com"
                                            __proto__: Object
                                        __proto__: Object
                                    __proto__: Object

                        */

                        // and " action " will give us our object that we are storing in our database
                        // and in " next state " we will see that our reducer is up to date with our
                        // new modified database object and we see that our Header component is
                        // working properly
                        
                        // so once we sign in we see " Sign Out " in our
                        // header so we brought our state into our components but now there is a
                        // seperation of concerns so our App component is updating our user
                        // reducer by dispatching a setCurrentUser action with the snapShot
                        // information as shown above and tehn our user reducer
                        // is updating our root reducer which is then updating our Header component
                        // with the current state object

                        // if we sign out then we will see " payload : null " in " action " and
                        // " currentUser : null " in " next state "

                        // now we are going to do this pattern many times because practice makes
                        // perfect and this pattern will be incredibly useful to us in the
                        // following sections as we build our application

                        // now let's commit our code and move on

                        // so let's do:
                        // Rogers-iMac:crown_clothing Home$ git status
                        // Rogers-iMac:crown_clothing Home$ git add .
                        // Rogers-iMac:crown_clothing Home$ git commit -m " added redux and
                        // implemented userReducer and userActions to our Header and App
                        // components "
                        // Rogers-iMac:crown_clothing Home$ git push origin master

                        // now if I go to my " crown-clothing " project in GutHub, I see the
                        // changes were uploaded sucessfully

                        // End of -- Mark 12 --


                        // lecture 93: Sign Up with Email and Password
                        // -- Mark 11 --
                        // now let's see if we are saving the correct user profile when we fill
                        // out the sign up form and to test this out let's do
                        // " console.log( this.state ); " so that whenever the state changes
                        // we can see the changes in the console so let's open up the console and
                        // see what happens when we fill out the sign up form



                        /* // COMMENT OUT LECTURE 201 TIMESTAMP




                        console.log( this.state );

                        // however, before we fill out the sign up form we see the following
                        // in the console or we see the currentUser object:
                        /*
                        {currentUser: {…}}
                        currentUser:
                            id: "NLszUUbnVGfP0krGUBIKUgQxC5s1"
                            createdAt: Timestamp {seconds: 1584840986, nanoseconds: 546000000}
                            displayName: "Roger Hall"
                            email: "rogerhall123@gmail.com"
                            __proto__: Object
                        __proto__: Object
                        */

                        // and our currentUser as represented above is set because we are
                        // signed in so let's sign out and after we sign out and look in
                        // the console we see " null " from line 602 which line is
                        // " console.log( userAuth ); "

                        // so now let's sign up and create a new account and see if it works
                        // so Yihua used:
                        // Display Name : Mike
                        // Email : mike@gmail.com
                        // Password : 1234
                        // Confirm Password : 12345

                        // but first let's make sure we get an alert when our passwords don't
                        // match ( see above ) and after we press the Sign Up button we see
                        // our alert: " Password does not match confirm password. Please try
                        // again. "

                        // however, before we try this again we need to enable the email and
                        // password section inside firebase so go to our project in firebase
                        // and then click on the authentication tab and then click on the
                        // " Sign-in method " heading tab and then click on the
                        // " Email/Password " line item and then enable Email/Password and
                        // then click the Save button and now we will have:
                        // Provider                 Status
                        // Email/Password           Enabled

                        // remember we could enable the " Email link " ( the second option )
                        // which provides email address verification but we don't want to do
                        // that here

                        // so let's fill out the sign up form with the following information:
                        // Display Name : Mike
                        // Email : mike@gmail.com
                        // Password : 12341234
                        // Confirm Password : 12341234

                        // and it worked and the result in the console is:
                        /*
                        {currentUser: {…}}
                            currentUser:
                                id: "AgKTz3u1GgXabXRJxBqd4l7qwxb2"
                                createdAt: Timestamp {seconds: 1584846789, nanoseconds: 493000000}
                                displayName: "Mike"
                                email: "mike@gmail.com"
                                __proto__: Object
                            __proto__: Object
                        */


// now under the authenication tab in firebase, I see:
// Identifier               Providers       Created         Signed In       User UID	 
// mike@gmail.com           mail icon       Mar 21, 2020    Mar 21, 2020    AgKTz3u1GgXabXRJxBqd4l7qwxb2
// rogerhall123@gmail.com   Google icon     Dec 26, 2019    Mar 15, 2020    NLszUUbnVGfP0krGUBIKUgQxC5s1


// now under the database tab in firebase, I see:
// + Start collection       + Add document                  + Start collection
//                                                          + Add field
// users                    3BbNWJnDQ6KuXrz3B34I
//                          AgKTz3u1GgXabXRJxBqd4l7qwxb2    createdAt : March 21, 2020 at 9:13:09 PM UTC-6
//                                                          displayName : "Mike"
//                                                          email : " mike@gmail.com "
//                          NLszUUbnVGfP0krGUBIKUgQxC5s1



                        // now Yihua recommends we delete the first user or the one we created
                        // manually and just keep the user that was created with sign in with
                        // Google and the one we just created with email and password

                        // so now our datebase looks like:
// now under the database tab in firebase, I see:
// + Start collection       + Add document                  + Start collection
//                                                          + Add field
//
// users                    AgKTz3u1GgXabXRJxBqd4l7qwxb2    createdAt : March 21, 2020 at 9:13:09 PM UTC-6
//                                                          displayName : "Mike"
//                                                          email : " mike@gmail.com "
//
//                          NLszUUbnVGfP0krGUBIKUgQxC5s1    createdAt : March 21, 2020 at 7:47:36 PM UTC-6
//                                                          displayName : "Roger Hall"
//                                                          email : "rogerhall123@gmail.com"


                        // now, let's commit our code before we implement sign in with email
                        // and password

                        // so let's do:
                        // Rogers-iMac:crown_clothing Home$ git status
                        // Rogers-iMac:crown_clothing Home$ git add .
                        // Rogers-iMac:crown_clothing Home$ git commit -m " implemented firebase
                        // utils and included the ability to store authenticated users into
                        // our firestore database "
                        // Rogers-iMac:crown_clothing Home$ git push origin master

                        // now if I go to my " crown-clothing " project in GutHub, I see the
                        // changes were uploaded sucessfully

                        // End of -- Mark 11 --



                        /* // COMMENT OUT LECTURE 201 TIMESTAMP



                    }
                );

                // so just to make we are getting everything, let's do:
                // console.log( this.state ); above

                // now switching topics => above we are checking to make sure our userAuth exist
                // ( i.e. if ( userAuth ) {} ) before running the code above but we also want
                // to make sure that our app knows or is aware if the userAuth is " null ",
                // meaning the user has signed out so if the useAuth object comes back and it
                // is null then we want to run the following else statement:
                
                // remember, in the else statement we want to make sure the we set currentUser
                // equal to " null "
            }

            else {

                // inside the else statement we want to call this.setState again and this time
                // we want to set currentUser equal to " null " and remember if the currentUser
                // is equal to null then the user must have signed out and we also know that
                // if we're inside this else {} block then userAuth must be null

                // -- Mark 12 -- continued
                // lecture 104: mapDispatchToProps
                // change this.setState( { currentUser : userAuth } ); to 
                // this.props.setCurrentUser( userAuth );
                this.props.setCurrentUser( userAuth );

                // and this will result in dispatching an action object that looks like:
                /*
                    {
                        type    : 'SET_CURRENT_USER',
                        payload : userAuth or null
                    }
                */

                // End of -- Mark 12 --



                /* // COMMENT OUT LECTURE 201 TIMESTAMP



            }

            // so what will happen is that if a user signs in we will first check to see if
            // the if statement above ( i.e. if ( userAuth ) {} ) runs, which means there is
            // a user that has signed in or userAuth is true and then we will get back a
            // userRef object from calling the createUserProfileDocument method and remember
            // the userAuth object is passed into the createUserProfileDocument()
            // function or " const userRef = await createUserProfileDocument( userAuth ); "

            // so if there is a document then when the createUserProfileDocument method runs
            // we will simply get back the userRef but if there is no document then we will
            // create a new object and / or document in the specified location and we created
            // this new object in the firebase.utils.js file ( remember we created the try
            // catch block below in the last lecture inside the createUserProfileDocument()
            // method in the firebase.utils.js file ):
            /*
            try {
                // so let's await our userRef object and call .set() or the create method or the
                // " c " in the crud acronym and we will create an object with the following
                // properties: displayName, email, createdAt ( implicit in this is the
                // corresponding values ) and we will spread in any additional data that we may
                // need and remember additionalData will be an object
                await userRef.set(
                    {
                        displayName,
                        email,
                        createdAt,
                        ...additionalData
                    }
                );
    
            } catch( error ) {
                // and if we have any issues in the try block above we will console.log
                // " error creating user " and log out an error message as well
                console.log( 'error creating user', error.message );
            }
            */

            // and remember after we run the createUserProfileDocument() method in the
            // firebase.utils.js file we get back the userRef ( remember the userRef is returned
            // to us at the bottom of the createUserProfileDocument() method )
            
            // now switching topics or coming back to the App.js file we see that we
            // will subscribe or listen to this userRef for any changes to the data and Yihua
            // refered to the code below when discussing subscriptions or listening for changes
            // in the data ( so if the userRef object detects a change in the snapShot object
            // then this.setState will be updated with the new data and when this.setState changes
            // then this update will flow to all of the components that rely on the state
            // of the " currentUser " or " this.state.currentUser ":
            /*
            userRef.onSnapshot( ( snapShot ) => {
                    this.setState(
                        {
                            currentUser : {
                                id : snapShot.id,
                                ...snapShot.data()
                            }
                        },
                    );
                }
            );
            */
            
            // but we will also get back the first state of the data or " snapShot " inside
            // " userRef.onSnapshot( ( snapShot ) => {} " above and then using snapShot we will
            // set the state of App.js with the snapShot.id and snapShot.data() and if the user
            // ever logs out then we will set " currentUser : null " or " currentUser :
            // userAuth " and we will do that above in the else statement or
            // " else { this.setState( { currentUser : userAuth } ); } "

            // so now that we have all this set up, let's see what happens but first our
            // console.log() can't go after setState since setState is asynchronous and may not
            // have finished running until later or after we execute console.log() above so we
            // need to move console.log above or " console.log( this.state ); " into setState
            // as a second parameter because this is the only way we can make sure that setState
            // is fully called so we have to pass an arrow function into setState() as a second
            // parameter and then inside the second function we will pass in
            // " console.log( this.state ); " so make these changes above and then look
            // at the results in the console

            // after making these changes and going to console I see that we are now setting
            // the state or updating the state of our current user or currentUser to the
            // following key value pairs:
            /*
            currentUser:
            id: "NLszUUbnVGfP0krGUBIKUgQxC5s1"
            createdAt: Timestamp {seconds: 1584221044, nanoseconds: 630000000}
            displayName: "Roger Hall"
            email: "rogerhall123@gmail.com"
            __proto__: Object
            __proto__: Object
            */

            // and the currentUser object above represents all the data that we got back from
            // our database plus the snapShot.id

            // Yihua said the more we practice with theese ref objects and snapshot objects the
            // more we'll understand the purpose of the ref objects and snapshot objects and this
            // is pretty much the core of how we use the Firestore library and it's actually
            // really simple once we understand and master these concepts we just covered

            // now we can comment out the second function to setState above or
            // " () => { console.log( this.state );  } " since we don't need it anymore and next
            // we will work on our signup, which deals more with our auth library

            // now that we have done this flow inside App.js, if we add sign up with email
            // and password this code will work the exact same way for sign up with email and
            // password because we have compartmentalized our database storage and set state
            // separately from our authentication and this will make more sense once we start
            // writing the sign up but Yihua recommends we rewatch these last few videos if we feel
            // confused about Firebase and Firebase is incredibly powerful but does have a bit
            // of a learning curve but it is very valuable because working with Firebase is way
            // easier than trying to spin up our own back end server and provide our own
            // authentication service so let's tackle sign up next

            // End of -- Mark 10 --


            // -- Mark 9 --
            // lecture 89: Storing User Data in Firebase
            // now let's use createUserProfileDocument whenever we get back an auth object but first
            // make the function below asynchronous since we will make an api request to the Firestore
            // database or change 
            // " ( user ) => { " to this
            // " async ( user ) => { " and change
            // " this.setState( { currentUser : user } ); " to this
            // " createUserProfileDocument( user ); "
            // so pass in our user auth object that we know we are getting back from our auth library
            // and if we were to save and then go back to our application and sign in we would see in
            // the console that we are getting back this DocumentReference object or:
            /*
            DocumentReference {_key: DocumentKey, firestore: Firestore, _converter: undefined,
            _firestoreClient: FirestoreClient}
            id: "128fdashadu"
            parent: CollectionReference
                id: "users"
                parent: (...)
                path: "users"
                _query: Query {path: ResourcePath, collectionGroup: null, explicitOrderBy: Array(0),
                filters: Array(0), limit: null, …}
                firestore: Firestore {_firebaseApp: FirebaseAppImpl, _queue: AsyncQueue, INTERNAL: {…},
                _databaseId: DatabaseId, _persistenceKey: "[DEFAULT]", …}
                _converter: undefined
                _path: ResourcePath {segments: Array(2), offset: 0, len: 1}
                __proto__: Query
            path: "users/128fdashadu"
            _key: DocumentKey {path: ResourcePath}
            firestore: Firestore {_firebaseApp: FirebaseAppImpl, _queue: AsyncQueue, INTERNAL: {…},
            _databaseId: DatabaseId, _persistenceKey: "[DEFAULT]", …}
            _converter: undefined
            _firestoreClient: FirestoreClient {platform: BrowserPlatform, databaseInfo: DatabaseInfo,
            credentials: FirebaseCredentialsProvider, asyncQueue: AsyncQueue, clientId:
            "EUAo3SycTIwpmYEzxHWf", …}
            __proto__: Object
            */

            // we also see that the id is the id we passed to firestore.doc() in the
            // firebase.utils.js file or we see " id: "128fdashadu" " and we see we get
            // back the same path we passed in to firestore.doc() in the firebase.utils.js file
            // or the " path: "users/128fdashadu" " so we know the location of this
            // DocumentReference and remember we get this object back even though it does not
            // exist inside our database and I went to the Firestore database did not see
            // this object in the database so why do we get this DocumentReference object back
            // in the console even though it does not exist in the database?
            // the reason for this is because we use this reference object or DocumentReference object
            // to tell Firestore whether to save data to this place in our database or to get data
            // from this location in the database

            // however, remember the queryReference object does not have the actual data
            // of the collection or document but instead it gives us properties that tell details
            // about it like the ID or the path of this specific query reference and we saw this
            // happen above in the " DocumentReference "

            // but what we are also able to see in this DocumentReference is that the parent is a
            // CollectionReference representing the collection that this document is in and here
            // we'll see we have " id : " users "" " and " path : " users " "

            // the difference between the DocumentReference and the CollectionReference is that we
            // will use the DocumentReference object to preform CRUD operations in our Firestore
            // database and CRUD stands for creating, retrieving, updating and deleting data in
            // a specific location in our Firestore database

            // so we use documentRef objects to preform our CRUD methods and the CRUD
            // methods are .set(), .get(), .update() and delete(), respectively

            // when we retrieve the data we are calling .get() and .get() is us pulling out
            // a snapshot object of that place in the database and the snapshot object was the
            // second type of object we discussed earlier in the firebase.utils.js file and this
            // is the second type of object that Firestore can give us back and we will be able
            // to use this snapshot object in order to determine whether or not there is any data
            // in the current reference in our Firestore database

            // again, remember the snapshot object is something we get back from calling .get()
            // or per Yihua's lecture slide " we get the snapshotObject from the referenceObject
            //  using the .get() method ( i.e. documentRef.get() or collectionRef.get() ) " and
            // collectionRef.get() gives us back a snapshot of the collection or
            // collectionRef returns a querySnapshot object and documentRef returns a
            // documentSnapshot object 

            // remember, we can also add documents to collections using the collectionRef
            // object and using the .add() method or collectionRef.add();

            // collectionRef.get(); gives us back a snapshot of the collection and we
            // won't use this much in this course but it is good know it exists and from
            // documentRef we will get a documentSnapshot object and let's take a look
            // at this

            // ==============================
            // GO TO SRC/FIREBASE/FIREBASE.UTILS.JS -- Mark 1
            // ==============================

            // ==============================
            // BACK FROM SRC/FIREBASE/FIREBASE.UTILS.JS -- Mark 1
            // ==============================

            // so now when we call " createUserProfileDocument( user ); " below, our app
            // initializes and we can see that we don't create a log inside the console
            // meaning we probably created something in our database and if we go to Firebase
            // and check the database we will see that there is the new user that we just created
            // in our firebase.utils.js file or the user with the id
            // of " NLszUUbnVGfP0krGUBIKUgQxC5s1 " and this user is now
            // being stored in our Firestore database and if we refresh our browser we see
            // that we still have this new user

            // right now our database looks like:

            // crown-clothing-25f2b         users                           3BbNWJnDQ6KuXrz3B34I

            // + Start collection           + Add document                  + Start collection

            // users >                      3BbNWJnDQ6KuXrz3B34I >          cartItems

            //                                                              + Add field

            //                                                              displayName: "Yihua"

            //                              NLszUUbnVGfP0krGUBIKUgQxC5s1 >  + Start collection

            //                                                              + Add field

            //                                                              createdAt: March 12, 2020
            //                                                              at 2:22:30 PM UTC-6

            //                                                              displayName: "Roger Hall"

            //                                                              email: "rogerhall123@gmail.com"


            // and remember we are not creating multiple copies of this new user since we are
            // checking in the firebase.utils.js file or checking to see if the snapShot
            // at the specified location already exist or not, in other words we call the following
            // if statement or " if( !snapShot.exist ) {} " and if the snapShot already
            // exist then we skip the part where we create a new user, which as we know happens
            // inside the if statement inside the firebase.utils.js file

            // so in summary we are checking to see whether the snapShot already exist and if not
            // then were making new users inside our database based off the userAuth object

            // now that we have these objects being stored in our database and also being pulled
            // into our application, let's figure out how we can store this data so we can use
            // it in our application

            
            // this.setState( { currentUser : user } );

            // createUserProfileDocument( user );

            // End of -- Mark 9 --

            

            // let's log out user to see what it looks like and now when we go back into our
            // application and go to the counsel, we will see our user object in the counsel
            // which looks like:
            // " Q {I: Array(0), l: "AIzaSyBOuD7LZ0xv_2LQmvmaZw7QL2o-WWaJa7o", m: "[DEFAULT]",
            // o: "crown-clothing-25f2b.firebaseapp.com", a: ni, …} "
            // and this user is the same user I signed in with last night and even though we
            // refreshed the page we get user authenticated session persistance with Firebase
            // and even if we close the window for localhost:3000/signin and type in the same
            // URL in a new window our user object will still persist and in the case below
            // we can see the user object in the console and Firebase will continue to send our
            // app the user authenticated object until the user signs out and this is a great
            // feature of Firebase because we are able to get persistence of our user session
            // without having to do any seperate set up

            // let's take another look at the user object in the console and the main keys we
            // want to look at are the " displayName " and " email " and Firebase gives us OAuth
            // right out of the gate and OAuth allows users to sign in with any third party
            // service that they might already have and by doing this we have reduced the
            // barrier of entry for allowing users to sign into our application since users
            // don't need to go through an arduous sign up process or remember their email
            // and password in order to sign into our app and OAuth is a very difficult and
            // tedious thing to set up from scratch but with Firebase we get access to OAuth
            // with just a couple configuration settings and this is why Firebase is such an
            // incredible platform

            // now, the next thing we have to do is understand why this is an open subscription
            // so the function we are currently in " auth.onAuthStateChanged( ( user ) => { } "
            // is an open messaging system between our application and Firebase and this means
            // that whenever any changes occur on Firebase from any source and those changes are
            // related to this application then Firebase will send out a message that the auth
            // state has changed and this auth state change could be the user signing in or the
            // user signing out and this connection is always open as long as our application
            // component is mounted on our DOM and remember that since this is an open
            // subscription we also need to close the subscription when the application component
            // unmounts in order to prevent memory leaks and to do that go to
            // " unsubscribeFromAuth = null " above and then go to componentWillUnmount below

            // after lecture 91, I changed " console.log( user ); " to " console.log( userAuth ); "
            // so that I could see the userAuth object in the console



            /* // COMMENT OUT LECTURE 201 TIMESTAMP




            console.log( userAuth );


            // -- Mark 15 -- continued
            // lecture 162: Moving Our Shop Data to Firebase
            // add our addCollectionAndDocument function below and the collectionKey is
            // " collections " and the objectsToAdd is the " collectionsArray " which is equal
            // to our SHOP_DATA object but remember we converted the SHOP_DATA object ( which
            // equals our state.shop.collections object ) into an array in the shop.selectors.js
            // file so the " this.props.collectionsArray " below is really the same as the
            // SHOP_DATA object but in an array form
            // End of -- Mark 15 --
            
            
            // -- Mark 16 --
            // lecture 163: Moving Our Shop Data to Firebase 2
            // instead of passing in the full array or " collectionsArray " ( remember there
            // are certain key value pairs in the full array that we do not want ) we will map
            // over the array and get the items we want which are " title " and " items " and
            // to get " title " and " items " we will destructure off of collection or " hats ",
            // for example, to get " title " and " items " and then we will return a new object
            // and this new object will contain the title property with its corresponding value
            // and items property with its corresponding value which is an array of objects
            // ( please refer to SHOP_DATA for details )

            // since we only wrote the code below so that we could programmatically add SHOP_DATA
            // to our database we now need to take it out or comment it out since we've successfully
            // added the data to our firestore database so we've accomplished our purpose

            // we also need to comment out
            // " import { addCollectionAndDocuments } from './firebase/firebase.utils'; " and
            // " import { selectCollectionForPreview } from './redux/shop/shop.selectors'; " above
            // and " collectionsArray : selectCollectionForPreview " from mapStateToProps below
            // but the good news is we have a function ( i.e. addCollectionAndDocuments ) that we
            // can use create new collections and documents whenever we want

            /*
            addCollectionAndDocuments( 'collections', this.props.collectionsArray.map( 
                ( { title, items } ) => (
                    {
                        title : title,
                        items : items
                    }
                ) )
            );
            */

            // now if we go to our firestore database, we will see that the SHOP_DATA has been
            // added according the parameters set forth above and it looks like the following:

            // crown-clothing-25f2b         collections                     JQUr46Foq20b6vUvGYp0

            // + Start collection           + Add document                  + Start collection

            //  collections >               JQUr46Foq20b6vUvGYp0            + Add field
            //  users                       PMw0lnFb7tWxUOe3bHEv
            //                              kRrrxVcKtSuXHtjWQz4Q
            //                              mCGGrwiX1TDVmaEXeNKG
            //                              uLXuVidFGd6C866dEhNy
            
            //                                                              items
            //                                                                  0
            //                                                                      id: 23
            //                                                                      imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png"
            //                                                                      name: Blue Tanktop"
            //                                                                      price: 25
            //                                                                  etc., etc., etc.

            //                                                              title: "Womens"


            // so now we need to pull our data from " collections " in our firestore database
            // into our application and then store this data inside a reducer
            
            // End of -- Mark 16 --


            // -- Mark 15 -- continued
            // lecture 162: Moving Our Shop Data to Firebase

            // now remember we console.logged out our collectionRef in our firebase.utils.js
            // file so if we go into our console we will now see our collectionRef:
            /*
            CollectionReference {_query: Query, firestore: Firestore, _converter: undefined,
            _path: ResourcePath}
                firestore: Firestore {_firebaseApp: FirebaseAppImpl, _queue: AsyncQueue, INTERNAL:
                {…}, _databaseId: DatabaseId, _persistenceKey: "[DEFAULT]", …}
                id: "collections"
                parent: null
                path: "collections"
                _converter: undefined
                _path: ResourcePath {segments: Array(1), offset: 0, len: 1}
                _query: Query {path: ResourcePath, collectionGroup: null, explicitOrderBy:
                Array(0), filters: Array(0), limit: null, …}
                __proto__: Query
            */

            // so we see our collectionRef in the console and we see that the id points to
            // " collections " but since we haven't instantiated any documents yet we will not
            // see the " collections " collection in our firestore database

            // and now that we have our collectionRef we need to add the " objectsToAdd "
            // into our " collections " collection in the firestore database and we'll do that
            // in the next video
            // End of -- Mark 15 --



            /* // COMMENT OUT LECTURE 201 TIMESTAMP




        }
        );

    }

    // this method will allow us to unsubscribe from OAuth when the application component
    // unmounts
    componentWillUnmount() {
        // and we ubsubscribe from the subscription or close the subscription by calling
        // this.unsubscribeFromAuth()
        this.unsubscribeFromAuth();
    }

    // in summary, the above is how we make our application aware of any auth changes on
    // Firebase and this will all make more sense as we use Firebase authentication
    // End of -- Mark 7 --

    render() {

        return (
            // -- Mark 3 -- continued
            // lecture 65: Routing in Our Project
            // our Route component takes 3 primary arguments: path, exact and component and replace
            // <HomePage /> below with <Route /> and component will be the component that we want the
            // Route to render and path will be a string that represents our url location and when we
            // are on the home page the path will just equal "/" or " localhost:3000 " or
            // " localhost:3000/ " which is the base url location for our app and exact is a true
            // or false property and " exact " is the same as " exact={ true } " and exact just means
            // that the path must match exactly otherwise react router will move on to the next Route
    
            // now wrap our Route component(s) inside our Switch component and will go through the
            // Routes one by one and the stop when it gets to a path match
    
            // -- Mark 4 --
            // lecture 69: Shop Page
            // change " <Route path="/hats" component={ HatsPage } /> " to " <Route path="/shop"
            // component={ ShopPage } /> " and now when we navigate to our shop page or
            // " localhost:3000/shop " we should see what is currently inside the render() {} or
            // " SHOP PAGE " and this is exactly what I see so our app is working correctly and next
            // we need to build the preview collection component and let's add a folder inside the
            // components folder called " collection-preview " and inside that folder let's add
            // a file called " collection-preview.component.jsx " and a file called
            // " collection-preview.styles.sass " and go to the file: collection-preview.component.jsx
    
            // -- Mark 5 --
            // lecture 71: Header Component
            // place the Header component outside the Switch and Route components and by doing this
            // the Header component will be rendered on every page, which is what we want and we can
            // do the same thing for pop ups, overlays and footers and being able to place
            // components outside our Switch component makes our app very intuitive and if we go to
            // our application, we can see the header and the header is unstyled right now
    
            // -- Mark 6 --
            // lecture 74: Sign In Component
            // add in a route for the Sign In and Sign Up page

            // -- Mark 8 --
            // lecture 85: Google Sign In Authentication 3
            // first we need to make sure that our header is aware of when the user is signed in
            // and when the user is signed out and we do that by passing the app currentUser
            // state to the <Header /> component below and we pass currentUser in as a prop
            // and this.state.currentUser could be (1) null or could be (2) a user object
            // and now go to our <Header /> component

            // -- Mark 9 --
            // lecture 103: connect() and mapStateToProps
            // change " <Header currentUser={ this.state.currentUser } /> " to " <Header />  "
            // and if we go to our Header component on our site we will see that we are no longer
            // signed in because as of now currentUser is " null " and remember we will use
            // connect and mapStateToProps anywhere we need state from our root reducer and we
            // will use this pattern extensively in future components


            // -- Mark 13 -- continued
            // lecture 105: User Redirect and User Action Type
            // change " <Route path="/signin" component={ SignInAndSignUpPage } /> " to
            /*
                <Route  path="/signin"
                        exact={ true }
                        render={ () =>
                           this.props.currentUser ? (
                               <Redirect to="/" />
                           ) : (
                               <SignInAndSignUpPage />
                           )
                        }
                />
            */
            // so now we get redirected to the home page after we sign in or if we type in the
            // following url " localhost/3000/signin " we will see the sign in and sign up page
            // for an instant and then we get automatically redirected to the home page

            // now that our redirect is set up we need to modify our user action
            // ==============================
            // GO TO SRC/REDUX/USER/USER.TYPES.JS
            // ==============================


            // -- Mark 14 -- continued
            // lecture 121: Checkout Page
            // add the checkout route below



            /* // COMMENT OUT LECTURE 201 TIMESTAMP




            <div>
                <Header />
                <Switch>
                    <Route  
                        path="/"
                        exact={ true }
                        component={ HomePage }
                    />
                    <Route  
                        path="/shop"
                        component={ ShopPage }
                    />
                    <Route
                        path="/checkout"
                        exact={ true }
                        component={ CheckoutPage }
                    />
                    <Route  
                        path="/signin"
                        exact={ true }
                        render=
                        { 
                            () =>
                                this.props.currentUser ? (
                                    <Redirect to="/" />
                                ) : (
                                    <SignInAndSignUpPage />
                                )
                        }
                    />

                </Switch>
            </div>
            // End of -- Mark 3, Mark 4, Mark 5, Mark 6, Mark 7, Mark 8, Mark 9, Mark 13 and
            // Mark 14 --
        );
    }
}



// -- Mark 13 -- continued
// lecture 105: User Redirect and User Action Type
// we are going to need the currentUser from redux so we need to use mapStateToProps below in
// order to get the currentUser value and
// we are going to destructure our " user " off of " state " and remember " user " equals
// " user : userReducer " or the userReducer inside the root-reducer.js file so instead of
// writing ( state.user ) we will write ( { user } ) and we have to write it this way because
// we can't write ( state.user ) since this results in an error

// change " connect( null, mapDispatchToProps ) " to
// " connect( mapStateToProps, mapDispatchToProps ) " below

// now we have access to this.props.currentUser and now go the routes above

// -- Mark 15 -- continued
// lecture 162: Moving Our Shop Data to Firebase
// we'll need the collectionsArray and we can get that by using the selectCollectionForPreview
// selector and we'll need to change mapStateToProps from
/*
const mapStateToProps = ( { user } ) => (
    {
        currentUser : user.currentUser
    }
);
*/

// to this:



/* // COMMENT OUT LECTURE 201 TIMESTAMP




const mapStateToProps = createStructuredSelector(
    {
        currentUser : selectCurrentUser
    }
);
// End of -- Mark 15 --


// -- Mark 12 -- continued
// lecture 104: mapDispatchToProps
// were going to connect our App component to the outcome of our first connect call using
// null as the first argument since we don't need mapStateToProps in App.js but we do need
// the second argumnent, which is mapDispatchToProps and let's create the mapDispatchToProps
// function below

// the mapDispatchToProps functions takes the dispatch property as an argument and then we will
// return an object and let's import in setCurrentUser above and in our object below we will set 
// our property equal to setCurrentUser and setCurrentUser will be equal to a function that takes
// the user object as an argument and then calls the dispatch function and the argument to our
// dispatch function is our setCurrentUser action object and we will pass that action object
// to every reducer

// now we can eliminate our state object above or " state = { currentUser : null }; " and then
// we will replace our setState code or 

/*
this.setState(
    {
        currentUser : {
            id : snapShot.id,
            ...snapShot.data()
        }
    }
);
*/

// with our setCurrentUser action code so replace the above this.setState() code with

/*
this.props.setCurrentUser(
    {
        id : snapShot.id,
        ...snapShot.data()
    }
);
*/

// so we are still passing in our snapShot object but now we are setting the currentUser
// value equal to the above object



/* // COMMENT OUT LECTURE 201 TIMESTAMP



const mapDispatchToProps = ( dispatch ) => ( 
    {
        setCurrentUser : ( user ) => dispatch( setCurrentUser( user ) )
    } 
);



export default connect( mapStateToProps, mapDispatchToProps )( App );
// End of -- Mark 12 and 13 --



*/  // COMMENT OUT LECTURE 201 TIMESTAMP













// lecture 201: useEffect In Our App
// remember we commented out the above code and we are starting anew

// (1) first let's import in our useEffect hook and we will replace " componentDidMount() {} "
// below with our useEffect hook
import React, { useEffect } from 'react';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

// (2) change this " class App extends React.Component { " to this " const App = () => { "
// and add " currentUser " and " setCurrentUser " into the argument below
const App = ( { currentUser, setCurrentUser }  ) => {

    // (3) replace " componentDidMount() { " with " useEffect( () => { " and we only want to
    // fire the useEffect hook when ???
    useEffect( () => {

        auth.onAuthStateChanged( async ( userAuth ) => {

            if ( userAuth ) {

                const userRef = await createUserProfileDocument( userAuth );

                userRef.onSnapshot( ( snapShot ) => {

                    // (4) change " this.props.setCurrentUser( " to " setCurrentUser( "
                    setCurrentUser(
                        {
                            id : snapShot.id,
                            ...snapShot.data()
                        }
                    );

                } );

            }

            else {

                // (5) change " this.props.setCurrentUser( userAuth ); " to
                // " setCurrentUser( userAuth ); "
                setCurrentUser( userAuth );

            }

        } );

    // (6) useEffect will fire every time setCurrentUser changes and what this means is that
    // useEffect will fire on the same frequency as componentDidMount()
    }, [ setCurrentUser ] );


    // (7) take out the render method or " render() {} "
    return (

        // (8) replace " this.props.currentUser " below with " currentUser " and now let's
        // go to our shop component and update that component with the useEffect hook
        <div>
            <Header />
            <Switch>
                <Route  
                    path="/"
                    exact={ true }
                    component={ HomePage }
                />
                <Route  
                    path="/shop"
                    component={ ShopPage }
                />
                <Route
                    path="/checkout"
                    exact={ true }
                    component={ CheckoutPage }
                />
                <Route  
                    path="/signin"
                    exact={ true }
                    render=
                    { 
                        () =>
                            currentUser ? (
                                <Redirect to="/" />
                            ) : (
                                <SignInAndSignUpPage />
                            )
                    }
                />

            </Switch>
        </div>

    );

}


const mapStateToProps = createStructuredSelector(
    {
        currentUser : selectCurrentUser
    }
);


const mapDispatchToProps = ( dispatch ) => ( 
    {
        setCurrentUser : ( user ) => dispatch( setCurrentUser( user ) )
    } 
);


export default connect( mapStateToProps, mapDispatchToProps )( App );


