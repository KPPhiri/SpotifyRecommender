import React, { Component } from 'react'
import './Recommender.css'
import PlayList from '../PlayList/PlayList'

class Recommender extends Component {
  render() {
    return (
      <div id="RecommenderContainer">
        <PlayList></PlayList>
        <PlayList></PlayList>
      </div>
    )
  }
}

export default Recommender
