import React, { Component } from 'react';
import './PlayList.css'
import Track from '../../components/Track'

class PlayList extends Component {
  state = {
    tracks: this.props.tracks
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.tracks !== this.state.tracks) {
      this.setState({ tracks: nextProps.tracks});
    }
  }




  render() {
    console.log("PLAYLIST TYPE:", this.props.playlistType, "PLAYLIST:", this.state.tracks)
    return(
      <div id="PlayListContainer">
      {this.state.tracks.map((track, index) => {
        return (
          <Track index = {index} togglePlayListTracks={this.props.togglePlayListTracks.bind(this)}  playlist_type = {this.props.playlist_type} name={track.name} artists={track.artists} album={track.album}></Track>
        )
      })}
      </div>
  )

  }

}

export default PlayList;
