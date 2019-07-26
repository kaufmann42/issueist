import React from 'react';
import PropTypes from 'prop-types';
import GitHubLogin from '../../components/github-login-button';
import { Typography, CircularProgress } from '@material-ui/core';
import { LoginOptions } from './options';

export default class LoginPage extends React.Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    loading: false,
  }

  state = {
    client_id: null,
    baseURL: null,
  }

  updateLoginOptions = (options) => {
    this.setState(options);
    this.props.onUpdateConfig(options);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', maxWidth: '440px', alignItems: 'center', padding: '20px' }}>
          {this.props.loading ?
            <CircularProgress style={{ alignSelf: 'center' }} size={48} />
            :
            <>
              <GitHubLogin
                scopes={'repo'}
                redirectUri={process.env.REACT_APP_REDIRECT_URL}
                baseURL={this.state.baseURL}
                clientId={this.state.client_id || process.env.REACT_APP_GITHUB_CLIENT_ID}
                onSuccess={this.props.onSuccess}
                onFailure={this.props.onFailure} />
              <Typography variant="body1" align="center">
                You need to authorize access to your Github repositories before you can use this application
              </Typography>
              <LoginOptions onClickSaveButton={this.updateLoginOptions} />
            </>
          }
        </div>
      </React.Fragment>
    );
  }
}