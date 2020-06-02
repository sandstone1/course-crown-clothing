
import { ShopActionTypes } from './shop.types';

// let's make a new action and we will send this to the shop reducer at the appropriate time
export const updateCollections = ( collectionsMap ) => (
    {
        type    : ShopActionTypes.UPDATE_COLLECTIONS,
        payload : collectionsMap
    }
);

// now let's update our shop reducer so go to the shop.reducer.js file