import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES, TOKEN_ROLES_KEY } from 'constants/routes';
import { useLazyGetUserDetailsQuery } from 'store/reducer/api';
import OverlaySpinner from 'components/common/OverlaySpinner';
import Layout from 'components/layout';
import { useAppDispatch } from 'store';
import { updateIsAdmin } from 'store/reducer/user';
import { USER_ROLES } from 'constants/enum';
import { t } from 'i18next';

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [getUserDetails, { isLoading, isFetching }] =
    useLazyGetUserDetailsQuery();
  const isFetchingOrLoading = isFetching || isLoading;

  useEffect(() => {
    if (user) {
      if (user?.[TOKEN_ROLES_KEY]?.includes(USER_ROLES.ADMIN)) {
        navigate(ROUTES.ADMIN);
        dispatch(updateIsAdmin(true));
      } else {
        navigate(ROUTES.DASHBOARD);
      }
      getUserDetails();
    }
  }, [user]);

  return user ? (
    <Layout>
      <Outlet />
      {isFetchingOrLoading && (
        <OverlaySpinner title={t('fetching_user_data')} />
      )}
    </Layout>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default ProtectedRoute;
