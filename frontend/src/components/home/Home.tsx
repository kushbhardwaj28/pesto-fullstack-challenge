import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import Header from '../header/Header';
import { Route, Routes } from 'react-router-dom';

import Tasks from '../tasks/Tasks';
import { IUser } from '../../interfaces/user';
import axios from 'axios';
import { baseAPI, getUserPath } from '../../constants';
import { CircularProgress, Container } from '@mui/material';

export default function Home() {
  const [user, setUser] = React.useState<IUser>({});
  const [isLoading, setLoading] = React.useState(true);

  const getUser = useCallback(async () => {
    if (isLoading) {
      const user = await axios.get(baseAPI + getUserPath, {
        withCredentials: true,
      });
      setUser(user.data);
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoading ? (
        <Container
          id="progress-indicator"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'rgba(0, 0, 0, 0.4)',
            position: 'fixed',
            zIndex: 1000,
            width: '100vw',
            height: '100vh',
          }}
        >
          <CircularProgress></CircularProgress>
        </Container>
      ) : (
        <div id="non-progress-indicator"></div>
      )}
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Tasks user={user} />}></Route>
          <Route path="/*" element={<h1>OOPS</h1>}></Route>
        </Routes>
      </Box>
    </Box>
  );
}
