import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    handleEnter(e) {
        if(e.key === 'Enter'){
            this.search();
        }
    }

    componentDidMount() {
        let searchBar = document.getElementById("searchBar");
        var txt = "Enter A Song, Album, or Artist";
        var timeOut;
        var txtLen = txt.length;
        var char = 0;
        searchBar.setAttribute('placeholder', '|');
        (function typeIt() {
            var humanize = Math.round(Math.random() * (200 - 30)) + 30;
            timeOut = setTimeout(function () {
                char++;
                var type = txt.substring(0, char);
                searchBar.setAttribute('placeholder', type + '|');
                typeIt();

                if (char == txtLen) {
                    searchBar.setAttribute('placeholder', type) // remove the '|'
                    clearTimeout(timeOut);
                }

            }, humanize);
        }());
    }

    render() {
        return (
            <div className="SearchBar">
                <input id='searchBar' type='text' placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleEnter} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button> 
            </div>
        );
    }
}

export default SearchBar;