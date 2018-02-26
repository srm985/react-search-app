import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            distance: '',
            filter: '',
            searchResults: false
        };
    }

    changeKeyword(event) {
        this.setState({ keyword: event.target.value });
    }

    changeDistance(event) {
        this.setState({ distance: event.target.value });
    }

    changeFilter(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
        return (
            <div className="Search">
                <form>
                    <label>Keyword:<br /><input name="keyword" type="text" value={this.state.keyword} onChange={(event) => this.changeKeyword(event)} /></label><br /><br />
                    <label>Distance:<br /><input name="distance" type="text" value={this.state.distance} onChange={(event) => this.changeDistance(event)} /></label><br /><br />
                    <label>Exclude:<br /><input name="filter" type="text" value={this.state.filter} onChange={(event) => this.changeFilter(event)} /></label><br />
                    <button type="button" onClick={() => this.makeSearch(this.state)}>Search</button>
                </form>
                <div className="search-results">
                    {
                        this.state.searchResults.length ?
                            this.state.searchResults.map((result) => {
                                return (<p>{result.name}</p>);
                            })
                            :
                            <p>No results found.</p>
                    }
                </div>
            </div>
        );
    }

    makeSearch(searchCriteria) {
        const DEV_URL = `https://localhost:3001/resultSearch.php`,
            PROD_URL = `https://www.dev.seanmcquay.com/resultSearch.php`,
            filterList = searchCriteria.filter.trim().replace(/\s+?,\s+/, ',').split(',');

        let location,
            filteredResults = [],
            retainResult,
            postData;

        navigator.geolocation.getCurrentPosition((position) => {
            location = position;

            postData = {
                token: sessionStorage.getItem('apiKey'),
                location: `${location.coords.latitude},${location.coords.longitude}`,
                distance: searchCriteria.distance,
                keyword: searchCriteria.keyword
            };
            console.log(postData)

            fetch(PROD_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: JSON.stringify(postData)
            }, ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        console.log(json)
                        json.results.forEach((result) => {
                            retainResult = true;
                            filterList.forEach((filter) => {
                                if (filter.trim().toLowerCase() === result.name.trim().toLowerCase()) {
                                    retainResult = false;
                                }
                            });
                            if (retainResult) {
                                filteredResults.push(result);
                            }
                        });
                        this.setState({ searchResults: filteredResults });
                        console.log(this.searchResults)
                    });
                }
            });
        });
    }
}

export default Search;
