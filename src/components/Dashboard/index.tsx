import { useState } from 'react';
import Header from '../Header';
import DashboardCourse from './DashboardCourse';
import MyCourses from './MyCourses';
import Teach from './Teach';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);

  return (
    <div className='w-full h-full flex flex-col items-center py-16 relative'>
      <button
        onClick={() => {
          navigate('/', { replace: true });
        }}
        className='absolute top-1/5 right-[9%] flex items-center gap-2 w-fit h-fit bg-yellow-300 hover:bg-yellow-400 font-semibold px-4 py-1 text-blue-900 rounded'
      >
        Log Out
        <MdLogout />
      </button>
      <Header
        position={position}
        setPosition={setPosition}
      />
      {position === 0 ? (
        <DashboardCourse />
      ) : position === 1 ? (
        <MyCourses />
      ) : (
        <Teach />
      )}
    </div>
  );
};

export default Dashboard;
