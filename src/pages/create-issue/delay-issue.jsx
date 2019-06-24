import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@material-ui/core';

class DelayIssue extends Component {


  render() {
    return (
      <>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.isChecked}
                onChange={this.props.handleChangeChecked}
                name="delayIssueChecked"
                color="primary"
              />
            }
            label="Delay Issue"
          />
          {this.props.isChecked && (
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              onChange={this.props.handleChange}
              defaultValue={this.props.date}
              name="delayIssueDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </FormControl>
      </>
    );
  }
}

DelayIssue.propTypes = {
  isChecked: PropTypes.bool,
  handleChange: PropTypes.func
}
export default DelayIssue;
