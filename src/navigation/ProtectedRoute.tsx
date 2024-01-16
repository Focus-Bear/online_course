import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES, TOKEN_ROLES_KEY } from 'constants/routes';
import { useLazyGetUserDetailsQuery } from 'store/reducer/api';
import OverlaySpinner from 'components/common/OverlaySpinner';
import Layout from 'components/layout';
import { useAppDispatch } from 'store';
import { updateIsAdmin } from 'store/reducer/user';
import { USER_ROLES } from 'constants/enum';
import Spinner from 'components/Spinner';
import { MdRefresh } from 'react-icons/md';

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [getUserDetails, { isLoading, isFetching }] =
    useLazyGetUserDetailsQuery();
  const isFetchingOrLoading = isFetching || isLoading;
  const [isCheckingPreConditions, setIsCheckingPreConditions] =
    useState(true);

  useEffect(() => {
    if (user) {
      if (user?.[TOKEN_ROLES_KEY]?.includes(USER_ROLES.ADMIN)) {
        navigate(ROUTES.ADMIN);
        dispatch(updateIsAdmin(true));
      } else {
        navigate(ROUTES.DASHBOARD);
      }
      setIsCheckingPreConditions(false);
      getUserDetails();
    }
  }, []);

  return user ? (
    <Layout>
      {isCheckingPreConditions ? <Spinner /> : <Outlet />}
      {isFetchingOrLoading && (
        <OverlaySpinner title='Fetching user data...' />
      )}
      {window.location.pathname === ROUTES.HOME && (
        <button
          onClick={() => window.location.reload()}
          className='buttonDark px-6 py-2 rounded-lg lg:text-2xl absolute top-1/2 left-1/2 flex items-center justify-center gap-1'
        >
          Refresh
          <MdRefresh />
        </button>
      )}
    </Layout>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default ProtectedRoute;
