import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TOKEN_ROLES_KEY, USER_ROLES } from '../constants/general';
import { ROUTES } from 'constants/routes';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();

  useEffect(() => {
    if (!user) navigate(ROUTES.LOGIN);
    else {
      if (user?.[TOKEN_ROLES_KEY]?.[0] === USER_ROLES.ADMIN)
        navigate(ROUTES.ADMIN);
      else navigate(ROUTES.DASHBOARD);
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
