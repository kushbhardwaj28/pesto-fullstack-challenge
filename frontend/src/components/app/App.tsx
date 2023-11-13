import React, { useEffect } from 'react';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Home from '../home/Home';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function App() {
  const [userToken] = useCookies(['user_token']);
  const navigate = useNavigate();

  const checkUserToken = () => {
    if (!userToken.user_token) {
      navigate('/login');
    }
  };
  useEffect(() => {
    checkUserToken();
  });

  return (
    <React.Fragment>
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    </React.Fragment>
  );
}
export default App;
