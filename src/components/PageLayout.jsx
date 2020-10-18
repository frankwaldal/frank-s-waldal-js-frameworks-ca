import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GamesContextProvider from '../context/GamesContextProvider';
import Contact from '../pages/contact/Contact';
import Favorites from '../pages/favorites/Favorites';
import GameDetails from '../pages/gameDetails/GameDetails';
import Home from '../pages/homePage/Home';
import SiteHeader from './SiteHeader';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

export default function PageLayout() {
  return (
    <ThemeProvider theme={theme}>
      <GamesContextProvider>
        <Router>
          <SiteHeader />
          <Switch>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/game/'>
              <GameDetails />
            </Route>
            <Route path='/favorites'>
              <Favorites />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
          </Switch>
        </Router>
      </GamesContextProvider>
    </ThemeProvider>
  )
}
