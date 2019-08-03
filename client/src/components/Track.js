import React from 'react'
import './Track.css'


const track = (props) => {
  return(
    <div className={props.playlist_type} onClick={e => props.togglePlayListTracks(props.index)}>
      <div id="songName">{props.name}</div>
      <div id="artist_album">{props.artists} | {props.album} </div>
    </div>
  )

}

// add(){
//
// }
//
// remove(){
//
// }

export default track;
