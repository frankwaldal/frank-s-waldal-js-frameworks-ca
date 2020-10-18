import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Rating } from '@material-ui/lab';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { useGamesContext } from '../../context/GamesContextProvider';

const useStyles = makeStyles({
  favorite: {
    margin: '5px',
    color: '#fad91e',
    background: 'rgba(22,21,26,0.45)',
    '&:hover': {
      background: 'rgba(22,21,26,0.65)',
    },
  },
  nonFavorite: {
    margin: '5px',
    color: 'inherit',
    background: 'rgba(22,21,26,0.45)',
    '&:hover': {
      background: 'rgba(22,21,26,0.65)',
    },
  },
  card: {
    margin: 10,
    width: 375,
  },
  media: {
    height: 200,
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  }
});

export default function GameItem({ game }) {
  const classes = useStyles();

  const { favorites, updateFavorites } = useGamesContext();
  const isInFavorites = favorites.some(favorite => favorite.id === game.id);

  const link = `/game/${game.id}`;

  return (
    <Card className={classes.card} raised>
      <CardMedia
        className={classes.media}
        image={game.background_image}
        title={game.name}
        >
        <IconButton className={isInFavorites ? classes.favorite : classes.nonFavorite} onClick={() => updateFavorites(game, true)}>
          {isInFavorites ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </CardMedia>
      <CardContent>
        <Typography variant='h5' align='center' component='h3' gutterBottom>{game.name}</Typography>
        <Typography variant='body1' component='p' className={classes.rating} gutterBottom>
          Rating: <Rating defaultValue={game.rating} precision={0.1} readOnly />
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          Released: {format(new Date(game.released), 'do MMM yyyy')}
        </Typography>
        <Link to={link} className='muiStyleButton muiStyleButton muiStyleButton-text'>More information</Link>
      </CardContent>
    </Card>
  )
}

GameItem.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    background_image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    released: PropTypes.string.isRequired,
  })
}
