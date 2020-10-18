import { Container, Grid } from '@material-ui/core';
import React from 'react';

import { useGamesContext } from '../../context/GamesContextProvider';

import GameItem from '../homePage/GameItem';

export default function Favorites() {
  const { favorites } = useGamesContext();
  return (
    <Container>
      <Grid container>
        {favorites.map(favorite => <GameItem key={favorite.id+favorite.name} game={favorite} />)}
      </Grid>
    </Container>
  )
}
