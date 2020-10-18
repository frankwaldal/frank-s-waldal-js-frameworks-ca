import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

import { API_BASE_URL } from '../constants/apiConstants';
import { fetchSingleOrListOfGames } from '../utils/apiUtils';

const GamesContext = createContext();

export default function GamesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  async function updateFavorites(game, overviewClick) {
    if (overviewClick) {
      if (favorites.some(favorite => favorite.id === game.id)) {
        const updatedFavorites = favorites.filter(favorite => favorite.id !== game.id);
        setFavorites(updatedFavorites);
      } else {
        const apiUrl = `${API_BASE_URL}/${game.id}`;
        const gameDetailed = await fetchSingleOrListOfGames(apiUrl);
        const updatedFavorites = [...favorites, gameDetailed];
        setFavorites(updatedFavorites);
      }
    } else {
      if (favorites.includes(game)) {
        const updatedFavorites = favorites.filter(favorite => favorite.id !== game.id);
        setFavorites(updatedFavorites);
      } else {
        const updatedFavorites = [...favorites, game];
        setFavorites(updatedFavorites);
      }
    }
  }

  return (
    <GamesContext.Provider
      value={{
        favorites,
        updateFavorites: (game, overviewClick) => updateFavorites(game, overviewClick),
      }}
      >
      {children}
    </GamesContext.Provider>
  )
}

export const useGamesContext = () => useContext(GamesContext);

GamesContextProvider.propTypes = {
  children: PropTypes.node,
}
