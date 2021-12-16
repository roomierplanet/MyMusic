import "./App.css";
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import React from "react";
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults : [],
      playlistName: 'Playlist1',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let newTracks = this.state.playlistTracks;
    for (let t of newTracks) {
      if (t.id === track.id) {
        return;
      }
    }
    newTracks.push(track);
    this.setState(
      {
        playlistTracks: newTracks
      }
    )
  }
  removeTrack(track) {
    let newTracks = this.state.playlistTracks;
    for (let i = 0; i < newTracks.length; i++) {
      if (track.id === newTracks[i].id) {
        newTracks.splice(i, 1);
        this.setState(
          {
            playlistTracks: newTracks
          }
        )
        return;
      }
    }
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }
  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    );
  }
  search(name) {
    Spotify.search(name).then(response => {
      this.setState({
        searchResults: response
      });
    })
  }
  render() {
  return (
    <div>
      <nav><h1>MyMusic</h1></nav>
      <div className="App">
        <h1>Create your Dream Playlist.</h1>
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} playlistTracks={this.state.playlistTracks} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave = {this.savePlaylist} />
        </div>
      </div>
      <footer>
          <h2>Built with &#9829; by Arnav Nagpal</h2>
          <h2>Link to <a href="#">repo</a></h2> 
      </footer>
    </div>
  );
  }
}

export default App;
