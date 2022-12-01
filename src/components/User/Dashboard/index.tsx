import { Fragment, useState } from 'react';
import Header from '../../Header';
import DashboardCourse from './DashboardCourse';
import MyCourses from '../MyCourses';
import {
  MdLogout,
  MdOutlineWysiwyg,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NewCourse from '../MyCourses/NewCourse';

const Dashboard = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [showNewCourse, setShowNewCourse] =
    useState(false);

  return (
    <Fragment>
      <div className='w-full h-full flex flex-col items-center relative'>
        <div className='absolute top-[10%] right-0 flex items-center gap-4'>
          {position !== 0 && (
            <button
              onClick={() => {
                setShowNewCourse(true);
              }}
              className='flex items-center gap-2 w-fit h-fit text-blue-900 bg-gray-100 hover:bg-gray-300 font-semibold px-4 py-1 rounded'
            >
              New Course
              <MdOutlineWysiwyg />
            </button>
          )}
          <button
            onClick={() => {
              navigate('/', { replace: true });
            }}
            className='flex items-center gap-2 w-fit h-fit bg-yellow-300 hover:bg-yellow-400 font-semibold px-4 py-1 text-blue-900 rounded'
          >
            Log Out
            <MdLogout />
          </button>
        </div>
        <Header
          position={position}
          setPosition={setPosition}
        />
        {position === 0 ? (
          <DashboardCourse />
        ) : (
          <MyCourses />
        )}
      </div>
      {showNewCourse && (
        <NewCourse
          setShowNewCourse={setShowNewCourse}
        />
      )}
    </Fragment>
  );
};

export default Dashboard;
