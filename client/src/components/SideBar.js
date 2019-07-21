import React, { Component } from 'react'
import './SideBar.css'

export default class SideBar extends Component {
    state = {
        name: 'Musiteli',
        image: 'https://images.unsplash.com/photo-1562841883-85e49a4c02c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        followers: 0,
        email: 'mindTestModis@gmail.com',
    }

    render() {
        //Destructued state object into properties
        let { name, image, followers, email } = this.state

        return (
            <div className="SideBarContainer">
                <div className="profileImg">
                    <img src={image} alt='profile of user' />
                </div>
                <div className="SideBarDescription">
                    <h2>Name: {name}</h2>
                    <h2>Followers: {followers}</h2>
                    <h2>Email: {email}</h2>
                </div>
            </div>
        )
    }
}
