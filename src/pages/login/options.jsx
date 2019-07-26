import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, FormControlLabel, TextField, FormGroup, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import logger from '../../services/logger';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
});

export class LoginOptions extends React.Component {
  static propTypes = {
    onToggleAddMetaData: PropTypes.func,
  }

  static defaultProps = {
    onToggleAddMetaData: (e) => logger.debug('Toggled metadata', e.target)
  }

  state = {
    expanded: false,
    formValid: false,
    formData: {},
  }

  handleOpenPanel = panel => (event, isExpanded) => {
    this.setState({ expanded: !this.state.expanded })
  };

  isFormValid = (formData) => {
    return formData.securityCheck;
  }

  /**
   * Handles updating the state when todo title, text, or selectedRepository changes.
   * This includes interacting with the storage service to persist this data.
   */
  handleChange = (event) => {
    const formData = this.state.formData;
    formData[event.target.name] = event.target.value || event.target.checked;
    this.setState({ formData, formValid: this.isFormValid(formData) });
  }

  render() {
    const { expanded } = this.state;
    const { handleOpenPanel, handleChange } = this;
    return (
      <ExpansionPanel expanded={expanded} onChange={handleOpenPanel()}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="options"
          id="options"
        >
          <Typography>Advanced Options</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormGroup>
            <TextField
              label="Base URL"
              name="baseURL"
              helperText={'https://github.com/'}
              onChange={handleChange}
            />
            <TextField
              label="Server URL"
              name="serverURL"
              helperText={'https://gatekeeper.wolfpak.now.sh'}
              onChange={handleChange}
            />
            <TextField
              label="client_id"
              name="client_id"
              onChange={handleChange}
            />
            <TextField
              label="client_secret"
              name="client_secret"
              type="password"
              onChange={handleChange}
            />
            <FormControlLabel control={<Checkbox name="securityCheck" onChange={this.handleChange} />} label="I know what I'm doing & understand the security risks." />
            <Button disabled={!this.state.formValid} onClick={() => {
              handleOpenPanel()();
              this.props.onClickSaveButton(this.state.formData);
            }}>Save</Button>
          </FormGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(LoginOptions);