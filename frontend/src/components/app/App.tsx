import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Home from '../home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {/* {isLoggedIn && <PortalNavbar />} */}
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
      {/* {isLoggedIn && <PortalFooter />} */}
    </React.Fragment>
  );
}
export default App;
