import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './SideMenuStyles';

const SideMenu = ({ classes }) => {
  return <div className={classes.sideMenu}>Side menu</div>;
};

export default withStyles(styles)(SideMenu);
