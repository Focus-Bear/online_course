import { MdLogout, MdOutlineWysiwyg } from 'react-icons/md';
import MyCourses from 'components/common/course';
import { updateIsNewCourseModalOpened } from 'store/reducer/user';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store';
import { USER_TAB } from 'constants/general';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { updateNewCourse } from 'store/reducer/course';
import { DEFAULT_NEW_COURSE } from 'assets/data';
import EnrolledCourses from 'components/user/EnrolledCourses';
import WhatToLearnNextCourses from 'components/user/WhatToLearnNextCourses';
import { updateCurrentTab } from 'store/reducer/setting';

const getTabContent = (tab: number) => {
  switch (tab) {
    case USER_TAB.ENROLLED_COURSES.tabIndex:
      return <EnrolledCourses />;
    case USER_TAB.MY_COURSES.tabIndex:
      return <MyCourses />;
    default:
      return <WhatToLearnNextCourses />;
  }
};

const UserActions = () => {
  const { logout } = useAuth0();
  const dispatch = useAppDispatch();
  const { currentTab } = useAppSelector((state) => state.setting);

  return (
    <div className='absolute -top-10 right-0 flex items-center gap-4'>
      {currentTab === USER_TAB.MY_COURSES.tabIndex && (
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
  const dispatch = useAppDispatch();
  const { currentTab } = useAppSelector((state) => state.setting);
  return (
    <>
      <Tabs
        selectedIndex={currentTab}
        onSelect={(tabIndex) => {
          dispatch(updateCurrentTab(tabIndex));
        }}
        className='w-full h-full bg-gray-200/50 rounded'
        selectedTabClassName='border-b-4 border-blue-500 bg-gray-100 text-black'
      >
        <TabList className='w-full h-[5%] flex gap-2 bg-gray-600 text-white rounded-t overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 shadow-md'>
          {Object.values(USER_TAB).map(({ title }) => (
            <Tab
              key={title}
              className='min-w-max w-fit h-full font-bold text-sm px-5 tracking-wide cursor-pointer outline-none flex items-center justify-center'
            >
              {title}
            </Tab>
          ))}
        </TabList>
        {Object.values(USER_TAB).map(({ tabIndex }) => (
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
      <UserActions />
    </>
  );
};

export default User;
