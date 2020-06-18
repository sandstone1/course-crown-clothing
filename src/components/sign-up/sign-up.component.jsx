
/*
import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import auth and createUserProfileDocument from firebase because we are authenticating and
// creating new users
import { auth, createUserProfileDocument  } from '../../firebase/firebase.utils';

// we need to create a class based component because just like the sign in component we
// need to store what the user is typng into the form input
class SignUp extends React.Component {

    // state will represent the form field categories
    state = {
        displayName     : '',
        email           : '',
        password        : '',
        confirmPassword : ''
    }

    // handleSubmit will be an async function 
    handleSubmit = async ( e ) => {
        // we add e.preventDefault since we want full control over the form submission
        e.preventDefault();

        // let's destructure our state object
        const { displayName, email, password, confirmPassword } = this.state;

        // let's do some validation and first check to see if password is not strictly equal to
        // confirmPassword; in other words, they don't match so show an alert
        if ( password !== confirmPassword ) {

            alert( "Password does not match confirm password. Please try again." );

            // if password does not equal confirm password then we want to return from this
            // function and not do anything else until the user corrects the password issue
            return;

        }

        // now we will do a try catch block
        try {
            // inside our try block we are going to use a new auth method that comes
            // with our auth library and we will destructure the user or get the user
            // off the return of the await auth.createUserWithEmailAndPassword( email, password )
            // and what this does is creates a new user account with the specified
            // email address and password and on the successful creation of the user account,
            // the user will be signed into the application and the creation of the user account
            // can fail if the account already exists or the password is not valid

            // now when we call " await auth.createUserWithEmailAndPassword( email, password ); "
            // the return value or the value we get back is a userAuth object or more specifically
            // we will get back an object called " user " and user will contain various key value
            // pairs and one of the keys is called " user " and this key or property looks exactly
            // like our userAuth object and that's why user.user can be the first argument in the
            // createUserProfileDocument() function below and it works perfectly fine or in other
            // words it works just like having userAuth as the first argument

            // we will pass the arguments: " email " and " password " to the
            // createUserWithEmailAndPassword function and email and password come from
            // destructuring our state object above
            const user = await auth.createUserWithEmailAndPassword( email, password );

            // once we get " user " back we want to run the createUserProfileDocument()
            // method and we want to pass in the following arguments: " user.user " and the
            // " displayName " object and in this case displayName is the key and the key
            // has a corresponding value
            await createUserProfileDocument( user.user, { displayName } );

            // now if " createUserProfileDocument( user, { displayName } ); " succeeds then
            // we are going to want to update our state so let's change
            // " createUserProfileDocument( user, { displayName } ); " to
            // " await createUserProfileDocument( user, { displayName } ); " so we are going
            // to await for this " createUserProfileDocument( user, { displayName } ); " to
            // finish running and when it does then we will run this.setState(); and we
            // want to set state equal to our initial state object and we do this because
            // after submitting the form we want to clear the form
            this.setState(
                {
                    displayName     : '',
                    email           : '',
                    password        : '',
                    confirmPassword : ''
                }
            );

        } catch ( error ) {
            // if there is an error, we want to console log the error and a commentor from
            // stackoverflow explains the difference between console.log() and console.error():
            // " console.error() writes to stderr, whereas console.log() writes to stdout as
            // described in the doc. The presumption is that console.error() may contain more
            // serious information that you might want to look at separately "

            // so we want to throw an error if we can't fetch
            // " auth.createUserWithEmailAndPassword( email, password ); "
            // or we can't create the user profile document with
            //" createUserProfileDocument( user, { displayName } ); "
            console.error( error );

        }

    }

    // now, let's write our handleChange method and this method will be identical to our
    // sign in handleChange method
    handleChange = ( e ) => {
 
        this.setState( { [ e.target.name ] : e.target.value } );

    }

    render() {

        return (
            
            // our sign up form will be very similar to our sign in form
            <div className="sign-up">

                <h2 className="sign-up--title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up--form" onSubmit={ this.handleSubmit } >

                    <FormInput
                        name="displayName"
                        type="text"
                        label="Display Name"
                        value={ this.state.displayName }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        value={ this.state.email }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        value={ this.state.password }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={ this.state.confirmPassword }
                        handleChange={ this.handleChange }
                        required
                    />

                    <div className="sign-up--button">
                        <CustomButton
                            type="submit"
                        >
                            SIGN UP
                        </CustomButton>
                    </div>

                </form>                
                
            </div>

        );

    }

}

export default SignUp;

// now go to our sign-in page or sign-in-and-sign-up.component.jsx and
// render out our SignIn component on that page





// *********
// and let's comment out all this code and start anew at the bottom of this file
// *********



import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import auth and createUserProfileDocument from firebase because we are authenticating and
// creating new users
import { auth, createUserProfileDocument  } from '../../firebase/firebase.utils';

// we need to create a class based component because just like the sign in component we
// need to store what the user is typng into the form input
class SignUp extends React.Component {

    // state will represent the form field categories
    state = {
        displayName     : '',
        email           : '',
        password        : '',
        confirmPassword : ''
    }

    // handleSubmit will be an async function 
    handleSubmit = async ( e ) => {
        // we add e.preventDefault since we want full control over the form submission
        e.preventDefault();

        // let's destructure our state object
        const { displayName, email, password, confirmPassword } = this.state;

        // let's do some validation and first check to see if password is not strictly equal to
        // confirmPassword; in other words, they don't match so show an alert
        if ( password !== confirmPassword ) {

            alert( "Password does not match confirm password. Please try again." );

            // if password does not equal confirm password then we want to return from this
            // function and not do anything else until the user corrects the password issue
            return;

        }

        // now we will do a try catch block
        try {
            // inside our try block we are going to use a new auth method that comes
            // with our auth library and we will destructure the user or get the user
            // off the return of the await auth.createUserWithEmailAndPassword( email, password )
            // and what this does is creates a new user account with the specified
            // email address and password and on the successful creation of the user account,
            // the user will be signed into the application and the creation of the user account
            // can fail if the account already exists or the password is not valid

            // now when we call " await auth.createUserWithEmailAndPassword( email, password ); "
            // the return value or the value we get back is a userAuth object or more specifically
            // we will get back an object called " user " and user will contain various key value
            // pairs and one of the keys is called " user " and this key or property looks exactly
            // like our userAuth object and that's why user.user can be the first argument in the
            // createUserProfileDocument() function below and it works perfectly fine or in other
            // words it works just like having userAuth as the first argument

            // we will pass the arguments: " email " and " password " to the
            // createUserWithEmailAndPassword function and email and password come from
            // destructuring our state object above
            const user = await auth.createUserWithEmailAndPassword( email, password );

            // once we get " user " back we want to run the createUserProfileDocument()
            // method and we want to pass in the following arguments: " user.user " and the
            // " displayName " object and in this case displayName is the key and the key
            // has a corresponding value
            await createUserProfileDocument( user.user, { displayName } );

            // now if " createUserProfileDocument( user, { displayName } ); " succeeds then
            // we are going to want to update our state so let's change
            // " createUserProfileDocument( user, { displayName } ); " to
            // " await createUserProfileDocument( user, { displayName } ); " so we are going
            // to await for this " createUserProfileDocument( user, { displayName } ); " to
            // finish running and when it does then we will run this.setState(); and we
            // want to set state equal to our initial state object and we do this because
            // after submitting the form we want to clear the form
            this.setState(
                {
                    displayName     : '',
                    email           : '',
                    password        : '',
                    confirmPassword : ''
                }
            );

        } catch ( error ) {
            // if there is an error, we want to console log the error and a commentor from
            // stackoverflow explains the difference between console.log() and console.error():
            // " console.error() writes to stderr, whereas console.log() writes to stdout as
            // described in the doc. The presumption is that console.error() may contain more
            // serious information that you might want to look at separately "

            // so we want to throw an error if we can't fetch
            // " auth.createUserWithEmailAndPassword( email, password ); "
            // or we can't create the user profile document with
            //" createUserProfileDocument( user, { displayName } ); "
            console.error( error );

        }

    }

    // now, let's write our handleChange method and this method will be identical to our
    // sign in handleChange method
    handleChange = ( e ) => {
 
        this.setState( { [ e.target.name ] : e.target.value } );

    }

    render() {

        return (
            
            // our sign up form will be very similar to our sign in form
            <div className="sign-up">

                <h2 className="sign-up--title">I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className="sign-up--form" onSubmit={ this.handleSubmit } >

                    <FormInput
                        name="displayName"
                        type="text"
                        label="Display Name"
                        value={ this.state.displayName }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        value={ this.state.email }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        value={ this.state.password }
                        handleChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={ this.state.confirmPassword }
                        handleChange={ this.handleChange }
                        required
                    />

                    <div className="sign-up--button">
                        <CustomButton
                            type="submit"
                        >
                            SIGN UP
                        </CustomButton>
                    </div>

                </form>                
                
            </div>

        );

    }

}

export default SignUp;

// now go to our sign-in page or sign-in-and-sign-up.component.jsx and
// render out our SignIn component on that page
*/




// *********
// and let's comment out all this code and start anew at the bottom of this file
// *********


// lecture 200: Converting Class Components with useState
// remember we commented out the above code and we are starting anew

// (1) first import in " useState "
import React, { useState } from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument  } from '../../firebase/firebase.utils';

// (2) change " class SignUp extends React.Component { " to this " const SignUp = () => { "
const SignUp = () => {

    // (3) comment out our state object below and use the useState hook instead
    /*
    state = {
        displayName     : '',
        email           : '',
        password        : '',
        confirmPassword : ''
    }
    */

    // (4) set up our useState hook
    const [ userCredentials, setCredentials ] = useState(
        {
            displayName     : '',
            email           : '',
            password        : '',
            confirmPassword : ''
        }
    );

    // remember " userCredentials " equals the following:
    /*
    userCredentials = {
        displayName     : '',
        email           : '',
        password        : '',
        confirmPassword : ''
    };
    */

    // (5) destructure displayName, email, password and comfirmPassword and then pass these
    // variables to their respective form input elements below and remember we are replacing
    // this " const { displayName, email, password, confirmPassword } = this.state; " with
    // this:
    const { displayName, email, password, confirmPassword } = userCredentials;

    // (6) add const to handleSubmit since these former class methods need to be updated to
    // functions inside a functional component
    const handleSubmit = async ( e ) => {

        e.preventDefault();

        // const { displayName, email, password, confirmPassword } = this.state;

        if ( password !== confirmPassword ) {

            alert( "Password does not match confirm password. Please try again." );

            return;

        }

        try {

            const user = await auth.createUserWithEmailAndPassword( email, password );

            await createUserProfileDocument( user.user, { displayName } );

        } catch ( error ) {

            console.error( error );

        }

    }

    // (7) add const to handleChange since these former class methods need to be updated to
    // functions inside a functional component
    const handleChange = ( event ) => {
 
        // (8) replace this " this.setState( { [ e.target.name ] : e.target.value } ); " with this:
        setCredentials(
            {
                ...userCredentials,
                [ event.target.name ] : event.target.value              
            }
        );

        // and here we are updating userCredentials with the changing key value pairs and this is
        // similar to how we updated state in our reducers or:
        /*
        return {
            ...state,
            show : !state.show
        };
        */

        // this.setState( { [ e.target.name ] : e.target.value } );

    }

    // (90) remove the render() method or " render() {} "
    return (

        // (10) change " onSubmit={ this.handleSubmit } " to " onSubmit={ handleSubmit } " and
        // change " value={ this.state.displayName } " to " value={ displayName } " and
        // change " handleChange={ this.handleChange } " to " handleChange={ handleChange } " and
        // change " value={ this.state.email } " to " value={ email } " and
        // change " handleChange={ this.handleChange } " to " handleChange={ handleChange } " and
        // change " value={ this.state.password } " to " value={ password } " and
        // change " handleChange={ this.handleChange } " to " handleChange={ handleChange } "
        // change " value={ this.state.confirmPassword } " to " value={ password } " and
        // change " handleChange={ this.handleChange } " to " handleChange={ handleChange } "

        // I signed up with " mark@gmail.com " and password " 12341234 " and it worked fine for
        // the most part and I checked the firestore database I see that I added a new item to the
        // " users " collection ( i.e. " Mark " or " mark@gmail.com " ) but I do have an error in
        // the console so let's see how Yihua coverts the SignUp component from a class based
        // component to a functional component that uses the " useState " hook to manage interanl
        // state within the component

        // Yihua made the same updates as I made and I added a new user and this time I did not
        // get an error so our application is working as expected
        <div className="sign-up">

            <h2 className="sign-up--title">I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className="sign-up--form" onSubmit={ handleSubmit } >

                <FormInput
                    name="displayName"
                    type="text"
                    label="Display Name"
                    value={ displayName }
                    handleChange={ handleChange }
                    required
                />
                <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    value={ email }
                    handleChange={ handleChange }
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    label="Password"
                    value={ password }
                    handleChange={ handleChange }
                    required
                />
                <FormInput
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={ confirmPassword }
                    handleChange={ handleChange }
                    required
                />

                <div className="sign-up--button">
                    <CustomButton
                        type="submit"
                    >
                        SIGN UP
                    </CustomButton>
                </div>

            </form>                
            
        </div>

    );

}

export default SignUp;



