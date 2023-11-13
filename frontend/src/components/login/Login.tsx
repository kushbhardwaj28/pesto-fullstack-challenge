import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Box,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../loginImg.png';
import { baseAPI, loginPath } from '../../constants';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [userToken] = useCookies(['user_token']);

  const navigate = useNavigate();

  const submitLoginForm = (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataJSON = Object.fromEntries(formData);
    const btnPointer = document.querySelector('#login-btn');
    if (btnPointer) {
      btnPointer.setAttribute('disabled', 'true');
      axios
        .post(baseAPI + loginPath, formDataJSON, { withCredentials: true })
        .then((response) => {
          btnPointer.removeAttribute('disabled');

          setTimeout(() => {
            navigate('/');
          }, 500);
        })
        .catch((error) => {
          console.log(error.response);
          setIsLoading(false);
          setOpen(true);
          setErrorMessage(error.response.data.error);
          btnPointer.removeAttribute('disabled');
        });
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const checkUserToken = () => {
    if (userToken && userToken.user_token) {
      return navigate('/');
    }
  };
  useEffect(() => {
    checkUserToken();
  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitLoginForm}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              id="login-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '46px' }}
            >
              {isLoading ? <CircularProgress color="warning" /> : 'Sign In'}
            </Button>
            <Grid container sx={{ justifyContent: 'end' }}>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
