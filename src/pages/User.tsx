import { useEffect } from 'react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import MyCourses from 'components/common/course';
import NewCourse from 'components/common/course/NewCourse';
import { updateIsNewCourseModalOpened } from 'store/reducer/user';
import { useAuth0 } from '@auth0/auth0-react';
import { useLazyGetAllCourseQuery } from 'store/reducer/api';
import { useAppDispatch, useAppSelector } from 'store';
import { TAB } from 'constants/general';
import Configuration from 'components/User/Configuration';
import Layout from 'components/Layout';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const UserActions = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { currentTab } = useAppSelector((state) => state.setting);

  return (
    <div className='absolute -top-10 right-0 flex items-center gap-4'>
      {currentTab === TAB.COURSES && (
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
  );
};

const User = () => {
  const {
    user: { isNewCourseModalOpened },
  } = useAppSelector((state) => state);
  const [getAllCourses] = useLazyGetAllCourseQuery();

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Layout>
      <Tabs className='w-full h-full bg-gray-200/50 rounded overflow-hidden'>
        <TabList className='w-full h-[5%] flex gap-2 bg-gray-400 border-b-2 border-gray-100 rounded-t'>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer outline-none'>
            My Courses
          </Tab>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer outline-none'>
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
      {isNewCourseModalOpened && <NewCourse />}
      <UserActions />
    </Layout>
  );
};

export default User;
