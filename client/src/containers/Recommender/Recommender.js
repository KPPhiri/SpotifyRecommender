import React, { Component } from 'react'
import './Recommender.css'
import PlayList from '../PlayList/PlayList'
import arrows from '../../assets/imgs/green-red-arrow.png'


class Recommender extends Component {
  state = {
      tracks1:this.props.playlist,

    tracks2: []


  }


  // {name: "1Cut To The Feeling", artist: "1Carly Rae Jepsen", album: "1Cut To The Feeling"},
  // {name: "2Cut To The Feeling", artist: "2Carly Rae Jepsen", album: "2Cut To The Feeling"},
  // {name: "3Cut To The Feeling", artist: "3Carly Rae Jepsen", album: "3Cut To The Feeling"},
  // {name: "4Cut To The Feeling", artist: "4Carly Rae Jepsen", album: "4Cut To The Feeling"},
  // {name: "5Cut To The Feeling", artist: "5Carly Rae Jepsen", album: "5Cut To The Feeling"},
  // {name: "6Cut To The Feeling", artist: "6Carly Rae Jepsen", album: "6Cut To The Feeling"},
  // {name: "7Cut To The Feeling", artist: "7Carly Rae Jepsen", album: "7Cut To The Feeling"}
  //
  movetrack1totrack2(index){
      let trackList1 = [... this.state.tracks1]
      let trackList2 = [... this.state.tracks2]

      trackList2.unshift(trackList1[index])
      trackList1.splice(index, 1);

      console.log("index", index, "ADDING: ", trackList2, "this.state.tracks1[index]", this.state.tracks1[index], "this.state.tracks1", this.state.tracks1)
      this.setState({tracks1: trackList1, tracks2: trackList2})
  }


  movetrack2totrack1(index){
    let trackList2 = [... this.state.tracks2]
    let trackList1 = [... this.state.tracks1]
    trackList1.unshift(trackList2[index])
    trackList2.splice(index, 1);

    this.setState({tracks1: trackList1, tracks2: trackList2})
  }



  render() {
    return (
      <div id="RecommenderContainer">
        <div className="RecommenderSubContianer">
          <div className="title_recommended">Recommended Songs:</div>
          <PlayList playlistType = "suggested" togglePlayListTracks={this.movetrack1totrack2.bind(this)} tracks = {this.state.tracks1} playlist_type = {"TrackContainer"}></PlayList>
        </div>

        <img src = {arrows} alt= {arrows} height={"150"} width={"150"}/>
        <div className="RecommenderSubContianer">
          <div className="title_playlist">Custom Playlist:</div>
          <PlayList playlistType = "custom" togglePlayListTracks={this.movetrack2totrack1.bind(this)} tracks = {this.state.tracks2} playlist_type = {"customTrackContainer"}></PlayList>
        </div>


      </div>
    )
  }


  getData() {
    fetch('/users')
      .then(res => {
          console.log(res);
          return res.json()
       })
      .then(users => {
          console.log(users);
          this.setState({ users })
       });
  }
}

export default Recommender
