import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'components/common/Loading';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { TOKEN_NAME } from 'constants/general';
import AppRoutes from './AppRoutes';
import { ROUTES, TOKEN_ROLES_KEY } from 'constants/routes';
import { USER_ROLES } from 'constants/enum';
import { updateIsAdmin } from 'store/reducer/user';

function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCheckingPreConditions, setIsCheckingPreConditions] =
    useState(true);
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    getAccessTokenSilently,
    user: auth0User,
  } = useAuth0();
  const { error } = useAppSelector((state) => state);

  useEffect(() => {
    if (!isAuthLoading) {
      isAuthenticated ? saveTokenToLocalStorage() : navigate(ROUTES.LOGIN);
      setIsCheckingPreConditions(false);
    }
  }, [isAuthenticated, isAuthLoading]);

  useEffect(() => {
    if (error.hasError) {
      navigate(ROUTES.ERROR);
      setIsCheckingPreConditions(false);
    }
  }, [error]);

  const saveTokenToLocalStorage = async () => {
    const token = await getAccessTokenSilently();
    if (token) {
      window.localStorage.setItem(TOKEN_NAME, token);
      auth0User?.[TOKEN_ROLES_KEY].includes(USER_ROLES.ADMIN) &&
        dispatch(updateIsAdmin(true));
      navigate(ROUTES.HOME);
    } else {
      navigate(ROUTES.LOGIN);
    }
    setIsCheckingPreConditions(false);
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-main overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500'>
      {isCheckingPreConditions ? <Loading /> : <AppRoutes />}
      <ToastContainer />
    </div>
  );
}

export default Navigation;
