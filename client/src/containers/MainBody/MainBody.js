import React, { Component } from 'react'
import './MainBody.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Recommender from '../Recommender/Recommender';
import Search from '../Search/Search';
import axios from 'axios'
export default class MainBody extends Component {

    //Store the state of the song selected by the user and the
    //  features returned by that song Id
    state = {
        targetSongFeatures: [],
        recommendedPlaylist: []
    }

    //This function stores the id of the song selected by the user in state
    //Pass this method down to search componenet
    runFunctionsToUpdaterecommendedPlaylist = async (newSongId) => {
        await this.useSongIdToGetFeatures(newSongId)
        let tracklistSize = 20;

        await this.getRecommendedTracks(this.state.targetSongFeatures, tracklistSize)
        //place the tensor method here so that it runs as soon as as the
        //  features have been grabbed and uploaded to state
        console.log("recommendedPlaylist", this.state.recommendedPlaylist)

    }

    //req.body.targetTrackFeatures, req.body.playlist_features, req.body.playlist_labels, req.body.tracklistSize
    //TODO: PARSE DATAGBASE AND GET PLAYLIST FEATUREs, PLAYLIST LABELS, AND TRACK INFO
    getRecommendedTracks = async (targetTrackFeatures, tracklistSize) => {

       
        let body = await axios.post('/api/tracks/getRecommendedTracks',
            {
                targetTrackFeatures: targetTrackFeatures,
                tracklistSize: tracklistSize,
            })
        this.setState({ recommendedPlaylist: body.data })
     

    }


    //Use the songId to create a list of features
    useSongIdToGetFeatures = async (songId) => {

        let body = await axios.post('/api/tracks/getTargetTrackFeatures',
            {
                trackid: songId,
                token: this.props.token
            })
        this.setState({ targetSongFeatures: body.data })
        // console.log("targetSongFeatures", this.state.targetSongFeatures, "BODY", body.data)
    }


    render() {
        //Create components that will needs props below this line
        //If the component doesnt need props, then create as usual
        //Example let RecommenderComponent = () => <Recommender songId={this.state.songId}/>
        //Then use the render method to have the component show
        let SearchComponent = () => <Search
            songId={this.state.songId}
            sendSongToGetFeatures={this.runFunctionsToUpdaterecommendedPlaylist}
            token={this.props.token} />

        let RecommenderComponent = () => <Recommender
            playlist={this.state.recommendedPlaylist}
            token={this.props.token}
        />

        return (
            <Router >
                <div id="mainbody">
                    <Switch>
                        <Route exact path='/callback' render={SearchComponent} />
                        <Route path='/recommender' render={RecommenderComponent} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
