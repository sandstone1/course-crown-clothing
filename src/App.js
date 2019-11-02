
import React from 'react';
import './App.css';

// -- Mark 1 --
// lecture 57: E-commerce Homepage + SASS Setup
// -- Mark 2 --
// lecture 61: Homepage and Directory Components
import HomePage from './pages/homepage/homepage.component';
// End of -- Mark 2 --

// include our <HomePage /> component below and then we need to go to the terminal and type
// " npm start " to start the project and after we press enter we will be automatically taken
// to localhost:3000, which includes our component App.js
// End of -- Mark 1 --

function App() {
    return (
        <div>
            <HomePage />
        </div>
    );
}

export default App;
