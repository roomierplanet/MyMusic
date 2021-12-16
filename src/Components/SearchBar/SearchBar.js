import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: ''
        });
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
    }
    handleKeyup(e) {
        if (e.keyCode === 13) {
            this.search(e);
        }
    }
    search(e) {
        this.props.onSearch(this.state.name)
    }
    handleTermChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleKeyup} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;
