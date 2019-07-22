import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import MainBody from './components/MainBody'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SideBar from './components/SideBar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <div id="info">
        <SideBar></SideBar>
        <MainBody></MainBody>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
