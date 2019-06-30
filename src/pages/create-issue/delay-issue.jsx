import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from '@material-ui/core';

const DelayIssue = ({ isChecked, handleChange, handleChangeChecked, date }) =>
    (
      <>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={handleChangeChecked}
                name="delayIssueChecked"
                color="primary"
              />
            }
            label="Delay Issue"
          />
          {isChecked && (
            <TextField
              id="datetime-local"
              label="Publication date"
              type="datetime-local"
              onChange={handleChange}
              defaultValue={date}
              name="delayIssueDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </FormControl>
      </>
    );

DelayIssue.propTypes = {
  isChecked: PropTypes.bool,
  handleChange: PropTypes.func,
  handleChangeChecked: PropTypes.func,
  date: PropTypes.string,
}
export default DelayIssue;
