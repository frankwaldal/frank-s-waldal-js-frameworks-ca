import { Grid, makeStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  input: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

export default function FilterList({ filterGames }) {
  const classes = useStyles();
  return (
    <Grid container>
      <TextField className={classes.input} label='Filter games' helperText='Filter games by title' onChange={filterGames} margin='normal' />
    </Grid>
  )
}

FilterList.propTypes = {
  filterGames: PropTypes.func.isRequired,
}
