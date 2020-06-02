
// I built this page by memory and nothing really new here and go back to shop.component.jsx
// and modify that component to be a simple presentational component
import React from 'react';
// import './collections-overview.styles.scss';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';


import { CollectionsOverviewContainer } from './collections-overview.styles';


const CollectionsOverview = ( { collections } ) => (

    <CollectionsOverviewContainer>
    {
        collections.map( ( { id, title, items } ) => (
            <CollectionPreview
                key   ={ id }
                title ={ title }
                items ={ items }
            />
        ))
    }
    </CollectionsOverviewContainer>

);


// -- Mark 1 --
// lecture 139: Data Flow In Our App
// we will notice that our " selectStructuredSelector " no longer works and the reason is that
// we've modified SHOP_DATA to be an object and that is affecting the collections array or
// " collections " inside our shop.reducer.js file and whereas " selectCollections " still
// thinks it is an array and to fix this let's create a new selector that can convert our object
// into an array so go shop.reducer.js and create a new selector and now we are back from the
// shop.reducer.js file and let's change
// " import { selectShopCollections } from '../../redux/shop/shop.selectors'; " to
// " import { selectCollectionForPreview } from '../../redux/shop/shop.selectors'; " and let's
// change " collections : selectShopCollections " to " collections : selectCollectionForPreview "
// in mapStateToProps below and now if we go to our app we see that it still works great

// now that we have a solid fundamental understanding of react and redux we will start talking
// more about tradeoffs and how to evaluate what we will build and this will help take us from
// being a beginning react developer to an intermediate or senior react developer

// now let's commit our code

// Rogers-iMac:crown_clothing Home$ git status
// Rogers-iMac:crown_clothing Home$ git add .
// Rogers-iMac:crown_clothing Home$ git commit -m " updated our directory reducer and shop data
// file and then created respective selectors and updated corresponding components "
// Rogers-iMac:crown_clothing Home$ git push origin master

// now if I go to my " crown-clothing " project in GutHub, I see the changes were uploaded
// sucessfully

const mapStateToProps = createStructuredSelector(

    {
        collections : selectCollectionForPreview
    }

);
// End of -- Mark 1 -


export default connect( mapStateToProps )( CollectionsOverview );
