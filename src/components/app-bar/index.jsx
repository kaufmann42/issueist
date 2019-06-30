import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
  formControl: {
    margin: theme.spacing(),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export class CustomAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClickMenu: PropTypes.func,
  }

  render() {
    const {classes} = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          {Boolean(this.props.onClickMenu) && <IconButton onClick={() => this.props.onClickMenu()} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Issueist
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);