
import React from 'react';

import {
    SpinnerOverlay,
    SpinnerContainer
} from './with-spinner.styles';


// WithSpinner is a HOC and as with any HOC, WithSpinner will return a new function component
// and WithSpinner will wrap a component or what we are calling the " WrappedComponent " and
// then the WithSpinner HOC will return a new functional component and this new functional
// component will take 2 arguments: " isLoading " and " ...otherProps " and " ...otherProps "
// represents all the properties and corresponding values that our regular component
// ( i.e. the component that is being wrapped ) has access to and this new functional component
// will either render our spinner or our wrapped component dependind on whether or not the
// " isLoading " property is true or false and if " isLoading " is true then our WithSpinner
// HOC will render our spinner but if " isLoading " is false then our WithSpinner HOC
// will render our WrappedComponent and we will
// pass to the wrapped component " ...otherProps " or " <WrappedComponent { ...otherProps } /> "
// and this is how we pass props to WrappedComponents

// Yihua said to review, what we are doing is creating a WithSpinner HOC and the WithSpinner
// HOC is a function that wraps around some component and gives this component access to the
// spinner
// functionality and our WrapperComponent gets passed into the new functional component that is
// created by the WithSpinner HOC and then we use the " isLoading " property to either render
// our spinner or our WrappedComponent and if we render our WrappedComponent then it will be
// rendered as a normal component and have all the props that it would normally have since we 
// passed in " { ..otherprops } "

// and if we want to make this more explicit then change this:
/*
const WithSpinner = ( WrappedComponent ) => ( { isLoading, ...otherProps } ) => {

    return isLoading ? (

        <SpinnerOverlay>

            <SpinnerContainer />

        </SpinnerOverlay>

    ) : (

        <WrappedComponent { ...otherProps } />

    )

}
*/

// to this:

// so this way we know that what we are getting back from this HOC or the WithSpinner HOC
// is the Spinner component and the Spinner component will either render the spinner or
// our normal component and remember the normal componnet has been wrapped by the WithSpinner
// HOC

// on thing we have to consider is where do we use the WithSpinner component and we might
// think the place to use the WithSpinner component is the CollectionPage component since
// this is where we are getting the error but the place where we want to use the WithSpinner
// component is actually the ShopPage component because the ShopPage component is the one
// that makes the call to update our reducer ( by firing the action creator
// " updateCollections " or " updateCollections( collectionsMap ); " ) after getting the data
// back from our back end so this component will know whether or not these 2 processes have
// finished and if not we will use our spinner as a placeholder until we have finished
// processing the data so we'll include our WithSpinner HOC in our ShopPage component
const WithSpinner = ( WrappedComponent ) => {
    
    const Spinner = ( { isLoading, ...otherProps } ) => {

        return isLoading ? (

            <SpinnerOverlay>

                <SpinnerContainer />

            </SpinnerOverlay>

        ) : (

            <WrappedComponent { ...otherProps } />

        )

    }

    return Spinner;

}


export default WithSpinner;

