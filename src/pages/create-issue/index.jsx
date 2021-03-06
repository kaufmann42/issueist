import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import GitHub from 'github-api';
import easyMDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import './style-overrides.css';
import { CircularProgress, Divider } from '@material-ui/core';
import { store, retrieve } from '../../services/storage';
import AutocompleteSelect from '../../components/autocomplete-select';
import NewRepoDialog from './new-repo-dialog.jsx'
import logger from '../../services/logger';

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
    marginTop: theme.spacing(2),
  },
  wrapper: {
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'white',
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
  return store('issueistFormData', {
    selectedRepository: state.selectedRepository,
    title: state.title,
    body: state.body
  })
}

function retrieveStateFromStorage() {
  return retrieve('issueistFormData')
}

class CreateIssue extends Component {
  state = {
    repositories: [],
    selectedRepository: '',
    title: '',
    body: '',
    timer: '',
    loading: false,
    template: null,
  }

  componentDidMount() {
    // First update the component's state with any todo data that was
    // persisted in the store.
    retrieveStateFromStorage()
      .then((state) => this.setState({ ...state }))

    retrieve('baseURL')
      .then((baseURL) => {
        // basic auth
        this.gh = new GitHub({
          token: this.props.token,
        },
          baseURL ? baseURL.slice(0, -1).replace('github', 'api.github') : undefined,
        ); // need to remove the last forward slash
        this.fetchUserRepos();
      })
      .catch((err) => {
        toast.error('There was an error connecting to github. Check console for details.');
        logger.error(err);
      });

    retrieve('issueistTemplate').then(template => {
      this.setState({ template });
      this.easyMDE = new easyMDE({
        element: document.getElementById('issueist-markdown-editor'),
        autosave: {
          delay: 500,
          uniqueId: 'issueist-body',
          enabled: true
        },
        minHeight: '70px',
        hideIcons: ['guide', 'side-by-side', 'fullscreen'],
        ...(template ? { initialValue: template } : {}),
      })
      this.easyMDE.codemirror.on("change", () => {
        this.handleChange({ target: { name: 'body', value: this.easyMDE.value() } });
      });
    })
      .catch((err) => {
        toast.error('There was an error initializing editor. Check console for details.');
        logger.error(err);
      });
  }

  /**
   * Helper function to update the state's `loading` property.
   */
  setLoading = (loading) => {
    this.setState({ loading });
  }

  submit = async () => {
    this.setLoading(true);
    const { title, body } = this.state;
    const user = this.state.selectedRepository.split('/')[0];
    const repo = this.state.selectedRepository.split('/')[1];
    if (!title || !repo) {
      toast.error('Title & repo required to submit issue.');
      this.setLoading(false);
      return;
    }

    try {
      const issue = this.gh.getIssues(user, repo);
      const response = await issue.createIssue({
        title,
        body,
      })

      this.setState({
        title: '',
        body: '',
      });
      this.easyMDE.value(this.state.template || '');

      writeStateToStorage({
        selectedRepository: this.state.selectedRepository
      });

      this.setLoading(false);
      toast(<Typography>Successfully submitted <a href={response.data.html_url} rel="noopener noreferrer" target="_blank">issue.</a></Typography>);
    } catch (e) {
      toast.error('Unknown error. Try again later.');
      this.setLoading(false)
    }
  }

  /**
   * Fetches github repositories and sets `this.state.repositories` to the results.
   * @return {Promise<Array<Object>>} Github Repositories
   */
  fetchUserRepos() {
    const user = this.gh.getUser();
    return user.listRepos()
      .then(({ data }) => {
        const repositories = data.map(d => d.full_name);
        this.setState({
          repositories
        });
        return repositories;
      });
  }

  /**
   * Creates a new repository and sets it to the selected repository to post new issues
   * to.
   * @return {Promise<string>} name of new repository
   */
  createNewTodoRepo = (name) => {
    const user = this.gh.getUser();
    return user.createRepo({ name })
      .then(({ data }) => {
        const newRepoName = data.full_name
        this.setState({
          repositories: this.state.repositories.concat(newRepoName),
          selectedRepository: newRepoName
        });
        toast(<Typography>Sucessfully created new github <a href={data.html_url} rel="noopener noreferrer" target="_blank">repository.</a></Typography>);
        return newRepoName;
      });
  }

  /**
   * Handles updating the state when todo title, text, or selectedRepository changes.
   * This includes interacting with the storage service to persist this data.
   */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value },
      () => {
        const state = this.state
        // If we already have a debounced `writeStateToStorage` function call waiting,
        // cancel it (`window.clearTimeout`) and create a new timeout.
        if (this.state.timer) {
          window.clearTimeout(this.state.timer)
        }
        let timer = window.setTimeout(() => writeStateToStorage(state), 100)
        this.setState({
          timer
        })
      });
  }

  saveEditorAsTemplate = () => {
    this.setState({ template: this.state.body });
    store('issueistTemplate', this.state.body);
  }

  render() {
    const { classes } = this.props;

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        flex: '1 1 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
        }}>
          <Typography variant="body2" color="inherit">
            Create Github issues.
          </Typography>
          <NewRepoDialog
            createRepo={this.createNewTodoRepo}
            buttonStyle={{ float: 'right' }}
          />
        </div>
        <FormControl fullWidth>
          <AutocompleteSelect
            name="selectedRepository"
            value={this.state.selectedRepository}
            options={this.state.repositories}
            onChange={this.handleChange}
            disabled={this.state.loading}
            placeholder="Select a repository"
            helperText="The repository to post the issue to."
          />
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
        <div style={{
          flex: '1 1 auto',
          display: 'flex',
          flexFlow: 'column',
        }}>
          <Button
            disabled={this.state.loading}
            onClick={this.saveEditorAsTemplate}
            className={classes.button}
            style={{ float: 'right', zIndex: 10 }}
          >
            Save Below As Template
            </Button>
          <textarea id="issueist-markdown-editor" />
        </div>
        <div className={classes.wrapper}>
          <Divider style={{ margin: '10px 0' }} />
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.loading}
            onClick={this.submit}
            className={classes.button}
            fullWidth
          >
            Submit
              </Button>
          {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    );
  }
}

CreateIssue.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default withStyles(styles)(CreateIssue);
