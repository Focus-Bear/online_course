import { Routes, Route } from 'react-router-dom';
import User from '../pages/User';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import NotFound from '../pages/404';
import ErrorPage from '../pages/Error';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '../constant/general';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.HOME} element={<ProtectedRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<User />} />
        <Route path={ROUTES.ADMIN} element={<Admin />} />
      </Route>
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
