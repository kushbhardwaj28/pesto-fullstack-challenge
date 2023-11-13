import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = (props: any) => {
  const navigate = useNavigate();
  const [userToken] = useCookies(['user_token']);

  const checkUserToken = () => {
    console.log(!userToken || !userToken.user_token);
    if (!userToken.user_token) {
      return navigate('/login');
    }
  };
  useEffect(() => {
    checkUserToken();
  });
  return (
    <React.Fragment>
      {userToken.user_token ? props.children : null}
    </React.Fragment>
  );
};
export default ProtectedRoute;
