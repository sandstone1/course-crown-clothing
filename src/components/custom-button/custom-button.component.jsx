
import React from 'react';
// import './custom-button.styles.scss';

// what is props.children?
// answer: "Here’s an example of a stateless function that is used to create a component.
// Again, since this is a stateless function, there is no 'this' keyword so just use
// props.children

/*
const Picture = (props) => {
    return (
      <div>
        <img src={props.src}/>
        {props.children}
      </div>
    )
}
*/

// This component contains an <img> that is receiving some props and then it is displaying
// {props.children}.  Whenever this component is invoked {props.children} will also be
// displayed and this is just a reference to what is between the opening and closing tags
// of the component.

// in App.js:
/*
render () {
  return (
    <div className='container'>
      <Picture key={picture.id} src={picture.src}>
          //what is placed here is passed as props.children  
      </Picture>
    </div>
  )
}
*/

// remember, the destructured values are coming from the SignIn component since that is
// where we're using our CustomButton component

// let's destructure props.children or { children } and { children } will display whatever is
// in between the opening and closing tags of the component or the CustomButton component or
// <CustomButton type="submit">Sign in</CustomButton> in our case and therefore { children }
// will display " Sign in " in this example

// we will also destructure all the other properties inside <CustomButton> in the SignIn
// component and therefore " type="submit" " will be available to use in the button element
// below since we destrutured all the other properties through the use of ...otherProps
// or { ...otherProps } in the arrow function below

// -- Mark 1 --
// lecture 85: Google Sign In Authentication 3
// we are going to conditionally render a class name in <button> below based off a prop
// in the arguments to CustomButton and that argument will be " isGoogleSignIn " and then
// in the button element we will conditionally render a class depending on whether or not
// isGoogleSignIn true or false and if isGoogleSignIn is true then we will render the class
// " google-sign-in " otherwise we will render an empty string and remember we always render
// the class " custom-button " and remember since we are using `` we have to take the ""
// off custom button in order for the custom-button class to be a valid class and now let's
// go to the custom button stylesheet or custom-button.styles.scss and 
// remember that the destructured isGoogleSignIn prop comes from the SignIn component
// End of -- Mark 1 --


// -- Mark 2 --
// lecture 109: Add to Cart Styling
// we are going to need to invert a color based on a property and this is similar to how
// we added a new background color to the button when the button contained a class name
// of " google-sign-in " in addition to the class name " custom-button " and to do this we
// will add a new argument below called " inverted " and conditionally add a new class name
// called " inverted " and this class name will be in addition to the class name of
// " custom-button " ( see below )


// -- Mark 3 --
// lecture 156: styled-components in Our App 3
// let's use styled-components to do the following:
/*
className=
{
    `${ inverted       ? 'inverted'       : '' }
     ${ isGoogleSignIn ? 'google-sign-in' : '' }
     custom-button`
}
*/

// so first let's create a new file called custom-button.styles.jsx and let's go to that
// file and now we are back from custom-button.styles.jsx and let's import in the
// CustomButtonContainer component and make sure we comment out
// " import './custom-button.styles.scss'; " above
import { CustomButtonContainer } from './custom-button.styles';
// End of -- Mark 3 --


const CustomButton = ( { children, ...props } ) => (
    // remember, clicking on a button element and / or  an input element will trigger the
    // onSubmit property that is located inside our form element ( which is inside the SignIn
    // component ) as long as both the button and input elements have their type attribute set
    // equal to " submit " or " type = "submit" "

    // -- Mark 3 -- continued
    // lecture 156: styled-components in Our App 3   
    // and then change <button></button> below to <CustomButtonContainer></CustomButtonContainer>
    // and then change
    // " const CustomButton = ( { isGoogleSignIn, inverted, children, ...otherProps } ) => ( " to
    // " const CustomButton = ( { children, ...props } ) => ( "
    // and then change
    /*
      className=
      {
          `${ inverted       ? 'inverted'       : '' }
            ${ isGoogleSignIn ? 'google-sign-in' : '' }
            custom-button`
      }
      { ...otherProps }
    */
    // to:
    // {  ...props }
    // and by spreading in the " props " ( i.e. isGoogleSignIn, inverted, custom-button or other
    // props ) we will render one of the following css style blocks: " googleSignInStyles ",
    // " invertedButtonStyles " or " buttonStyle " inside the CustomButtonContainer component or
    // in other words we are adding the relevant styles to the CustomButtonContainer styles
    // and this happens because the " props " are passed down to the getButtonStyles function and
    // the getButtonStyles function is defined in the custom-button.styles.jsx file and then
    // included the CustomButtonContainer component and the getButtonStyles function uses the
    // " props " that are passed to the CustomButtonContainer component in this file ( see below )
    // to conditional render one of three different css blocks: " googleSignInStyles ",
    // " invertedButtonStyles " or " buttonStyle "

    // so instead of contionally rendering different classes as we did before we are now rendering
    // css blocks which pattern seems to make more sense

    // now if we go to our app we see our buttons are not working extirely as expected

    // Yihua recommends we convert the entire app over to styled components and if we run into
    // any problems Yihua has included a link with the app coverted over to styled-components

    <CustomButtonContainer { ...props }>
        { children }
    </CustomButtonContainer>
);
// End of -- Mark 2 and Mark 3 --


export default CustomButton;

// go to the SignIn component to import our CustomButton component