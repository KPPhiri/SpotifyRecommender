// Display search results from user input
import Track from './Track'
import React from 'react'
import { Link } from 'react-router-dom'
import './SearchResults.css'

const SearchResults = (props) => {

    // Create list of songs 
    let searchResults = props.songs.map(song => {
        return (
            <Track
                key={song.id}
                togglePlayListTracks={props.getTrackFeatures}
                index={song.id}
                name={song.name}
                artists={song.artists[0].name}
                album={song.album.name}
                image={song.album.images[1].url}
                playlist_type={'TrackContainer searchTrack'}
            />
        )
    })

    return (
        <div id="songListDisplay" className="col-xs-12 col-md-8">
            <h2>Results for "{props.songName}"</h2>
            <div id="search-SongsList">
                {searchResults}
            </div>
            <div className='searchResultsButtons'>
                <button
                    onClick={props.toggleSearchView}>Do Another Search </button>
                <Link to='/recommender'>
                    <button className='goToRecommenderButton'>View Playlist</button>
                </Link>
            </div>
        </div>
    )
}

export default SearchResults