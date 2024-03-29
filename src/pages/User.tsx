import MyCourses from 'components/course';
import { useAppDispatch, useAppSelector } from 'store';
import { USER_TAB } from 'constants/general';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EnrolledCourses from 'components/user/EnrolledCourses';
import WhatToLearnNextCourses from 'components/user/WhatToLearnNextCourses';
import { updateCurrentTab } from 'store/reducer/setting';
import { useMemo } from 'react';
import { t } from 'i18next';

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

const User = () => {
  const dispatch = useAppDispatch();
  const { currentTab, currentLanguage } = useAppSelector(
    (state) => state.setting,
  );
  const tabs = useMemo(() => Object.values(USER_TAB), [currentLanguage]);

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
          {tabs.map(({ title }) => (
            <Tab
              key={title}
              className='min-w-max w-fit h-full font-bold text-sm px-5 tracking-wide cursor-pointer outline-none flex items-center justify-center'
            >
              {t(title)}
            </Tab>
          ))}
        </TabList>
        {tabs.map(({ tabIndex }) => (
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
    </>
  );
};

export default User;
