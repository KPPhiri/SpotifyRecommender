import React, { Component } from 'react'
import axios from 'axios'
import './Search.css'

export default class Search extends Component {

    //Store state of current information
    state = {
        searchField: '',
        listOfSongs: [],
        showSongLists: false,
        features: [],
        searchUrl: '',
        token: 'BQA7QSSIwNgkXeCKza2OtTwhVTocAxmR6CbblmM1_vXOoDYngLl4c774e_8yPpAH9Z8WpxVChy_zidQ-Cm1BzLCcGX5-XtPHbh13P_TMLIm8YxCzIdVNXxEZz3qrvftkYXsQSl41kMoEbdU4N6hE5BBaEkS6sMv5EtR8NUg2g3YG2zHfDkq4tuAV6EgDqbD_VS-jm0y-ACgmHmYMdSOOGv_mOWeZksyrzYCbeDxUKg'
    }

    //Store user search input in state searchfield 
    updateUserInputOnChange = (event) => {
        event.preventDefault();
        let searchItem = event.target.value;
        this.setState({ searchField: searchItem });
    }

    //Turn string in the search field into a to query parameter for api call
    turnSearchFieldIntoQuery = async (str) => {
        let searchQuery = `q=${str.replace(/ /g, '%20')}&type=track&limit=10`;
        await this.setState({ searchUrl: searchQuery })
    }

    //Handle actions when submit is pressed
    requestSongTracks = async (event) => {
        event.preventDefault()
        if (this.state.searchField !== '') {
            this.turnSearchFieldIntoQuery(this.state.searchField)
            this.getListofSongsFromSpotify(this.state.searchUrl)
        }
    }

    //Make API call to spotify to get the list of songs that match the search entered by user
    //  store the returned list in the listOfSongs array
    getListofSongsFromSpotify = (url) => {
        axios({
            url: `https://api.spotify.com/v1/search?${url}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.state.token}`
            }
        }).then(res => {
            let listOfSongs = res.data.tracks.items
            this.setState({ features: listOfSongs },
                this.toggleSearchView)

        }).catch(err => console.log(`Error : ${err}`))
    }

    //toggle the view to show the list of songs
    toggleSearchView = () => {
        this.setState(state => {
            return { showSongLists: !state.showSongLists }
        })
    }
    //Grab the song Id the user selected and place it in state



    render() {
        return (
            <div id="searchContainer"
                className="row justify-content-center align-items-center">
                <form onSubmit={(event) => this.requestSongTracks(event)}
                    id="searchForm"
                    className="col-xs-10 col-md-12 row justify-content-center align-items-center">
                    <input
                        id="searchInputField"
                        type="text"
                        className="col-xs-12 col-md-12"
                        value={this.state.searchField}
                        onChange={(event) => this.updateUserInputOnChange(event)}
                        placeholder="Search Song" />
                    <button
                        id="searchButton"
                        type='submit'

                        className="">Submit</button>
                </form>
                <div id="songListDisplay "
                    className="col-xs-10 col-md-12">

                </div>
            </div>
        )
    }
}
