import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import PlayBack from './containers/PlayBack'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SideBar from './components/SideBar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <PlayBack></PlayBack>
        <SideBar></SideBar>
      </div>
    </BrowserRouter>
  );
}

export default App;
