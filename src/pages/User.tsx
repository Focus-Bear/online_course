import { Fragment, useEffect, useState } from 'react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import Header from '../components/Header';
import MyCourses from '../components/User/MyCourse';
import NewCourse from '../components/Course/NewCourse';
import Setting from '../components/User/Setting';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateIsNewCourseModalOpened } from '../store/reducer/user';
import { useAuth0 } from '@auth0/auth0-react';
import { useLazyGetAllCourseQuery } from '../store/reducer/api';

const User = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const [position, setPosition] = useState(0);
  const { isNewCourseModalOpened } = useAppSelector((state) => state.user);
  const [getAllCourses] = useLazyGetAllCourseQuery();

  // useEffect(() => {
  //   getAllCourses();
  // }, []);

  return (
    <Fragment>
      <div className='w-full h-full flex flex-col items-center relative'>
        <div className='absolute top-[10%] right-0 flex items-center gap-4'>
          {position === 0 && (
            <button
              onClick={() => {
                dispatch(updateIsNewCourseModalOpened(true));
              }}
              className='flex items-center gap-2 w-fit h-fit text-blue-900 bg-gray-100 hover:bg-gray-300 font-semibold px-4 py-1 rounded'
            >
              New Course
              <MdOutlineWysiwyg />
            </button>
          )}
          <button
            onClick={() => {
              logout({
                returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI!,
              });
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
      {isNewCourseModalOpened && <NewCourse />}
    </Fragment>
  );
};

export default User;
