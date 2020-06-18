
// this container will be a component that gets wrapped in all the HOCs that it needs in order
// to run properly so instead of wrapping mapStateToProps around our ShopPage component in
// order to pass the isFetchingCollections value into our CollectionsOverviewWithSpinner
// component we will do 2 levels of wrapping inside this file

// so first let's import in the libraries that we need in order to wrap the pertinent code
// and we need connect so we can connect mapStateToProps to our component
import { connect } from 'react-redux';
// we need createStructuredSelector because we will write mapStateToProps
import { createStructuredSelector } from 'reselect';
// we need our selector
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
// we will need our WithSpinner HOC
import WithSpinner from '../with-spinner/with-spinner.component';
// and then we will need our actual CollectionsOverview component
import CollectionsOverview from './collections-overview.component';
// see notes below on compose and I decided to use the prior version so comment
// out the import below
// import { compose } from 'redux';


// now include the same mapStateToProps construct that we had in our shop page component
// but the only difference is we need to set the property to " isLoading " instead of
// " isFetchingCollections " since we need the property to match the property that the WithSpinner
// component is expecting
const mapStateToProps = createStructuredSelector(
    {
        isLoading : selectIsCollectionFetching
    }
);

// now let's create a new component that we will export out called " CollectionsOverviewContainer "
// and we know that we want to wrap our CollectionsOverview component in our WithSpinner component
// so we write " ( WithSpinner( CollectionsOverview ) ) " and remember functions are evaluated
// from the inside out so what will happen is that the WithSpinner component will wrap around
// the CollectionsOverview component and then this component will get passed into the connect
// function and then our WithSpinner HOC will get access to the " isLoading " property which it
// will use to determine what to render on the page

// Yihua said the below seems a little hard to read or:
// " const CollectionsOverviewContainer = connect( mapStateToProps )( WithSpinner( CollectionsOverview ) ); "
// so let's leverage something called " compose " and first import it above and what compose
// is essentially doing is letting us curry all of our functions together so instead of writing
// this: " connect( mapStateToProps )( WithSpinner( CollectionsOverview ) ); " we can write this:
/*
const CollectionsOverviewContainer = compose(
    connect( mapStateToProps ),
    WithSpinner
)( CollectionsOverview );
*/

// and remember compose evaluates from right to left so first compose will evaluate
// WithSpinner( CollectionsOverview ) and then compose will pass that to the connect function
// and Yihua said the below is easier to reason about but I like the prior version better
// so I'm going to use that version instead
/*
const CollectionsOverviewContainer = compose(
    connect( mapStateToProps ),
    WithSpinner
)( CollectionsOverview );
*/

const CollectionsOverviewContainer = connect( mapStateToProps )( WithSpinner( CollectionsOverview ) );

// now let's export " CollectionsOverviewContainer " and then let's import this into our
// shop page component and now let's go to the shop.component.jsx file
export default CollectionsOverviewContainer;

