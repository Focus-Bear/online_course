import { Routes, Route } from 'react-router-dom';
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

function App() {
  const dispatch = useAppDispatch();
  const {
    isLoading: isAuthLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(updateUserDetails(user));
      saveTokenToLocalStorage();
    }
  }, [isAuthenticated]);

  const saveTokenToLocalStorage = async () => {
    const token = await getAccessTokenSilently();
    if (token) window.localStorage.setItem('token', token);
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
          <Route path='login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute />}>
            <Route path='dashboard' element={<User />} />
            <Route path='admin' element={<Admin />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
