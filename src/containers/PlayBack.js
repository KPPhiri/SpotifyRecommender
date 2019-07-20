import React, { Component } from 'react';

class PlayBack extends Component {
  componentDidMount() {
  //   const script = document.createElement('script');
  //   script.src = "https://sdk.scdn.co/spotify-player.js";
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.innerHTML = "document.write('This is output by document.write()!')";
  //   this.instance.appendChild(script);
  //
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //   const token = '[My Spotify Web API access token]';
  //   const player = new Spotify.Player({
  //     name: 'Web Playback SDK Quick Start Player',
  //     getOAuthToken: cb => { cb(token); }
  //   });
  //
  //   // Error handling
  //   player.addListener('initialization_error', ({ message }) => { console.error(message); });
  //   player.addListener('authentication_error', ({ message }) => { console.error(message); });
  //   player.addListener('account_error', ({ message }) => { console.error(message); });
  //   player.addListener('playback_error', ({ message }) => { console.error(message); });
  //
  //   // Playback status updates
  //   player.addListener('player_state_changed', state => { console.log(state); });
  //
  //   // Ready
  //   player.addListener('ready', ({ device_id }) => {
  //     console.log('Ready with Device ID', device_id);
  //   });
  //
  //   // Not Ready
  //   player.addListener('not_ready', ({ device_id }) => {
  //     console.log('Device ID has gone offline', device_id);
  //   });
  //
  //   // Connect to the player!
  //   player.connect();
  // };
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }

}

export default PlayBack;
