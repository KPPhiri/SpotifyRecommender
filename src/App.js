import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import PlayBack from './containers/PlayBack'
import { BrowserRouter } from 'react-router-dom'
import { Route, Link} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <PlayBack></PlayBack>

      </div>
    </BrowserRouter>
  );
}

export default App;
