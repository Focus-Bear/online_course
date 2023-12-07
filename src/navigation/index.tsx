import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from 'components/Loading';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { updateIsLoading, updateUserDetails } from 'store/reducer/user';
import { TOKEN_NAME } from 'constants/general';
import AppRoutes from './AppRoutes';
import { ROUTES } from 'constants/routes';

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

  //TODO: fetch user details

  const saveTokenToLocalStorage = async () => {
    const token = await getAccessTokenSilently();
    if (token) {
      window.localStorage.setItem(TOKEN_NAME, token);
    }
    dispatch(updateIsLoading(false));
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center bg-main overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500'>
      {isAuthLoading || isLoading ? <Loading /> : <AppRoutes />}
      <ToastContainer />
    </div>
  );
}

export default Navigation;
