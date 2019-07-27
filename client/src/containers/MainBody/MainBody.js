import React, { Component } from 'react'
import './MainBody.css'
import { Route, Link } from 'react-router-dom'
import Recommender from '../Recommender/Recommender';
import Search from '../Search/Search';

export default class MainBody extends Component {

    //Store the state of the song selected by the user and the 
    //  features returned by that song Id
    state = {
        songId: 0,
    }

    //This function stores the id of the song selected by the user in state
    //Pass this method down to search componenet 





    render() {
        return (
            <div id="mainbody">
                <Search />
            </div>
        )
    }
}
