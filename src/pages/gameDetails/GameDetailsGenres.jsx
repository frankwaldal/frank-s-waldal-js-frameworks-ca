import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function GameDetailsGenres({ genres }) {
  return(
    <List>
      {genres.map(genre => {
        return(
          <ListItem key={genre.id+genre.name}>
            <ListItemAvatar>
              <Avatar alt={genre.name} src={genre.image_background} />
            </ListItemAvatar>
            <ListItemText primary={genre.name} />
          </ListItem>
        )
      })}
    </List>
  )
}

GameDetailsGenres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image_background: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
}
