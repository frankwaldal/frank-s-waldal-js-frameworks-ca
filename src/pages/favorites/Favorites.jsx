import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { useGamesContext } from '../../context/GamesContextProvider';

import GameItem from '../homePage/GameItem';

export default function Favorites() {
  const { favorites } = useGamesContext();
  return (
    <Container>
      <Typography variant='h2' align='center' component='h2'>Favorites</Typography>
      <Grid container>
        {favorites.map(favorite => <GameItem key={favorite.id+favorite.name} game={favorite} />)}
      </Grid>
    </Container>
  )
}
