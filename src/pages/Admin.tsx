import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Courses from 'components/common/course';
import Users from 'components/admin/Users';
import Layout from 'components/layout';
import { useAppDispatch, useAppSelector } from 'store';
import { updateNewCourse } from 'store/reducer/course';
import { DEFAULT_NEW_COURSE } from 'assets/data';
import { ADMIN_TAB } from 'constants/general';
import Configuration from 'components/admin/Configuration';
import { updateCurrentTab } from 'store/reducer/setting';

const getTabContent = (tab: number) => {
  switch (tab) {
    case ADMIN_TAB.CONFIGURATION.tabIndex:
      return <Configuration />;
    case ADMIN_TAB.USERS.tabIndex:
      return <Users />;
    default:
      return <Courses />;
  }
};
const AdminActions = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  return (
    <div className='absolute -top-10 right-0 flex items-center gap-4'>
      <button
        onClick={() => {
          dispatch(updateNewCourse(DEFAULT_NEW_COURSE));
        }}
        className='flex items-center gap-2 w-fit h-fit text-blue-900 bg-gray-100 hover:bg-gray-300 font-semibold px-4 py-1 rounded'
      >
        New Course
        <MdOutlineWysiwyg />
      </button>
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
  const dispatch = useAppDispatch();
  const { currentTab } = useAppSelector((state) => state.setting);
  return (
    <Layout>
      <AdminActions />
      <Tabs
        selectedIndex={currentTab}
        onSelect={(tabIndex) => {
          dispatch(updateCurrentTab(tabIndex));
        }}
        className='w-full h-full bg-gray-200/50 rounded'
        selectedTabClassName='border-b-4 border-blue-500 bg-gray-100 text-black'
      >
        <TabList className='w-full h-[5%] flex gap-2 bg-gray-600 text-white rounded-t overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 shadow-md'>
          {Object.values(ADMIN_TAB).map(({ title }) => (
            <Tab
              key={title}
              className='min-w-max w-fit h-full font-bold text-sm px-5 tracking-wide cursor-pointer outline-none flex items-center justify-center'
            >
              {title}
            </Tab>
          ))}
        </TabList>
        {Object.values(ADMIN_TAB).map(({ tabIndex }) => (
          <TabPanel
            key={tabIndex}
            className={`w-full h-[95%] ${
              tabIndex !== currentTab && 'hidden'
            }`}
          >
            {getTabContent(tabIndex)}
          </TabPanel>
        ))}
      </Tabs>
    </Layout>
  );
};

export default Admin;
