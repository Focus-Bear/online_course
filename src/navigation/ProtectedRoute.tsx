import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TOKEN_ROLES_KEY, USER_ROLES } from '../constants/general';
import { ROUTES } from 'constants/routes';
import { useLazyGetUserDetailsQuery } from 'store/reducer/api';
import OverlaySpinner from 'components/common/OverlaySpinner';
import Layout from 'components/layout';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [getUserDetails, { isLoading, isFetching }] =
    useLazyGetUserDetailsQuery();

  useEffect(() => {
    if (user) {
      if (user?.[TOKEN_ROLES_KEY]?.[0] === USER_ROLES.ADMIN) {
        navigate(ROUTES.ADMIN);
      } else {
        navigate(ROUTES.DASHBOARD);
      }
      getUserDetails(null);
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, []);

  return (
    <Layout>
      <Outlet />
      {(isFetching || isLoading) && (
        <OverlaySpinner title='Fetching user data...' />
      )}
    </Layout>
  );
};

export default ProtectedRoute;
