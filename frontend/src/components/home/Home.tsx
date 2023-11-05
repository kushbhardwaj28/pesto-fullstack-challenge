import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import Header from '../header/Header';
import { Route, Routes } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import Tasks from '../tasks/Tasks';
import User from '../user/User';
import { IUser } from '../../interfaces/user';
import axios from 'axios';
import { baseAPI, getUserPath } from '../../constants';
import { CircularProgress, Container } from '@mui/material';

interface Props {}

const navItems = [
  { displayText: 'Home', url: '/' },
  { displayText: 'User', url: '/user' },
];

export default function Home(props: Props) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState<IUser>({});
  const [isLoading, setLoading] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.displayText}
            onClick={() => navigate(item.url)}
            disablePadding
          >
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.displayText} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
      <Header
        handleDrawerToggle={handleDrawerToggle}
        container={window.document.body}
        mobileOpen={mobileOpen}
        drawer={drawer}
        navItems={navItems}
      />
      <Box component="main" sx={{ p: 3, mt: 5 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Tasks user={user} />}></Route>
          <Route path="/user" element={<User user={user} />}></Route>
          <Route path="/*" element={<h1>OOPS</h1>}></Route>
        </Routes>
      </Box>
    </Box>
  );
}
