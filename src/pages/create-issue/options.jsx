import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, FormControlLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

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

export class Options extends React.Component {
  static propTypes = {
    onToggleAddMetaData: PropTypes.func,
  }

  static defaultProps = {
    onToggleAddMetaData: (e) => console.log('Toggled metadata', e.target)
  }

  state = {
    expanded: false,
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({expanded: !this.state.expanded})
  };
  render() {
    const {classes} = this.props;
    const {expanded} = this.state;
    const {handleChange} = this;
    return (
      <ExpansionPanel expanded={expanded} onChange={handleChange()}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="options"
          id="options"
        >
          <Typography className={classes.heading}>Options</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormControlLabel control={<Checkbox onChange={this.props.onToggleAddMetaData} />} label="Add Metadata" />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Options);
