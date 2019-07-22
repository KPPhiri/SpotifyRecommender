import React from 'react'
import './MainBody.css'
import { Route, Link} from 'react-router-dom'
import Recommender from '../containers/Recommender/Recommender'


const mainbody = (props) => {
  return (
    <div id="mainbody">
      // <Route path="/Recommender"  component={Recommender} />
      <Recommender></Recommender>
    </div>
  )


}

export default mainbody;
