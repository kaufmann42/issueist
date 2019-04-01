import React, { Component } from 'react';
import LoginPage from './pages/login';
import CreateIssuePage from './pages/create-issue';

export default class App extends Component {
  state = {
    isLoggedIn: true,
  }
  render() {
    return (
      <div style={{maxWidth: '400px'}}>
        {!this.state.isLoggedIn ? <LoginPage/> : <CreateIssuePage/>}
      </div>
      );
  }
}
