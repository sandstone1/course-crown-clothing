
// import in the createStore function and the applyMiddleware function
import { createStore, applyMiddleware } from 'redux';


// -- Mark 1 --
// lecture 129: Redux Persist
// import persistStore from redux-persist and persistStore allows our browser to cache our
// store depending on certain configuration options that we will set in our root reducer and
// remember when we import in our rootReducer below or
// " import rootReducer from './root-reducer'; " we are really importing in " persistReducer "
// or " export default persistReducer( persistConfig, rootReducer ); " and persistReducer
// is essentially a modified version of our root reducer and this modified version has
// persistent capabilities
import { persistStore } from 'redux-persist';
// End of -- Mark 1 --


// remember that we need to apply middleware to our store so that whenever actions get
// fired or dispatched we can catch them and then display them and remember middleware is the
// piece in between our actions and our root reducer and remember middleware is really
// just a function that receives some action and does something to the action and then passes
// the result to the root reducer

// the redux logger library that we installed is just a piece of middleware and what it does is
// it catches the action and then console logs out the action for us and we need to import this
// functionality into the store and we do that by typing the following:
import logger from 'redux-logger';

// once we have imported in these required libraries then we import in our root reducer and even
// though we did " export default combineReducers " in root-reducer.js, we can call
// combineReducers " rootReducer " when we import in combineReducers
import rootReducer from './root-reducer';

// now let's set up our middleware and the middleware the store is expecting from redux is
// going to be an array and we do that by typing the following:


// -- Mark 2 --
// lecture 150: Optimizing Production Build
// the first thing we need to do to make sure logger only applies when were in development is
// to change " const middlewares = [ logger ]; " to " const middlewares = []; " and then set up
// an IF statement as follows:
/*
if ( process.env.NODE_ENV === 'development' ) {
    middlewares.push( logger );
}
*/

const middlewares = [];

// inside of node there is an environment variable and we can set environment variables
// or heroku can set environment variables but create react app actually sets an environment
// variable and this environment variable can only be accessed through " process.env " and
// " NODE_ENV " is a property on " process.env " and " process.env.NODE_ENV " will either
// be === " 'development'  ", " 'production'  " or " 'test'  " or
// " process.env.NODE_ENV === 'development' " or
// " process.env.NODE_ENV === 'production' " or
// " process.env.NODE_ENV === 'test' "
// and this allows us to know whether our app is being served in a development, production
// or test environment so what we are saying is that if the node environment variable is in
// development mode then we want to push " logger " into the middlewares array

// from: https://dzone.com/articles/what-you-should-know-about-node-env
// " NODE_ENV is an environment variable popularized by the Express framework. It specifies
// the environment in which an application is running such as development, staging, production,
// testing, etc.

// By default, our application will run in development environment. And we can change the
// environment by changing process.env.NODE_ENV. "

// and if we go to our app on localhost:3000 we see that our logger is still running but
// if we commit our code

// Rogers-iMac:crown_clothing Home$ git status
// Rogers-iMac:crown_clothing Home$ git add .
// Rogers-iMac:crown_clothing Home$ git commit -m " removing redux logger from our production
// build "
// Rogers-iMac:crown_clothing Home$ git push origin master
// Rogers-iMac:crown_clothing Home$ git push heroku master

// in this case we added: " Rogers-iMac:crown_clothing Home$ git push heroku master " since
// we want to push these changes up to our app on heroku 

// now if I go to my " course-crown-clothing " project in GutHub, I see the changes were
// uploaded sucessfully

// and if I go to my app that is being hosted on heroku and located at
// " https://course-crown-clothing.herokuapp.com/ " I see the changes were uploaded
// sucessfully 

// 



if ( process.env.NODE_ENV === 'development' ) {

    middlewares.push( logger );

}


// End of -- Mark 2 --


// now let's create our store and our store will be equal to the createStore function and the
// createStore() function will take 2 arguments: rootReducer and the return value of
// applyMiddleware and inside applyMiddleware we will spread in " middlewares " and what this
// will do is spread in all the values in the middlewares array into the applyMiddleware function
// call as individual arguments and this way if we ever need to add more values to the
// applyMiddleware function call then we all we have to do is just add values to the middlewares
// array

// remember this would work as well: " applyMiddleware( logger ) " because we only have one
// middleware right now ( i.e. logger ) and having that middleware as the only argument would
// work but remember applyMiddleware() can take an infinite number of middlewares as function
// call arguments but we will do it this way for now because in the future we may want to modify
// the middlewares array above and this format makes our code more scalable
const store = createStore( rootReducer, applyMiddleware( ...middlewares )  );

// now export our store as the default value
export default store;

// and then with this new store object that we instantiated with the createStore function we
// will export our store into the index.js file and pass the store into the Provider component
// which will allow the Provider component to pass the store context to the rest of the
// application and this will allow us to dispatch actions to the store or we can pull values
// off of the store and put these values into our components

// now go to src/index.js


// -- Mark 1 -- continued
// lecture 129: Redux Persist
// persistor calls our persistStore with the store passed in as an argument to persistStore()
// and persistor is essentially a persistent version of our store so all we are really doing
// here is creating a persistent version of the store using the persistStore function and then
// saving this persistent version of the store to a const called " persistor "
export const persistor = persistStore( store );
// and now we need to update our root reducer so go to root-reducer.js
// End of -- Mark 1 --

