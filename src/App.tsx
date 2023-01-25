import { Routes, Route, useNavigate } from 'react-router-dom';
import User from './components/User';
import Login from './components/Login';
import Admin from './components/Admin';
import NotFound from './components/404';
import { ToastContainer } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { updateIsLoading, updateUserDetails } from './store/reducer/user';
import ProtectedRoute from './components/ProtectedRoute';
import { ROUTES, TOKEN_NAME } from './utils/constants';
import ErrorPage from './components/Error';

function App() {
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
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.HOME} element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<User />} />
            <Route path={ROUTES.ADMIN} element={<Admin />} />
          </Route>
          <Route path={ROUTES.ERROR} element={<ErrorPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
