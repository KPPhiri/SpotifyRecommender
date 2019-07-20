import React from 'react';
import './App.css';
import NavBar from './containers/NavBar'
import { BrowserRouter } from 'react-router-dom'
import { Route, Link} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
