import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state);

  if (!user.details) {
    return <Navigate to='/' replace />;
  }
  return (
    <div className='w-5/6 h-3/4 flex flex-col items-center'>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
