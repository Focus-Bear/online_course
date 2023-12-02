import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateIsLoading, updateUserDetails } from '../store/reducer/user';
import { ROUTES, TOKEN_NAME } from '../constant/general';
import AppRoutes from './AppRoutes';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const {
    user: { isLoading },
    error,
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(updateUserDetails(user));
      saveTokenToLocalStorage();
    }
    if (error.hasError) {
      navigate(ROUTES.ERROR);
    }
  }, [isAuthenticated, error]);

  const saveTokenToLocalStorage = async () => {
    const token = await getAccessTokenSilently();
    if (token) {
      window.localStorage.setItem(TOKEN_NAME, token);
    }
    dispatch(updateIsLoading(false));
  };

  return isAuthLoading || isLoading ? (
    <Loading />
  ) : (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[url('./assets/images/background.svg')] bg-no-repeat bg-center bg-cover`}
    >
      <div className='w-5/6 h-3/4 flex flex-col items-center'>
        <AppRoutes />
        <ToastContainer />
      </div>
    </div>
  );
}

export default Navigation;
