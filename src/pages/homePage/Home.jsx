import { Container, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Alert, Pagination } from '@material-ui/lab';
import sortBy from 'lodash/sortBy';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { API_BASE_URL } from '../../constants/apiConstants';
import { fetchSingleOrListOfGames } from '../../utils/apiUtils';

import FilterList from './FilterList';
import GameItem from './GameItem';

const useStyles = makeStyles({
  pagination: {
    margin: '10px auto',
  }
});

export default function Home() {
  const [completeListOfGames, setCompleteListOfGames] = useState([]);
  const [filteredListOfGames, setFilteredListOfGames] = useState([]);
  const [apiUrl, setApiUrl] = useState(API_BASE_URL);
  const [currentApiPage, setCurrentApiPage] = useState(1);
  const [apiPagesCount, setApiPagesCount] = useState(0);

  const classes = useStyles();

  const fetchGames = useQuery(apiUrl, fetchSingleOrListOfGames, {
    onSuccess: (data) => {
      if (apiPagesCount === 0) {
        setApiPagesCount(Math.ceil(data.count / data.results.length));
      }
      setCompleteListOfGames(sortBy(data.results, 'name'));
      setFilteredListOfGames(sortBy(data.results, 'name'));
    }
  });

  function filterGames(e) {
    const filteredGames = completeListOfGames.filter(game => {
      return game.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) || game.slug.toLowerCase().includes(e.currentTarget.value.toLowerCase());
    })
    setFilteredListOfGames(filteredGames);
  }

  function handlePagination(e, page) {
    const newApiUrl = `${API_BASE_URL}?page=${page}`;
    setCurrentApiPage(page);
    setApiUrl(newApiUrl);
  }

  return (
    <Container>
      <Typography variant='h1' align='center' component='h2'>Games</Typography>
      {fetchGames.isLoading ? (
        <LinearProgress variant='query' />
      ): fetchGames.error ? (
        <Alert severity='error'>{fetchGames.error.message}</Alert>
      ) : fetchGames.data ? (
        <>
          <FilterList filterGames={filterGames} />
          <Grid container>
            {filteredListOfGames.map(game => <GameItem key={game.id+game.name} game={game} />)}
          </Grid>
          {apiPagesCount > 0 ? (
            <Grid container>
              <Pagination className={classes.pagination} variant='outlined' color='primary' count={apiPagesCount} page={currentApiPage} onChange={handlePagination} showFirstButton showLastButton />
            </Grid>
          ) : null}
        </>
      ) : null}
    </Container>
  )
}
