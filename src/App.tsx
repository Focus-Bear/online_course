import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/User/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import NotFound from './components/404';

function App() {
  return (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center bg-[url('./assets/images/background.svg')] bg-no-repeat bg-center bg-cover`}
    >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path='dashboard'
            element={<Dashboard />}
          />
          <Route
            path='admin'
            element={<Admin />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
