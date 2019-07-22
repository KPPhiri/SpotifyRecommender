import React, { Component } from 'react';
import './PlayList.css'
import Track from '../../components/Track'

class PlayList extends Component {
  state = {
    tracks: [{name: "Cut To The Feeling", artist: "Carly Rae Jepsen", album: "Cut To The Feeling"},
    {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
    {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
    {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"},
    {name: "4Cut To The Feeling", artist: "4Carly Rae Jepsen", album: "4Cut To The Feeling"},
    {name: "5Cut To The Feeling", artist: "5Carly Rae Jepsen", album: "5Cut To The Feeling"},
    {name: "6Cut To The Feeling", artist: "6Carly Rae Jepsen", album: "6Cut To The Feeling"},
    {name: "7Cut To The Feeling", artist: "7Carly Rae Jepsen", album: "7Cut To The Feeling"},
    {name: "8Cut To The Feeling", artist: "8Carly Rae Jepsen", album: "8Cut To The Feeling"},
    {name: "9Cut To The Feeling", artist: "9Carly Rae Jepsen", album: "9Cut To The Feeling"},
    {name: "10Cut To The Feeling", artist: "10Carly Rae Jepsen", album: "10Cut To The Feeling"},
    {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
    {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
    {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"},
    {name: "4Cut To The Feeling", artist: "4Carly Rae Jepsen", album: "4Cut To The Feeling"},
    {name: "5Cut To The Feeling", artist: "5Carly Rae Jepsen", album: "5Cut To The Feeling"},
    {name: "6Cut To The Feeling", artist: "6Carly Rae Jepsen", album: "6Cut To The Feeling"},
    {name: "7Cut To The Feeling", artist: "7Carly Rae Jepsen", album: "7Cut To The Feeling"},
    {name: "8Cut To The Feeling", artist: "8Carly Rae Jepsen", album: "8Cut To The Feeling"},
    {name: "9Cut To The Feeling", artist: "9Carly Rae Jepsen", album: "9Cut To The Feeling"}]
  }



  render() {
    return(
      <div id="PlayListContainer">
      {this.state.tracks.map((track, index) => {
        return (
          <Track name={track.name} artist={track.artist} album={track.album}></Track>
        )
      })}
      </div>
  )

  }

}

export default PlayList;
