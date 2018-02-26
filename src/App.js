import React, { Component } from 'react';

import Login from './containers/Login';
import Search from './containers/Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('apiKey') !== null) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <Search /> : <Login screenProps={{ isLoggedIn: () => this.setState({ loggedIn: true }) }} />}
      </div>
    );
  }
}

export default App;
