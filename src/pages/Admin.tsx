import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Courses from '../components/common/course';
import Permissions from '../components/admin/Permissions';
import Users from '../components/admin/Users';
import Layout from 'components/layout';
import { useAppDispatch, useAppSelector } from 'store';
import { TAB } from 'constants/general';
import {
  updateIsNewCourseModalOpened,
  updateNewCourse,
} from 'store/reducer/course';
import { DEFAULT_NEW_COURSE } from 'assets/data';

const AdminActions = () => {
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

const Admin = () => {
  return (
    <Layout>
      <AdminActions />
      <Tabs className='w-full h-full bg-gray-200/50 rounded overflow-hidden'>
        <TabList className='flex gap-2 bg-gray-400 border-b-2 border-gray-100 rounded-t'>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer'>
            Courses
          </Tab>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer'>
            Users
          </Tab>
          <Tab className='w-fit text-center font-bold text-sm px-5 py-2 tracking-wide cursor-pointer'>
            Permissions
          </Tab>
        </TabList>
        <TabPanel className='w-full h-full p-4'>
          <Courses />
        </TabPanel>
        <TabPanel className='w-full h-full p-4'>
          <Users />
        </TabPanel>
        <TabPanel className='w-full h-full p-4'>
          <Permissions />
        </TabPanel>
      </Tabs>
    </Layout>
  );
};

export default Admin;
