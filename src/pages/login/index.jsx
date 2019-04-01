import React from 'react';
import AppBar from '../../components/app-bar';
import GitHubLogin from '../../components/github-login-button';
import { store } from '../../services/storage';
import { Typography } from '@material-ui/core';

export default class LoginPage extends React.Component {
  onSuccess = (response) => {
    fetch(`http://localhost:9999/authenticate/${response.code}`).then(function(response) {
      return response.json();
    }).then(res => store('token', res.token));
  }

  onFailure = (response) => {
    console.log(response)
  }

  render() {
    return (
      <React.Fragment>
        <AppBar/>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '400px', justifyContent: 'center'}}>
          <GitHubLogin scopes={'repo'} clientId={process.env.REACT_APP_GITHUB_CLIENT_ID} onSuccess={this.onSuccess} onFailure={this.onFailure}/>
          <Typography variant="body1" align="center">
            You need to authorize access to your Github repositories before you can use this application
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}