/*
import React from 'react';
import './sign-in.styles.scss';

// -- Mark 1 --
// lecture 74: Sign In Component
import FormInput from '../form-input/form-input.component';
// End of -- Mark 1 --

// -- Mark 2 --
// lecture 76: Custom Button Component
import CustomButton from '../custom-button/custom-button.component';
// End of -- Mark 2 --

// -- Mark 3 --
// lecture 81: Google Sign In Authentication
// import in the sign in with Google authentication functionality
// lecture 94: Sign In with Email and Password
// -- Mark 5 --
// import our auth library
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
// End of -- Mark 3 & 5 --


// we need to use a class component here since we need to store what the users
// are typing into the form fields
class SignIn extends React.Component {

    state = {
        email    : '',
        password : ''
    };

    handleSubmit = async ( e ) => {
        // we add e.preventDefault since we want full control over the form submission
        e.preventDefault();

        // lecture 94: Sign In with Email and Password
        // -- Mark 5 --
        // first, import our auth library above and then convert our handleSubmit method
        // to an async method and then let's destructure off our email and password from
        // our state object and then create a try catch block
        const { email, password } = this.state;

        try {

            // within our try block we will await and see if
            // " auth.signInWithEmailAndPassword( email, password ); " runs successfully
            await auth.signInWithEmailAndPassword( email, password );

            // and if " await auth.signInWithEmailAndPassword( email, password ); "
            // succeeds or executes successfully then we will clear our state
            this.setState( { email : '', password : '' } );

        } catch ( error ) {

            // if " auth.signInWithEmailAndPassword( email, password ); " fails to run
            // successfully then we will console.log the error
            console.log( error );

        }

        // now let's go to our sign in and sign up page and first we need to log out
        // and then let's try to sign in with the account we created in lecture 92 or
        // the user account with an email of " mike@gmail.com " and password of
        // " 12341234 " and now if we sign in with this account we see " SIGN IN "
        // change to " SIGN OUT " and if we check the console we see that our user
        // has been updated with the currentUser of:
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

        // and this is the correct currentUser since we signed in with the email and
        // password information for that particular user so we know everything is
        // synced up and properly working and remove " console.log( this.state ); " in
        // App.js since we won't need it anymore but I decided to keep it for now
        // so that I can continue to see that our app is working correctly

        // now let's commit our code since we have finished our sign in and sign up
        // component

        // so let's do:
        // Rogers-iMac:crown_clothing Home$ git status
        // Rogers-iMac:crown_clothing Home$ git add .
        // Rogers-iMac:crown_clothing Home$ git commit -m " Finished sign in handleSubmit method "
        // Rogers-iMac:crown_clothing Home$ git push origin master

        // now if I go to my " crown-clothing " project in GutHub, I see the
        // changes were uploaded sucessfully

        // End of -- Mark 5 --
/*
    }

    handleChange = ( e ) => {
        // we will use destructuring to pull a value and a name off our event target and
        // the value will correspond to " value={ this.state.email } " and 
        //" value={ this.state.password } " and the name will correspond to " name="email" "
        // and " name="password" "
        const { name, value } = e.target;

        // so if name = email and the value was " tex " then setState would
        // equal " email : tex " and we put [ ] around name because as anwsered in StackOverflow: 
        // " This will handle multiple elements of form as an array and no need to set each
        // individual element "

        // could have done this instead:
        // " this.setState( { [ e.target.name ] : e.target.value } ); "

        // [ name ] below is a dynamic key because the [ ] makes it a dynamic key, meaning the
        // key will interpolate different values based on the underlying code
        this.setState( { [ name ] : value } );
    }

    render() {
        // return a div that contains our entire sign-in component and the email
        // and password form input elements will be their own custom components and
        // remember to set an onChange event on the 2 input fields below


        // -- Mark 1 -- continued
        // lecture 74: Sign In Component
        // change " input " to " FormInput " and within the FormInput component change
        //" onChange={ this.handleChange } " to " handleChange={ this.handleChange } " and
        // add " label="email" " and " label="password " "
        // and remove " <label>Email</label> " and " <label>Password</label> " below
        // End of -- Mark 1 --

        // -- Mark 2 -- continued
        // lecture 76: Custom Button Component
        // replace the input element with our CustomButton component and remove
        // " value="Submit Form" " and in between <CustomButton></CustomButton>
        // add " Sign in " and this will be picked up in the CustomButton component since
        // we are using props.children or { children }

        // also, add in the class name " title " for our span element below so we can style
        // this element
        // End of -- Mark 2 --

        // -- Mark 3 --
        // lecture 81: Google Sign In Authentication
        // add in a new CustomButton element below the following CustomButton element:
        // " <CustomButton type="submit">Sign in</CustomButton> " and the new element will be as
        // follows:
        // " <CustomButton onClick={ signInWithGoogle }>{' '}Sign in with Google{' '}
        // </CustomButton> " and now when we click the " Sign in with Google " button on our
        // sign in page, a modal will pop up that allows us to sign in with our Google account
        // or more specially the modal will load a list of Google accounts that we have and
        // then we can click on or select one of our Google accounts and Firebase will handle
        // the authentication for us and just like that we have authentication with Google
        // tied into our application and next we will learn how to handle our new logged in
        // users
        // End of -- Mark 3 --

        // -- Mark 4 --
        // lecture 85: Google Sign In Authentication 3
        // now we want to add the isGoogleSignIn property to the second custom button element
        // and if we don't pass a value to the isGoogleSignIn property then the isGoogleSignIn
        // property will automatically get evaluated to true, which is what we want and now if
        // we look at our app we see we have our styling on the second custom button element
        // and now wrap our <CustomButton> components inside a div with a class name of 
        // " buttons "

        // and now go to our sign in component style sheet or sign-in.styles.scss and match
        // the styles closer to the final app styles
        // End of -- Mark 4 --
        return (
            <div className="sign-in">
                <h2 className="sign-in--title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form className="sign-in--form" onSubmit={ this.handleSubmit } >
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

                    <div className="sign-in--buttons">
                        <CustomButton
                            type="submit"
                        >
                            Sign in
                        </CustomButton>
                        <CustomButton
                            type="button"
                            onClick={ signInWithGoogle }
                            isGoogleSignIn
                        >
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );

    }

}

export default SignIn;

// now go to our sign-in page or sign-in-and-sign-up.component.jsx and
// render out our SignIn component on that page
*/




// *********
// and let's comment out all this code and start anew at the bottom of this file
// *********



// -- Mark 6 --
// lecture 200: Converting Class Components with useState
// remember we commented out the above code and we are starting anew
// let's switch this class based component to a functional component and replace the class based
// state object with a use state hook and first we need to import in useState from react
import React, { useState } from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

// change the class based component to a functional component so let's change
// " class SignIn extends React.Component { " to " const SignIn = () => { " and take out
// render() {} below
const SignIn = () => {

    // replace the state object below with a useState hook
    const [ userCredentials, setCredentials ] = useState( { email : '', password : '' } );

    /*
    state = {
        email    : '',
        password : ''
    };
    */

    // it appears that userCredentials are equal to:
    /*
    userCredentials = {
        email : '',
        password : ''
    };
    */

    // and if we do " console.log( userCredentials ); " we get a result of
    // { email: "", password: "" }

    // and if we do " console.log( setCredentials ); " then we get an error in the console

    // destructure email and password and then pass these variables to their respective form
    // input elements below and remember we are replacing this
    // " const { email, password } = this.props; " with this:
    const { email, password } = userCredentials;

    // add const to handleSubmit
    const handleSubmit = async ( e ) => {

        e.preventDefault();

        try {

            await auth.signInWithEmailAndPassword( email, password );

        } catch ( error ) {

            console.log( error );

        }

    }

    // add const to handleChange
    const handleChange = ( e ) => {

        const { name, value } = e.target;

        // replace " this.setState( { [ name ] : value } ); " with:
        setCredentials(
            {
                ...userCredentials,
                [ name ] : value 
            } 
        );
        // and here we are updating userCredentials with a key value pair and this is similar to
        // how we updated state in our reducers or:
        /*
        return {
            ...state,
            show : !state.show
        };
        */

        // and remember doing this will result in an error:
        // " setCredentials( { [ name ] : value } ); "

    }

    return (

        // change " onSubmit={ this.handleSubmit } " to " onSubmit={ handleSubmit } " and
        // change " value={ this.state.email } " to " value={ email } " and
        // change " handleChange={ this.handleChange } " to " handleChange={ handleChange } " and
        // change " value={ this.state.password } " to " value={ password } " and
        // change " handleChange={ this.handleChange } " to " handleChange={ handleChange } "

        // and I tried signing in with email and password and using Google Sign In and everything
        // works as expected
        <div className="sign-in">
            <h2 className="sign-in--title">I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form className="sign-in--form" onSubmit={ handleSubmit } >
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

                <div className="sign-in--buttons">
                    <CustomButton
                        type="submit"
                    >
                        Sign in
                    </CustomButton>
                    <CustomButton
                        type="button"
                        onClick={ signInWithGoogle }
                        isGoogleSignIn
                    >
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>

    );

}
// End of -- Mark 6 --

export default SignIn;


