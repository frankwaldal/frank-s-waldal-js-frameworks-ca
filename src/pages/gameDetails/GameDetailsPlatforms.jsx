import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function GameDetailsPlatforms({ platforms }) {
  return (
    <List>
      {platforms.map(platform => {
        return (
          <ListItem key={platform.platform.id+platform.platform.name}>
            <ListItemAvatar>
              <Avatar alt={platform.platform.name} src={platform.platform.image_background} />
            </ListItemAvatar>
            <ListItemText primary={platform.platform.name} />
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
