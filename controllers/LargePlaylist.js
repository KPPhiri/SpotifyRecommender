const express = require('express')
var cors = require('cors');
const LargePlaylistAPI = require('../models/LargePlaylist.js')
const SpotifyTensorAPI = require('../models/Spotify_TensorScripts.js')


const LargePlayListRouter = express.Router()
LargePlayListRouter.use(cors());

//Returns the entire playlist from the database
LargePlayListRouter.get('/', (req, res) => {
  console.log("reached server")
  LargePlaylistAPI.getAllTracks()
    .then((tracks) => {
      console.log(tracks)
      res.send(tracks)
    })
    .catch(err => console.log(err))
})

//Creates a new playlist object
LargePlayListRouter.post('/', (req, res) => {
  console.log("STARTED")
  LargePlaylistAPI.createLargeSpotifyPlaylist(req.body)
    .then((tracks) => res.send(tracks))
    .catch(err => console.log(err))
})

//Get songs from a spotify playlist using Spotify's API and load tracks into MongoDB
LargePlayListRouter.get('/loadTracksToDatabase', (req, res) => {
  SpotifyTensorAPI.asyncgetPlaylistTrackIDsDriver('https://api.spotify.com/v1/playlists/7htu5ftbLBRFAwiuHVcUAg')
    .then((arrays) => LargePlaylistAPI.createLargeSpotifyPlaylist({features: arrays[0], labels: arrays[1], track_information: arrays[2]})).then((data) =>{
      console.log("Result: ", res.send("Success"))
      res.send("Success", data)}).catch(err => {
        console.log("Error", err)
        res.send("Error", err)
      })
})


LargePlayListRouter.get('/clearDatabase', (req, res) => {
  LargePlaylistAPI.deleteAllItems().then(res.send("Success")).catch(err => console.log("Error", err))
})





LargePlayListRouter.post('/getTargetTrackFeatures', async (req, res) => {
    let features = await SpotifyTensorAPI
      .getTargetTrackFeatures(req.body.trackid, req.body.token)
      .catch(err => console.log("ERROR: ", err))
    res.send(features)
})

LargePlayListRouter.post('/getRecommendedTracks', async (req, res) => {
  //Get complete playlists features and labels from database
    let arrays = await LargePlaylistAPI.getAllTracks()
    let playlist_features =  arrays[0].features;
    let playlist_labels =  arrays[0].labels;
    let playlist_labels_index = [];
    let playlist_track_information =  arrays[0].track_information;

    //console.log("playlist_features", playlist_features, "playlist_labels", playlist_labels, "playlist_track_inforamtion", playlist_track_information)
    for (var i = 0; i < playlist_labels.length; i++) {
       playlist_labels_index.push(i);
    }

    let recommendedPlaylistIndexes = await SpotifyTensorAPI.runTensor(req.body.targetTrackFeatures, playlist_features, playlist_labels, playlist_labels_index, req.body.tracklistSize).catch(err => console.log("Error: ", err))
    // console.log("Recommended Songs: ", recommendedPlaylistIndexes)
    let recommendedPlaylist = []
    for(let i = 0; i < recommendedPlaylistIndexes.length; i++) {
      // console.log("Song" + i + ":", playlist_track_information[recommendedPlaylistIndexes[i]]);
      recommendedPlaylist.push(playlist_track_information[recommendedPlaylistIndexes[i]])
    }



    res.send(recommendedPlaylist)
    return recommendedPlaylist
})
//delete all the playlist items
LargePlayListRouter.delete('/:largePlayListId',(req, res) => {
  LargePlaylistAPI.deleteAllItems(req.params.largePlayListId)
    .then(() => res.send('delete was successful'))
    .catch(err => console.log(err))
})

//Update a specific playlist by its playlist ID
LargePlayListRouter.put('/:largePlayListId', (req,res) => {
  LargePlaylistAPI.updateLargeSpotifyPlaylist(req.params.largePlayListId,req.body)
    .then(() => res.send('Update was successful'))
    .catch(err => console.log(err))
})

module.exports = {
  LargePlayListRouter
}
