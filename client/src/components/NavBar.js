import React from 'react';
import './NavBar.css';
import { Route, Link } from 'react-router-dom';


const navbar = ( props ) => {
  return (
    <div id="main">
      <div className="topnav" style = {props.style}>
        <div id="left"  className="active navButton">Spotify Recommender</div>
        <a className="active navButton" href="/">Home</a>
        <Link className="navButton" to="/Interests">Interests</Link>
        < Link className="navButton" to="/Projects">Projects</Link>
        <a className="navButton" href="/about">About</a>
        <div id="right">Created with React.js ღ</div>
      </div>
    </div>
  )
}

export default navbar;
