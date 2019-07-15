import React from 'react';
import PropTypes from 'prop-types';
import GitHubLogin from '../../components/github-login-button';
import { Typography, CircularProgress } from '@material-ui/core';

export default class LoginPage extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    loading: false,
  }

  render() {
    return (
      <React.Fragment>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '400px', justifyContent: 'center', padding: '20px'}}>
          {this.props.loading ?
          <CircularProgress style={{alignSelf: 'center'}} size={48} />
          :
          <>
          <GitHubLogin scopes={'repo'} redirectUri={process.env.REACT_APP_REDIRECT_URL} clientId={process.env.REACT_APP_GITHUB_CLIENT_ID} onSuccess={this.props.onSuccess} onFailure={this.props.onFailure}/>
          <Typography variant="body1" align="center">
            You need to authorize access to your Github repositories before you can use this application
          </Typography>
          </>
        }
        </div>
      </React.Fragment>
    );
  }
}