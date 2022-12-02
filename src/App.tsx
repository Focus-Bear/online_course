import { Routes, Route } from 'react-router-dom';
import User from './components/User';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import NotFound from './components/404';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div
      className={`w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[url('./assets/images/background.svg')] bg-no-repeat bg-center bg-cover`}
    >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path='dashboard' element={<User />} />
          <Route path='admin' element={<Admin />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
