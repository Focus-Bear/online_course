import { useEffect } from 'react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import MyCourses from 'components/common/course';
import { updateIsNewCourseModalOpened } from 'store/reducer/user';
import { useAuth0 } from '@auth0/auth0-react';
import { useLazyGetAllCourseQuery } from 'store/reducer/api';
import { useAppDispatch, useAppSelector } from 'store';
import { TAB } from 'constants/general';
import Configuration from 'components/user/Configuration';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateNewCourse } from 'store/reducer/course';
import { DEFAULT_NEW_COURSE } from 'assets/data';

const UserActions = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { currentTab } = useAppSelector((state) => state.setting);

  return (
    <div className='absolute -top-10 right-0 flex items-center gap-4'>
      {currentTab === TAB.COURSES && (
        <button
          onClick={() => {
            dispatch(updateNewCourse(DEFAULT_NEW_COURSE));
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
  );
};

const User = () => {
  const [getAllCourses] = useLazyGetAllCourseQuery();

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <Tabs className='w-full h-full bg-gray-200/50 rounded overflow-hidden'>
        <TabList className='w-full h-[5%] flex gap-2 bg-gray-400 border-b-2 border-gray-100 rounded-t'>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-1 tracking-wide cursor-pointer outline-none leading-3 xl:leading-6'>
            My Courses
          </Tab>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-1 tracking-wide cursor-pointer outline-none leading-3 xl:leading-6'>
            Configuration
          </Tab>
        </TabList>
        <TabPanel className='w-full h-[95%]'>
          <MyCourses />
        </TabPanel>
        <TabPanel className='w-full h-[95%]'>
          <Configuration />
        </TabPanel>
      </Tabs>
      <UserActions />
    </>
  );
};

export default User;
