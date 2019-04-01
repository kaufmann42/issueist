import React, { Component } from 'react';
import LoginPage from './pages/login';
import CreateIssuePage from './pages/create-issue';
import { store, retrieve } from './services/storage';

export default class App extends Component {
  state = {
    token: null,
  }

  onSuccess = (response) => {
    fetch(`http://localhost:9999/authenticate/${response.code}`).then(function(response) {
      return response.json();
    }).then(res => store('token', res.token));
  }

  onFailure = (response) => {
    console.log(response)
  }

  componentDidMount() {
    this.setState({token: retrieve('token')});
  }

  render() {
    return (
      <div style={{maxWidth: '400px'}}>
        {!this.state.token ? <LoginPage onSuccess={this.onSuccess} onFailure={this.onFailure}/> : <CreateIssuePage token={this.state.token}/>}
      </div>
      );
  }
}
