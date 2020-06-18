

// so first let's import in the libraries that we need in order to wrap the pertinent code
// and we need connect so we can connect mapStateToProps to our component
import { connect } from 'react-redux';
// we need createStructuredSelector because we will write mapStateToProps
import { createStructuredSelector } from 'reselect';
// we need our selector
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
// we will need our WithSpinner HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';
// and then we will need our actual CollectionPage component
import CollectionPage from './collection.component';
// see notes below on compose and I decided to use the prior version so comment
// out the import below
// import { compose } from 'redux';


// now include the same mapStateToProps construct that we had in our shop page component
// but the only difference is we need to set the property to " isLoading " instead of
// " isCollectionsLoaded " since we need the property to match the property that the WithSpinner
// component is expecting

// and remember " isLoading " needs the selector's inverted boolean value and we can get
// that by making " isLoading " equal to an arrow function where the argument is " state "
// and then the return value is the inverted value of the selector or
// " !selectIsCollectionsLoaded( state ) " and this works 

// however, remember this does not work " isLoading : !selectIsCollectionsLoaded " but instead
// throws an error

// in the lecture, there was message on the screen that said: " Notice how containers don't
// render anything. They just pass props down to components. "

// and now our shop page is much more manageable and it's only function now is to make an
// asynchronous request to fetch data or " fetchCollectionsStartAsync() " and then passing
// our 2 container components into the 2 routes on the shop page

// in the lecture, there was another message on the screen that said: " Although this results
// in more files it helps keep concerns separate to each specific component "

// Yihua said that when he first worked on his own react redux project for the first time in
// his professional career it was a daunting task of doing this pattern so many times for months
// before he was able to fully understand all of the moving parts of react and redux but this
// pattern of using react with redux is very common in the wild

// and remember we can use this container pattern anywhere we have the connect function that
// wraps around a component and an example of this is our CartDropdown component or the
// cart-dropdown.component.jsx file and we just need some practice using the container pattern
// since practice makes perfect and in the next section we are going to talk about another
// common library that's used to handle asynchronous actions in redux and it will be very
// similar to redux thunk except it will provide us with more flexibility
const mapStateToProps = createStructuredSelector(
    {
        isLoading : ( state ) => !selectIsCollectionsLoaded( state )
    }
);

// now let's create a new component that we will export out called " CollectionPageContainer "
// and we know that we want to wrap our CollectionPage component in our WithSpinner component
// so we write " ( WithSpinner( CollectionPage ) ) " and remember functions are evaluated
// from the inside out so what will happen is that the WithSpinner component will wrap around
// the CollectionPage component and then this component will get passed into the connect
// function and then our WithSpinner HOC will get access to the " isLoading " property which it
// will use to determine what to render on the page

const CollectionPageContainer = connect( mapStateToProps )( WithSpinner( CollectionPage ) );

// now let's export " CollectionPageContainer " and then let's import this into our
// shop page component and now let's go to the shop.component.jsx file
export default CollectionPageContainer;

