import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TOKEN_ROLES_KEY, USER_ROLES } from '../constant/general';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
    if (!user) navigate('/login');
    else {
      if (user?.[TOKEN_ROLES_KEY]?.[0] === USER_ROLES.ADMIN)
        navigate('admin');
      else navigate('dashboard');
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
