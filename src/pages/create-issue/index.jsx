import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import GitHub from 'github-api';
import moment from 'moment';
import {CircularProgress, } from '@material-ui/core';

import {store, retrieve} from '../../services/storage';
import {startPollingDelayedIssues, stopPollingDelayedIssues, delayIssue} from '../../services/delayed-processor';
import DelayIssue from './delay-issue';
import NewRepoDialog from './new-repo-dialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  wrapper: {
    paddingTop: '20px',
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

function writeStateToStorage(state) {
  return store('issueistFormData', state)
}

function retrieveStateFromStorage() {
  return retrieve('issueistFormData');
}

class App extends Component {
  state = {
    repositories: [],
    selectedRepository: '',
    delayIssueDate: moment().format('YYYY-MM-DDTHH:mm'),
    delayIssueChecked: false,
    title: '',
    body: '',
    timer: '',
    error: null,
    loading: false,
  };

  componentDidMount() {
    // First update the component's state with any todo data that was
    // persisted in the store.
    retrieveStateFromStorage().then(state => this.setState({...state}));

    // basic auth
    this.gh = new GitHub({
      token: this.props.token,
    });

    this.fetchUserRepos();
    // Now that the user is logged in, start polling for any delayed issues they may have
    startPollingDelayedIssues(this.gh);
  }

  /**
   * Helper function to update the state's `loading` property.
   */
  setLoading = loading => {
    this.setState({loading});
  };

  submit = async () => {
    this.setLoading(true);
    const {title, body} = this.state;
    const user = this.state.selectedRepository.split('/')[0];
    const repo = this.state.selectedRepository.split('/')[1];
    if (!title || !repo) {
      this.setState({
        error: 'Title & repo required to submit issue.',
      });
      this.setLoading(false);
      return;
    }

    try {
      const issue = this.gh.getIssues(user, repo);

      if (this.state.delayIssueChecked) {
        await delayIssue({user, repo, title, body, date: this.state.delayIssueDate})
      } else {
        await issue.createIssue({
          title,
          body,
        });
      }

      this.setState({
        title: '',
        body: '',
        delayIssueChecked: false,
        delayIssueDate: moment().format('YYYY-MM-DDTHH:mm'),
        error: null,
      });

      writeStateToStorage({
        selectedRepository: this.state.selectedRepository,
      });

      this.setLoading(false);
    } catch (e) {
      this.setState({error: 'Unknown error. Try again later.'});
      this.setLoading(false);
    }
  };

  /**
   * Fetches github repositories and sets `this.state.repositories` to the results.
   * @return {Promise<Array<Object>>} Github Repositories
   */
  fetchUserRepos() {
    const user = this.gh.getUser();
    return user.listRepos().then(({data}) => {
      const repositories = data.map(d => d.full_name);
      this.setState({
        repositories,
      });
      return repositories;
    });
  }

  /**
   * Creates a new repository and sets it to the selected repository to post new issues
   * to.
   * @return {Promise<string>} name of new repository
   */
  createNewTodoRepo = name => {
    const user = this.gh.getUser();
    return user.createRepo({name}).then(({data}) => {
      const newRepoName = data.full_name;
      this.setState({
        repositories: this.state.repositories.concat(newRepoName),
        selectedRepository: newRepoName,
      });
      return newRepoName;
    });
  };

  handleChangeCheckDelayIssue = event => {
    this.handleUpdateStateAndStorage(event.target.name, event.target.checked)
  }

  /**
   * Handles updating the state when todo title, text, or selectedRepository changes.
   * This includes interacting with the storage service to persist this data.
   */
  handleChange = event => {
    this.handleUpdateStateAndStorage(event.target.name, event.target.value);
  };

  handleUpdateStateAndStorage = (name, value) => {
    this.setState({[name]: value}, () => {
      const state = this.state;
      // If we already have a debounced `writeStateToStorage` function call waiting,
      // cancel it (`window.clearTimeout`) and create a new timeout.
      if (this.state.timer) {
        window.clearTimeout(this.state.timer);
      }
      let timer = window.setTimeout(() => writeStateToStorage(state), 100);
      this.setState({
        timer,
      });
    });
  }

  componentWillUnmount() {
    // Turn off the delayed issue poller
    stopPollingDelayedIssues();
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <div style={{padding: '20px'}}>
          <Typography variant="body2" color="inherit">
            Save your thoughts straight to your Github repositories issues.
          </Typography>
          <NewRepoDialog
            createRepo={this.createNewTodoRepo}
            buttonStyle={{float: 'right'}}
          />
          <div className={classes.root}>
            <FormControl fullWidth>
              <InputLabel htmlFor="selectedRepository-simple">
                Select Repo
              </InputLabel>
              <Select
                value={this.state.selectedRepository}
                onChange={this.handleChange}
                disabled={this.state.loading}
                inputProps={{
                  name: 'selectedRepository',
                  id: 'selectedRepository-simple',
                }}>
                {this.state.repositories.map((repo, index) => (
                  <MenuItem key={index} value={repo}>
                    {repo}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                The repository to post the issue to.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="filled-title"
                label="Issue Title"
                name="title"
                disabled={this.state.loading}
                value={this.state.title}
                onChange={this.handleChange}
                margin="normal"
                variant="filled"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="filled-multiline-flexible"
                label="Issue Body"
                name="body"
                multiline
                rows="8"
                disabled={this.state.loading}
                value={this.state.body}
                onChange={this.handleChange}
                margin="normal"
                helperText="Markdown to fill the issue with"
                variant="filled"
              />
            </FormControl>

            <DelayIssue
              isChecked={this.state.delayIssueChecked}
              date={this.state.delayIssueDate}
              handleChangeChecked={this.handleChangeCheckDelayIssue}
              handleChange={this.handleChange} />

            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.loading}
                onClick={this.submit}
                className={classes.button}
                fullWidth>
                Submit
              </Button>
              {this.state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <Typography color="error">{this.state.error}</Typography>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default withStyles(styles)(App);
