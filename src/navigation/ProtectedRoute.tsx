import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useLazyGetUserDetailsQuery } from 'store/reducer/api';
import OverlaySpinner from 'components/common/OverlaySpinner';
import Layout from 'components/layout';
import { useAppSelector } from 'store';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { isAdmin } = useAppSelector((state) => state.user);
  const [getUserDetails, { isLoading, isFetching }] =
    useLazyGetUserDetailsQuery();
  const isFetchingOrLoading = isFetching || isLoading;

  useEffect(() => {
    if (user) {
      isAdmin ? navigate(ROUTES.ADMIN) : navigate(ROUTES.DASHBOARD);
      getUserDetails();
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, []);

  return (
    <Layout>
      <Outlet />
      {isFetchingOrLoading && (
        <OverlaySpinner title='Fetching user data...' />
      )}
    </Layout>
  );
};

export default ProtectedRoute;
