import React, { Component } from 'react'
import axios from 'axios'
import './Search.css'

export default class Search extends Component {

    //Store state of current information
    state = {
        searchField: '',
        listOfSongs: [],
        features: [],
        searchUrl: ''
    }

    //Store user search input in state searchfield 
    updateUserInputOnChange = (event) => {
        event.preventDefault();
        let searchItem = event.target.value;
        this.setState({searchField: searchItem});
    }

    //Turn string in the search field into a to query parameter for api call
    turnSearchFieldIntoQuery =  (str) => {
        let searchQuery =`q=name:${str.replace(/ /g,'%20')}&type=album,track`;
        this.setState({searchUrl: searchQuery})
    }

    //Make API call to spotify to get the list of songs that match the search entered by user
    //  store the returned list in the listOfSongs array
   

    //Grab the song Id the user selected and place it in state



    render() {
        return (
            <div id="searchContainer"
                className="row justify-content-center align-items-center">
                <form id="searchForm"
                    className="col-xs-10 col-md-12 row justify-content-center align-items-center">
                    <input
                        id="searchInputField"
                        type="text"
                        className="col-xs-12 col-md-12"
                        value={this.state.searchField}
                        onChange={(event)=> this.updateUserInputOnChange(event)}
                        placeholder="Search Song"/>
                    <button
                        id="searchButton"
                        type='submit'
                        className="">Submit</button>
                </form>
            </div>
        )
    }
}
