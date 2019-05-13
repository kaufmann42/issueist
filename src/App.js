import React, { Component } from 'react';
import LoginPage from './pages/login';
import CreateIssuePage from './pages/create-issue';
import { store, retrieve } from './services/storage';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';
import AppBar from './components/app-bar';

export default class App extends Component {
  state = {
    token: null,
    open: false,
  }

  onSuccess = (response) => {
    fetch(`http://localhost:9999/authenticate/${response.code}`).then(function(response) {
      return response.json();
    })
    .then((res) => {
      store('token', res.token);
      this.setState({token: res.token});
    })
    .catch(console.error);
  }

  logout = () => {
    window.localStorage.clear();
    this.setState({token: null})
  }

  onFailure = (response) => {
    console.log(response)
  }

  componentDidMount() {
    console.log('setting state from onComp')
    this.setState({token: retrieve('token')});
  }

  toggleDrawer = (open) => {
    this.setState({open});
  };

  render() {
    const sideList = (
      <div>
        <List>
          <ListItem button>
            <ListItemIcon><HelpIcon/></ListItemIcon>
            <ListItemText primary={'About'} />
          </ListItem>
          {this.state.token && 
          <ListItem onClick={this.logout} button>
            <ListItemIcon><LogOutIcon/></ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>}
        </List>
      </div>
    );
    return (
      <div style={{width: '400px', height: '600px'}}>
        <AppBar onClickMenu={() => this.toggleDrawer(true)}/>
        {!this.state.token ? <LoginPage onSuccess={this.onSuccess} onFailure={this.onFailure}/> : <CreateIssuePage token={this.state.token}/>}
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
      </div>
      );
  }
}
