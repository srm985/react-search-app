import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            invalidCredentials: false
        };
    }

    updateUsername(event) {
        this.setState({ username: event.target.value });
    }

    updatePassword(event) {
        this.setState({ password: event.target.value });
    }

    validateUser(credentials) {
        const DEV_URL = `https://localhost:3001/validateUser.php`,
            PROD_URL = `https://www.dev.seanmcquay.com/validateUser.php`;

        let postData = {
            username: credentials.username.trim().toLowerCase(),
            password: credentials.password
        };

        fetch(PROD_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify(postData)
        }, ).then(response => {
            if (response.ok) {
                response.json().then(apiKey => {
                    console.log(apiKey);
                    if (apiKey !== 'invalid credentials') {
                        sessionStorage.setItem('apiKey', apiKey);
                        this.setState({ invalidCredentials: false });
                        this.props.screenProps.isLoggedIn();
                    } else {
                        this.setState({ invalidCredentials: true });
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className="Login">
                <header>
                    <h1>Search Application</h1>
                </header>
                <form>
                    <label>Username: {this.state.invalidCredentials ? <span className="error">(Invalid credentials!)</span> : ''}<br /><input type="text" value={this.state.username} onChange={(event) => this.updateUsername(event)} /></label><br /><br />
                    <label>Password:<br /><input type="password" value={this.state.password} onChange={(event) => this.updatePassword(event)} /></label><br />
                    <button type="button" onClick={() => this.validateUser(this.state)}>Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
