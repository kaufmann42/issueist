import React, { Component } from 'react';
import LoginPage from './pages/login';
import CreateIssuePage from './pages/create-issue';
import { store, retrieve, deleteStorage } from './services/storage';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';
import AppBar from './components/app-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    token: null,
    open: false,
    loading: false,
    serverURL: process.env.REACT_APP_SERVER_URL,
    OAuthURL: null,
  }

  onSuccess = (response) => {
    this.setState({ loading: true });
    console.log('successful response');
    fetch(`${this.state.serverURL}?code=${response.code}${(this.state.client_id) ? '&client_id' + this.state.client_id : ''}${(this.state.OAuthURL) ? '&client_id' + this.state.OAuthURL : ''}`).then(function (response) {
      return response.json();
    })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }
        store('token', res.token);
        this.setState({ token: res.token, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
        toast.error('There was an error authenticating. Check console for details.');
      });
  }

  logout = () => {
    deleteStorage();
    this.setState({ token: null })
  }

  onFailure = (response) => {
    toast.error('There was an error authenticating. Check console for details.');
    console.error(response);
  }

  componentDidMount() {
    console.log('setting state from onComp');

    retrieve('token')
      .then((token) => this.setState({ token }));
  }

  toggleDrawer = (open) => {
    this.setState({ open });
  };

  onUpdateConfig = (options) => {
    this.setState(options);
  }

  render() {
    const userIsAuthenticated = this.state.token;
    const sideList = (
      <div>
        <List>
          <ListItem onClick={() => window.open('https://kaufmann42.github.io/issueist/', '_blank')} button>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText primary={'About'} />
          </ListItem>
          {this.state.token &&
            <ListItem onClick={this.logout} button>
              <ListItemIcon><LogOutIcon /></ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>}
        </List>
      </div>
    );
    return (
      <div>
        <AppBar onClickMenu={() => this.toggleDrawer(true)} />
        {(!userIsAuthenticated) ?
          <LoginPage loading={this.state.loading} onUpdateConfig={this.onUpdateConfig} onSuccess={this.onSuccess} onFailure={this.onFailure} />
          :
          <CreateIssuePage serverURL={this.state.serverURL} token={this.state.token} />}
        <Drawer open={this.state.open} onClose={() => this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer(false)}
            onKeyDown={() => this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    );
  }
}
