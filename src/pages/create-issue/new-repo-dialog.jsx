import React, {Component} from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(),
    position: 'relative',
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class NewRepoDialog extends Component {
  state = {
    open: false,
    loading: false,
    name: '',
  }

  onChangeRepoName = (event) => {
    this.setState({
      error: false,
      name: event.target.value,
    });
  }

  handleClickOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({
      open: false,
      loading: false,
      error: false,
      name: ''
    });
  }

  handleCreate = async () => {
    if (this.state.name === '') {
      this.setState({
        error: 'Please enter a repository name'
      })
      return;
    }
    this.setState({loading: true})

    try {
      await this.props.createRepo(this.state.name)
      this.handleClose();
    } catch (e) {
      console.log(`Error creating repo: ${e}`)
      this.setState({
        error: 'Failed to create a new repo',
        loading: false
      })
    }
  }

  render() {
    const {classes} = this.props
    const {loading, error} = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          style={this.props.buttonStyle}
          onClick={this.handleClickOpen}>
          Create New Todo Repo
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Repository</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new repository to store your todos in
            </DialogContentText>
            <TextField
              autoFocus
              label={error ? error : 'Repository Name'}
              error={error}
              disabled={loading}
              margin="dense"
              id="name"
              type="string"
              onChange={this.onChangeRepoName}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <div className={classes.wrapper}>
              <Button disabled={loading} onClick={this.handleCreate} color="primary">
                Create
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(NewRepoDialog)
