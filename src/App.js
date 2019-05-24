import React from 'react';
import logo from './logo2.png';
import './App.css';
import Homepage from './Homepage';

function App() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to the
            </p>
	    <p><em>World of Walkerers</em></p>
            <Homepage/>
          </header>
        </div>
    );

}

export default App;

