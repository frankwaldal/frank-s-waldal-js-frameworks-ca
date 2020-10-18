import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function GameDetailsPlatforms({ platforms }) {
  return (
    <List>
      {platforms.map(platformObj => {
        const { platform } = platformObj;
        return (
          <ListItem key={platform.id+platform.name}>
            <ListItemAvatar>
              <Avatar alt={platform.name} src={platform.image_background} />
            </ListItemAvatar>
            <ListItemText primary={platform.name} />
          </ListItem>
        )
      })}
    </List>
  )
}

GameDetailsPlatforms.propTypes = {
  platforms: PropTypes.arrayOf(PropTypes.shape({
    platform: PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_background: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  })),
}
