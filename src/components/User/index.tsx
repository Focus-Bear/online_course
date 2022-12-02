import { Fragment, useState } from 'react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import MyCourses from './MyCourse';
import NewCourse from '../Course/NewCourse';
import Setting from './Setting';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateIsNewCourseOpened } from '../../store/reducer/user';

const User = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const { isNewCourseOpened } = useAppSelector((state) => state.user);

  return (
    <Fragment>
      <div className='w-full h-full flex flex-col items-center relative'>
        <div className='absolute top-[10%] right-0 flex items-center gap-4'>
          {position === 0 && (
            <button
              onClick={() => {
                dispatch(updateIsNewCourseOpened(true));
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
        <Header position={position} setPosition={setPosition} />
        {position === 0 ? <MyCourses /> : <Setting />}
      </div>
      {isNewCourseOpened && <NewCourse />}
    </Fragment>
  );
};

export default User;
