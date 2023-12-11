import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'components/Loading';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store';
import { TOKEN_NAME } from 'constants/general';
import AppRoutes from './AppRoutes';
import { ROUTES } from 'constants/routes';

function Navigation() {
  const navigate = useNavigate();
  const [isCheckingPreConditions, setIsCheckingPreConditions] =
    useState(true);
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    getAccessTokenSilently,
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
