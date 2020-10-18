import {
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  makeStyles,
  Typography
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Alert, Rating } from '@material-ui/lab';
import last from 'lodash/last';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { API_BASE_URL } from '../../constants/apiConstants';
import { fetchSingleOrListOfGames } from '../../utils/apiUtils';

import { useGamesContext } from '../../context/GamesContextProvider';
import GameDetailsGenres from './GameDetailsGenres';
import GameDetailsPlatforms from './GameDetailsPlatforms';

const useStyles = makeStyles({
  favorite: {
    color: '#fad91e',
  },
  nonFavorite: {
    color: 'inherit',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    marginTop: 10,
  }
})

export default function GameDetails() {
  const [gameDetails, setGameDetails] = useState({})
  const { pathname } = useLocation();
  const id = last(pathname.split('/'));
  const completeApiUrl = `${API_BASE_URL}/${id}`;

  const { favorites, updateFavorites } = useGamesContext();
  const isInFavorites = favorites.some(favorite => favorite.id === gameDetails.id);

  const classes = useStyles();

  const fetchGameInformation = useQuery(completeApiUrl, fetchSingleOrListOfGames, {
    onSuccess: (data) => {
      setGameDetails(data);
    }
  });

  return (
    <>
    {fetchGameInformation.isLoading ? (
      <LinearProgress variant='query' />
    ) : fetchGameInformation.error ? (
      <Alert severity='error'>{fetchGameInformation.error.message}</Alert>
    ) : fetchGameInformation.data && gameDetails.id ? (
      <Container>
        <Typography variant='h2' component='h2' align='center' gutterBottom>
          {gameDetails.name}
          <IconButton className={isInFavorites ? classes.favorite : classes.nonFavorite} onClick={() => updateFavorites(gameDetails)}>
            {isInFavorites ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <img src={gameDetails.background_image} alt={gameDetails.name} style={{ width: '100%', marginBottom: '10px' }} />
            {gameDetails.background_image_additional !== '' ? <img src={gameDetails.background_image_additional} alt={gameDetails.name} style={{ width: '100%' }} /> : null}
            {gameDetails.website !== '' ? (
              <Typography variant='h6' component='h3' gutterBottom>
                Game website: <Link href={gameDetails.website} className={classes.link} target='_blank' rel='noopener noreferrer'>Click here</Link>
              </Typography>
            ) : null}
          </Grid>
          <Grid item sm={6}>
            <Typography variant='h6' component='h3' gutterBottom>Details:</Typography>
            <Typography variant='body1' component='p' gutterBottom>{gameDetails.description_raw}</Typography>
            <Typography className={classes.rating} variant='h6' component='h3' gutterBottom>Rating: <Rating defaultValue={gameDetails.rating} precision={0.1} readOnly /></Typography>
            <Typography variant='h6' component='h3' gutterBottom>Genres:</Typography>
            <GameDetailsGenres genres={gameDetails.genres} />
            <Typography variant='h6' component='h3' gutterBottom>Platforms:</Typography>
            <GameDetailsPlatforms platforms={gameDetails.platforms} />
          </Grid>
        </Grid>
      </Container>
    ) : null}
    </>
  )
}
